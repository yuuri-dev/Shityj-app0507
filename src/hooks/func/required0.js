//必要人数が0人の処理
export const required0 = (input1,input2,isConfirmed,candidation) => {
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
    return;
}
