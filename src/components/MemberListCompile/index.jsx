import React, { useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import styles from './MemberListCompile.module.css';

const index = () => {
  const { groupName, setGroupName, memberArray, setMemberArray } =
    useContext(GroupContext);

  const handleRemoveMember = (index) => {
    const updatedMembers = [...memberArray];
    updatedMembers.splice(index, 1);
    setMemberArray(updatedMembers);
  };

  return (
    <div className={styles.memberLists}>
      {memberArray.map((value, index) => {
        return (
          <div className={styles.memberList} key={index}>
            <p className={styles.memberName}>{value}</p>
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
