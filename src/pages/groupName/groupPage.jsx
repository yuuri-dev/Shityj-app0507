import React, { useContext } from 'react';
import Link from 'next/link';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import styles from './groupPage.module.css';
import ShiftOverview from '@/components/ShiftOverview';
import AddMember from '@/components/AddMember';

const GroupPage = () => {
  const { groupName, shiftInfo, setShiftInfo } = useContext(GroupContext);
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1', '2', '3'];

  const handleSubmit = () => {
    
  }
  return (
    <div>
      <PageTitle>{groupName}</PageTitle>
      <div className={styles.memberLists}>
        {shiftInfo.map((value, index) => {
          return (
            <div className={styles.memberList} key={index}>
              <p className={styles.memberName}>{value.name}</p>
            </div>
          );
        })}
      </div>
      <AddMember />
      <h2 className={styles.h2}>シフト候補者一覧</h2>
      <ShiftOverview days={days} timeSlots={timeSlots} shiftInfo={shiftInfo} />
      <Link href="addShift" className={styles.shiftEnterButton}>
        シフト入力
      </Link>
      <button onClick={() => handleSubmit} className={styles.shiftCreateButton}>シフト作成</button>
    </div>
  );
};

export default GroupPage;
