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
import { useGroupName, useShiftInfo } from 'src/hooks/useSupabase';
import MemberEdit from '@/components/MemberEdit';
import ShiftHistory from '@/components/ShiftHistory';
import CreateShiftTab from '@/components/CreateShiftTab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TabPanel from '@/components/TabPanel';

const GroupPageShow = ({ setLoading }) => {
  const {
    groupName,
    groupRequireNumberArray,
    shiftInfo,
    setShiftCompleted,
    maxDateToWork,
    maxHoursToWork,
  } = useContext(GroupContext);

  const [selectedMember, setSelectedMember] = useState(null); // ← 追加

  const router = useRouter();
  const { group_id } = router.query;

  const loadingGroupName = useGroupName(group_id);
  const loadingShiftInfo = useShiftInfo(group_id);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loadingGroupName || loadingShiftInfo) return <Loading />;

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

    const { group_id } = router.query; // ← URLから取得（/group/[group_id]/setting の場合）

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

  return (
    <>
      {loadingGroupName || loadingShiftInfo ? (
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
            <Link
              href={{
                pathname: '/group/[group_id]/addShift',
                query: { group_id },
              }}
            >
              <ButtonWhite>シフト入力のリンク</ButtonWhite>
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
            <ShiftHistory />
          </TabPanel>

          <TabPanel value={value} index={4}>
            <p>このアプリの使い方をまとめます</p>
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
