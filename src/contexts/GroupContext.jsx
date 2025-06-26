// src/contexts/GroupContext.js

import { createContext, useState, useEffect } from 'react';
import { supabase } from 'src/lib/supabase_client'; // ← 自分の設定に合わせてね

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
