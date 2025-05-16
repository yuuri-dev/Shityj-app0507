import React, { useContext } from 'react';
import Link from 'next/link';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import styles from './groupPage.module.css';
import ShiftOverview from '@/components/ShiftOverview';

const GroupPage = () => {
  const {
    groupName,
    setGroupName,
    shiftInfo,
    setShiftInfo,
  } = useContext(GroupContext);
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = [
    '1',
    '2',
    '3',
  ];


  return (
    <div>
      <PageTitle>{groupName}</PageTitle>
      <div className={styles.memberLists}>
        {shiftInfo.map((value, index) => {
          return (
            <div className={styles.memberList} key={index}>
              <p className={styles.memberName}>{value.name}</p>
              <span
                onClick={() => handleRemoveMember(index)}
                className={styles.removeButton}
              >
                ×
              </span>
            </div>
          );
        })}

        <ShiftOverview
          days={days}
          timeSlots={timeSlots}
          shiftInfo={shiftInfo}
        />
      </div>
      <Link href="addShift">シフト入力</Link>
    </div>
  );
};

export default GroupPage;
