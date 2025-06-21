import React, { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new.module.css';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import AddMember from '@/components/AddMember';


function New() {
  const {
    groupName,
    setGroupName,
    shiftInfo,
    setShiftInfo,
  } = useContext(GroupContext);

  const router = useRouter();



  const handleCreateGroup = useCallback(
    (e) => {
      e.preventDefault();

      router.push('/groupName/setting');

      //バリデーション

      if (!groupName && shiftInfo.length <= 2) {
        alert(
          'グループ名を入力してください\nメンバーを二名以上追加してください'
        );
        return;
      } else if (!groupName) {
        alert('グループ名を入力してください');
        return;
      } else if (shiftInfo.length <= 1) {
        alert('メンバーを二名以上追加してください');
        return;
      }

      //     try {
      //       const response = await fetch('http://localhost:5000/api/create-group', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //           groupName,
      //           members: shiftInfo.name,
      //         }),
      //       });

      //       if (response.ok) {
      //         console.log('グループ送信成功！');
      //        // router.push('/groupName/setting');
      //       } else {
      //         console.error('送信失敗:', response.status);
      //         alert('送信に失敗しました');
      //       }
      //     } catch (error) {
      //       console.error('通信エラー:', error);
      //       alert('サーバーに接続できませんでした');
      //     }
    },
    [groupName, router, shiftInfo]
  );

  return (
    <div className={styles.page}>
      <PageTitle>グループ作成</PageTitle>
      <div className={styles.main}>
        <form action="post" className={styles.form}>
          <div className={styles.input_wrapper}>
            <p className={styles.p}>グループ名</p>
            <input
              type="text"
              className={`${styles.input} ${styles.input_w80}`}
              placeholder="七輪房"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>
          <AddMember />

          <button
            type="button"
            className={styles.createButton}
            onClick={handleCreateGroup}
          >
            グループ作成
          </button>
        </form>
      </div>
    </div>
  );
}

export default New;
