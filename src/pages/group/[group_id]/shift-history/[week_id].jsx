import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase_client';

const WeekDetail = () => {
  const router = useRouter();
const week_id_num = parseInt(router.query.week_id, 10);
  const [weekData, setWeekData] = useState(null);

  useEffect(() => {
    if (!router.isReady) return;
    const fetchWeek = async () => {
      if (!week_id_num) return;
      const { data, error } = supabase
        .from('weeks')
        .select('*')
        .eq('id', week_id_num)
        .single();

      if (error) {
        console.log('error: ' + error);
      } else {
        console.log(data);
          setWeekData(data);
      }
    };
    fetchWeek();
  }, [router.isReady, week_id_num]);

  if (!weekData) return <p>Loading...</p>;
  return (
    <div>
      <h1>{weekData.week_start_date}</h1>
      <p>created_at: {weekData.created_at}</p>
    </div>
  );
};

export default WeekDetail;
