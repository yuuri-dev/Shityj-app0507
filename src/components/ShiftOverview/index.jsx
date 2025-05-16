import React from 'react';

const ShiftOverview = ({ days, timeSlots, shiftInfo }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, colIndex) => (
              <th key={colIndex}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={rowIndex}>
              <td>{slot}</td>
              {days.map((_, colIndex) => {
                // 各メンバーの shiftArray[colIndex][rowIndex] が true かを見る
                const names = shiftInfo
                  .filter((member) => member.shiftArray[colIndex]?.[rowIndex])
                  .map((member) => member.name);

                return (
                  <td key={colIndex}>
                    {names.length > 0
                      ? names.map((name, idx) => <div key={idx}>{name}</div>)
                      : 'ー'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftOverview;
