import { check } from '../check/check.js';
const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

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
  let randomPosition = null; // まだポジションが見つかっていないことを示す

  // 1. 割り当て可能なシフト（ポジション）を探す
  outer: for (let i = 0; i < NUM_DAYS; i++) {
    for (let j = 0; j < NUM_TIME_SLOTS; j++) {
      // まだ確定していないシフトか？
      if (!isConfirmed[i][j]) {
        let currentCandidates = [...candidation[i][j]];
        check(currentCandidates, i, j, output, input3);
        if (currentCandidates.length > 0) {
          // 候補者がいれば、このシフトを割り当て対象とする
          randomPosition = { day: i, time: j };
          break outer; // ループを抜けて割り当て処理へ
        } else {
          // 候補者がいなければ、このシフトは埋められないので確定済みにする
          // (無限ループを防ぐため)
          isConfirmed[i][j] = true;
          continue; // 次のシフトの検索を続ける
        }
      }
    }
  }

  // 2. 割り当て可能なシフトがなければ、関数を終了
  if (randomPosition === null) {
    return;
  }

  // 3. メンバーをランダムに選んで割り当て
  const candidates = candidation[randomPosition.day][randomPosition.time];
  const candidationNumber = candidates.length;

  // 念のためのチェック（基本的には通らないはず）
  if (candidationNumber === 0) {
    isConfirmed[randomPosition.day][randomPosition.time] = true;
    return;
  }

  const rand = Math.floor(Math.random() * candidationNumber);
  const randMember = candidates[rand];

  // 4. 各種データを更新
  output[randomPosition.day][randomPosition.time].push(randMember);
  candidation[randomPosition.day][randomPosition.time] = candidates.filter(
    (v) => v !== randMember
  );
  shiftCountArray[randMember]++;
  rateOfShift[randMember] += 1 / input2[randMember].timesToEnterDesired;
  latestShiftRequired[randomPosition.day][randomPosition.time]--;

  // 5. 必要人数に達したら、シフトを確定済みにする
  if (latestShiftRequired[randomPosition.day][randomPosition.time] === 0) {
    isConfirmed[randomPosition.day][randomPosition.time] = true;
  }

  console.log('random');
  console.log(output);
  console.log(isConfirmed);
};
