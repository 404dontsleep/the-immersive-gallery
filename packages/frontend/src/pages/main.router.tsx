import defineRouter from '@/utils/define-router';
import authRouter from '@/pages/auth/auth.router';
import { Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import appRouter from '@/pages/app/app.router';
import SwrProvider from '@/components/SwrProvider';

const MainProvider = lazy(() => import('@/pages/main.provider'));
const MainPage = lazy(() => import('@/pages/main.page'));

const mainRouter = defineRouter({
  routes: [
    {
      path: '/',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <SwrProvider>
            <MainProvider />
          </SwrProvider>
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<SuspenseFallback />}>
              <SwrProvider>
                <MainPage />
              </SwrProvider>
            </Suspense>
          ),
        },
        ...authRouter.routes,
        ...appRouter.routes,
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ],
});

export default mainRouter;
