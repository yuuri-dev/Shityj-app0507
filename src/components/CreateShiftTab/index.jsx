import React, { useState } from 'react';
import styles from './CreateShiftTab.module.css';
import EditShift from '../EditShift';

//shiftINfoに頼らないように変更する
const CreateShiftTab = ({
  group_id,
  currentWeekId,
  setCurrentWeekId,
  shiftInfo,
  groupRequireNumberArray,
  recruitingWeeks,
}) => {

  const handleWeekChange = (e) => {
    setCurrentWeekId(e.target.value);
  };

  return (
    <div>
      <p className={styles.description}>
        シフトを編集・保存することができます。
      </p>
      <p className={styles.description}>自動で作成することもできます</p>

      <div className={styles.weekSelector}>
        <label htmlFor="week">対象週を選択：</label>
        <select
          id="week"
          value={currentWeekId || ''}
          onChange={handleWeekChange}
          className={styles.select}
        >
          {recruitingWeeks.map((week) => {
            const start = new Date(week.week_start_date);
            const end = new Date(start);
            end.setDate(start.getDate() + 6); // 6日後を計算

            const format = (d) =>
              `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
                2,
                '0'
              )}-${String(d.getDate()).padStart(2, '0')}`;

            return (
              <option key={week.id} value={week.id}>
                {format(start)} 〜 {format(end)}
              </option>
            );
          })}
        </select>
      </div>

      <EditShift
        group_id={group_id}
        currentWeekId={currentWeekId}
        shiftInfo={shiftInfo}
        groupRequireNumberArray={groupRequireNumberArray}
      />
    </div>
  );
};

export default CreateShiftTab;
