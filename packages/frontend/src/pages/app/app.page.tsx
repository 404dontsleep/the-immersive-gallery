import SysNavBar from '@/components/Sys/NavBar';
import SysSider from '@/components/Sys/Sider';
import { Divider, Layout, theme } from 'antd';
import { Outlet } from 'react-router-dom';

export default function AppPage() {
  const {
    token: { colorTextBase, colorBorderSecondary },
  } = theme.useToken();

  return (
    <Layout>
      <Layout.Sider
        collapsible
        collapsedWidth={0}
        width={300}
        zeroWidthTriggerStyle={{
          color: colorTextBase,
          border: `1px solid ${colorBorderSecondary}`,
          top: 12,
        }}
        breakpoint="md"
      >
        <SysSider />
      </Layout.Sider>
      <Layout
        style={{
          minWidth: 400,
        }}
      >
        <Layout.Header>
          <SysNavBar />
        </Layout.Header>
        <Divider
          style={{
            margin: 0,
          }}
        />
        <Layout.Content className="p-4">
          <Outlet />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
