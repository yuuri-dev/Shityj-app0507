import React from 'react'
import styles from "./ShiftView1_contents.module.css"
const DAYS = ['月', '火', '水', '木', '金', '土', '日'];


const ShiftView1Contents = ({ value, outputIndex, numTimeSlots }) => {
  return (
    <table key={outputIndex} className={styles.table}>
      <thead>
        <tr className={styles.tr}>
          <th>日 / 時間</th>
          {Array.from({ length: numTimeSlots }, (_, i) => (
            <th key={i}>時間 {i + 1}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {value.map((dayRow, dayIndex) => {
          return (
            <tr key={dayIndex}>
              <td>{DAYS[dayIndex]}曜日</td>
              {dayRow.map((slot, timeIndex) => {
                return (
                  <td key={timeIndex}>
                    {Array.isArray(slot) && slot.length > 0
                      ? slot.join(', ')
                      : 'なし'}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ShiftView1Contents