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

          <MemberEdit handleSubmitMemberSetting={handleSubmitMemberSetting} />

          <ShiftHistory />

          {/* メンバー別のシフトのモーダル */}
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />

          <CreateShiftTab
            shiftInfo={shiftInfo}
            groupRequireNumberArray={groupRequireNumberArray}
          />

          <Link
            href={{
              pathname: '/group/[group_id]/setting',
              query: { group_id }, // ← 実際のUUIDを渡す
            }}
          >
            <ButtonWhite>詳細設定</ButtonWhite>
          </Link>

          <Link
            href={{
              pathname: '/group/[group_id]/addShift',
              query: { group_id }, // ← 実際のUUIDを渡す
            }}
          >
            <ButtonWhite>シフト入力</ButtonWhite>
          </Link>
          <ButtonBlue func={(e) => handleSubmit(e)}>シフト作成</ButtonBlue>
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
