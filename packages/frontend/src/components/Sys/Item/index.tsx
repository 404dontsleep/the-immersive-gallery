import { Avatar, Flex, Popover } from 'antd';
import type { SysItemProps } from './type';


export default function SysItem({
  image,
  amount = 0,
  name,
  description,
  props,
  overflowAmount = 9999,
}: SysItemProps) {
  return (
    <Popover title={name} content={description} placement="top">
      <Flex
        className="w-fit relative rounded-md overflow-hidden"
        {...props?.flex}
      >
        <Avatar
          size={64}
          src={image}
          {...props?.avatar}
          style={{ overflow: 'visible', padding: 10 }}
          shape="square"
        />
        <div className="w-full h-full absolute inset-0 rounded-md inset-ring-2 inset-ring-white z-10"></div>
        <span
          className="absolute bottom-0 right-0 w-full text-right pr-2"
          style={{
            backgroundImage:
              'linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.7) 100%)',
          }}
        >
          <span
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: 'white',
            }}
            {...props?.typography}
          >
            {amount > overflowAmount ? `${overflowAmount}+` : amount}
          </span>
        </span>
      </Flex>
    </Popover>
  );
}
