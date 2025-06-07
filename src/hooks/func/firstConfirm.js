// 必要人数以下の時の処理
export const firstConfirm = (
  input1,
  input2,
  candidation,
  isConfirmed,
  shiftCountArray,
  rateOfShift,
  output,
  latestShiftRequired
) => {
  for (let j = 0; j < 7; j++) {
    for (let k = 0; k < 3; k++) {
      if (input1[j][k] > 0 && candidation[j][k].length <= input1[j][k]) {
        isConfirmed[j][k] = true;
        for (let count = 0; count < candidation[j][k].length; count++) {
          shiftCountArray[candidation[j][k][count]] += 1;
          rateOfShift[candidation[j][k][count]] +=
            1 / input2[candidation[j][k][count]].timesToEnterDesired;
        }
        output[j][k].push(...candidation[j][k]);
        latestShiftRequired[j][k] -= candidation[j][k].length;
      }
    }
  }

  console.log('確定してるやつ:');
  console.log(output);

  return;
};
