import SysLogo from '@/components/Sys/Logo';
import { useTranslation } from '@/hooks/useTranslation';
import useAuthStore from '@/stores/auth.store';
import { useThemeStore } from '@/stores/theme.store';
import { useAuthControllerConfig, useAuthControllerGoogleAuth } from '@api';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { App, Button, Card, Divider, Flex, Typography } from 'antd';
import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
  const { data } = useAuthControllerConfig();
  const { theme } = useThemeStore();
  const { message } = App.useApp();
  const { setAccessToken } = useAuthStore();
  const {
    translation: { go_back },
  } = useTranslation();
  const navigate = useNavigate();
  const { trigger } = useAuthControllerGoogleAuth({
    swr: {
      onSuccess: (data) => {
        setAccessToken(data.accessToken);
        message.success('Login success');
        navigate('/app');
      },
    },
  });
  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Card title={<SysLogo size={56} />} variant="borderless">
        {data ? (
          <GoogleOAuthProvider clientId={data.clientId}>
            <GoogleLogin
              theme={theme === 'dark' ? 'filled_black' : 'outline'}
              logo_alignment="center"
              onSuccess={(data) => {
                trigger({ token: data.credential || '' });
              }}
            />
          </GoogleOAuthProvider>
        ) : (
          <Typography.Text>Waiting for config...</Typography.Text>
        )}
        <Divider>Or</Divider>
        <Button
          variant="filled"
          color="default"
          className="w-full"
          onClick={() => navigate('/')}
        >
          <ArrowLeftIcon /> {go_back}
        </Button>
      </Card>
    </Flex>
  );
}
