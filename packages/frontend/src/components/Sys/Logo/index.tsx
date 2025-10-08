import { Flex, theme, Typography } from 'antd';
type SysLogoProps = {
  size?: number;
};

export default function SysLogo({ size = 40 }: SysLogoProps) {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  return (
    <Flex align="center" justify="center" gap={8}>
      <Typography.Text
        style={{
          fontSize: size,
          color: colorPrimary,
          wordBreak: 'keep-all',
        }}
      >
        Sys
        <Typography.Text
          style={{
            fontSize: size,
            wordBreak: 'keep-all',
          }}
        >
          Tool
        </Typography.Text>
      </Typography.Text>
    </Flex>
  );
}
