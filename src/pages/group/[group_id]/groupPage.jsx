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

const GroupPageShow = ({ setLoading }) => {
  const {
    groupName,
    groupRequireNumberArray,
    shiftInfo,
    setShiftCompleted,
    maxDateToWork,
    maxHoursToWork,
  } = useContext(GroupContext);

  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1', '2', '3'];
  const [isMemberCompiler, setIsMemberCompiler] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null); // ← 追加
  const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);

  const router = useRouter();
  const { group_id } = router.query;

  const loadingGroupName = useGroupName(group_id);
  const loadingShiftInfo = useShiftInfo(group_id);

  const handleCompileMember = () => {
    setIsMemberCompiler((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 最初に止める
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
      await router.push('./shiftView');
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
          <div className={styles.memberListsWrapper}>
            <p className={styles.memberListTitle}>メンバーリスト</p>
            <div className={styles.memberLists}>
              {shiftInfo.map((value, index) => {
                return (
                  <div
                    className={styles.memberList}
                    key={index}
                    onClick={() => setSelectedMember(index)}
                  >
                    <p className={styles.memberName}>{value.name}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.toggle_wrapper}>
            <p className={styles.toggle_p}>メンバーを編集</p>
            <label className={styles.toggle_button_1}>
              <input type="checkbox" onClick={handleCompileMember} />
            </label>
          </div>

          {isMemberCompiler && (
            <div className={styles.AddMemberWrapper}>
              <AddMember />
              <button onClick={handleSubmitMemberSetting}>更新</button>
            </div>
          )}

          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />

          <div className={styles.border}></div>

          <h2 className={styles.h2}>シフト候補者一覧</h2>
          <ShiftOverview
            days={days}
            timeSlots={timeSlots}
            shiftInfo={shiftInfo}
            groupRequireNumberArray={groupRequireNumberArray}
            onClickSlot={(dayIndex, slotIndex, members, required) => {
              setSelectedSlotInfo({
                day: days[dayIndex],
                slot: timeSlots[slotIndex],
                members,
                required,
              });
            }}
          />
          {selectedSlotInfo && (
            <SlotDetail
              day={selectedSlotInfo.day}
              slot={selectedSlotInfo.slot}
              members={selectedSlotInfo.members}
              required={selectedSlotInfo.required}
              onClose={() => setSelectedSlotInfo(null)}
            />
          )}
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
