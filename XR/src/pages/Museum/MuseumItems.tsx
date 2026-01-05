import AssetImage from '@/components/common/AssetImage';
import useItemContext from '@/stores/ItemContext/useItemContext';
import { useParams, useNavigate } from 'react-router-dom';
import { useLanguageStore } from '@/stores/language.store';
import { Typography } from 'antd';

export function MuseumItemsByCategory() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { items } = useItemContext();
  const { getLanguage } = useLanguageStore();
  const navigate = useNavigate();
  const itemsByCategory = items.filter(
    (item) => item.category.id === Number(categoryId),
  );
  return (
    <section className="max-w-5xl mx-auto bg-museum grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {itemsByCategory.map((item) => (
        <div
          key={item.id}
          className="relative group rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 flex flex-col"
          style={{ minHeight: 192 }}
        >
          <AssetImage
            className="w-full h-[192px] object-cover rounded-lg"
            style={{ height: 192, objectFit: 'cover', width: '100%' }}
            assetsId={item.assets?.[0]?.id || 0}
          />
          <div className="group-hover:opacity-0 opacity-100 transition-opacity duration-300 absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 pointer-events-none">
            <span className="text-white text-sm text-center font-semibold drop-shadow">
              {getLanguage(item.name)}
            </span>
          </div>
          {/* Description & Button only appear on hover */}
          <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300 p-4">
            <span className="text-white text-center mb-6">
              {getLanguage(item.description).slice(0, 100)}...
            </span>
          </div>
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Typography.Text
              className="text-sm cursor-pointer underline"
              style={{ color: 'white' }}
              onClick={() => navigate(`/museum/${categoryId}/item/${item.id}`)}
            >
              {getLanguage('VIEW_DETAIL')}
            </Typography.Text>
          </div>
        </div>
      ))}
    </section>
  );
}
