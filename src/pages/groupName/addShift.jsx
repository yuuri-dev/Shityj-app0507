import React, { useContext, useState } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';

const DAYS = ['月', '火', '水', '木', '金', '土', '日'];
const TIME_SLOTS = ['午前', '午後', '夜'];

const AddShift = () => {
  const [selection, setSelection] = useState(
    Array.from({ length: DAYS.length }, () =>
      Array.from({ length: TIME_SLOTS.length }, () => false)
    )
  );
  const { shiftCandidates, setShiftCandidates } = useContext(GroupContext);

  const [confirmed, setConfirmed] = useState(null);
  const [name, setName] = useState('');

  const toggleCell = (dayIndex, timeIndex) => {
    setSelection(prev => {
      const newSel = prev.map(row => [...row]);
      newSel[dayIndex][timeIndex] = !newSel[dayIndex][timeIndex];
      return newSel;
    });
  };

  const handleConfirm = () => {
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }

    const newCandidates = shiftCandidates.map((daySlots, dayIdx) =>
      daySlots.map((slot, timeIdx) => {
        return selection[dayIdx][timeIdx]
          ? [...slot, name]
          : slot;
      })
    );

    setShiftCandidates(newCandidates);
    setConfirmed(selection);
    alert('シフト希望が確定されました。');
  };

  return (
    <div>
      <h2>シフト入力</h2>
      <input
        type="text"
        placeholder="名前を入力"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th></th>
            {TIME_SLOTS.map((slot, idx) => (
              <th key={idx} style={{ padding: '4px 8px' }}>{slot}</th>
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
                      textAlign: 'center'
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
      <button onClick={handleConfirm} style={{ marginTop: '16px' }}>確定</button>

      {confirmed && (
        <div style={{ marginTop: '16px' }}>
          <h4>送信されたデータ：</h4>
          <pre>{JSON.stringify(confirmed, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default AddShift;
