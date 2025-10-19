import React from 'react';
import styles from './MemberEdit.module.css';
import AddMember from '../AddMember';

const MemberEdit = ({handleSubmitMemberSetting,groupMembers,setGroupMembers}) => {
  return (
    <div className={styles.memberListsWrapper}>
      <div className={styles.AddMemberWrapper}>
        <AddMember
          groupMembers={groupMembers}
          setGroupMembers={setGroupMembers}
        />
        <div className={styles.updateButtonWrapper}>
          <button
            className={styles.updateButton}
            onClick={handleSubmitMemberSetting}
          >
            <img src="/restart.png" alt="更新" className={styles.icon} />
            更新
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberEdit;
