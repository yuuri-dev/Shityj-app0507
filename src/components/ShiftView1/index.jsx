import React from 'react'
import { useContext } from 'react';
import { GroupContext } from 'src/contexts/GroupContext';
import PageTitle from '@/components/PageTitle';
import styles from './shiftView1.module.css';

const ShiftView1 = ({shiftCompletedWithName}) => {
      const { groupName, shiftCompleted } = useContext(GroupContext);
    
  return (
    <div className={styles.contents}>
          <PageTitle>{groupName}</PageTitle>
          <h2 className={styles.h2}>シフト作成成功！</h2>
    
          
    
          <table border="1">
            <thead>
              <tr>
                <th>日 / 時間</th>
                {shiftCompletedWithName  &&
                  shiftCompletedWithName .length > 0 &&
                  shiftCompletedWithName [0].map((_, timeIndex) => (
                    <th key={timeIndex}>時間 {timeIndex + 1}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {shiftCompletedWithName &&
                shiftCompletedWithName.map((dayRow, dayIndex) => (
                  <tr key={dayIndex}>
                    <td>{dayIndex + 1}日 </td>
                    {dayRow.map((slot, timeIndex) => (
                      <td key={timeIndex}>
                        {slot.length > 0 ? slot.join(', ') : 'なし'}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
  )
}

export default ShiftView1