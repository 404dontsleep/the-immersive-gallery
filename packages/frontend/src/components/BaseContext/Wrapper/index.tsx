/* eslint-disable react-refresh/only-export-components */
import {
  type InputNumberProps,
  type InputProps,
  Input as AntdInput,
  InputNumber as AntdInputNumber,
  Typography,
  DatePicker as AntdDatePicker,
  type DatePickerProps,
  Select,
  type SelectProps,
} from 'antd';
import type React from 'react';
import { useBaseContext } from '../useBaseContext';
import type { Dayjs } from 'dayjs';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import type { BaseContextWrapperProps } from './type';

const Input: React.FC<InputProps & BaseContextWrapperProps<string>> = ({
  sysOnChange,
  ...props
}) => {
  const { readOnly } = useBaseContext();
  if (readOnly) {
    return <Typography.Text>{props.value}</Typography.Text>;
  }
  return (
    <AntdInput
      {...props}
      disabled={readOnly}
      onChange={(e) => {
        props.onChange?.(e);
        sysOnChange?.(e.target.value);
      }}
    />
  );
};

const InputNumber: React.FC<
  InputNumberProps & BaseContextWrapperProps<number>
> = ({ sysOnChange, ...props }) => {
  const { readOnly } = useBaseContext();
  if (readOnly) {
    return <Typography.Text>{props.value}</Typography.Text>;
  }
  return (
    <AntdInputNumber
      {...props}
      disabled={readOnly}
      onChange={(e) => {
        props.onChange?.(e);
        sysOnChange?.(e as number);
      }}
    />
  );
};

const DatePicker: React.FC<
  Omit<DatePickerProps, 'value'> &
    BaseContextWrapperProps<Dayjs> & {
      value?: string;
    }
> = ({ sysOnChange, value, ...props }) => {
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

  if (readOnly) {
    return <Typography.Text>{date?.format('YYYY-MM-DD')}</Typography.Text>;
  }

  return (
    <AntdDatePicker
      {...props}
      disabled={readOnly}
      value={date}
      onChange={(e, d) => {
        props.onChange?.(e, d);
        sysOnChange?.(e);
      }}
    />
  );
};

const inputBooleanOptions: SelectProps['options'] = [
  //@ts-expect-error TODO: working on this
  { label: 'True', value: true },
  //@ts-expect-error TODO: working on this
  { label: 'False', value: false },
];

const InputBoolean: React.FC<
  BaseContextWrapperProps<boolean> & SelectProps
> = ({ sysOnChange, ...props }) => {
  const { readOnly } = useBaseContext();

  if (readOnly) {
    return <Typography.Text>{props.value ? 'True' : 'False'}</Typography.Text>;
  }
  return (
    <Select
      {...props}
      options={inputBooleanOptions}
      onChange={(e) => {
        props.onChange?.(e);
        sysOnChange?.(e);
      }}
    />
  );
};

export default {
  Input,
  InputNumber,
  DatePicker,
  InputBoolean,
};
