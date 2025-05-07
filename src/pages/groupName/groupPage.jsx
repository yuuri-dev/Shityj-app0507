import React, { useContext } from 'react';
import Link from 'next/link';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import styles from './groupPage.module.css';
import ShiftOverview from '@/components/ShiftOverview';

const GroupPage = () => {
  const { groupName, setGroupName, memberArray, setMemberArray } =
    useContext(GroupContext);
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = [
    '1限（9:00〜10:30）',
    '2限（10:45〜12:15）',
    '3限（13:15〜14:45）',
  ];

  const shiftData = [
    ['山田, 佐藤', '佐藤', '', '', '田中', '', '佐藤'],
    ['山田', '', '佐藤, 鈴木', '', '', '', ''],
    ['', '', '鈴木', '山田', '', '', '田中'],
  ];

  return (
    <div>
      <PageTitle>{groupName}</PageTitle>
      <div className={styles.memberLists}>
        {memberArray.map((value, index) => {
          return (
            <div className={styles.memberList} key={index}>
              <p className={styles.memberName}>{value}</p>
              <span
                onClick={() => handleRemoveMember(index)}
                className={styles.removeButton}
              >
                ×
              </span>
            </div>
          );
        })}

        <ShiftOverview days={days} timeSlots={timeSlots} shiftData={shiftData} />
      </div>
      <Link href="addShift">シフト入力</Link>
    </div>
  );
};

export default GroupPage;
