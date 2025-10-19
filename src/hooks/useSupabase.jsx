import { useEffect, useState } from 'react';
import { supabase } from 'src/lib/supabase_client';

export const useGroupName = (group_id, groupName, setGroupName) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 既にデータあるならfetchしない
    if (groupName) {
      setIsLoading(false);
      return;
    }
    const fetchGroupName = async () => {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('groups')
        .select('group_name')
        .eq('group_id', group_id)
        .single();
      if (error) {
        console.error('グループ名取得失敗:', error);
      }
      if (!error && data) setGroupName(data.group_name);
      setIsLoading(false);
    };
    if (group_id) fetchGroupName();
  }, [group_id]);
  return isLoading;
};
