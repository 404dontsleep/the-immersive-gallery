import defineRouter from '@/utils/define-router';
import { Suspense } from 'react';
import SuspenseFallback from '@/components/Sys/SuspenseFallback';
import permissionRouter from './permission/permission.router';
import { Outlet } from 'react-router-dom';
import userRouter from './user/user.router';
import configRouter from './config/config.router';
import languageRouter from './language/language.router';
// import itemTypeRouter from './item-type/item-type.router';
// import transactionRouter from './transaction/transaction.router';
// import bankRouter from './bank/bank.router';
// import cronRouter from './cron/cron.router';
// import bankResultRouter from './bank-result/bank-result.router';

const adminRouter = defineRouter({
  routes: [
    {
      path: 'admin',
      element: (
        <Suspense fallback={<SuspenseFallback />}>
          <Outlet />
        </Suspense>
      ),
      children: [
        ...permissionRouter.routes,
        ...userRouter.routes,
        ...configRouter.routes,
        ...languageRouter.routes,
        // ...itemTypeRouter.routes,
        // ...transactionRouter.routes,
        // ...bankRouter.routes,
        // ...cronRouter.routes,
        // ...bankResultRouter.routes,
      ],
    },
  ],
});

export default adminRouter;
