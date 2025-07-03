import React, { useContext, useState } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import AddMember from '@/components/AddMember';
import RequiredNumberSetting from '@/components/RequiredNumberSetting';
import { useRouter } from 'next/router';
import PageTitle from '@/components/PageTitle';
import ButtonBlue from '@/components/ButtonBlue';
import styles from './setting.module.css';
import { supabase } from 'src/lib/supabase_client';
import Loading from '@/components/Loading';

const Setting = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  

  const {
    groupName,
    setGroupName,
    groupRequireNumberArray,
    maxDateToWork,
    setMaxDateToWork,
    maxHoursToWork,
    setMaxHoursToWork,
  } = useContext(GroupContext);

  const handleSetDetail = async (e) => {
    e.preventDefault();
    const { group_id } = router.query;

    setIsLoading(true);

    if (!group_id) {
      alert('グループIDが見つかりません');
      setIsLoading(false);
      return;
    }

    const insertData = [];

    for (let day = 0; day < 7; day++) {
      for (let timeSlot = 0; timeSlot < 3; timeSlot++) {
        const required_staff_number = groupRequireNumberArray[day][timeSlot];
        insertData.push({
          group_id,
          day,
          time_slot: timeSlot,
          required_staff_number,
        });
      }
    }

    const { error } = await supabase
      .from('shift_requirement')
      .upsert(insertData, {
        onConflict: ['group_id', 'day', 'time_slot'],
      });

    if (error) {
      console.error('一括保存失敗:', error);
      alert('保存に失敗しました');
      setIsLoading(false);
      return;
    }
    setIsLoading(false);
    router.push({ pathname: './groupPage', query: { group_id } });
  };

  return (
    <>
      {isLoading ? (
        <Loading/>
      ) : (
        <div className={styles.contents}>
          <PageTitle>シフト詳細設定</PageTitle>
          <div className={styles.nameSettings}>
            <h2 className={styles.h2}>グループ情報を変更・追加してください</h2>
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

          <h2 className={styles.h2}>
            曜日・時間ごとに必要な人数を設定してください。
          </h2>
          <RequiredNumberSetting />

          <div className={styles.border}></div>

          <div className={styles.settingMax}>
            <h2 className={styles.h2}>
              連続で勤務できる日数の指定、１日で勤務できる時間の最大値を設定してください。
            </h2>
            <p className={styles.p}>連続勤務制限</p>
            <input
              type="number"
              value={maxDateToWork}
              className={styles.input}
              onChange={(e) => setMaxDateToWork(e.target.value)}
            />
            <p className={styles.p}>１日の最大勤務時間</p>
            <input
              type="number"
              className={styles.input}
              value={maxHoursToWork}
              onChange={(e) => setMaxHoursToWork(e.target.value)}
            />
          </div>

          <ButtonBlue func={(e) => handleSetDetail(e)}>決定</ButtonBlue>
        </div>
      )}{' '}
    </>
  );
};

export default Setting;
