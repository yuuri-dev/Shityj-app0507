import React from 'react';
import styles from "./ShiftOverview.module.css"

const ShiftOverview = ({ days, timeSlots, shiftInfo }) => {
  return (
    <div style={{ overflowX: 'auto' }} className={styles.container}>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, colIndex) => (
              <th className={styles.colIndex} key={colIndex}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr className={styles.grid} key={rowIndex}>
              <td className={styles.slot}>{slot}</td>
              {days.map((_, colIndex) => {
                // 各メンバーの shiftArray[colIndex][rowIndex] が true かを見る
                const names = shiftInfo
                  .filter((member) => member.shiftArray[colIndex]?.[rowIndex])
                  .map((member) => member.name);

                return (
                  <td className={styles.item} key={colIndex}>
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
