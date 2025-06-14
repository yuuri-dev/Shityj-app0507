//シフト作成プログラム

// 出席率低い人 -> shiftCountArray / timesToEnterDesired が小さい人
// 出席率の増加率が高い人　-> timesToEnterDesired が小さい人

import { firstConfirm } from './func/firstConfirm.js';
import { required0 } from './func/required0.js';
import { input1, input2, input3, input4 } from './test_data.js';
import { one_cycle } from './func/one_cycle/one_cycle.js';
import { random } from './func/random.js';
import { isAllTrue } from './func/isAllTrue.js';

//---------シフト生成関数-------------
const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

export const result = async (input1, input2, input3, input4) => {
  const createMatrix = (rows, cols, init) => {
    return Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        typeof init === 'function' ? init() : init
      )
    );
  };
  //処理よう（変更あり）
  let candidation = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, () => []);

  //変更しないやつ
  const candidationFix = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, () => []);

  let isConfirmed = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, false);
  const output = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, () => []);

  let shiftCountArray = Array(input2.length).fill(0);

  let rateOfShift = Array(input2.length).fill(0);

  let latestShiftRequired = JSON.parse(JSON.stringify(input1));

  //必要人数0の場合の処理
  required0(input1, input2, isConfirmed, candidation);

  // 必要人数より候補者が少ないまたは同じ時の処理
  firstConfirm(
    input1,
    input2,
    candidation,
    isConfirmed,
    shiftCountArray,
    rateOfShift,
    output,
    latestShiftRequired
  );

  let currentCandidates = candidation;
  let currentIsConfirmed = isConfirmed;
  let currentshiftCountArray = shiftCountArray;
  let currentrateOfShift = rateOfShift
  let currentlatestShiftRequired = latestShiftRequired;

  const outputArray = Array.from({ length: 4 }, () =>
    JSON.parse(JSON.stringify(output))
  );

  outputArray.map((eachOutput) => {
    //初期化
    candidation = currentCandidates;
    isConfirmed = currentIsConfirmed;
    shiftCountArray = currentshiftCountArray;
    rateOfShift = currentrateOfShift;
    latestShiftRequired = currentlatestShiftRequired;
    while (!isAllTrue(isConfirmed)) {
      one_cycle(
        input1,
        input2,
        input3,
        candidation,
        isConfirmed,
        eachOutput,
        shiftCountArray,
        rateOfShift,
        latestShiftRequired
      );

      //ランダム処理
      random(
        candidation,
        eachOutput,
        input2,
        input3,
        isConfirmed,
        shiftCountArray,
        rateOfShift,
        latestShiftRequired
      );
    }
  });

  console.log('出力');
  console.log(outputArray);

  console.log('isConfirmed?:');
  console.log(isConfirmed);

  console.log('シフト入った回数:');
  console.log(shiftCountArray);

  console.log('出勤率:');
  console.log(rateOfShift);
  console.log('latestShiftRequired:');
  console.log(latestShiftRequired);
  return output;
};

result(input1, input2, input3, input4);

//この後の改良点

// ・入りたい数を超えない様にする->break
//  足りなかったところは人数表示（赤くする）
//  掲示板機能（シフト交換）
//
//
//
//
