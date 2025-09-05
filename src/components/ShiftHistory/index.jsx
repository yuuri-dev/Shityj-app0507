import React, { useEffect } from 'react';

const ShiftHistory = (group_id) => {
  useEffect(() => {
    const fetchWeeks = async () => {
      const { data, error } = await supabase
        .from('weeks')
        .select('*')
        .eq('group_id', group_id);

      if (error) {
        console.error('取得エラー:', error);
      } else {
        console.log('weeks データ:', data);
      }
    }
    fetchWeeks();
  }, [group_id]);

  return (
    <div>
      <h2>履歴</h2>
      <p>2025/08/15〜2025/08/22</p>
      <p>2025/08/15〜2025/08/22</p>
    </div>
  );
};

export default ShiftHistory;
