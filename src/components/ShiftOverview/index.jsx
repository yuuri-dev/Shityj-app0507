import React from 'react';
import styles from './ShiftOverview.module.css';

const ShiftOverview = ({
  days,
  timeSlots,
  shiftInfo,
  groupRequireNumberArray,
  onClickSlot,
}) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr className={styles.grid}>
            <th className={styles.colIndex}></th>
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
                const filteredMembers = shiftInfo.filter(
                  (member) => member.shiftArray[colIndex]?.[rowIndex]
                );
                const names = filteredMembers.map((m) => m.name);
                const required =
                  groupRequireNumberArray?.[colIndex]?.[rowIndex] ?? 0;
                return (
                  <td
                    className={styles.item}
                    key={colIndex}
                    onClick={() => {
                      if (onClickSlot) {
                        onClickSlot(
                          colIndex,
                          rowIndex,
                          filteredMembers,
                          required
                        );
                      }
                    }}
                  >
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
