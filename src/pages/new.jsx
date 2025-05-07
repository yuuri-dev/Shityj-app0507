import React, { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import MemberListCompile from '@/components/MemberListCompile';
import styles from './new.module.css';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';

function New() {
  const [memberName, setMemberName] = useState('');
  const { groupName, setGroupName, memberArray, setMemberArray } =
    useContext(GroupContext);

  const router = useRouter();

  const handleAddMember = useCallback(() => {
    if (!memberName) {
      return;
    }
    for (let i = 0; i < memberArray.length; i++) {
      if (memberName === memberArray[i]) {
        alert('同じ名前が既に追加されています');
        return;
      }
    }
    setMemberArray((prevArray) => {
      const newArray = [...prevArray, memberName];
      console.log(newArray); // 新しいメンバー追加後にログを出力
      return newArray;
    });
    setMemberName('');
  }, [memberName]);

  const handleCreateGroup = useCallback(
    async (e) => {
      e.preventDefault();

      router.push('/groupName/setting');

      //後で追加する

      // if (!groupName && memberArray.length <= 2) {
      //   alert(
      //     'グループ名を入力してください\nメンバーを二名以上追加してください'
      //   );
      //   return;
      // } else if (!groupName) {
      //   alert('グループ名を入力してください');
      //   return;
      // } else if (memberArray.length <= 1) {
      //   alert('メンバーを二名以上追加してください');
      //   return;
      // }

      //     try {
      //       const response = await fetch('http://localhost:5000/api/create-group', {
      //         method: 'POST',
      //         headers: {
      //           'Content-Type': 'application/json',
      //         },
      //         body: JSON.stringify({
      //           groupName,
      //           members: memberArray,
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
    [groupName, router, memberArray]
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

          <div className={styles.input_wrapper}>
            <p className={styles.p}>メンバー名</p>
            <input
              type="text"
              className={`${styles.input} ${styles.input_w70}`}
              placeholder="あおい"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            <button
              type="button"
              onClick={handleAddMember}
              className={styles.addButton}
            >
              追加
            </button>
            <MemberListCompile />
          </div>

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
