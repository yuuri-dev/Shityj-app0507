import React from 'react';
import styles from './ShiftOverview.module.css';

const ShiftOverview = ({ days, timeSlots, shiftCandidates }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      {/* <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.headerCell}></th>
            {days.map((day, colIndex) => (
              <th key={colIndex} className={styles.headerCell}>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={rowIndex}>
              <td className={styles.timeCell}>{slot}</td>
              {days.map((_, colIndex) => {
                const candidates = shiftCandidates[rowIndex]?.[colIndex] || [];
                return (
                  <td key={colIndex} className={styles.cell}>
                    {candidates.length > 0
                      ? candidates.map((name, idx) => (
                          <div key={idx}>{name}</div>
                        ))
                      : 'ー'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default ShiftOverview;
