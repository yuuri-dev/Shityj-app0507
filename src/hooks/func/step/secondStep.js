import { check } from '../check/check.js';

export const secondStep = (
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
    const candidationOverFlow = [...candidationCopy[j][k]];
    const timesToDesiredArray = [];
    for (let l = 0; l < candidationOverFlow.length; l++) {
      timesToDesiredArray.push(
        input2[candidationOverFlow[l]].timesToEnterDesired
      );
    }
    const max = Math.max(timesToDesiredArray);

    const minIndexes = timesToDesiredArray
      .map((value, index) => (value === max ? candidationOverFlow[index] : -1))
      .filter((index) => index !== -1);

    if (minIndexes.length === input1[j][k] - output[j][k].length) {
      isConfirmed[j][k] = true;
    }

    check(minIndexes, j, k, output, input3);

    if (minIndexes.length <= input1[j][k]) {
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
    console.log(secondStep);
  console.log(output);
  }
  
};
