import React, { useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import styles from './MemberListCompile.module.css';

const index = () => {
  const {shiftInfo, setShiftInfo } =
    useContext(GroupContext);

  const handleRemoveMember = (index) => {
    const updatedMembers = [...shiftInfo];
    updatedMembers.splice(index, 1);
    setShiftInfo(updatedMembers);
  };

  return (
    <div className={styles.memberLists}>
      {shiftInfo.map((value, index) => {
        return (
          <div className={styles.memberList} key={index}>
            <p className={styles.memberName}>{value.name}</p>
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
  );
};

export default index;
