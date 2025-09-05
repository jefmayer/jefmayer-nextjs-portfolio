const isBrowser = () => (
  typeof window !== 'undefined'
);

const getBrowserWindowDims = () => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    }
  }
  const { innerWidth, innerHeight } = window;
  return {
      width: innerWidth,
      height: innerHeight,
    }
};

export {
  getBrowserWindowDims,
  isBrowser,
};
