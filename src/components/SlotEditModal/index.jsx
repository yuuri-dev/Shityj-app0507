import React, { useState } from 'react';
import styles from './SlotEdit.module.css';
import { Button } from '@mui/material';

const SlotEditModal = ({
  day,
  slot,
  members,
  required,
  dayIndex,
  slotIndex,
  editableShiftInfo,
  setEditableShiftInfo,
  onClose,
}) => {
  if (!day || !slot) return null;

  // 表示中のメンバーをチェック状態で管理
  const [selectedMembers, setSelectedMembers] = useState(
    members.filter((m) => m.isAssigned).map((m) => m.name)
  );

  const toggleMember = (name) => {
    setSelectedMembers((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const handleSave = () => {
    setEditableShiftInfo((prev) => {
      const newInfo = prev.map((u) => ({ ...u }));
      newInfo.forEach((user) => {
        if (selectedMembers.includes(user.name)) {
          user.shiftArray[dayIndex][slotIndex] = true;
        } else {
          user.shiftArray[dayIndex][slotIndex] = false;
        }
      });

      return newInfo;
    });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>
          {day}曜日・{slot}コマ目
        </h3>
        <p className={styles.p}>必要人数: {required}人</p>
        <p className={styles.p}>現在の人数: {selectedMembers.length}名</p>

        <ul className={styles.ul}>
          {members
            .filter((m) => m.isDesired)
            .map((m, i) => (
              <li className={styles.memberItem} key={i}>
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(m.name)}
                  onChange={() => toggleMember(m.name)}
                />{' '}
                {m.name}
              </li>
            ))}
        </ul>

        {selectedMembers.length < required && (
          <p className={styles.alert}>⚠️ 希望者が不足しています</p>
        )}

        <div className={styles.buttonGroup}>
          <Button variant="outlined" onClick={handleSave}>
            確定
          </Button>
        </div>

        <button onClick={onClose} className={styles.button}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SlotEditModal;
