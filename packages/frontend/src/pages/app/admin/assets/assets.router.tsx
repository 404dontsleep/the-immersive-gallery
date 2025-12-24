import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';

const AssetsPage = lazy(
  () => import('@/pages/app/admin/assets/assets.page'),
);

const assetsRouter = defineRouter({
  routes: [
    {
      path: 'assets',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <SysPermission
            fallback
            requiredPermissions={[EnumPermission.AssetsItemController]}
          >
            <AssetsPage />
          </SysPermission>
        </Suspense>
      ),
    },
  ],
});

export default assetsRouter;

