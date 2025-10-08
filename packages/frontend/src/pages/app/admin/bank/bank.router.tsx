import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';

const BankPage = lazy(() => import('@/pages/app/admin/bank/bank.page'));

const bankRouter = defineRouter({
  routes: [
    {
      path: 'bank',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <BankPage />
        </Suspense>
      ),
    },
  ],
});

export default bankRouter;
