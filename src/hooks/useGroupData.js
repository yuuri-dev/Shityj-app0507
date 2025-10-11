import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from 'src/lib/supabase_client';

export const useGroupData = (group_id) => {
  const router = useRouter();

  const [loadingInitialData, setLoadingInitialData] = useState(true);
  const [error, setError] = useState(null);

  const [recruitingWeeks, setRecruitingWeeks] = useState([]);
  const [currentWeekId, setCurrentWeekId] = useState('');

  // 表示用の名前配列（['田中', ...]）
  const [groupMembers, setGroupMembers] = useState([]);
  // users_tableの行（使い回し用）
  const [usersRows, setUsersRows] = useState([]);

  const [submitStatus, setSubmitStatus] = useState([]);
  const [groupRequireNumberArray, setGroupRequireNumberArray] = useState(
    Array.from({ length: 7 }, () => Array(3).fill(0))
  );

  // 初期取得：募集中の週 + メンバー
  useEffect(() => {
    const fetchInitial = async () => {
      if (!router.isReady || !group_id) return;
      setLoadingInitialData(true);
      setError(null);

      try {
        const [weeksRes, usersRes] = await Promise.all([
          supabase
            .from('weeks')
            .select('*')
            .eq('group_id', group_id)
            .eq('status', 'recruiting')
            .order('week_start_date', { ascending: true }),
          supabase
            .from('users_table')
            .select('user_id, name,times_to_enter_desired')
            .eq('group_id', group_id),
        ]);

        if (weeksRes.error) throw weeksRes.error;
        if (usersRes.error) throw usersRes.error;

        const weeks = weeksRes.data || [];
        const users = usersRes.data || [];

        setRecruitingWeeks(weeks);
        setUsersRows(users);
        setGroupMembers(users.map((u) => u.name));

        if (!currentWeekId && weeks.length > 0) {
          setCurrentWeekId(weeks[0].id);
        }

        // 提出状況
        const results = [];
        for (const w of weeks) {
          const { data: prefs, error: prefsError } = await supabase
            .from('shift_preferences')
            .select('user_id')
            .eq('group_id', group_id)
            .eq('week_id', w.id);

          if (prefsError) {
            console.error('prefs error:', prefsError);
            continue;
          }

          const usersWithStatus = users.map((user) => ({
            ...user,
            weekId: w.id,
            hasSubmitted: (prefs || []).some((p) => p.user_id === user.user_id),
          }));

          results.push({ weekId: w.id, users: usersWithStatus });
        }
        setSubmitStatus(results);
      } catch (e) {
        console.error('useGroupData initial error:', e);
        setError(e);
      } finally {
        setLoadingInitialData(false);
      }
    };

    fetchInitial();
  }, [router.isReady, group_id]);

  // 現在週の必要人数（7×3）
  useEffect(() => {
    const fetchRequirements = async () => {
      if (!router.isReady || !group_id || !currentWeekId) return;

      try {
        const { data, error } = await supabase
          .from('shift_requirement')
          .select('*')
          .eq('group_id', group_id)
          .eq('week_id', currentWeekId);

        if (error) throw error;

        const matrix = Array.from({ length: 7 }, () => Array(3).fill(0));
        for (const r of data || []) {
          if (r.day >= 0 && r.day < 7 && r.time_slot >= 0 && r.time_slot < 3) {
            matrix[r.day][r.time_slot] = r.required_staff_number;
          }
        }
        setGroupRequireNumberArray(matrix);
      } catch (e) {
        console.error('requirement error:', e);
        setError(e);
      }
    };

    fetchRequirements();
  }, [router.isReady, group_id, currentWeekId]);

  return {
    loadingInitialData,
    error,
    recruitingWeeks,
    currentWeekId,
    setCurrentWeekId,
    groupMembers,
    setGroupMembers,
    usersRows, // ← useShiftInfoに渡す用に追加
    submitStatus,
    groupRequireNumberArray,
  };
};
