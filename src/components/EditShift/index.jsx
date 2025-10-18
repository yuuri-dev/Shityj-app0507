import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShiftOverview from '../ShiftOverview';
import ButtonBlue from '../ButtonBlue';
import { result } from 'src/hooks/result';
import SlotEditModal from '../SlotEditModal';

const maxDateToWork = 5;
const maxHoursToWork = 8;

const EditShift = ({ shiftInfo, groupRequireNumberArray }) => {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1', '2', '3'];
  const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);
  const [editableShiftInfo, setEditableShiftInfo] = useState(
    shiftInfo.map((user) => ({
      ...user,
      shiftArray: user.shiftArray.map((row) => [...row]),
    }))
  ); //編集するshiftInfo

  const convertResultToShiftInfo = (resultData, baseShiftInfo) => {
    // baseShiftInfoの構造をコピー
    const newShiftInfo = baseShiftInfo.map((user) => ({
      ...user,
      shiftArray: Array.from({ length: 7 }, () => Array(3).fill(false)),
    }));

    // resultData[day][slot] に含まれる userIndex を true に設定
    for (let day = 0; day < resultData.length; day++) {
      for (let slot = 0; slot < resultData[day].length; slot++) {
        const assignedUsers = resultData[day][slot];
        for (const userIndex of assignedUsers) {
          if (newShiftInfo[userIndex]) {
            newShiftInfo[userIndex].shiftArray[day][slot] = true;
          }
        }
      }
    }

    return newShiftInfo;
  };

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
        const newEditShift = convertResultToShiftInfo(
          shiftData[0],
          editableShiftInfo
        );
        setEditableShiftInfo(newEditShift); //いったん仮で0番目のシフトに確定
      } catch (err) {
        console.error(err);
      }
    };
    run();
  };
  const handleClear = () => {
    // ✅ 全セルをfalseに戻す
    const cleared = editableShiftInfo.map((user) => ({
      ...user,
      shiftArray: Array.from({ length: 7 }, () => Array(3).fill(false)),
    }));
    setEditableShiftInfo(cleared);
  };

  const handleAllMember = () => {
    const cloned = shiftInfo.map((user) => ({
      ...user,
      shiftArray: user.shiftArray.map((row) => [...row]), // 2次元配列もコピー
    }));
    setEditableShiftInfo(cloned);
    console.log(editableShiftInfo);
  };

  const handleSelect = (dayIndex, slotIndex) => {
    const allMembers = shiftInfo.map((user, userIndex) => {
      const isDesired = user.shiftArray[dayIndex][slotIndex]; // 希望者ならtrue
      const isAssigned =
        editableShiftInfo[userIndex]?.shiftArray[dayIndex][slotIndex] || false;
      return {
        name: user.name,
        isDesired,
        isAssigned, // 確定シフトに入ってるならtrue
      };
    });
    const required = groupRequireNumberArray?.[dayIndex]?.[slotIndex] ?? 0;

    setSelectedSlotInfo({
      day: days[dayIndex],
      slot: timeSlots[slotIndex],
      dayIndex,
      slotIndex,
      members: allMembers,
      required,
    });
  };
  const handleSubmit = () => {};

  useEffect(() => {
    const cloned = shiftInfo.map((user) => ({
      ...user,
      shiftArray: user.shiftArray.map((row) => [...row]),
    }));
    setEditableShiftInfo(cloned);
  }, [shiftInfo]);

  return (
    <div>
      <Button onClick={handleClear}>白紙にする</Button>
      <Button onClick={handleAllMember}>候補者で埋める</Button>
      <Button onClick={handleCreateAuto}>自動で作成する</Button>

      <ShiftOverview
        days={days}
        timeSlots={timeSlots}
        shiftInfo={editableShiftInfo}
        groupRequireNumberArray={groupRequireNumberArray}
        onClickSlot={handleSelect}
      />

      {selectedSlotInfo && (
        <SlotEditModal
          day={selectedSlotInfo.day}
          slot={selectedSlotInfo.slot}
          dayIndex={selectedSlotInfo.dayIndex}
          slotIndex={selectedSlotInfo.slotIndex}
          members={selectedSlotInfo.members}
          required={selectedSlotInfo.required}
          editableShiftInfo={editableShiftInfo}
          setEditableShiftInfo={setEditableShiftInfo}
          onClose={() => setSelectedSlotInfo(null)}
        />
      )}

      <ButtonBlue func={handleSubmit}>シフト作成</ButtonBlue>
    </div>
  );
};

export default EditShift;
