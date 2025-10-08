import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
const PermissionPage = lazy(
  () => import('@/pages/app/admin/permission/permission.page'),
);
const permissionRouter = defineRouter({
  routes: [
    {
      path: 'permission',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <SysPermission
            fallback
            requiredPermissions={[EnumPermission.PermissionController]}
          >
            <PermissionPage />
          </SysPermission>
        </Suspense>
      ),
    },
  ],
});

export default permissionRouter;
