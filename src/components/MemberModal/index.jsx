import { GroupContext } from 'src/contexts/GroupContext';
import styles from './MemberModal.module.css';
import { useContext } from 'react';

const MemberModal = ({ member, onClose }) => {
  const { shiftInfo } = useContext(GroupContext);
  if (member === null) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3>{shiftInfo[member].name} さんの詳細</h3>
        <p>最大勤務日数: {shiftInfo[member].timesToEnterDesired}</p>
        <button onClick={onClose}>閉じる</button>
      </div>
    </div>
  );
};

export default MemberModal;
