import { firstStep } from '../firstStep.js';
import { secondStep } from '../secondStep.js';

export const one_cycle = (
  input1,
  input2,
  input3,
  candidation,
  isConfirmed,
  output,
  shiftCountArray,
  rateOfShift,
  latestShiftRequired
) => {
  //第一段階
  for (let i = 0; i < 5; i++) {
    //平日
    for (let j = 0; j < 5; j++) {
      for (let k = 0; k < 3; k++) {
        firstStep(
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
        );
      }
    } //休日
    for (let j = 5; j < 7; j++) {
      for (let k = 0; k < 3; k++) {
        firstStep(
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
        );
      }
    }
  }

  //第二段階
  for (let j = 0; j < 7; j++) {
    for (let k = 0; k < 3; k++) {
      secondStep(
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
      );
    }
  }
  console.log(output);
};
