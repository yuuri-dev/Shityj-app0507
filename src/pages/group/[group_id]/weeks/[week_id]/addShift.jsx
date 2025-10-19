import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';
import PageTitle from '@/components/PageTitle';
import styles from './addShift.module.css';
import { supabase } from 'src/lib/supabase_client';

//定数
const DAYS = ['月', '火', '水', '木', '金', '土', '日'];
const TIME_SLOTS = ['午前', '午後', '夜'];

const AddShift = () => {
  //ローカルな変数
  const [selection, setSelection] = useState(
    Array.from({ length: DAYS.length }, () =>
      Array.from({ length: TIME_SLOTS.length }, () => false)
    )
  );
  const [groupMembers, setGroupMembers] = useState([]);
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
    const fetchGroupMember = async () => {
      try {
        if (!gid) return;
        const { data, error } = await supabase
          .from('users_table')
          .select('name', 'user_id')
          .eq('group_id', gid);

        if (error) throw error;

        setGroupMembers(data.map((m) => m.name));
      } catch (err) {
        console.error(err);
      }
    };

    fetchGroupMember();
  }, [gid]);

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

  const handleReset = () => {
    const initial = Array.from({ length: DAYS.length }, () =>
      Array(TIME_SLOTS.length).fill(false)
    );
    setSelection(initial);
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

    for (let day = 0; day < DAYS.length; day++) {
      for (let time = 0; time < TIME_SLOTS.length; time++) {
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

    alert('シフト希望が確定されました。');

    e.preventDefault();
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
        {groupMembers.map((member, index) => (
          <label key={index} className={styles.name_label}>
            <input
              type="radio"
              name="memberName"
              id={`member-${index}`}
              value={member}
              className={styles.radio_input}
              onChange={() => setSelectedIndex(index)}
            />
            <p className={styles.radio_input_p}>{member}</p>
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
      <ButtonWhite func={handleReset}>変更をリセットする</ButtonWhite>

      <div className={styles.innerSetting}>
        <p className={styles.settingTitle}>入りたい回数</p>
        <label className={styles['selectbox-1']}>
          <select
            onChange={(e) => setTimesToEnter(parseInt(e.target.value, 10))}
          >
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
    </div>
  );
};

export default AddShift;
