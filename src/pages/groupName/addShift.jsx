import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';

//定数
const DAYS = ['月', '火', '水', '木', '金', '土', '日'];
const TIME_SLOTS = ['午前', '午後', '夜'];

const AddShift = () => {
  
  const { shiftInfo, setShiftInfo } =
    useContext(GroupContext);

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

  const changeTimesToEnter = (e) => {
    setTimesToEnter(Number(e.target.value));
  };

  const handleConfirm = (e) => {
    if (selectedIndex === null) {
      alert('名前を選択して下さい。');
      return;
    }

    setShiftInfo((prev) => {
      let newData = [...prev];
      newData[selectedIndex].timesToEnterDesired = timesToEnter;
      newData[selectedIndex].shiftArray = selection
      return newData;
    });

    alert('シフト希望が確定されました。');

    e.preventDefault();
    router.push('groupPage');
  };

  return (
    <div>
      <h2>シフト入力</h2>
      <div style={{ marginBottom: '10px' }}>
        <p>名前を選択してください：</p>
        {shiftInfo.map((member, index) => (
          <label key={index} style={{ marginRight: '10px' }}>
            <input
              type="radio"
              name="memberName"
              id={`member-${index}`}
              value={member.name}
              onChange={() => setSelectedIndex(index)}
            />
            {member.name}
          </label>
        ))}
      </div>
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th></th>
            {TIME_SLOTS.map((slot, idx) => (
              <th key={idx} style={{ padding: '4px 8px' }}>
                {slot}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DAYS.map((day, dayIndex) => (
            <tr key={dayIndex}>
              <td>{day}</td>
              {TIME_SLOTS.map((_, timeIndex) => {
                const isSelected = selection[dayIndex][timeIndex];
                return (
                  <td
                    key={timeIndex}
                    onClick={() => toggleCell(dayIndex, timeIndex)}
                    style={{
                      width: 60,
                      height: 30,
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
      <p>入りたい回数</p>
      <input
        type="number"
        value={timesToEnter}
        onChange={(e) => changeTimesToEnter(e)}
      />
      <button onClick={(e) => handleConfirm(e)} style={{ marginTop: '16px' }}>
        確定
      </button>
      <Link href="groupPage">戻る</Link>
    </div>
  );
};

export default AddShift;
