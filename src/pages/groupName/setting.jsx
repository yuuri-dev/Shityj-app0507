import React, { useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import MemberListCompile from '@/components/MemberListCompile';
import RequiredNumberSetting from '@/components/RequiredNumberSetting';
import { useRouter } from 'next/router';
import PageTitle from '@/components/PageTitle';

const Setting = () => {
  const router = useRouter()
  const {
    groupName,
    setGroupName,
    memberArray,
    setMemberArray,
    groupRequireNumberArray,
    setGroupRequireNumberArray,
    maxDateToWork,
    setMaxDateToWork,
    maxHoursToWork,
    setMaxHoursToWork
  } = useContext(GroupContext);
  
  const handleSetDetail = (e) => {
    e.preventDefault();
    router.push("./groupPage")
  }

  return (
    <div>
      <PageTitle>シフト詳細設定</PageTitle>
      <div>
        <p>グループ名</p>
        <input
          type="text"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <p>メンバー</p>
        <span>あとからの追加・削除も可能です</span>
        <MemberListCompile />
      </div>

      <RequiredNumberSetting />
      <p>連続勤務制限</p>
      <input type="number" onChange={(e) => setMaxDateToWork(e.target.value)} />
      <p>１日の最大勤務時間</p>
      <input type="number" onChange={(e) => setMaxHoursToWork(e.target.value)} />
      <button onClick={handleSetDetail}>決定</button>
    </div>
  );
};

export default Setting;
