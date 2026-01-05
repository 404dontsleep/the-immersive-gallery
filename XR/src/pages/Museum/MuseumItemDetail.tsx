import { useParams } from 'react-router-dom';
import useItemContext from '@/stores/ItemContext/useItemContext';
import { useLanguageStore } from '@/stores/language.store';
import AssetImage from '@/components/common/AssetImage';
import { Typography, Divider } from 'antd';
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
      {/* Item Info */}
      <div className="mb-8 space-y-4">
        <div>
          <Title level={2} className="mb-2">
            {getLanguage(item.name)}
          </Title>
        </div>
        {item.description && (
          <div>
            <Text className="leading-relaxed" style={{ fontSize: '16px' }}>
              {getLanguage(item.description)}
            </Text>
          </div>
        )}
      </div>

      {/* Media Assets List - Vertical Layout */}
      {mediaAssets.length > 0 ? (
        <div className="space-y-8">
          {mediaAssets.map((asset, index) => (
            <div key={asset.id} className="w-full">
              {/* Media Content */}
              <div className="mb-4 rounded-lg overflow-hidden">
                {asset.type === AssetsItemType.image ? (
                  <AssetImage
                    className="w-full"
                    style={{
                      width: '100%',
                    }}
                    wrapperClassName="w-full"
                    assetsId={asset.id}
                  />
                ) : (
                  <video
                    className="w-full"
                    style={{
                      width: '100%',
                      maxHeight: '600px',
                      objectFit: 'contain',
                      backgroundColor: '#000',
                    }}
                    controls
                    src={`/api/public/assets-items/${asset.id}/stream`}
                  />
                )}
              </div>

              {/* Asset Info */}
              {(asset.name || asset.description) && (
                <div className="space-y-2">
                  {asset.name && (
                    <Title level={4} className="mb-0">
                      {getLanguage(asset.name)}
                    </Title>
                  )}
                  {asset.description && (
                    <Text className="text-base leading-relaxed text-gray-700">
                      {getLanguage(asset.description)}
                    </Text>
                  )}
                </div>
              )}

              {/* Divider between items (except last) */}
              {index < mediaAssets.length - 1 && <Divider className="my-8" />}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-100 rounded-lg">
          <Text className="text-gray-500">
            {getLanguage('NO_MEDIA') || 'Không có hình ảnh hoặc video'}
          </Text>
        </div>
      )}
    </section>
  );
}
