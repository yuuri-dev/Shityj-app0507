import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new.module.css';
import { supabase } from 'src/lib/supabase_client';
import PageTitle from '@/components/PageTitle';
import AddMember from '@/components/AddMember';
import Login from '@/components/Login';

function New() {
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  const [isLoginModal, setIsLoginModal] = useState(false);

  const router = useRouter();

  const handleCreateGroup = useCallback(
    async (e) => {
      e.preventDefault();
      //バリデーション
      if (!groupName && groupMembers.length <= 2) {
        alert(
          'グループ名を入力してください\nメンバーを二名以上追加してください'
        );
        return;
      } else if (!groupName) {
        alert('グループ名を入力してください');
        return;
      } else if (groupMembers.length <= 1) {
        alert('メンバーを二名以上追加してください');
        return;
      }

      //すでにグループが存在しているかチェック
      const { data: existingGroup, error: fetchError } = await supabase
        .from('groups')
        .select('group_name')
        .eq('group_name', groupName);

      if (fetchError) {
        alert('グループ確認中にエラーが発生しました');
        console.error(fetchError);
        return;
      }
      if (existingGroup.length > 0) {
        alert('そのグループ名はすでに使われています');
        return;
      }

      // グループ新規作成
      const { data, error } = await supabase
        .from('groups')
        .insert([{ group_name: groupName }])
        .select('group_id')
        .single();

      if (error) {
        console.error('グループ作成エラー:', error);
        alert('グループ作成に失敗しました');
        return;
      }

      const groupId = data?.group_id;

      //グループメンバーをDBに追加
      if (groupMembers.length > 0) {
        const membersData = groupMembers.map((name, index) => ({
          group_id: groupId,
          user_id: index,
          name,
        }));

        const { error: membersError } = await supabase
          .from('users_table')
          .insert(membersData);

        if (membersError) {
          console.error('メンバー登録失敗:', membersError);
        }
      }

      router.push(`/group/${groupId}/groupPage`);
    },
    [groupName, router, groupMembers]
  );

  return (
    <div className={styles.page}>
      <PageTitle>グループ作成/ログイン</PageTitle>
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
          <AddMember setGroupMembers={setGroupMembers} />

          <button
            type="button"
            className={styles.createButton}
            onClick={handleCreateGroup}
          >
            グループ作成
          </button>
          <button
            type="button"
            className={styles.createButton}
            onClick={() => setIsLoginModal(true)}
          >
            作成済みの方はこちら
          </button>
        </form>
      </div>
      {isLoginModal && <Login setIsLoginModal={setIsLoginModal} />}
    </div>
  );
}

export default New;
