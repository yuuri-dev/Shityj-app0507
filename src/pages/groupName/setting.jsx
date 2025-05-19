import React, { useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import AddMember from '@/components/AddMember';
import RequiredNumberSetting from '@/components/RequiredNumberSetting';
import { useRouter } from 'next/router';
import PageTitle from '@/components/PageTitle';
import styles from "./setting.module.css"

const Setting = () => {
  const router = useRouter()
  const {
    groupName,
    setGroupName,
    maxDateToWork,
    setMaxDateToWork,
    maxHoursToWork,
    setMaxHoursToWork
  } = useContext(GroupContext);
  
  const handleSetDetail = (e) => {
    e.preventDefault();
    router.push("./groupPage")
  }

  return (
    <div className={styles.contents}>
      <PageTitle>シフト詳細設定</PageTitle>
      <div>
        <p className={styles.p}>グループ名</p>
        <input
          type="text"
          value={groupName}
          className={styles.groupNameInput}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <AddMember />
      </div>

      <RequiredNumberSetting />
      <p className={styles.p}>連続勤務制限</p>
      <input
        type="number"
        className={styles.input}
        onChange={(e) => setMaxDateToWork(e.target.value)}
      />
      <p className={styles.p}>１日の最大勤務時間</p>
      <input
        type="number"
        className={styles.input}
        onChange={(e) => setMaxHoursToWork(e.target.value)}
      />
      <button className={styles.button} onClick={handleSetDetail}>
        決定
      </button>
    </div>
  );
};

export default Setting;
