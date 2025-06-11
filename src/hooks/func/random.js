const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;
import { check } from './check/check.js';

export const random = (
  candidation,
  output,
  input2,
  input3,
  isConfirmed,
  shiftCountArray,
  rateOfShift,
  latestShiftRequired
) => {
  let randomPosition = { day: 0, time: 0 };

  outer: for (let i = 0; i < NUM_DAYS; i++) {
    for (let j = 0; j < NUM_TIME_SLOTS; j++) {
      const prevCandidation = candidation[i][j];

      if (!isConfirmed[i][j]) {
        check(prevCandidation, i, j, output, input3);

        if (prevCandidation.length === 0) {
          // 候補がいないのでスキップ
          isConfirmed[i][j] = true;
          continue;
        }
        if (prevCandidation.length > 0) {
          randomPosition = { day: i, time: j };
          break outer;
        }
      }
    }
  }

  //candidationをcheckする。
  check(
    candidation[randomPosition.day][randomPosition.time],
    randomPosition.day,
    randomPosition.time,
    output,
    input3
  );

  const candidationNumber =
    candidation[randomPosition.day][randomPosition.time].length;

  const rand = Math.floor(Math.random() * candidationNumber);
  const randMember = candidation[randomPosition.day][randomPosition.time][rand];

  output[randomPosition.day][randomPosition.time].push(randMember);
  candidation[randomPosition.day][randomPosition.time] = candidation[
    randomPosition.day
  ][randomPosition.time].filter((v) => v !== randMember);
  shiftCountArray[randMember]++;
  rateOfShift[randMember] += 1 / input2[randMember].timesToEnterDesired;
  latestShiftRequired[randomPosition.day][randomPosition.time]--;
  if (latestShiftRequired[randomPosition.day][randomPosition.time] === 0) {
    isConfirmed = true;
  }
};
