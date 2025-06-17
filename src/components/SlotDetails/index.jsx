// components/SlotDetail.js
import React from 'react';
import styles from './SlotDetail.module.css'; // スタイル別ファイルにするとスッキリします

const SlotDetail = ({ day, slot, members, required }) => {
  if (!day || !slot) return null;

  return (
    <div className={styles.wrapper}>
      <p>
        🗓 日時: {day}・{slot}コマ目
      </p>
      <p>👥 希望者: {members.length}名</p>
      <ul>
        {members.map((m, i) => (
          <li key={i}>- {m.name}</li>
        ))}
      </ul>
      <p>🧩 必要人数: {required}人</p>
      {members.length > required && (
        <p className={styles.alert}>⚠️ 注意: 希望者が多いので調整が必要です</p>
      )}
    </div>
  );
};

export default SlotDetail;
