input1 = [
  [2, 1, 0],
  [2, 1, 0],
  [2, 1, 0],
  [1, 1, 0],
  [2, 1, 0],
  [2, 1, 0],
  [2, 1, 0],
];
input2 = [
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

const result = (input1, input2) => {
  let candidation = Array.from({ length: 7 }, () =>
    Array.from({ length: 3 }, () => [])
  );

  let isConfirmed = Array.from({ length: 7 }, () =>
    Array.from({ length: 3 }, () => false)
  );

 let output = Array.from({ length: 7 }, () =>
    Array.from({ length: 3 }, () => false)
 );
  
  shiftCountArray = Array.from({length:input2.length},() => 0)
    

  for (let i = 0; i < 7; i++) {
    for (let j = 0; j < 3; j++) {
      if (input1[i][j] === 0) {
        isConfirmed[i][j] = true;
      }
    }
  }

  for (let i = 0; i < input2.length; i++) {
    for (let j = 0; j < 7; j++) {
      for (let k = 0; k < 3; k++) {
        if (input2[i].shiftArray[j][k]) {
          candidation[j][k].push(input2[i].id);
        }
      }
    }
  }

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

result(input1,input2);
