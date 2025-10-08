import { Flex, type FlexProps } from 'antd';

type SysGlowProps = {
  children: React.ReactNode;
  thickness?: number;
} & FlexProps;

export default function SysGlow({
  children,
  thickness = 10,
  ...props
}: SysGlowProps) {
  return (
    <Flex
      {...props}
      style={{
        ...props.style,
        position: 'relative',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          filter: `blur(${thickness}px)`,
        }}
      >
        {children}
      </div>
      {children}
    </Flex>
  );
}
