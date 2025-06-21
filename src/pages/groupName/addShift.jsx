import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import ButtonBlue from '@/components/ButtonBlue';
import ButtonWhite from '@/components/ButtonWhite';
import PageTitle from '@/components/PageTitle';
import styles from './addShift.module.css';

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

  const router = useRouter();

  //関数
  const toggleCell = (dayIndex, timeIndex) => {
    setSelection((prev) => {
      const newSel = prev.map((row) => [...row]); //分割代入
      newSel[dayIndex][timeIndex] = !newSel[dayIndex][timeIndex];
      return newSel;
    });
  };

  const handleConfirm = (e) => {
    if (selectedIndex === null) {
      alert('名前を選択して下さい。');
      return;
    }

    if (!timesToEnter || isNaN(timesToEnter) || timesToEnter <= 0) {
      alert('入りたい回数を1以上で入力してください。');
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
    router.push('groupPage');
  };

  return (
    <div className={styles.container}>
      <PageTitle>シフト入力</PageTitle>
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
      <div className={styles.enterTimesContainer}>
        <p className={styles.enterTimesTitle}>入りたい回数</p>
        <input
          type="number"
          value={timesToEnter}
          className={styles.enterTimesInput}
          onChange={(e) => setTimesToEnter(parseInt(e.target.value))}
        />
      </div>

      <ButtonBlue func={(e) => handleConfirm(e)}>確定</ButtonBlue>
      <Link href="groupPage">
        <ButtonWhite>戻る</ButtonWhite>
        {/* モーダルで変更を破棄しますかと注意を出す */}
      </Link>
    </div>
  );
};

export default AddShift;
