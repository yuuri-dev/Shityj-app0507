import React from 'react';
import styles from './ShiftView1.module.css';

const ShiftView1 = ({ shiftCompletedWithName }) => {
  if (!shiftCompletedWithName || shiftCompletedWithName.length === 0) {
    return <p>シフト情報がありません。</p>;
  }

  const numTimeSlots = shiftCompletedWithName[0]?.length || 0;

  return (
    <div className={styles.contents}>
      <h2 className={styles.h2}>シフト表</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>日 / 時間</th>
              {Array.from({ length: numTimeSlots }, (_, i) => (
                <th key={i}>時間 {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shiftCompletedWithName.map((dayRow, dayIndex) => (
              <tr key={dayIndex}>
                <td>{dayIndex + 1}日</td>
                {dayRow.map((slot, timeIndex) => (
                  <td key={timeIndex}>
                    {Array.isArray(slot) && slot.length > 0
                      ? slot.join(', ')
                      : 'なし'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftView1;
