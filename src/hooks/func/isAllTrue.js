export const isAllTrue = (array) => {
  return array.every((row) => row.every((value) => value === true));
};
