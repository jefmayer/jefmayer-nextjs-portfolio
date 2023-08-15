/* eslint-disable import/prefer-default-export */
const commaFormattedNumber = (num) => {
  if (num.toString().length > 3) {
    return num.toString().replace(/\B(?=(\d)+(?!\d))/, ',');
  }
  return num;
};

export {
  commaFormattedNumber,
};
/* eslint-enable import/prefer-default-export */
