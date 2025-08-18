import React, { useState } from 'react'
import styles from './'
import ShiftOverview from '../ShiftOverview';
import SlotDetailModal from '../SlotDetails';

const CreateShiftTab = ({shiftInfo, groupRequireNumberArray}) => {
    const days = ['月', '火', '水', '木', '金', '土', '日'];
    const timeSlots = ['1', '2', '3'];
    const [selectedSlotInfo, setSelectedSlotInfo] = useState(null);
    
  return (
    <div>
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
    </div>
  );
}

export default CreateShiftTab