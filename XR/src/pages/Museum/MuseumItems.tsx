import AssetImage from '@/components/common/AssetImage';
import useItemContext from '@/stores/ItemContext/useItemContext';
import { Button, Flex } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '@/stores/language.store';
import { EyeOutlined } from '@ant-design/icons';

export function MuseumItemsByCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { items } = useItemContext();
  const { getLanguage } = useLanguageStore();
  const navigate = useNavigate();
  const itemsByCategory = items.filter(
    (item) => item.category.id === Number(categoryId),
  );
  return (
    <section className="max-w-5xl mx-auto bg-museum flex flex-col gap-4 p-4">
      {itemsByCategory.map((item) => (
        <Flex gap={16} key={item.id}>
          <AssetImage
            className="rounded-lg"
            style={{ height: 256, width: 256 }}
            assetsId={item.assets?.[0]?.id || 0}
          />
          <Flex vertical gap={4} flex={1}>
            <span className="text-2xl font-medium">
              {getLanguage(item.name)}
            </span>
            <span className="text-base text-gray-500">
              {getLanguage(item.description)}
            </span>
            <Button
              className="w-full mt-auto"
              type="default"
              onClick={() => {
                navigate(`/museum/${categoryId}/item/${item.id}`);
              }}
            >
              <EyeOutlined size={16} /> {getLanguage('VIEW_DETAIL')}
            </Button>
          </Flex>
        </Flex>
      ))}
    </section>
  );
}
