import { Breadcrumb } from 'antd';
import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SysBreadcrumb() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const paths = useMemo(() => {
    return pathname.split('/').filter(Boolean);
  }, [pathname]);

  const breadcrumbItems = useMemo(() => {
    let accumulatedPath = '';
    const items: { label: string; key: string; href?: string }[] = [];
    paths.forEach((path) => {
      accumulatedPath += `/${path}`;
      items.push({
        label: path,
        key: accumulatedPath,
        href: accumulatedPath,
      });
    });
    return items;
  }, [paths]);

  return (
    <Breadcrumb>
      {breadcrumbItems.map((item) => (
        <Breadcrumb.Item
          className="cursor-pointer"
          onClick={() => item.href && navigate(item.href)}
          key={item.key}
        >
          {item.label}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}
