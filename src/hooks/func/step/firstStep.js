//二週目

import { check } from '../check/check.js';

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
  const candidationCopy = candidation.map((row) =>
    row.map((slot) => [...slot])
  );

  if (!isConfirmed[j][k]) {
    const candidationOverFlow = [...candidationCopy[j][k]]; // ← ここで使う

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

    check(minIndexes, j, k, output, input3);

    if (minIndexes.length <= latestShiftRequired[j][k]) {
      minIndexes.map((value) => {
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
    console.log("firstStep");
    console.log(isConfirmed);
    
    console.log(output);
  }

  return;
};
