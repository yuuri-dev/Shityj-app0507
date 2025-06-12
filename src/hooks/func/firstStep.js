//二週目

import { check } from './check/check.js';

export const firstStep = (
  input1,
  input2,
  input3,
  candidation,
  isConfirmed,
  output,
  shiftCountArray,
  rateOfShift,
  latestShiftRequired,
  j,
  k
) => {
  if (!isConfirmed[j][k]) {
    const candidationOverFlow = [...candidation[j][k]];

    const rateOfShiftCandidation = [];
    for (let l = 0; l < candidationOverFlow.length; l++) {
      rateOfShiftCandidation.push(rateOfShift[candidationOverFlow[l]]);
    }
    const min = Math.min(...rateOfShiftCandidation);

    //最小値の要素番号すべてを格納した配列
    const minIndexes = rateOfShiftCandidation
      .map((value, index) =>
        value - min < 0.01 ? candidationOverFlow[index] : -1
      )
      .filter((index) => index !== -1);

    if (minIndexes.length === input1[j][k] - output[j][k].length) {
      isConfirmed[j][k] = true;
    }

    check(minIndexes, j, k, output, input3);

    if (minIndexes.length <= input1[j][k]) {
      minIndexes.map((value) => {
        console.log(value);
        output[j][k].push(value);

        candidation[j][k] = candidation[j][k].filter((v) => v !== value);

        shiftCountArray[value]++;
        rateOfShift[value] += 1 / input2[value].timesToEnterDesired;
      });
      latestShiftRequired[j][k] -= minIndexes.length;
    }
    if (latestShiftRequired[j][k] === 0) {
      isConfirmed[j][k] = true;
    }
  }

  return;
};
