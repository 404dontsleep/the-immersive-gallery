import { Badge, Menu, type BadgeProps, type MenuItemProps } from 'antd';
import { ShieldCheckIcon } from 'lucide-react';
import type React from 'react';
import { Link } from 'react-router-dom';

type BaseMenuItemProps = Omit<MenuItemProps, 'title'> & {
  badgeCount?: number;
  link: string;
  badgeProps?: BadgeProps;
  title: string | MenuItemProps['title'];
};

const BaseMenuItem: React.FC<BaseMenuItemProps> = (props) => {
  return (
    <div className="relative">
      <Menu.Item
        key={props.link}
        eventKey={props.link}
        icon={props.icon || <ShieldCheckIcon />}
        {...props}
      >
        <Link to={props.link}>{props.title}</Link>
      </Menu.Item>
      <div className="absolute left-8 top-0 h-full flex items-center">
        <Badge
          color="#2cb67d"
          count={props.badgeCount ?? 0}
          {...props.badgeProps}
        />
      </div>
    </div>
  );
};

export default BaseMenuItem;
