// src/contexts/GroupContext.js

import { createContext, useState, useEffect } from 'react';

export const GroupContext = createContext();

const NUM_SHIFT_CANDIDATION = 4;
const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

export const GroupProvider = ({ children }) => {
  const [groupName, setGroupName] = useState('');
  const [groupRequireNumberArray, setGroupRequireNumberArray] = useState(
    Array.from({ length: NUM_DAYS }, () => Array(NUM_TIME_SLOTS).fill(0))
  );
  const [maxDateToWork, setMaxDateToWork] = useState(5);
  const [maxHoursToWork, setMaxHoursToWork] = useState(8);
  const [shiftInfo, setShiftInfo] = useState([]);
  const [shiftCompleted, setShiftCompleted] = useState(
    Array.from({ length: NUM_SHIFT_CANDIDATION }, () =>

      Array.from({ length: NUM_DAYS }, () =>
        Array.from({ length: NUM_TIME_SLOTS }, () => [])
      )
    )
  );

  // 読み込み処理（クライアントだけ）
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedGroupName = localStorage.getItem('groupName');
      if (savedGroupName) setGroupName(savedGroupName);

      const savedGroupRequire = localStorage.getItem('groupRequireNumberArray');
      if (savedGroupRequire)
        setGroupRequireNumberArray(JSON.parse(savedGroupRequire));

      const savedMaxDate = localStorage.getItem('maxDateToWork');
      if (savedMaxDate) setMaxDateToWork(Number(savedMaxDate));

      const savedMaxHours = localStorage.getItem('maxHoursToWork');
      if (savedMaxHours) setMaxHoursToWork(Number(savedMaxHours));

      const savedShiftInfo = localStorage.getItem('shiftInfo');
      if (savedShiftInfo) setShiftInfo(JSON.parse(savedShiftInfo));

      const savedShiftCompleted = localStorage.getItem('shiftCompleted');
      if (savedShiftCompleted && savedShiftCompleted !== 'undefined') {
        setShiftCompleted(JSON.parse(savedShiftCompleted));
      }
    }
  }, []);

  // 書き込み処理
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('groupName', groupName);
    }
  }, [groupName]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'groupRequireNumberArray',
        JSON.stringify(groupRequireNumberArray)
      );
    }
  }, [groupRequireNumberArray]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('maxDateToWork', maxDateToWork);
    }
  }, [maxDateToWork]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('maxHoursToWork', maxHoursToWork);
    }
  }, [maxHoursToWork]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shiftInfo', JSON.stringify(shiftInfo));
    }
  }, [shiftInfo]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('shiftCompleted', JSON.stringify(shiftCompleted));
    }
  }, [shiftCompleted]);

  return (
    <GroupContext.Provider
      value={{
        groupName,
        setGroupName,
        groupRequireNumberArray,
        setGroupRequireNumberArray,
        maxDateToWork,
        setMaxDateToWork,
        maxHoursToWork,
        setMaxHoursToWork,
        shiftInfo,
        setShiftInfo,
        shiftCompleted,
        setShiftCompleted,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
};
