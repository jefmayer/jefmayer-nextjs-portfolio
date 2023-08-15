/* eslint-disable import/prefer-default-export */
const convertStylesToSelectors = (styles) => (
  styles
    .split(' ')
    .reduce((acc, val) => `${acc}.${val}`, '')
    .trim()
);

export {
  convertStylesToSelectors,
};
/* eslint-enable import/prefer-default-export */
