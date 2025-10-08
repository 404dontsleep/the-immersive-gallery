import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import adminRouter from '@/pages/app/admin/admin.router';
import { Result } from 'antd';
import userRouter from '@/pages/app/user/user.router';
const AppPage = lazy(() => import('@/pages/app/app.page'));

const appRouter = defineRouter({
  routes: [
    {
      path: '/app',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <AppPage />
        </Suspense>
      ),
      children: [
        ...adminRouter.routes,
        ...userRouter.routes,
        {
          path: '*',
          element: (
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
            />
          ),
        },
      ],
    },
  ],
});

export default appRouter;
