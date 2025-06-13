// シフト必要人数
export const input1 = [
  [1, 1, 1],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [1, 1, 1],
];

// シフト希望データ
export const input2 = [
  {
    id: 0,
    name: 'alice',
    timesToEnterDesired: 3,
    shiftArray: [
      [true, false, true],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, true, true],
    ],
  },
  {
    id: 1,
    name: 'bob',
    timesToEnterDesired: 3,
    shiftArray: [
      [true, true, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [false, false, false],
      [true, true, false],
    ],
    // },
    // {
    //   id: 2,
    //   name: 'carol',
    //   timesToEnterDesired: 2,
    //   shiftArray: [
    //     [false, true, true],
    //     [false, true, true],
    //     [false, false, false],
    //     [false, false, false],
    //     [false, false, false],
    //     [false, false, true],
    //     [false, true, false],
    //   ],
    // },
    // {
    //   id: 3,
    //   name: 'dave',
    //   timesToEnterDesired: 1,
    //   shiftArray: [
    //     [false, true, false],
    //     [false, false, false],
    //     [false, false, false],
    //     [true, false, false],
    //     [false, false, false],
    //     [true, false, false],
    //     [false, false, false],
    //   ],
    // },
    // {
    //   id: 4,
    //   name: 'eva',
    //   timesToEnterDesired: 2,
    //   shiftArray: [
    //     [true, false, false],
    //     [true, false, false],
    //     [true, false, false],
    //     [true, false, false],
    //     [true, false, false],
    //     [false, false, false],
    //     [false, false, false],
    //   ],
    // },
    // {
    //   id: 5,
    //   name: 'frank',
    //   timesToEnterDesired: 3,
    //   shiftArray: [
    //     [false, false, true],
    //     [false, false, true],
    //     [false, false, true],
    //     [false, false, false],
    //     [false, false, false],
    //     [true, true, true],
    //     [false, false, false],
    //   ],
    // },
    // {
    //   id: 6,
    //   name: 'gina',
    //   timesToEnterDesired: 2,
    //   shiftArray: [
    //     [true, true, false],
    //     [false, false, false],
    //     [false, true, false],
    //     [true, false, false],
    //     [false, false, false],
    //     [false, false, true],
    //     [true, false, false],
    //   ],
    // },
    // {
    //   id: 7,
    //   name: 'hank',
    //   timesToEnterDesired: 1,
    //   shiftArray: [
    //     [false, false, false],
    //     [true, false, false],
    //     [true, false, false],
    //     [false, true, false],
    //     [false, false, false],
    //     [true, true, false],
    //     [false, false, false],
    //   ],
    // },
    // {
    //   id: 8,
    //   name: 'ivy',
    //   timesToEnterDesired: 2,
    //   shiftArray: [
    //     [false, false, true],
    //     [false, true, false],
    //     [false, false, true],
    //     [true, true, false],
    //     [false, false, false],
    //     [false, false, false],
    //     [false, false, false],
    //   ],
    // },
    // {
    //   id: 9,
    //   name: 'jack',
    //   timesToEnterDesired: 2,
    //   shiftArray: [
    //     [true, false, false],
    //     [false, true, true],
    //     [false, false, true],
    //     [false, false, false],
    //     [false, true, false],
    //     [false, false, false],
    //     [true, false, false],
    //   ],
  },
];

// 最大出勤日数
export const input3 = 5;

// 最大勤務時間数
export const input4 = 3;
