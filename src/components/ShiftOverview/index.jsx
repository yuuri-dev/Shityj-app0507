import React from 'react';
import styles from './ShiftOverview.module.css';

const ShiftOverview = ({ days, timeSlots, shiftCandidates }) => {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table>
        <thead>
          <tr>
            <th></th>
            {days.map((day, colIndex) => (
              <th key={colIndex}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map((slot, rowIndex) => (
            <tr key={rowIndex}>
              <td>{slot}</td>
              {days.map((_, colIndex) => {
                const candidates = shiftCandidates[colIndex]?.[rowIndex] || [];
                return (
                  <td key={colIndex}>
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
      </table>
    </div>
  );
};

export default ShiftOverview;
