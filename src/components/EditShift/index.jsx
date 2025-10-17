import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShiftOverview from '../ShiftOverview';
import SlotDetailModal from '../SlotDetails';
import ButtonBlue from '../ButtonBlue';
import { result } from 'src/hooks/result';

const EditShift = ({ shiftInfo, groupRequireNumberArray }) => {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1', '2', '3'];
  const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);
  const [editableShiftInfo, setEditableShiftInfo] = useState(shiftInfo);

  const handleCreateAuto = () => {
    const run = async () => {
      try {
        const shiftData = await result(
          groupRequireNumberArray,
          shiftInfo,
          maxDateToWork,
          maxHoursToWork
        );

        if (!shiftData) throw Error;
        editableShiftInfo(shiftData[0]);//いったん仮で0番目のシフトに確定
      } catch (err) {
        console.error(err);
      }
    };
    run();
  };
  const handleClear = () => {};
  const handle = () => {};
  const handleSubmit = () => {};

  useEffect(() => {
    setEditableShiftInfo(shiftInfo);
  }, [shiftInfo]);
  return (
    <div>
      <Button onClick={handleClear}>白紙にする</Button>
      <Button onClick={handle}>候補者で埋める</Button>
      <Button onClick={handleCreateAuto}>自動で作成する</Button>

      <ShiftOverview
        days={days}
        timeSlots={timeSlots}
        shiftInfo={shiftInfo}
        groupRequireNumberArray={groupRequireNumberArray}
        onClickSlot={(dayIndex, slotIndex, members, required) => {
          setSelectedSlotInfo({
            day: days[dayIndex],
            slot: timeSlots[slotIndex],
            members,
            required,
          });
        }}
      />
      {selectedSlotInfo && (
        <SlotDetailModal
          day={selectedSlotInfo.day}
          slot={selectedSlotInfo.slot}
          members={selectedSlotInfo.members}
          required={selectedSlotInfo.required}
          onClose={() => setSelectedSlotInfo(null)}
        />
      )}

      <ButtonBlue func={handleSubmit}>シフト作成</ButtonBlue>
    </div>
  );
};

export default EditShift;
