import React from 'react';
import styles from './SlotDetail.module.css';

const SlotDetailModal = ({ day, slot, members, required, onClose }) => {
  if (!day || !slot) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>
          {day}曜日・{slot}コマ目の詳細
        </h3>
        <p className={styles.p}>必要人数: {required}人</p>
        <p className={styles.p}>希望者: {members.length}名</p>

        <ul className={styles.ul}>
          {members.map((m, i) => (
            <li className={styles.memberItem} key={i}>
              - {m.name}
            </li>
          ))}
        </ul>

        {members.length < required && (
          <p className={styles.alert}>⚠️ 希望者が不足しています</p>
        )}

        <button onClick={onClose} className={styles.button}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default SlotDetailModal;
