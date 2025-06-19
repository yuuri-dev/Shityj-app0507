import React, { useRef } from 'react';
import styles from './ShiftView1.module.css';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';

const ShiftView1 = ({ shiftCompletedWithName }) => {
  const shiftRef = useRef();

  //shiftRef部分をpdfで保存する処理
  const handleDownloadPDF = () => {
    const element = shiftRef.current;
    html2pdf().from(element).save('shift.pdf');
  };

  const handleDownloadImage = async () => {
    const element = shiftRef.current;
    const canvas = await html2canvas(element);
    const dataURL = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'shift.png';
    link.click();
  };

  if (!shiftCompletedWithName || shiftCompletedWithName.length === 0) {
    return <p>シフト情報がありません。</p>;
  }

  const numTimeSlots = shiftCompletedWithName[0]?.length || 0;

  return (
    <div className={styles.contents}>
      <h2 className={styles.h2}>シフト表</h2>

      <button onClick={handleDownloadPDF} className={styles.downloadBtn}>
        PDFをダウンロード
      </button>
      <button onClick={handleDownloadImage}>画像で保存</button>
      <div ref={shiftRef} className={styles.tableWrapper}>
        {shiftCompletedWithName.map((value) => {
          return (
            <table className={styles.table}>
              <thead>
                <tr className={styles.tr}>
                  <th>日 / 時間</th>
                  {Array.from({ length: numTimeSlots }, (_, i) => (
                    <th key={i}>時間 {i + 1}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {value.map((dayRow, dayIndex) => {
                  return (
                    <tr key={dayIndex}>
                      <td>{dayIndex + 1}日</td>
                      {dayRow.map((slot, timeIndex) => {
                        return (
                          <td key={timeIndex}>
                            {Array.isArray(slot) && slot.length > 0
                              ? slot.join(', ')
                              : 'なし'}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
      </div>
    </div>
  );
};

export default ShiftView1;
