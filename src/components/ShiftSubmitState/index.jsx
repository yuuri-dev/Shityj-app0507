import Link from 'next/link';
import React, { useState } from 'react';
import styles from './ShiftSubmitState.module.css';
import { Button } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Check } from '@mui/icons-material';

const ShiftSubmitState = ({ submitStatus, recruitingWeeksArray, group_id }) => {
  const [openWeeks, setOpenWeeks] = useState({});
  const [isCopied, setIsCopied] = useState(false);

  const toggleWeek = (weekId) => {
    setOpenWeeks((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }));
  };
  const handleCopy = async (week_id) => {
    const week_url = `${window.location.origin}/group/${group_id}/weeks/${week_id}/addShift`;
    try {
      await navigator.clipboard.writeText(week_url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>シフト提出状況</h2>
      {submitStatus.map((week, i) => {
        const isOpen = openWeeks[week.weekId] ?? false;
        return (
          <div key={week.weekId} className={styles.grid_item}>
            <h3 className={styles.date} onClick={() => toggleWeek(week.weekId)}>
              {recruitingWeeksArray[i].week_start_date}〜
              {recruitingWeeksArray[i].week_start_date}
              {/* 終了日に変更 */}
              {isOpen ? ' ▼' : ' ◀︎'}
            </h3>
            {isOpen && (
              <div>
                <Button>
                  <Link
                    href={{
                      pathname: '/group/[group_id]/weeks/[week_id]/addShift',
                      query: { group_id, week_id: week.weekId },
                    }}
                    className={styles.container}
                  >
                    <p className={styles.list}>シフト入力ページへ</p>
                  </Link>
                </Button>
                <Button onClick={() => handleCopy(week.weekId)}>
                  {isCopied ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <ContentCopyIcon className="w-4 h-4" />
                  )}
                </Button>
                {isCopied && <p>コピーしました</p>}
                <ul>
                  {week.users.map((user) => (
                    <li key={user.user_id} className={styles.list}>
                      {user.name} :{' '}
                      {user.hasSubmitted ? '✅ 提出済み' : '❌ 未提出'}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ShiftSubmitState;
