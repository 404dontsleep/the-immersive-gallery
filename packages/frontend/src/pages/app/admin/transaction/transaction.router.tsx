import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
const TransactionPage = lazy(
  () => import('@/pages/app/admin/transaction/transaction.page'),
);

const transactionRouter = defineRouter({
  routes: [
    {
      path: 'transaction',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <TransactionPage />
        </Suspense>
      ),
    },
  ],
});

export default transactionRouter;
