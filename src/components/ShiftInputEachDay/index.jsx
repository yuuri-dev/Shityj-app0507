/* 
  必要人数を曜日ごとに設定するコンポーネント
*/

import React, { useState } from 'react';
import styles from './ShiftInputEachDay.module.css';

const ShiftInputEachDay = ({
  day,
  dayIndex,
  timeSlots,
  groupRequireNumberArray,
  setGroupRequireNumberArray,
}) => {
  const [selectedBulk, setSelectedBulk] = useState(0);

  const handleBulkChange = (e) => {
    const newValue = Number(e.target.value);
    setSelectedBulk(newValue);

    const updatedArray = [...groupRequireNumberArray];
    for (let i = 0; i < updatedArray[dayIndex].length; i++) {
      updatedArray[dayIndex][i] = Number.isNaN(newValue) ? 0 : newValue;
    }
    setGroupRequireNumberArray(updatedArray);
  };

  const handleChangeNumber = (e, timeIndex) => {
    const newValue = Number(e.target.value);

    const updatedArray = [...groupRequireNumberArray];
    updatedArray[dayIndex] = [...updatedArray[dayIndex]];
    updatedArray[dayIndex][timeIndex] = Number.isNaN(newValue) ? 0 : newValue;
    setGroupRequireNumberArray(updatedArray);
  };

  return (
    <div className={styles.contents}>
      <h2 className={styles.dayTitle}>{day}曜日</h2>
      <div className={styles.innerSetting}>
        <p className={styles.p}>一括設定:</p>

        <label className={styles['selectbox-1']}>
          <select value={selectedBulk} onChange={(e) => handleBulkChange(e)}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>

      <p>時間別設定</p>
      {timeSlots.map((v, i) => {
        const value = groupRequireNumberArray[dayIndex][i];
        return (
          <div className={styles.inner} key={i}>
            <p className={styles.p}>{v}</p>
            <label className={styles['selectbox-1']}>
              <select
                value={value}
                onChange={(e) => handleChangeNumber(e, i)}
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
              </select>
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ShiftInputEachDay;
