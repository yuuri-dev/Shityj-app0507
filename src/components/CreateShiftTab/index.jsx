import React, { useState } from 'react';
import styles from './CreateShiftTab.module.css';
import ShiftOverview from '../ShiftOverview';
import SlotDetailModal from '../SlotDetails';
import { Button } from '@mui/material';
import PageTitle from '../PageTitle';
import EditShift from '../EditShift';

//shiftINfoに頼らないように変更する
const CreateShiftTab = ({ shiftInfo, groupRequireNumberArray }) => {
  const days = ['月', '火', '水', '木', '金', '土', '日'];
  const timeSlots = ['1', '2', '3'];
  const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  return (
    <div>
      <PageTitle>シフト作成ページ</PageTitle>
      <Button variant="outlined" onClick={() => setIsEdit((prev) => !prev)}>
        {isEdit ? '閲覧モードへ' : '編集モードへ'}
      </Button>

      {isEdit ? (
        <EditShift
          shiftInfo={shiftInfo}
          groupRequireNumberArray={groupRequireNumberArray}
        />
      ) : (
        <>
          <h2 className={styles.h2}>シフト候補者一覧</h2>
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
        </>
      )}
    </div>
  );
};

export default CreateShiftTab;
