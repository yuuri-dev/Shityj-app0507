// Login.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';
import { supabase } from 'src/lib/supabase_client';
import { useRouter } from 'next/router';

const Login = ({ setIsLoginModal, setGroupName }) => {
    const [name, setName] = useState('');
    const router = useRouter();

  const handleLogin = async () => {
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }

      const { data, error } = await supabase
          .from("groups")
          .select("group_id")
          .eq("group_name", name)
      .single()
      
          if (error) {
            alert('グループ確認中にエラーが発生しました');
            console.error(error);
            return;
          }

          else if (!data) {
            alert('グループが存在しません。もう一度入力してください。');
            return;
          }
          
          else {
              setGroupName(name)
            router.push(`/group/${data.group_id}/groupPage`);
      }
          
      
    setIsLoginModal(false);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>ログイン</h2>
        <input
          type="text"
          className={styles.input}
          placeholder="名前を入力"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className={styles.buttons}>
          <button className={styles.loginButton} onClick={handleLogin}>
            ログイン
          </button>
          <button
            className={styles.cancelButton}
            onClick={() => setIsLoginModal(false)}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
