import React, { useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import AddMember from '@/components/AddMember';
import RequiredNumberSetting from '@/components/RequiredNumberSetting';
import { useRouter } from 'next/router';
import PageTitle from '@/components/PageTitle';
import ButtonBlue from '@/components/ButtonBlue';
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
      <div className={styles.nameSettings}>
        <p className={styles.p}>グループ名</p>
        <input
          type="text"
          value={groupName}
          className={styles.groupNameInput}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <AddMember />
      </div>

      <div className={styles.border}></div>
      <h2 className={styles.h2}>シフト必要人数を設定する</h2>

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
      <ButtonBlue func={(e) => handleSetDetail(e)}>決定</ButtonBlue>
    </div>
  );
};

export default Setting;
