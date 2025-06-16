import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import styles from './groupPage.module.css';
import ShiftOverview from '@/components/ShiftOverview';
import AddMember from '@/components/AddMember';
import MemberModal from '@/components/MemberModal';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';

import { result } from 'src/hooks/result';

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

  const router = useRouter();

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

  return (
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
        </div>
      )}

      <MemberModal
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />

      <div className={styles.border}></div>

      <h2 className={styles.h2}>シフト候補者一覧</h2>
      <ShiftOverview days={days} timeSlots={timeSlots} shiftInfo={shiftInfo} />
      <Link href="setting">
        <ButtonWhite>詳細設定</ButtonWhite>
      </Link>
      <Link href="addShift">
        <ButtonWhite>シフト入力</ButtonWhite>
      </Link>
      <ButtonBlue func={(e) => handleSubmit(e)}>シフト作成</ButtonBlue>
    </div>
  );
};

const GroupPage = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>{isLoading ? <Loading /> : <GroupPageShow setLoading={setLoading} />}</>
  );
};

export default GroupPage;
