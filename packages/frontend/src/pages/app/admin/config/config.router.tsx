import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
const ConfigPage = lazy(() => import('./config.page'));

const configRouter = defineRouter({
  routes: [
    {
      path: 'config',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <SysPermission
            fallback
            requiredPermissions={[EnumPermission.SysConfigController]}
          >
            <ConfigPage />
          </SysPermission>
        </Suspense>
      ),
    },
  ],
});

export default configRouter;
