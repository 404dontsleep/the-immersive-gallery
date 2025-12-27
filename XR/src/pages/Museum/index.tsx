import { PageLayout } from '@/components/layouts/PageLayout';
import { ItemContextProvider } from '@/stores/ItemContext/item.store';
import { Outlet } from 'react-router-dom';

export function MuseumPageWrapper() {
  return (
    <ItemContextProvider>
      <PageLayout>
        <Outlet />
      </PageLayout>
    </ItemContextProvider>
  );
}
