import PageTitle from '@/components/PageTitle';
import React from 'react';
import { useContext } from 'react';

import { GroupContext } from 'src/contexts/GroupContext';

const ShiftView = () => {
  const {
    groupName,
    shiftInfo,
    setShiftInfo,
    shiftCompleted,
    setShiftCompleted,
  } = useContext(GroupContext);

  return (
    <div>
      <PageTitle>作成したシフト</PageTitle>
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
            shiftCompleted.map((dayRow, dayIndex) => (
              <tr key={dayIndex}>
                <td>日 {dayIndex + 1}</td>
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
