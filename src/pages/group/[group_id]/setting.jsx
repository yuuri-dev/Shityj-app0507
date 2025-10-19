import React, { useState } from 'react';
import RequiredNumberSetting from '@/components/RequiredNumberSetting';
import { useRouter } from 'next/router';
import PageTitle from '@/components/PageTitle';
import ButtonBlue from '@/components/ButtonBlue';
import styles from './setting.module.css';
import { supabase } from 'src/lib/supabase_client';
import Loading from '@/components/Loading';
import ShiftDatePicker from '@/components/ShiftDatePicker';

const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

const Setting = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const [start_date, setStart_date] = useState('');
  const [finish_date, setFinish_date] = useState('');
  const [error, setError] = useState('');

  const [groupRequireNumberArray, setGroupRequireNumberArray] = useState(
    Array.from({ length: NUM_DAYS }, () => Array(NUM_TIME_SLOTS).fill(0))
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!start_date) {
      alert('日付を選んでください');
      return;
    }
    const { group_id } = router.query;

    try {
      setIsLoading(true);

      if (!group_id) {
        alert('グループIDが見つかりません');
        setIsLoading(false);
        return;
      }

      //weeksをsupabaseに送信
      const week_id = crypto.randomUUID();
      const created_at = new Date();

      const { error: weeksError } = await supabase.from('weeks').insert({
        id: week_id,
        created_at,
        group_id,
        week_start_date: start_date,
        status: 'recruiting',
      });
      if (weeksError) {
        console.error('weeksの保存失敗:', weeksError);
        alert('保存に失敗しました');
        setIsLoading(false);
        return;
      }

      //shift_requirementをsupabaseに送信
      const shift_requirement_data = [];

      for (let day = 0; day < 7; day++) {
        for (let timeSlot = 0; timeSlot < 3; timeSlot++) {
          const required_staff_number = groupRequireNumberArray[day][timeSlot];
          shift_requirement_data.push({
            group_id,
            day,
            time_slot: timeSlot,
            required_staff_number,
            week_id,
          });
        }
      }

      const { error: requirementError } = await supabase
        .from('shift_requirement')
        .upsert(shift_requirement_data, {
          onConflict: ['group_id', 'week_id', 'day', 'time_slot'],
        });

      if (requirementError) {
        console.error('必要人数の保存失敗:', requirementError);
        alert('保存に失敗しました');
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.error(err);
      alert('予期せぬエラーが発生しました');
    } finally {
      setIsLoading(false);
    }

    router.push({ pathname: './groupPage', query: { group_id } });
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className={styles.container}>
          <PageTitle>シフト新規作成</PageTitle>

          <div className={styles.page_description_container}>
            <p className={styles.page_description}>
              週ごとの新しいシフトを作成するページです。
            </p>
            <p className={styles.page_description}>
              作成する週の開始日と必要な人数を設定してください。
            </p>
          </div>

          <div className={styles.form_content}></div>
          <h2 className={styles.h2}>
            ①作成するシフトの日にちを入力してください。
          </h2>
          <div>
            <div className={styles.shiftDatePicker}>
              <ShiftDatePicker
                setWeek_start_date={setStart_date}
                setWeek_finish_date={setFinish_date}
                error={error}
                setError={setError}
              />
            </div>
          </div>
          <div className={styles.form_content}>
            <h2 className={styles.h2}>
              ②曜日・時間ごとに必要な人数を設定してください。
            </h2>
            <RequiredNumberSetting
              groupRequireNumberArray={groupRequireNumberArray}
              setGroupRequireNumberArray={setGroupRequireNumberArray}
            />
          </div>

          {/* 週ごとの修正をやめてグループで一つ設定する */}
          {/* <div className={styles.form_content}>
            <h2 className={styles.h2}>
              ③連続で勤務できる日数の指定、１日で勤務できる時間の最大値を設定してください。
            </h2>
            <p className={styles.p}>連続勤務制限</p>
            <input
              type="number"
              value={maxDateToWork}
              className={styles.input}
              onChange={(e) => setMaxDateToWork(e.target.value)}
            />
            <p className={styles.p}>
              １日の最大勤務時間（現在のバージョンでは考慮されません）
            </p>
            <input
              type="number"
              className={styles.input}
              value={maxHoursToWork}
              onChange={(e) => setMaxHoursToWork(e.target.value)}
            />
          </div> */}

          <ButtonBlue func={(e) => handleSubmit(e)}>決定</ButtonBlue>
        </div>
      )}{' '}
    </>
  );
};

export default Setting;
