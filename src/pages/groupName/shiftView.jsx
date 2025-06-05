import PageTitle from '@/components/PageTitle';
import React from 'react';
import { useContext, useState,useEffect } from 'react';

import { GroupContext } from 'src/contexts/GroupContext';

const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

const ShiftView = () => {
  const context = useContext(GroupContext);
  console.log('GroupContext in ShiftView:', context);
  const { groupName, shiftCompleted, shiftInfo } = useContext(GroupContext);

  const a = Array.from({ length: NUM_DAYS }, () =>
    Array.from({ length: NUM_TIME_SLOTS }, () => [])
  );

  const [shiftCompletedWithName, setShiftCompletedWithName] = useState(a);

  useEffect(() => {
    // shiftCompletedとshiftInfoがそろっているときだけ処理
    if (
      !shiftCompleted ||
      !Array.isArray(shiftCompleted) ||
      !shiftInfo ||
      shiftCompleted.length === 0
    ) {
      return;
    }

    const converted = Array.from({ length: NUM_DAYS }, (_, i) =>
      Array.from({ length: NUM_TIME_SLOTS }, (_, j) => {
        const ids = shiftCompleted[i]?.[j] || [];
        return ids.map((id) => shiftInfo[id]?.name || '');
      })
    );

    setShiftCompletedWithName(converted);
  }, [shiftCompleted, shiftInfo]); // 依存関係
  if (
    !shiftCompleted ||
    shiftCompleted.length === 0 ||
    !Array.isArray(shiftCompleted[0])
  ) {
    console.log('shiftCompleted:', shiftCompleted);
    return <p>読み込み中...</p>;
  }

  return (
    <div>
      <PageTitle>{groupName}</PageTitle>
      <p>作成したシフトはこちら</p>

      <table border="1">
        <thead>
          <tr>
            <th>日 / 時間</th>
            {shiftCompleted &&
              shiftCompleted.length > 0 &&
              shiftCompleted[0].map((_, timeIndex) => (
                <th key={timeIndex}>時間 {timeIndex + 1}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {shiftCompleted &&
            shiftCompletedWithName.map((dayRow, dayIndex) => (
              <tr key={dayIndex}>
                <td>{dayIndex + 1}日 </td>
                {dayRow.map((slot, timeIndex) => (
                  <td key={timeIndex}>
                    {slot.length > 0 ? slot.join(', ') : 'なし'}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShiftView;
