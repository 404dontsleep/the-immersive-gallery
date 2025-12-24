import defineRouter from '@/utils/define-router';
import { lazy, Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import SysPermission from '@/components/Sys/Permission';
import { EnumPermission } from '@api';

const CategoryPage = lazy(
  () => import('@/pages/app/admin/category/category.page'),
);

const categoryRouter = defineRouter({
  routes: [
    {
      path: 'category',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <SysPermission
            fallback
            requiredPermissions={[EnumPermission.CategoryController]}
          >
            <CategoryPage />
          </SysPermission>
        </Suspense>
      ),
    },
  ],
});

export default categoryRouter;

