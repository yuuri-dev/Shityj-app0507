import * as React from 'react';
import { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ja from 'date-fns/locale/ja'; // 日本語化

export default function ShiftDatePicker({
  setWeek_start_date,
  setWeek_finish_date,
}) {
  const [value, setValue] = useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ja}>
      <DatePicker
        label="開始日を選択"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          if (newValue) {
            const startStr = newValue.toISOString().slice(0, 10);
            const finish = new Date(newValue);
            finish.setDate(newValue.getDate() + 6);
            const finishStr = finish.toISOString().slice(0, 10);

            setWeek_start_date(startStr);
            setWeek_finish_date(finishStr);
          }
        }}
      />
    </LocalizationProvider>
  );
}
