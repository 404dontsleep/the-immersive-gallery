import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
const UserPage = lazy(() => import('@/pages/app/admin/user/user.page'));

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
