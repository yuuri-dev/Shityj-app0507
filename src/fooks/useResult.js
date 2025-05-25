//必要人数のデータ
const input1 = [
  [2, 1, 0],
  [2, 1, 0],
  [2, 1, 0],
  [1, 1, 0],
  [2, 1, 0],
  [2, 1, 0],
  [2, 1, 0],
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
];

//---------シフト生成関数-------------
const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

const result = (input1, input2) => {
  const createMatrix = (rows, cols, init) =>
    Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () =>
        typeof init === 'function' ? init() : init
      )
    );

  const candidation = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, () => []);
  const isConfirmed = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, false);
  const output = createMatrix(NUM_DAYS, NUM_TIME_SLOTS, false);

  const shiftCountArray = Array(input2.length).fill(0);

  //必要人数0の場合の処理
  input1.forEach((row, i) =>
    row.forEach((val, j) => {
      if (val === 0) isConfirmed[i][j] = true;
    })
  );

  // 必要人数より候補者が少ないまたは同じ時の処理
  input2.forEach(({ id, shiftArray }) => {
    shiftArray.forEach((row, i) => {
      row.forEach((wantsToEnter, j) => {
        if (wantsToEnter) {
          candidation[i][j].push(id);
        }
      });
    });
  });

  for (let j = 0; j < 7; j++) {
    for (let k = 0; k < 3; k++) {
      if (input1[j][k] > 0 && candidation[j][k].length <= input1[j][k]) {
        isConfirmed[j][k] = true;
        for (let count = 0; count < candidation[j][k].length; count++) {
          shiftCountArray[candidation[j][k][count]] += 1;
        }
      }
    }
  }

  console.log(output);
  console.log(candidation);
  console.log(isConfirmed);
  console.log(shiftCountArray);
};

result(input1, input2);
