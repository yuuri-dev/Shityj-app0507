import React, { useState } from 'react';
import MemberListCompile from '@/components/MemberListCompile';
import useHandleAddMember from '../../hooks/useHandleAddMember';
import styles from './AddMember.module.css';

const AddMember = () => {
  const [memberName, setMemberName] = useState('');
  const useAddMember = useHandleAddMember();

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
          onClick={() => useAddMember(memberName, setMemberName)}
        >
          追加
        </button>
      </div>

      <MemberListCompile />
    </div>
  );
};

export default AddMember;
