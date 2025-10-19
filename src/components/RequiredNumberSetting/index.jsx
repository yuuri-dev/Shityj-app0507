/* 
  必要人数を設定するコンポーネント 
*/

import React from 'react';
import ShiftInputEachDay from '../ShiftInputEachDay';
import styles from './RequiredNumberSetting.module.css';

const Index = ({ groupRequireNumberArray, setGroupRequireNumberArray }) => {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1コマ目', '2コマ目', '3コマ目'];

  return (
    <div className={styles.contents}>
      {days.map((day, dayIndex) => {
        return (
          <ShiftInputEachDay
            key={day}
            day={day}
            dayIndex={dayIndex}
            timeSlots={timeSlots}
            groupRequireNumberArray={groupRequireNumberArray}
            setGroupRequireNumberArray={setGroupRequireNumberArray}
          />
        );
      })}
    </div>
  );
};

export default Index;
