import { check_continuousWork } from './check_continuousWork.js';
import { check_morning_night } from './check_morning_night.js';

export const check = (minIndexes, j, k, output, input3) => {
  if (minIndexes.length === 0) return;

  const result = [];

  for (let i = 0; i < minIndexes.length; i++) {
    const value = minIndexes[i];
    if (
      check_continuousWork(value, j, output, input3) &&
      check_morning_night(output, j, k, value)
    ) {
      result.push(value);
    }
  }

  // ここで return
  return result;
};