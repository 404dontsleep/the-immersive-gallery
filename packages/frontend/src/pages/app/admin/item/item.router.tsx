import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';

const ItemPage = lazy(() => import('@/pages/app/admin/item/item.page'));

const itemRouter = defineRouter({
  routes: [
    {
      path: 'item',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <SysPermission
            fallback
            requiredPermissions={[EnumPermission.ItemController]}
          >
            <ItemPage />
          </SysPermission>
        </Suspense>
      ),
    },
  ],
});

export default itemRouter;

