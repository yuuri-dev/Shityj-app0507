import React from 'react';
import styles from "./ShiftView2.module.css"
const DAYS = ['月', '火', '水', '木', '金', '土', '日'];

const ShiftView2 = ({ shiftCompletedWithName }) => {
  if (
    !shiftCompletedWithName ||
    !Array.isArray(shiftCompletedWithName) ||
    shiftCompletedWithName.length === 0 ||
    !Array.isArray(shiftCompletedWithName[0])
  ) {
    return <p>シフト情報の形式が正しくありません。</p>;
  }

  const currentShift = shiftCompletedWithName[0]; // 今は1つ目の案のみ表示
  const memberShiftMap = {};

  // シフトをメンバー別に変換
  currentShift.forEach((dayRow, dayIndex) => {
    dayRow.forEach((slot, timeIndex) => {
      if (Array.isArray(slot)) {
        slot.forEach((memberName) => {
          if (!memberShiftMap[memberName]) {
            memberShiftMap[memberName] = Array(7)
              .fill(null)
              .map(() => []);
          }
          memberShiftMap[memberName][dayIndex][timeIndex] = true;
        });
      }
    });
  });

  const allTimeSlotCount = currentShift[0]?.length || 0;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>メンバー別シフト</h2>
      {Object.entries(memberShiftMap).map(([name, schedule]) => (
        <div key={name} className={styles.memberBlock}>
          <h3 className={styles.memberName}>{name}</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>曜日</th>
                {Array.from({ length: allTimeSlotCount }, (_, i) => (
                  <th key={i}>時間 {i + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((slots, dayIndex) => (
                <tr key={dayIndex}>
                  <td>{DAYS[dayIndex]}曜日</td>
                  {Array.from({ length: allTimeSlotCount }, (_, timeIndex) => (
                    <td
                      key={timeIndex}
                      className={`${styles.cell} ${
                        slots[timeIndex] ? styles.present : styles.absent
                      }`}
                    >
                      {slots[timeIndex] ? '○' : '×'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ShiftView2;
