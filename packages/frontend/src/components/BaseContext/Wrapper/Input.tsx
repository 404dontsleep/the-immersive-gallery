import { Input, Typography, type InputProps, Tooltip } from 'antd';
import { useBaseContext } from '../useBaseContext';
import { useLanguageStore } from '@/stores/language.store';
import { useState } from 'react';

type SysInputProps = InputProps & {
  sysOnChange?: (value: string) => void;
};

export const SysInput = ({ ...props }: SysInputProps) => {
  const { readOnly } = useBaseContext();
  const [focus, setFocus] = useState(false);
  const { getLanguage } = useLanguageStore();
  if (readOnly) {
    return <Typography.Text>{props.value}</Typography.Text>;
  }
  return (
    <Tooltip open={focus} title={getLanguage(props.value as string)}>
      <Input
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        onChange={(e) => {
          props.onChange?.(e);
          props.sysOnChange?.(e.target.value);
        }}
      />
    </Tooltip>
  );
};
