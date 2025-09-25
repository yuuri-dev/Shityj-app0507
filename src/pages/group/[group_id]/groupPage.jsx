import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GroupContext } from 'src/contexts/GroupContext';
import styles from './groupPage.module.css';

import PageTitle from '@/components/PageTitle';
import ShiftOverview from '@/components/ShiftOverview';
import AddMember from '@/components/AddMember';
import MemberModal from '@/components/MemberModal';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';
import Loading from '@/components/Loading';
import SlotDetail from '@/components/SlotDetails';

import { result } from 'src/hooks/result';
import { supabase } from 'src/lib/supabase_client';
import { useGroupName } from 'src/hooks/useSupabase';
import MemberEdit from '@/components/MemberEdit';
import ShiftHistory from '@/components/ShiftHistory';
import CreateShiftTab from '@/components/CreateShiftTab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@/components/TabPanel';
import UsageGuide from '@/components/UsageGuide';
import ShiftSubmitState from '@/components/ShiftSubmitState';

const GroupPageShow = ({ setLoading }) => {
  const {
    groupName,
    groupRequireNumberArray,
    shiftInfo,
    setShiftCompleted,
    maxDateToWork,
    maxHoursToWork,
  } = useContext(GroupContext);

  const router = useRouter();
  const { group_id } = router.query;

  const loadingGroupName = useGroupName(group_id);

  const [selectedMember, setSelectedMember] = useState(null); // ← 追加
  const [value, setValue] = useState(0); //タブ用
  const [recruitingWeeksArray, setRecruitingWeeksArray] = useState([]);
  const [submitStatus, setSubmitStatus] = useState([]);

  useEffect(() => {
    //あとでhooksに書き出す
    const fetchRecruitingWeeks = async () => {
      if (!group_id) return;
      const { data, error } = await supabase
        .from('weeks')
        .select('*')
        .eq('group_id', group_id)
        .eq('status', 'recruiting');

      if (error) {
        console.log('error: ' + error);
      } else {
        console.log(data);
        setRecruitingWeeksArray(data);
      }
    };
    fetchRecruitingWeeks();
  }, [group_id]);

  useEffect(() => {
    const fetchUsersWithSubmitStatus = async () => {
      if (!group_id || recruitingWeeksArray.length === 0) return;

      // (1) ユーザー一覧を取得
      const { data: users, error: usersError } = await supabase
        .from('users_table')
        .select('user_id, name')
        .eq('group_id', group_id);

      if (usersError) {
        console.error('users fetch error:', usersError.message);
        return;
      }

      // (2) recruiting週のid一覧を取得
      const weekIds = recruitingWeeksArray.map((w) => w.id);

      const results = [];

      for (const weekId of weekIds) {
        // (3) その週に提出された shift_preferences を取得
        const { data: prefs, error: prefsError } = await supabase
          .from('shift_preferences')
          .select('user_id')
          .eq('group_id', group_id)
          .eq('week_id', weekId);

        if (prefsError) {
          console.error(
            `prefs fetch error for week ${weekId}:`,
            prefsError.message
          );
          continue;
        }

        // (4) user ごとに提出有無を判定
        const result = users.map((user) => {
          const hasSubmitted = prefs.some((p) => p.user_id === user.user_id);
          return {
            ...user,
            weekId,
            hasSubmitted, // true = 提出済み, false = 未提出
          };
        });

        results.push({
          weekId,
          users: result,
        });
      }
      setSubmitStatus(results);
      console.log(results);
    };

    fetchUsersWithSubmitStatus();
  }, [group_id, recruitingWeeksArray]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 2秒待つ（setTimeoutをPromise化）
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const shiftData = await result(
        groupRequireNumberArray,
        shiftInfo,
        maxDateToWork,
        maxHoursToWork
      );

      setShiftCompleted(shiftData);
      await router.push(`/group/${group_id}/shiftView`);
    } catch (error) {
      console.error('エラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitMemberSetting = async (e) => {
    e.preventDefault();

    if (!group_id) {
      alert('グループIDが取得できません');
      return;
    }

    const groupMemberToUpdate = shiftInfo.map((member, index) => ({
      name: member.name,
      user_id: index, // グループ内の番号（0,1,2...）
      group_id: group_id,
    }));

    const { data, error } = await supabase
      .from('users_table')
      .upsert(groupMemberToUpdate, {
        onConflict: ['group_id', 'user_id'], // グループ内番号が一意
      });

    if (error) {
      console.error('メンバー追加失敗:', error);
      alert('メンバーの追加に失敗しました');
    } else {
      console.log('追加成功:', data);
      alert('メンバーを追加しました');
    }
  };
  if (loadingGroupName) return <Loading />;

  return (
    <>
      {loadingGroupName ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <PageTitle>{groupName}</PageTitle>

          <Box sx={{ width: '100%' }}>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="Top" />
              <Tab label="メンバー編集" />
              <Tab label="シフト作成" />
              <Tab label="履歴" />
              <Tab label="使い方" />
            </Tabs>
          </Box>

          {/* 各タブの中身 */}
          <TabPanel value={value} index={0}>
            {/* メンバー別のシフトのモーダル */}
            <ShiftSubmitState
              submitStatus={submitStatus}
              recruitingWeeksArray={recruitingWeeksArray}
              group_id={group_id}
            />
            <MemberModal
              member={selectedMember}
              onClose={() => setSelectedMember(null)}
            />

            <Link
              href={{
                pathname: '/group/[group_id]/setting',
                query: { group_id },
              }}
            >
              <ButtonWhite>新しいシフトを作成</ButtonWhite>
            </Link>
          </TabPanel>

          <TabPanel value={value} index={1}>
            <MemberEdit handleSubmitMemberSetting={handleSubmitMemberSetting} />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <CreateShiftTab
              shiftInfo={shiftInfo}
              groupRequireNumberArray={groupRequireNumberArray}
            />
            <ButtonBlue func={handleSubmit}>シフト作成</ButtonBlue>
          </TabPanel>

          <TabPanel value={value} index={3}>
            <ShiftHistory group_id={group_id} />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <UsageGuide />
          </TabPanel>
        </div>
      )}
    </>
  );
};

const GroupPage = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>{isLoading ? <Loading /> : <GroupPageShow setLoading={setLoading} />}</>
  );
};

export default GroupPage;
