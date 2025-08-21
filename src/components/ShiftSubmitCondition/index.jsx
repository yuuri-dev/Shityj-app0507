import React, { useState, useEffect } from 'react';
import { supabase } from 'src/lib/supabase_client';
import MemberModal from '../MemberModal';

const ShiftSubmitCondition = () => {
  const [selectedMember, setSelectedMember] = useState(null);
  const [latestWeekStart, setLatestWeekStart] = useState(null);
  const [submittedUsers, setSubmittedUsers] = useState([]);
  const [notSubmittedUsers, setNotSubmittedUsers] = useState([]);

  useEffect(() => {
    const fetchShiftStatus = async () => {
      // 1. 最新の週を取得
      const { data: latestWeekData, error: weekError } = await supabase
        .from('shift_preferences')
        .select('week_start_date')
        .order('week_start_date', { ascending: false })
        .limit(1)
        .single();

      if (weekError || !latestWeekData) {
        console.error('週の取得エラー:', weekError);
        return;
      }

      const weekStart = latestWeekData.week_start_date;
      setLatestWeekStart(weekStart);

      // 2. その週のユーザーごとの提出状況を取得
      const { data: prefs, error: prefsError } = await supabase
        .from('shift_preferences')
        .select('user_id, is_submitted, users_table(name)')
        .eq('week_start_date', weekStart)
        .order('user_id', { ascending: true });

      if (prefsError) {
        console.error('提出状況取得エラー:', prefsError);
        return;
      }

      const submitted = [];
      const notSubmitted = [];

      prefs.forEach((p) => {
        const nameWithId = `${p.users_table.name} (${p.user_id})`;
        if (p.is_submitted) submitted.push(nameWithId);
        else notSubmitted.push(nameWithId);
      });

      setSubmittedUsers(submitted);
      setNotSubmittedUsers(notSubmitted);
    };

    fetchShiftStatus();
  }, []);

  if (!latestWeekStart) return <p>読み込み中...</p>;

  // 週の終了日を計算
  const weekEnd = new Date(latestWeekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  const formatDate = (d) =>
    `${d.getFullYear()}/${('0' + (d.getMonth() + 1)).slice(-2)}/${(
      '0' + d.getDate()
    ).slice(-2)}`;

  return (
    <div>
      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
      <h2>
        {formatDate(new Date(latestWeekStart))} ~ {formatDate(weekEnd)} のシフト
      </h2>
      <h3>シフト提出状況</h3>
      <div>
        <p>提出済み</p>
        {submittedUsers.map((name, i) => (
          <p key={i}>{name}</p>
        ))}
      </div>
      <div>
        <p>未提出</p>
        {notSubmittedUsers.map((name, i) => (
          <p key={i}>{name}</p>
        ))}
      </div>
    </div>
  );
};

export default ShiftSubmitCondition;
