import React, { useCallback, useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './new.module.css';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import AddMember from '@/components/AddMember';

import { supabase } from 'src/lib/supabase_client';
import Login from '@/components/Login';

function New() {
  const { groupName, setGroupName, shiftInfo, setShiftInfo } =
    useContext(GroupContext);

  const [isLoginModal, setIsLoginModal] = useState(false);

  const router = useRouter();

  const handleCreateGroup = useCallback(
    async (e) => {
      e.preventDefault();

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

      const { data: existingGroups, error: fetchError } = await supabase
        .from('groups')
        .select('group_id')
        .eq('group_name', groupName);

      if (fetchError) {
        alert('グループ確認中にエラーが発生しました');
        console.error(fetchError);
        return;
      }

      if (existingGroups.length > 0) {
        alert('そのグループ名はすでに使われています');
        return;
      }

      const { data, error } = await supabase
        .from('groups')
        .insert([{ group_name: groupName }]);

      if (error) {
        alert('supabaseでエラー');
        console.log(error);
      } else {
        console.log(data);
      }

      //URL
      const { data: groupData, fetch_uuid_error } = await supabase
        .from('groups')
        .select('group_id')
        .eq('group_name', groupName)
        .single();

      if (fetch_uuid_error) {
        console.log('error');
        console.log(fetch_uuid_error);
      }
      const groupId = groupData?.group_id;

      router.push(`/group/${groupId}/setting`);
    },
    [groupName, router, shiftInfo]
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
          <AddMember />

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
      {isLoginModal && (
        <Login setIsLoginModal={setIsLoginModal} setGroupName={setGroupName} />
      )}
    </div>
  );
}

export default New;
