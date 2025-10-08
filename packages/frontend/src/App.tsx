import {
  App as AntdApp,
  ConfigProvider,
  Layout,
  theme as antdTheme,
} from 'antd';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import mainRouter from './pages/main.router';
import { useThemeStore } from './stores/theme.store';
import SysFloatButton from './components/Sys/FloatButton';
import { HelmetProvider } from 'react-helmet-async';
const router = createBrowserRouter(mainRouter.routes);
const primaryColor = '#7f5af0';
const backgroundColor = '#16161a';
export default function App() {
  const { theme } = useThemeStore();

  return (
    <HelmetProvider>
      <ConfigProvider
        theme={{
          algorithm:
            theme === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
          token: {
            colorBgElevated: theme === 'dark' ? backgroundColor : '#fffffe',
            colorBgContainer: theme === 'dark' ? backgroundColor : '#fffffe',
            wireframe: true,
            colorPrimary: primaryColor,
            borderRadius: 4,
            fontSize: 14,
            fontFamily:
              'Segoe UI, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
          },
          components: {
            Layout: {
              colorBgHeader: theme === 'dark' ? backgroundColor : '#fffffe',
              siderBg: theme === 'dark' ? backgroundColor : '#fffffe',
              footerBg: theme === 'dark' ? backgroundColor : '#fffffe',
              headerPadding: 0,
              footerPadding: 0,
              bodyBg: theme === 'dark' ? backgroundColor : '#fffffe',
            },
          },
        }}
      >
        <AntdApp
          notification={{
            placement: 'topRight',
            showProgress: true,
          }}
          message={{
            duration: 3,
            maxCount: 1,
          }}
        >
          <section className={theme === 'dark' ? 'dark' : 'light'}>
            <Layout className="h-screen w-screen overflow-hidden">
              <RouterProvider router={router} />
            </Layout>
          </section>
          <SysFloatButton />
        </AntdApp>
      </ConfigProvider>
    </HelmetProvider>
  );
}
