import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import styles from './groupPage.module.css';
import ShiftOverview from '@/components/ShiftOverview';
import AddMember from '@/components/AddMember';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';
import { useRouter } from 'next/router';


const GroupPageShow = ({setLoading}) => {
  const { groupName, shiftInfo, setShiftInfo } = useContext(GroupContext);
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1', '2', '3'];

  const router = useRouter();

  const fakeAsyncTask = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000); // 将来的にはここを本物の処理に差し替え
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await fakeAsyncTask(); // 非同期処理が終わるまで待つ

    setLoading(false);
    router.push('shiftView');
  };

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

      <Link href="addShift">
        <ButtonWhite>シフト入力</ButtonWhite>
      </Link>
      <ButtonBlue func={(e) => handleSubmit(e)}>シフト作成</ButtonBlue>
    </div>
  );
};

const Loading = () => {
  return (
    <div>
      ...計算中
    </div>
  )
}

const GroupPage = () => {
  const [isLoading, setLoading] = useState(false);
  return (
    <>{isLoading ? <Loading /> : <GroupPageShow setLoading={setLoading} />}</>
  );
  
}

export default GroupPage;
