import { GroupContext } from 'src/contexts/GroupContext';
import styles from './MemberModal.module.css';
import { useContext } from 'react';

const MemberModal = ({ member, onClose }) => {
  const { shiftInfo } = useContext(GroupContext);
  if (member === null) return null;

  const userInfo = shiftInfo[member];
  const DAYS = ['月', '火', '水', '木', '金', '土', '日'];
  const NUM_TIME_SLOTS = userInfo.desired?.[0]?.length || 3;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.h3}>{shiftInfo[member].name} さんの詳細</h3>
        
        <h4 className={styles.h4}>希望シフト表</h4>
        <table className={styles.desiredTable}>
          <thead>
            <tr>
              <th></th>
              {DAYS.map((day, i) => (
                <th key={i}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: NUM_TIME_SLOTS }, (_, timeIndex) => (
              <tr key={timeIndex}>
                <td>{timeIndex + 1}</td>
                {Array.from({ length: 7 }, (_, dayIndex) => (
                  <td key={dayIndex}>
                    <p className={styles.checkItem}>
                      {userInfo.shiftArray?.[dayIndex]?.[timeIndex] ? '○' : ''}
                    </p>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.p}>
          希望勤務日数: {shiftInfo[member].timesToEnterDesired}
        </p>
        <button className={styles.button} onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default MemberModal;
