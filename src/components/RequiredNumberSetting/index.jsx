/* 
  必要人数を設定するコンポーネント 
*/

import React, {useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import ShiftInputEachDay from '../ShiftInputEachDay';
import styles from "./RequiredNumberSetting.module.css"

const Index = () => {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['9:00~12:00', '12:00~15:00', '15:00~18:00'];

  const { groupRequireNumberArray, setGroupRequireNumberArray } =
    useContext(GroupContext);


  return (
    <div className={styles.contents}>
      {days.map((day,dayIndex) => {
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
