import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ShiftOverview from '../ShiftOverview';
import ButtonBlue from '../ButtonBlue';
import { result } from 'src/hooks/result';
import SlotEditModal from '../SlotEditModal';
import { supabase } from 'src/lib/supabase_client';

const maxDateToWork = 5;
const maxHoursToWork = 8;

const EditShift = ({
  group_id,
  currentWeekId,
  shiftInfo,
  groupRequireNumberArray,
}) => {
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
  const handleSubmit = () => {
    const sendCompleted = async () => {
      try {
        if (!group_id || !currentWeekId) {
          alert('グループIDまたは週IDが取得できません');
          return;
        }
        const insertRows = [];
        editableShiftInfo.forEach((user) => {
          for (let day = 0; day < 7; day++) {
            for (let slot = 0; slot < 3; slot++) {
              if (user.shiftArray[day][slot]) {
                insertRows.push({
                  group_id,
                  week_id: currentWeekId,
                  user_id: user.id, // or user.user_id
                  day_index: day,
                  time_slot: slot,
                  is_assigned: true,
                });
              }
            }
          }
        });
        const { data, error } = await supabase
          .from('shift_completed')
          .upsert(insertRows, {
            onConflict: [
              'group_id',
              'week_id',
              'user_id',
              'day_index',
              'time_slot',
            ],
          });

        if (error) throw error;
        console.log('シフト確定データ送信成功:', data);
        alert('シフトを保存しました！');
      } catch (err) {
        console.error(err);
        alert('シフトの送信に失敗しました');
      }
    };
    sendCompleted();
  };

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
