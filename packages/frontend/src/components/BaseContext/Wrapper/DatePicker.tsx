import React, { useEffect, useState } from 'react';
import { DatePicker, Typography, type DatePickerProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useBaseContext } from '../useBaseContext';

export type SysDatePickerProps = {
  value?: string | null; // ISO string hoặc "YYYY-MM-DD"
  onChange?: (value: string | null) => void;
} & Omit<DatePickerProps, 'value' | 'onChange'>;

export const SysDatePicker: React.FC<SysDatePickerProps> = ({
  value,
  ...props
}) => {
  const { readOnly } = useBaseContext();
  const [date, setDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    if (value) {
      const newDate = dayjs(value);
      if (!date || !newDate.isSame(date, 'day')) {
        setDate(newDate);
      }
    } else {
      setDate(null);
    }
  }, [date, value]);

  useEffect(() => {
    if (date) props.onChange?.(date ? date.format('YYYY-MM-DD') : null);
  }, [date, props]);

  const handleChangeDate = (a: Dayjs | null) => {
    setDate(a);
  };

  if (readOnly) {
    return <Typography.Text>{value || '-'}</Typography.Text>;
  }

  return (
    <DatePicker
      {...props}
      value={date}
      onChange={handleChangeDate}
      format="YYYY-MM-DD"
    />
  );
};
