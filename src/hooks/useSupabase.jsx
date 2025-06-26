import { useContext, useEffect, useState } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import { supabase } from 'src/lib/supabase_client';

export const useGroupName = (group_id) => {
  const { setGroupName } = useContext(GroupContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupName = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('groups')
        .select('group_name')
        .eq('group_id', group_id)
        .single();
      if (error) {
        console.error('グループ名取得失敗:', error);
      }
      if (!error && data) setGroupName(data.group_name);
      setIsLoading(false);
    };
    if (group_id) fetchGroupName();
  }, [group_id]);
  return isLoading;
};

export const useShiftInfo = (group_id) => {
  const { shiftInfo, setShiftInfo } = useContext(GroupContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGroupMember = async () => {
      setIsLoading(true);

      const { data: users, error: usersError } = await supabase
        .from('users_table')
        .select('name, user_id, times_to_enter_desired')
        .eq('group_id', group_id);

      if (usersError) {
        console.error('ユーザー情報の取得に失敗:', usersError);
        setIsLoading(false);
        return;
      }

      // 2. 各ユーザーのシフト希望情報を取得
      const { data: prefs, error: prefsError } = await supabase
        .from('shift_preferences')
        .select('user_id, date, time_slot, is_available')
        .eq('group_id', group_id);

      if (prefsError) {
        console.error('シフト希望情報の取得に失敗:', prefsError);
        setIsLoading(false);
        return;
      }

      // 3. シフト情報をユーザー単位に構造化
      const result = users.map((user) => {
        // ユーザーごとの空のシフト表（7日 × 3枠）
        const shiftArray = Array.from({ length: 7 }, () =>
          Array(3).fill(false)
        );

        // 該当ユーザーの希望シフトを反映
        prefs
          .filter((pref) => pref.user_id === user.user_id && pref.is_available)
          .forEach((pref) => {
            const day = pref.date;
            const time = pref.time_slot;
            shiftArray[day][time] = true;
          });

        return {
          name: user.name,
          user_id: user.user_id,
          timesToEnterDesired: user.times_to_enter_desired || 0,
          shiftArray,
        };
      });
      // 4. コンテキストにセット
      setShiftInfo(result);
      setIsLoading(false);
    };

    if (group_id) fetchGroupMember();
  }, [group_id]);

  return isLoading;
};
