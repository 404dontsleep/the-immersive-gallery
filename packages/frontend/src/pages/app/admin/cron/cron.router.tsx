import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
const CronPage = lazy(() => import('@/pages/app/admin/cron/cron.page'));

const cronRouter = defineRouter({
  routes: [
    {
      path: 'cron',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <CronPage />
        </Suspense>
      ),
    },
  ],
});

export default cronRouter;
