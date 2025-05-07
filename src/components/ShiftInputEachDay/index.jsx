/* 
  必要人数を曜日ごとに設定するコンポーネント
*/

import React from 'react';

const ShiftInputEachDay = ({
  day,
  dayIndex,
  timeSlots,
  groupRequireNumberArray,
  setGroupRequireNumberArray,
}) => {
  const handleBulkChange = (e) => {
    const newValue = Number(e.target.value);
    const updatedArray = [...groupRequireNumberArray];
    for (let i = 0; i < updatedArray[dayIndex].length; i++) {
      updatedArray[dayIndex][i] = Number.isNaN(newValue) ? 0 : newValue;
    }
    setGroupRequireNumberArray(updatedArray);
  };

  const handleChangeNumber = (e, timeIndex) => {
    const newValue = Number(e.target.value);
    let updatedArray = [...groupRequireNumberArray];
    updatedArray[dayIndex] = [...updatedArray[dayIndex]];
    updatedArray[dayIndex][timeIndex] = Number.isNaN(newValue) ? 0 : newValue;
    setGroupRequireNumberArray(updatedArray);
  };
  return (
    <div>
      <h2>{day}曜日</h2>
      <p>一括設定:</p>
      <input type="number" onChange={(e) => handleBulkChange(e)} />
      <p>時間別設定</p>
      {timeSlots.map((v, i) => {
        const value = groupRequireNumberArray[dayIndex][i];
        return (
          <div key={i}>
            <p>{v}</p>
            <input
              type="number"
              value={value}
              onChange={(e) => handleChangeNumber(e, i)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ShiftInputEachDay;
