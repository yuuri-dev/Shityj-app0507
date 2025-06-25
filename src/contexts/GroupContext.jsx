// src/contexts/GroupContext.js

import { createContext, useState, useEffect } from 'react';
import { supabase } from 'src/lib/supabase_client'; // ← 自分の設定に合わせてね

export const GroupContext = createContext();

const NUM_SHIFT_CANDIDATION = 4;
const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

export const GroupProvider = ({ children, groupId }) => {
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

  // ✅ Supabaseから読み込み
  useEffect(() => {
    const fetchGroupData = async () => {
      if (!groupId) return;

      const { data, error } = await supabase
        .from('groups')
        .select('*')
        .eq('group_id', groupId)
        .single();

      if (error) {
        console.error('データ取得エラー:', error);
        return;
      }

      if (data) {
        setGroupName(data.group_name);
        setGroupRequireNumberArray(data.group_require_number_array);
        setMaxDateToWork(data.max_date_to_work);
        setMaxHoursToWork(data.max_hours_to_work);
        setShiftInfo(data.shift_info);
        setShiftCompleted(data.shift_completed);
      }
    };

    fetchGroupData();
  }, [groupId]);

  // ✅ 値が変わったら保存する（任意）
  useEffect(() => {
    if (!groupId) return;
    const updateGroup = async () => {
      await supabase
        .from('groups')
        .update({
          group_name: groupName,
          group_require_number_array: groupRequireNumberArray,
          max_date_to_work: maxDateToWork,
          max_hours_to_work: maxHoursToWork,
          shift_info: shiftInfo,
          shift_completed: shiftCompleted,
        })
        .eq('group_id', groupId);
    };

    updateGroup();
  }, [
    groupId,
    groupName,
    groupRequireNumberArray,
    maxDateToWork,
    maxHoursToWork,
    shiftInfo,
    shiftCompleted,
  ]);

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
