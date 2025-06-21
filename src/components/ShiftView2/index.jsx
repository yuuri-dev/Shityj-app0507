import React from 'react';
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
    <div style={{ padding: '1rem' }}>
      <h2>メンバー別シフト</h2>
      {Object.entries(memberShiftMap).map(([name, schedule]) => (
        <div key={name} style={{ marginBottom: '1.5rem' }}>
          <h3>{name}</h3>
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                  曜日
                </th>
                {Array.from({ length: allTimeSlotCount }, (_, i) => (
                  <th
                    key={i}
                    style={{ border: '1px solid #ccc', padding: '0.5rem' }}
                  >
                    時間 {i + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((slots, dayIndex) => (
                <tr key={dayIndex}>
                  <td style={{ border: '1px solid #ccc', padding: '0.5rem' }}>
                    {DAYS[dayIndex]}曜日
                  </td>
                  {Array.from({ length: allTimeSlotCount }, (_, timeIndex) => (
                    <td
                      key={timeIndex}
                      style={{
                        border: '1px solid #ccc',
                        padding: '0.5rem',
                        textAlign: 'center',
                      }}
                    >
                      {slots[timeIndex] ? '✔' : '×'}
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
