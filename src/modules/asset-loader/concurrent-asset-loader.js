const attempt = async (fn, retries = 0, delay = 0) => {
  try {
    return await fn();
  } catch (err) {
    if (retries <= 0) throw err;
    await new Promise(r => setTimeout(r, delay));
    return attempt(fn, retries - 1, Math.max(delay * 1.5, delay));
  }
};

const pool = async (urls, limit, worker, { onUpdate, signal, retry = 0, retryDelay = 0 } = {}) => {
  const total = urls.length;
  if (!total) return [];
  let completed = 0;
  const results = new Array(total);
  const executing = new Set();
  let index = 0;

  const startNext = () => {
    if (signal?.aborted || index >= total) return;
    const i = index++;
    const url = urls[i];

    const p = attempt(() => worker(url, { signal }), retry, retryDelay)
      .then(value => { results[i] = { status: 'fulfilled', value, url }; })
      .catch(reason => { results[i] = { status: 'rejected', reason, url }; })
      .finally(() => {
        completed++;
        onUpdate?.({
          loaded: completed,
          total,
          percent: total ? Math.round((completed / total) * 100) : 100,
          url,
          result: results[i],
        });
        executing.delete(p);
        if (!signal?.aborted && index < total) startNext();
      });

    executing.add(p);
  };

  for (let k = 0; k < Math.min(limit, total); k++) startNext();
  while (executing.size) await Promise.race([...executing]);
  return results;
};

const fetchWorker = async (url, { signal } = {}) => {
  const res = await fetch(url, { signal, credentials: 'omit', cache: 'default' });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  await res.arrayBuffer();
  return true;
};

const imageWorker = (url, { signal } = {}) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    let aborted = false;
    const cleanup = () => {
      img.onload = null; img.onerror = null;
      signal?.removeEventListener?.('abort', onAbort);
    };
    const onAbort = () => { aborted = true; cleanup(); reject(new DOMException('Aborted', 'AbortError')); };
    if (signal) {
      if (signal.aborted) return onAbort();
      signal.addEventListener('abort', onAbort, { once: true });
    }
    img.decoding = 'async';
    img.fetchPriority = 'low';
    img.onload = () => { if (!aborted) { cleanup(); resolve({ width: img.naturalWidth, height: img.naturalHeight }); } };
    img.onerror = () => { cleanup(); reject(new Error(`Image failed ${url}`)); };
    img.src = url;
  });

const loadAssetSets = ({
  preloadAssetUrls = [],
  mainAssetUrls = [],
  preloadLimit = 4,
  mainLimit = 8,
  onPreloadUpdate,
  onPreloadComplete,
  onMainLoadUpdate,
  onMainLoadComplete,
  worker = fetchWorker,
  retry = 1,
  retryDelay = 300,
  signal,
} = {}) => {
  const preloadController = new AbortController();
  const mainController = new AbortController();

  if (signal) {
    const abortAll = () => { preloadController.abort(); mainController.abort(); };
    if (signal.aborted) abortAll();
    else signal.addEventListener('abort', abortAll, { once: true });
  }

  const run = async () => {
    const pre = await pool(preloadAssetUrls, preloadLimit, worker, {
      onUpdate: onPreloadUpdate, signal: preloadController.signal, retry, retryDelay,
    });
    onPreloadComplete?.(pre);

    const main = await pool(mainAssetUrls, mainLimit, worker, {
      onUpdate: onMainLoadUpdate, signal: mainController.signal, retry, retryDelay,
    });
    onMainLoadComplete?.(main);

    return { pre, main };
  };

  return { run, abortAll: () => { preloadController.abort(); mainController.abort(); } };
};

export {
  imageWorker,
  loadAssetSets,
};
