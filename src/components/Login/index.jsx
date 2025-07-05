// Login.jsx
import React, { useState } from 'react';
import styles from './Login.module.css';

const Login = ({ setIsLoginModal }) => {
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }
    // ログイン処理（今回は名前のみ）
    console.log('ログインユーザー:', name);
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
