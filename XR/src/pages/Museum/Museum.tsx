import useItemContext from '@/stores/ItemContext/useItemContext';
import { useLanguageStore } from '@/stores/language.store';
import AssetImage from '@/components/common/AssetImage';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
export function MuseumPage() {
  const { categories } = useItemContext();
  const { getLanguage } = useLanguageStore();
  const navigate = useNavigate();
  return (
    <section className="max-w-5xl mx-auto bg-museum flex flex-col gap-4 p-4">
      {categories.map((category) => (
        <Flex
          gap={16}
          key={category.id}
          onClick={() => {
            navigate(`/museum/${category.id}`);
          }}
        >
          <AssetImage
            className="rounded-lg"
            style={{ height: 256, width: 256 }}
            assetsId={category.iconAssets.id}
          />
          <Flex vertical gap={4} flex={1}>
            <span className="text-2xl font-medium">
              {getLanguage(category.name)}
            </span>
            <span className="text-base text-gray-500">
              {getLanguage(category.description)}
            </span>
          </Flex>
        </Flex>
      ))}
    </section>
  );
}
