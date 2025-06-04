//シフト作成プログラム

// 出席率低い人 -> shiftCountArray / timesToEnterDesired が小さい人
// 出席率の増加率が高い人　-> timesToEnterDesired が小さい人

// 必要人数のデータ
// const input1 = [
//   [5, 0, 0],
//   [2, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
//   [0, 0, 0],
// ];
const input1 = [
  [1, 2, 0],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
  [1, 2, 3],
];

//shiftInfoのデータ

const input2 = [
  {
    id: 0,
    name: 'taro',
    timesToEnterDesired: 3,
    shiftArray: [
      [true, true, true],
      [false, false, false],
      [false, false, false],
      [true, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 1,
    name: 'hanako',
    timesToEnterDesired: 2,
    shiftArray: [
      [true, true, false],
      [false, false, false],
      [false, false, false],
      [true, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 2,
    name: 'user2',
    timesToEnterDesired: 2,
    shiftArray: [
      [false, true, false],
      [true, true, false],
      [false, false, false],
      [true, false, false],
      [true, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 3,
    name: 'user3',
    timesToEnterDesired: 1,
    shiftArray: [
      [true, false, true],
      [false, false, false],
      [false, true, false],
      [false, true, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 4,
    name: 'user4',
    timesToEnterDesired: 3,
    shiftArray: [
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 5,
    name: 'user5',
    timesToEnterDesired: 2,
    shiftArray: [
      [false, true, false],
      [false, true, false],
      [false, true, false],
      [false, true, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 6,
    name: 'user6',
    timesToEnterDesired: 3,
    shiftArray: [
      [false, false, true],
      [false, false, true],
      [false, false, true],
      [false, false, true],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 7,
    name: 'user7',
    timesToEnterDesired: 1,
    shiftArray: [
      [true, false, false],
      [true, false, false],
      [true, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 8,
    name: 'user8',
    timesToEnterDesired: 2,
    shiftArray: [
      [false, true, false],
      [false, true, false],
      [false, true, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
  {
    id: 9,
    name: 'user9',
    timesToEnterDesired: 3,
    shiftArray: [
      [false, false, true],
      [true, false, true],
      [false, false, true],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
    ],
  },
];

const input3 = 2;
const input4 = 2;
// const input2 = [
//   {
//     id: 0,
//     name: 'taro',
//     timesToEnterDesired: 3,
//     shiftArray: [
//       [true, true, true],
//       [false, false, false],
//       [false, false, false],
//       [true, false, false],
//       [false, false, false],
//       [false, false, false],
//       [false, false, false],
//     ],
//   },
//   {
//     id: 1,
//     name: 'hanako',
//     timesToEnterDesired: 2,
//     shiftArray: [
//       [true, true, false],
//       [false, false, false],
//       [false, false, false],
//       [true, false, false],
//       [false, false, false],
//       [false, false, false],
//       [false, false, false],
//     ],
//   },
// ];

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
  }


  let candidation = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, () => []);
  const isConfirmed = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, false);
  const output = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, () => []);

  const shiftCountArray = Array(input2.length).fill(0);

  let rateOfShift = Array(input2.length).fill(0);

  const latestShiftRequired = input1;

  //必要人数0の場合の処理
  input1.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val === 0) isConfirmed[i][j] = true;
    })
  );

  input2.forEach(({ id, shiftArray }) => {
    shiftArray.forEach((row, i) => {
      row.forEach((wantsToEnter, j) => {
        if (wantsToEnter) {
          candidation[i][j].push(id);
        }
      });
    });
  });

  console.log('候補者一覧:');
  console.log(candidation);

  // 必要人数より候補者が少ないまたは同じ時の処理
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
      }
    }
  }

  console.log('確定してるやつ:');
  console.log(output);

  //二週目
  let i = 0; //iは第一段階の繰り返し回数
  while (i < 5) {
    for (let j = 0; j < 7; j++) {
      for (let k = 0; k < 3; k++) {
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
        }
      }
    }
    i++;
  }

  //第二段階

  for (let j = 0; j < 7; j++) {
    for (let k = 0; k < 3; k++) {
      if (!isConfirmed[j][k]) {
        const candidationOverFlow = [...candidation[j][k]];
        const timesToDesiredArray = [];
        for (let l = 0; l < candidationOverFlow.length; l++) {
          timesToDesiredArray.push(
            input2[candidationOverFlow[l]].timesToEnterDesired
          );
        }
        const min = Math.min(timesToDesiredArray);

        const minIndexes = timesToDesiredArray
          .map((value, index) =>
            value === min ? candidationOverFlow[index] : -1
          )
          .filter((index) => index !== -1);

        if (minIndexes.length === input1[j][k] - output[j][k].length) {
          isConfirmed[j][k] = true;
        }

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
    }
  }
  console.log('出力');
  console.log(output);

  console.log('isConfirmed?:');
  console.log(isConfirmed);

  console.log('シフト入った回数:');
  console.log(shiftCountArray);

  console.log('出勤率:');
  console.log(rateOfShift);
  return output;
};

result(input1, input2, input3, input4);

//この後の改良点

// ・入りたい数を超えない様にする->break
