import { useParams } from 'react-router-dom';
import useItemContext from '@/stores/ItemContext/useItemContext';
import { useLanguageStore } from '@/stores/language.store';
import AssetImage from '@/components/common/AssetImage';
import { Carousel, Typography } from 'antd';
import { AssetsItemType } from '@/shared/api';

const { Title, Text } = Typography;

export function MuseumItemDetail() {
  const { itemId } = useParams<{
    categoryId: string;
    itemId: string;
  }>();
  const { items } = useItemContext();
  const { getLanguage } = useLanguageStore();

  const item = items.find((i) => i.id === Number(itemId));

  if (!item) {
    return (
      <section className="max-w-5xl mx-auto bg-museum p-4">
        <div className="text-center py-12">
          <Text className="text-lg text-gray-500">
            {getLanguage('ITEM_NOT_FOUND') || 'Không tìm thấy vật phẩm'}
          </Text>
        </div>
      </section>
    );
  }

  // Lọc các assets là hình ảnh hoặc video
  const mediaAssets =
    item.assets?.filter(
      (asset) =>
        asset.type === AssetsItemType.image ||
        asset.type === AssetsItemType.video,
    ) || [];

  return (
    <section className="max-w-5xl mx-auto bg-museum p-4 flex flex-col h-full">
      {/* Banner Carousel */}
      {mediaAssets.length > 0 ? (
        <div className="mb-6">
          <Carousel
            autoplay
            dots
            className="rounded-lg overflow-hidden"
            style={{ backgroundColor: '#f5f5f5' }}
          >
            {mediaAssets.map((asset) => (
              <div key={asset.id} className="relative w-full h-[400px]">
                {asset.type === AssetsItemType.image ? (
                  <AssetImage
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    assetsId={asset.id}
                  />
                ) : (
                  <video
                    className="object-contain"
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                      backgroundColor: '#000',
                    }}
                    controls
                    src={`/api/public/assets-items/${asset.id}/stream`}
                  />
                )}
                {/* Asset Info Overlay */}
                {(asset.name || asset.description) && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                    {asset.name && (
                      <Title
                        level={4}
                        className="mb-2"
                        style={{ color: 'white' }}
                      >
                        {getLanguage(asset.name)}
                      </Title>
                    )}
                    {asset.description && (
                      <Text className="text-sm" style={{ color: 'white' }}>
                        {getLanguage(asset.description)}
                      </Text>
                    )}
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <div className="mb-6 text-center py-12 bg-gray-100 rounded-lg">
          <Text className="text-gray-500">
            {getLanguage('NO_MEDIA') || 'Không có hình ảnh hoặc video'}
          </Text>
        </div>
      )}

      {/* Additional Info */}
      <div className="mt-8 space-y-4">
        <div>
          <div className="mt-1">
            <span className="text-3xl font-bold">{getLanguage(item.name)}</span>
          </div>
        </div>
        {item.description && (
          <div>
            <div className="mt-1">
              <span className="text-cbase">
                {getLanguage(item.description)}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
