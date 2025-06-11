export const check_morning_night = (
  output,
  j,
  k,
  value //idがくる
) => {
  if (k === 1) {
    return true;
  } else if (k === 0) {
    return !output[j][2].some((v) => {
      return value === v;
    });
  } else if (k === 2) {
    return !output[j][0].some((v) => {
      return value === v;
    });
  }
};
//朝晩入ってる人はfalse
