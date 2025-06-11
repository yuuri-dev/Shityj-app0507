export const secondStep = (
  input1,
  input2,
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

    // minIndexes条件満たすかチェック

    if (minIndexes.length <= input1[j][k]) {
      minIndexes.map((value) => {
        output[j][k].push(value);

        candidation[j][k] = candidation[j][k].filter((v) => v !== value);

        shiftCountArray[value]++;
        rateOfShift[value] += 1 / input2[value].timesToEnterDesired;
      });
      latestShiftRequired[j][k] -= minIndexes.length;
    }
  }
};
