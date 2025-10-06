import React, { useState } from 'react';
import styles from './AddMember.module.css';

const AddMember = ({ groupMembers, setGroupMembers }) => {
  const [memberName, setMemberName] = useState('');

  const handleAddMember = () => {
    const trimmedName = memberName.trim();
    // 空白チェック
    if (!trimmedName) {
      alert('名前を入力してください');
      return;
    }

    // 重複チェック
    if (groupMembers.includes(trimmedName)) {
      alert('同じ名前が既に存在します');
      return;
    }
    setGroupMembers((prev) => [...prev, memberName]);
    setMemberName('')
  };

  const handleRemoveMember = (index) => {
    const updatedMembers = [...groupMembers];
    updatedMembers.splice(index, 1);
    setGroupMembers(updatedMembers);
  };

  return (
    <div className={styles.input_wrapper}>
      <p className={styles.p}>メンバー名</p>
      <div className={styles.contents}>
        <input
          type="text"
          className={`${styles.input} ${styles.input_w70}`}
          placeholder="あおい"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
        />
        <button
          type="button"
          className={styles.addButton}
          onClick={handleAddMember}
        >
          追加
        </button>
      </div>

      {/* シフト削除 */}
      <div className={styles.memberLists}>
        {groupMembers.map((memberName, index) => {
          return (
            <div className={styles.memberList} key={index}>
              <p className={styles.memberName}>{memberName}</p>
              <span
                onClick={() => handleRemoveMember(index)}
                className={styles.removeButton}
              >
                ×
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AddMember;
