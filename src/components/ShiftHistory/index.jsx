import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase_client';

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
    <div>
      <h2>履歴</h2>
      {history.length === 0 ? (
        <p>データがありません</p>
      ) : (
        history.map((item) => (
          <div key={item.id}>
            <Link href={`/${item.id}`}>
              <p className="text-blue-500 underline cursor-pointer">
                {item.week_start_date}
              </p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default ShiftHistory;
