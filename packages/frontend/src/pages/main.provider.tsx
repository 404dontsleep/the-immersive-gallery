import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '@/stores/auth.store';
import { authControllerMe } from '@api';
import LanguageProvider from './language.provider';

export default function MainProvider() {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    authControllerMe();
    if (!accessToken) {
      navigate('/auth');
    }
  }, [navigate, accessToken]);

  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}
