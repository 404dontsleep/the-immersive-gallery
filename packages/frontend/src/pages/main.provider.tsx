import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '@/stores/auth.store';
import { authControllerMe } from '@api';

export default function MainProvider() {
  const navigate = useNavigate();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    authControllerMe();
    if (!accessToken) {
      navigate('/auth');
    }
  }, [navigate, accessToken]);

  return <Outlet />;
}
