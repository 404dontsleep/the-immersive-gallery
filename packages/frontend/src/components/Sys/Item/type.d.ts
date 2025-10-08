import { type AvatarProps, type FlexProps, type TypographyProps } from 'antd';

export type SysItemProps = {
  image?: string;
  amount?: number;
  name?: string;
  description?: string;
  overflowAmount?: number;
  props?: {
    flex?: FlexProps;
    avatar?: AvatarProps;
    typography?: TypographyProps;
  };
};

export type SysItemIdProps = Pick<
  SysItemProps,
  'amount' | 'overflowAmount' | 'props'
> & {
  id: number;
};
