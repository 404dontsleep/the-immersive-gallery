import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
const BankResultPage = lazy(
  () => import('@/pages/app/admin/bank-result/bank-result.page'),
);

const bankResultRouter = defineRouter({
  routes: [
    {
      path: 'bank-result',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <BankResultPage />
        </Suspense>
      ),
    },
  ],
});

export default bankResultRouter;
