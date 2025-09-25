import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';
import PageTitle from '@/components/PageTitle';
import styles from './addShift.module.css';
import { supabase } from 'src/lib/supabase_client';

//定数
const DAYS = ['月', '火', '水', '木', '金', '土', '日'];
const TIME_SLOTS = ['午前', '午後', '夜'];

const AddShift = () => {
  const { shiftInfo, setShiftInfo } = useContext(GroupContext);

  //ローカルな変数
  const [selection, setSelection] = useState(
    Array.from({ length: DAYS.length }, () =>
      Array.from({ length: TIME_SLOTS.length }, () => false)
    )
  );
  const [timesToEnter, setTimesToEnter] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [week_start_date, setWeek_start_date] = useState('');
  const [week_finish_date, setWeek_finish_date] = useState('');

  const router = useRouter();
  const { group_id } = router.query;
  const { week_id } = router.query;

  const gid = Array.isArray(group_id) ? group_id[0] : group_id;
  const wid = Array.isArray(week_id) ? week_id[0] : week_id;

  useEffect(() => {
    const fetchDaysFromWeekId = async () => {
      try {
        const { data, error } = await supabase
          .from('weeks')
          .select('week_start_date')
          .eq('id', wid)
          .single();

        if (error) throw error;

        if (data?.week_start_date) {
          const start = new Date(data.week_start_date);
          const finish = new Date(start);
          finish.setDate(start.getDate() + 6);

          setWeek_start_date(start.toISOString().slice(0, 10)); // yyyy-mm-dd
          setWeek_finish_date(finish.toISOString().slice(0, 10));
        }
      } catch (error) {
        console.error('fetchDaysFromWeekId error:', error);
      }
    };
    if (wid) fetchDaysFromWeekId();
  }, [wid]);

  const toggleCell = (dayIndex, timeIndex) => {
    setSelection((prev) => {
      const newSel = prev.map((row) => [...row]);
      newSel[dayIndex][timeIndex] = !newSel[dayIndex][timeIndex];
      return newSel;
    });
  };

  const handleConfirm = async (e) => {
    if (selectedIndex === null) {
      alert('名前を選択して下さい。');
      return;
    }

    if (!timesToEnter || isNaN(timesToEnter) || timesToEnter <= 0) {
      alert('入りたい回数を1以上の入力してください。');
      return;
    }

    const upsertData = [];

    for (let day = 0; day < 7; day++) {
      for (let time = 0; time < 3; time++) {
        upsertData.push({
          group_id: gid,
          user_id: selectedIndex,
          week_id: wid,
          shift_index: day,
          time_slot: time,
          is_available: selection[day][time],
        });
      }
    }

    const { data, error } = await supabase
      .from('shift_preferences')
      .upsert(upsertData, {
        onConflict: [
          'user_id',
          'group_id',
          'week_id',
          'shift_index',
          'time_slot',
        ],
      });

    if (error) {
      console.error('シフト希望の保存に失敗しました', error);
      alert('シフト希望の保存に失敗しました');
      return;
    }

    setShiftInfo((prev) => {
      let newData = [...prev];

      const times = parseInt(timesToEnter, 10);
      if (isNaN(times)) {
        alert('入りたい回数が正しく入力されていません。');
        return prev;
      }
      newData[selectedIndex] = {
        ...newData[selectedIndex],
        timesToEnterDesired: times,
        shiftArray: selection,
      };
      return newData;
    });

    alert('シフト希望が確定されました。');

    e.preventDefault();
    router.push({
      pathname: '/group/[group_id]/groupPage',
      query: { group_id },
    });
  };
  if (!router.isReady) {
    return <div>Error! router is not Ready</div>;
  }
  return (
    <div className={styles.container}>
      <PageTitle>シフト入力</PageTitle>
      <p className={styles.date_p}>
        日程:{week_start_date}~{week_finish_date}
      </p>
      <p className={styles.p}>①名前を選んでください</p>
      <div className={styles.selectName}>
        {shiftInfo.map((member, index) => (
          <label key={index} className={styles.name_label}>
            <input
              type="radio"
              name="memberName"
              id={`member-${index}`}
              value={member.name}
              className={styles.radio_input}
              onChange={() => setSelectedIndex(index)}
            />
            <p className={styles.radio_input_p}>{member.name}</p>
          </label>
        ))}
      </div>
      <p className={styles.p}>②入れる時間と入りたい回数を選択してください。</p>
      <p className={styles.kome}>
        ※変更する場合も全てのシフトを入力してください。
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}></th>
            {TIME_SLOTS.map((slot, idx) => (
              <th
                key={idx}
                className={styles.th}
                style={{ padding: '4px 8px' }}
              >
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, dayIndex) => (
            <tr key={dayIndex}>
              <td className={styles.dayTitle}>{day}</td>
              {TIME_SLOTS.map((_, timeIndex) => {
                const isSelected = selection[dayIndex][timeIndex];
                return (
                  <td
                    key={timeIndex}
                    onClick={() => toggleCell(dayIndex, timeIndex)}
                    className={styles.item}
                    style={{
                      backgroundColor: isSelected ? '#4caf50' : '#fff',
                      border: '1px solid #ccc',
                      cursor: 'pointer',
                      textAlign: 'center',
                    }}
                  >
                    {isSelected ? '✓' : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={styles.innerSetting}>
        <p className={styles.settingTitle}>入りたい回数</p>
        <label className={styles['selectbox-1']}>
          <select onChange={(e) => setTimesToEnter(parseInt(e.target.value, 10))}>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>

      <ButtonBlue func={(e) => handleConfirm(e)}>確定</ButtonBlue>
      <Link
        href={{
          pathname: '/group/[group_id]/groupPage',
          query: { group_id },
        }}
      >
        <ButtonWhite>戻る</ButtonWhite>
        {/* モーダルで変更を破棄しますかと注意を出す */}
      </Link>
    </div>
  );
};

export default AddShift;
