
import React from 'react';
import { useContext, useState, useEffect } from 'react';
import styles from './shiftView.module.css';
import PageTitle from '@/components/PageTitle';

import { GroupContext } from 'src/contexts/GroupContext';
import ShiftView1 from '@/components/ShiftView1';

const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;


const ShiftView = () => {
  const { groupName, shiftCompleted, shiftInfo } = useContext(GroupContext);

  const formatArray = Array.from({ length: NUM_DAYS }, () =>
    Array.from({ length: NUM_TIME_SLOTS }, () => [])
  );

  const [shiftCompletedWithName, setShiftCompletedWithName] =
    useState(formatArray);

  useEffect(() => {
    // shiftCompletedとshiftInfoがそろっているときだけ処理
    if (
      !shiftCompleted ||
      !Array.isArray(shiftCompleted) ||
      !shiftInfo ||
      shiftCompleted.length === 0
    ) {
      return;
    }

    const converted = Array.from({ length: NUM_DAYS }, (_, i) =>
      Array.from({ length: NUM_TIME_SLOTS }, (_, j) => {
        const ids = shiftCompleted[i]?.[j] || [];
        return ids.map((id) => shiftInfo[id]?.name || '');
      })
    );

    setShiftCompletedWithName(converted);
  }, [shiftCompleted, shiftInfo]); // 依存関係
  if (
    !shiftCompleted ||
    shiftCompleted.length === 0 ||
    !Array.isArray(shiftCompleted[0])
  ) {
    console.log('shiftCompleted:', shiftCompleted);
    return <p>読み込み中...</p>;
  }

  return (
    <div>
      <PageTitle>{groupName}</PageTitle>
      <h2 className={styles.h2}>シフト作成成功！</h2>
      <ShiftView1 shiftCompletedWithName={shiftCompletedWithName} />
    </div>
  );
};

export default ShiftView;
