import { PageLayout } from '@/components/layouts/PageLayout';
import { ItemContextProvider } from '@/stores/ItemContext/item.store';
import { useLanguageStore } from '@/stores/language.store';
import { Button } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

export function MuseumPageWrapper() {
  const navigate = useNavigate();
  const { getLanguage } = useLanguageStore();
  return (
    <ItemContextProvider>
      <PageLayout>
        <div className="max-w-5xl mx-auto bg-museum gap-4 p-4">
          <Button
            size="large"
            type="default"
            icon={<ArrowLeftOutlined size={16} />}
            onClick={() => navigate(-1)}
          >
            {getLanguage('GO_BACK')}
          </Button>
        </div>
        <Outlet />
      </PageLayout>
    </ItemContextProvider>
  );
}
