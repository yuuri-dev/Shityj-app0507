import React, { useRef, useState } from 'react';
import styles from './ShiftView1.module.css';
import html2pdf from 'html2pdf.js';
import html2canvas from 'html2canvas';
import ShiftView1Contents from '../ShiftView1Contents';

const ShiftView1 = ({ shiftCompletedWithName }) => {
  const shiftRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  //エラーチェック　消してもいい
  if (
    !shiftCompletedWithName || // 配列じゃない or null
    !Array.isArray(shiftCompletedWithName) ||
    shiftCompletedWithName.length === 0 || // 空配列
    !Array.isArray(shiftCompletedWithName[0]) || // 中身の構造も要チェック
    shiftCompletedWithName.some((group) => !Array.isArray(group)) // 全て配列か？
  ) {
    // データ形式が違う時はここで止めて表示する
    return (
      <p>シフト情報の形式が正しくありません。管理者に連絡してください。</p>
    );
  }


  const totalPages = shiftCompletedWithName.length;
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

  const numTimeSlots = shiftCompletedWithName[currentIndex]?.[0]?.length || 0;

  return (
    <div className={styles.contents}>
      <h2 className={styles.h2}>シフト表</h2>

      <button onClick={handleDownloadPDF} className={styles.downloadBtn}>
        PDFをダウンロード
      </button>
      <button onClick={handleDownloadImage} className={styles.downloadBtn}>
        画像で保存
      </button>
      <div ref={shiftRef} className={styles.tableWrapper}>
        <ShiftView1Contents
          value={shiftCompletedWithName[currentIndex]}
          outputIndex={currentIndex}
          numTimeSlots={numTimeSlots}
        />
      </div>

      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentIndex((prev) => prev - 1)}
          disabled={currentIndex === 0}
        >
          &lt; &lt;
        </button>
        <span>
          案 {currentIndex + 1} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentIndex((prev) => prev + 1)}
          disabled={currentIndex === totalPages - 1}
        >
          &gt; &gt;
        </button>
      </div>
    </div>
  );
};

export default ShiftView1;
