import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase_client';
import styles from './ShiftHistory.module.css';

const ShiftHistory = ({ group_id }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchWeeks = async () => {
      const { data, error } = await supabase
        .from('weeks')
        .select('*')
        .eq('group_id', group_id)
        .order('week_start_date', { ascending: false }); // 週の新しい順に並べる

      if (error) {
        console.error('取得エラー:', error);
      } else {
        console.log('weeks データ:', data);
        setHistory(data);
      }
    };
    if (group_id) fetchWeeks();
  }, [group_id]);

  return (
    <div className={styles.container}>
      <p className={styles.discription}>
        日付をクリックしてそれぞれの週の情報を見ることができます。
      </p>
      {history.length === 0 ? (
        <p>データがありません</p>
      ) : (
        <div>
          <div className={styles.week_item}>
            <p>日付</p>
            <p>シフト状況</p>
          </div>

          {history.map((item) => (
            <div key={item.id} className={styles.week_item}>
              <Link
                href={`/group/${group_id}/weeks/${item.id}`}
                className={styles.start_date}
              >
                <p>{item.week_start_date}</p>
              </Link>
              <p>{item.status == 'recruiting' ? '募集中' : '完成済み'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShiftHistory;
