const calculateAlbumWeight = (num) => (
  Math.round(num * 0.264555)
);

const getDiscogsData = () => {
  const url = 'https://api.discogs.com/users/jefmayer';
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      } else {
        reject(new Error({
          status: xhr.status,
          statusText: xhr.statusText,
        }));
      }
    };
    xhr.onerror = () => {
      reject(new Error({
        status: xhr.status,
        statusText: xhr.statusText,
      }));
    };
    xhr.send();
  });
};

const getCollectionWeight = (options) => {
  const { callback } = options;
  getDiscogsData()
    .then((data) => {
      const ct = parseInt(data.num_collection, 10);
      const weight = calculateAlbumWeight(ct);
      callback(weight);
    })
    .catch(() => {
      callback(0);
    });
};

export {
  calculateAlbumWeight,
  getCollectionWeight,
  getDiscogsData,
};
