import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';

const UserPage = lazy(() => import('@/pages/app/user/user.page'));

const userRouter = defineRouter({
  routes: [
    {
      path: 'user',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <UserPage />
        </Suspense>
      ),
    },
  ],
});

export default userRouter;
