import defineRouter from '@/utils/define-router';
import { lazy } from 'react';
const AuthPage = lazy(() => import('@/pages/auth/auth.page'));

const authRouter = defineRouter({
  routes: [
    {
      path: '/auth',
      element: <AuthPage />,
    },
  ],
});

export default authRouter;
