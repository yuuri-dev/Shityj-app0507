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
          const index = candidation[j][k][count];
          const member = input2[index];

          if (!member) {
            console.warn(`input2[${index}] is undefined`);
            continue; // スキップ
          }

          shiftCountArray[index] += 1;
          rateOfShift[index] += 1 / member.timesToEnterDesired;

          console.log("firstConfirm");
          
          console.log('candidation:', candidation[j][k][count]);
        }
        output[j][k].push(...candidation[j][k]);
        latestShiftRequired[j][k] -= candidation[j][k].length;
      }
    }
  }

  console.log('firstConfirm:output');
  console.log(output);

  return;
};
