import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
const ItemTypePage = lazy(
  () => import('@/pages/app/admin/item-type/item-type.page'),
);

const itemTypeRouter = defineRouter({
  routes: [
    {
      path: 'item-type',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <ItemTypePage />
        </Suspense>
      ),
    },
  ],
});

export default itemTypeRouter;
