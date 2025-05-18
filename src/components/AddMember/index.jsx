import React, { useState } from 'react'
import MemberListCompile from '@/components/MemberListCompile';
import useHandleAddMember from "../../fooks/useHandleAddMember"
import styles from "./AddMember.module.css"


const AddButton = () => {
    const [memberName, setMemberName] = useState('');
    const useAddMember = useHandleAddMember();
    
  return (
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
        onClick={() => useAddMember(memberName, setMemberName)}
        className={styles.addButton}
      >
        追加
      </button>
      <MemberListCompile />
    </div>
  );
}

export default AddButton