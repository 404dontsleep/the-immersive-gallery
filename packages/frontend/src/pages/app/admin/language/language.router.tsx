import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';
const LanguagePage = lazy(
  () => import('@/pages/app/admin/language/language.page'),
);
const languageRouter = defineRouter({
  routes: [
    {
      path: 'language',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <SysPermission
            fallback
            requiredPermissions={[EnumPermission.LanguageController]}
          >
            <LanguagePage />
          </SysPermission>
        </Suspense>
      ),
    },
  ],
});

export default languageRouter;

