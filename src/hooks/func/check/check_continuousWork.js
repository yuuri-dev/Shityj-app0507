const NUM_DAYS = 7;

export const check_continuousWork = (value, j, output, input3) => {
  let count = 1;
  let l = j - 1;
  // lより前の繰り返し回数check
  while (l >= 0) {
    if (output[l].some((m) => m.some((n) => n === value))) {
      l--;
      count++;
    } else {
      break;
    }
  }

  l = j + 1;

  // lより前の繰り返し回数check
  while (l < NUM_DAYS) {
    if (output[l].some((m) => m.some((n) => n === value))) {

      l++;
      count++;
    } else {
      break;
    }
  }
  if (count < input3) {
    return true;
  } else {
    return false;
  }
};

