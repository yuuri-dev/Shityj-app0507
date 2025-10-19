import { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase_client';

export const useShiftInfo = (group_id, week_id, options) => {
  const [shiftInfoLoading, setShiftInfoLoading] = useState(false);
  const [shiftInfoError, setShiftInfoError] = useState(null);
  const [shiftInfo, setShiftInfo] = useState([]);

  useEffect(() => {
    let aborted = false;

    const run = async () => {
      if (!group_id || !week_id) {
        if (!aborted) {
          setShiftInfo([]);
          setShiftInfoLoading(false);
          setShiftInfoError(null);
        }
        return;
      }

      setShiftInfoLoading(true);
      setShiftInfoError(null);

      try {
        // 1) users が渡されていなければ users も prefs も並列取得
        let users = options && options.users;
        let prefs;

        if (!users || users.length === 0) {
          const [usersRes, prefsRes] = await Promise.all([
            supabase
              .from('users_table')
              .select('user_id, name, times_to_enter_desired')
              .eq('group_id', group_id),
            supabase
              .from('shift_preferences')
              .select('user_id,  shift_index, time_slot, is_available')
              .eq('group_id', group_id)
              .eq('week_id', week_id),
          ]);

          if (usersRes.error) throw usersRes.error;
          if (prefsRes.error) throw prefsRes.error;

          users = usersRes.data || [];
          prefs = prefsRes.data || [];
        } else {
          // users は外から流用 → prefs だけ取得
          const { data: prefsData, error: prefsErr } = await supabase
            .from('shift_preferences')
            .select('user_id,  shift_index, time_slot, is_available')
            .eq('group_id', group_id)
            .eq('week_id', week_id);
          if (prefsErr) throw prefsErr;
          prefs = prefsData || [];
        }

        // 2) input2 互換の ViewModel に整形
        const byUser = new Map();
        for (const u of users) {
          byUser.set(u.user_id, {
            id: u.user_id, // UUIDのまま（連番が必要なら map 後に index で作る）
            name: u.name,
            timesToEnterDesired:
              typeof u.times_to_enter_desired === 'number'
                ? u.times_to_enter_desired
                : 1,
            // booleanの 7x3 行列
            shiftArray: Array.from({ length: 7 }, () => Array(3).fill(false)),
          });
        }

        for (const p of prefs || []) {
          const rec = byUser.get(p.user_id);
          if (!rec) continue;
          if (
            p.shift_index >= 0 &&
            p.shift_index < 7 &&
            p.time_slot >= 0 &&
            p.time_slot < 3
          ) {
            rec.shiftArray[p.shift_index][p.time_slot] = !!p.is_available;
          }
        }

        if (!aborted) setShiftInfo(Array.from(byUser.values()));
      } catch (e) {
        console.error('useShiftInfo error:', e);
        if (!aborted) setShiftInfoError(e);
      } finally {
        if (!aborted) setShiftInfoLoading(false);
      }
    };

    run();

    // ← ここが cleanup。後から終わった古い非同期の setState を無効化
    return () => {
      aborted = true;
    };
  }, [group_id, week_id]); // options.users は基本入れない（依存が不安定になりがち）

  return { shiftInfoLoading, shiftInfoError, shiftInfo, setShiftInfo };
};
