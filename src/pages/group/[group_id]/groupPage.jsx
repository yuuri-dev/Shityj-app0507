import React, {useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './groupPage.module.css';

import PageTitle from '@/components/PageTitle';
import MemberModal from '@/components/MemberModal';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';
import Loading from '@/components/Loading';

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
import { useShiftInfo } from 'src/hooks/useShiftInfo';
import { useGroupData } from 'src/hooks/useGroupData';

const maxDateToWork = 8;
const maxHoursToWork = 5;

const GroupPageShow = ({ setLoading }) => {
  const router = useRouter();
  const { group_id } = router.query;

  const [groupName, setGroupName] = useState('');
  const loadingGroupName = useGroupName(group_id, groupName, setGroupName); //グループ名取得

  const [selectedMember, setSelectedMember] = useState(null);
  const [value, setValue] = useState(0); //タブ用

  const {
    loading: loadingGroupData,
    error: groupDataError,
    recruitingWeeks,
    currentWeekId,
    setCurrentWeekId,
    groupMembers,
    setGroupMembers,
    usersRows,
    submitStatus,
    groupRequireNumberArray,
  } = useGroupData(group_id);

  const { shiftInfoLoading, shiftInfoError, shiftInfo, setShiftInfo } =
    useShiftInfo(group_id, currentWeekId, { users: usersRows });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSubmitMemberSetting = async (e) => {
    e.preventDefault();

    if (!group_id) {
      alert('グループIDが取得できません');
      return;
    }

    const groupMemberToUpdate = groupMembers.map((name, index) => ({
      name: name,
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
              recruitingWeeksArray={recruitingWeeks}
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
            <MemberEdit
              handleSubmitMemberSetting={handleSubmitMemberSetting}
              groupMembers={groupMembers}
              setGroupMembers={setGroupMembers}
            />
          </TabPanel>

          <TabPanel value={value} index={2}>
            <CreateShiftTab
              shiftInfo={shiftInfo}
              groupRequireNumberArray={groupRequireNumberArray}
            />
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
