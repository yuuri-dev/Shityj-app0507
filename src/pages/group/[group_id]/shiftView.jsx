import React from 'react';
import { useContext, useState, useEffect } from 'react';
import styles from './shiftView.module.css';
import PageTitle from '@/components/PageTitle';

import { GroupContext } from 'src/contexts/GroupContext';
import ShiftView1_Wrapper from '@/components/ShiftView1_Wrapper';
import ShiftView2_Wrapper from '@/components/ShiftView2_Wrapper';

const NUM_DAYS = 7;
const NUM_TIME_SLOTS = 3;

const ShiftView = () => {

  const { groupName, shiftCompleted, shiftInfo } = useContext(GroupContext);
  const [activeTab, setActiveTab] = useState('tab1');
  const formatArray = Array.from({ length: NUM_DAYS }, () =>
    Array.from({ length: NUM_TIME_SLOTS }, () => [])
  );

  const [shiftCompletedWithName, setShiftCompletedWithName] =
    useState(formatArray);

  useEffect(() => {
    // console.log('shiftCompleted:', shiftCompleted);
    // console.log('shiftCompleted length:', shiftCompleted?.length);
    // console.log('shiftCompleted[0]:', shiftCompleted?.[0]);
    // console.log('shiftInfo:', shiftInfo);

    const converted = Array.from({ length: 4 }, (_, g) =>
      Array.from({ length: NUM_DAYS }, (_, i) =>
        Array.from({ length: NUM_TIME_SLOTS }, (_, j) => {
          const ids = shiftCompleted[g]?.[i]?.[j] || [];
          return ids.map((id) => shiftInfo[id]?.name || '');
        })
      )
    );

    setShiftCompletedWithName(converted);
  }, [shiftCompleted, shiftInfo]); // 依存関係
  if (
    !shiftCompleted ||
    shiftCompleted.length === 0 ||
    !Array.isArray(shiftCompleted[0])
  ) {
    console.log('shiftCompleted:', shiftCompleted);
    return (
      <p>
        !shiftCompleted || shiftCompleted.length === 0 || !Array.isArray(shiftCompleted[0]</p>
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'tab1':
        return <ShiftView1_Wrapper shiftCompletedWithName={shiftCompletedWithName} />;
      case 'tab2':
        return <ShiftView2_Wrapper shiftCompletedWithName={shiftCompletedWithName} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <PageTitle>{groupName}</PageTitle>

      <div style={{ display: 'flex', marginBottom: '1rem' }}>
        <button
          onClick={() => setActiveTab('tab1')}
          style={{
            backgroundColor: activeTab === 'tab1' ? '#51C7CC' : '#eee',
            padding: '10px',
            border: '1px solid #999',
          }}
        >
          一覧
        </button>
        <button
          onClick={() => setActiveTab('tab2')}
          style={{
            backgroundColor: activeTab === 'tab2' ? '#51C7CC' : '#eee',
            padding: '10px',
            border: '1px solid #999',
          }}
        >
          個別に見る
        </button>
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default ShiftView;
