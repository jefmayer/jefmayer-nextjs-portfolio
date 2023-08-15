const getInterval = (interval) => {
  let num = 0;
  switch (interval) {
    case 'hours':
      num = 1000 * 60 * 60;
      break;
    case 'days':
      num = 1000 * 60 * 60 * 24;
      break;
    case 'years':
      num = 1000 * 60 * 60 * 24 * 365;
      break;
    default:
      num = 0;
  }
  return num;
};

const getTimeBetweenDates = (date1, date2, interval) => (
  Math.ceil((date1.getTime() - date2.getTime()) / interval)
);

export {
  getInterval,
  getTimeBetweenDates,
};
