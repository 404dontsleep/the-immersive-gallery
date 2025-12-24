import {
  Button,
  Card,
  Row,
  Col,
  Upload,
  Image,
  message,
  Spin,
  Typography,
} from 'antd';
import {
  assetsItemControllerUploadFile,
  useAssetsItemControllerFindAll,
  type AssetsItem,
  type AssetsItemControllerUploadFileBody,
} from '@api';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload';
import { useState } from 'react';

const { Text } = Typography;

export default function AssetsPage() {
  const {
    data: assetsItems,
    isLoading,
    mutate: mutateAssetsItems,
  } = useAssetsItemControllerFindAll({
    withDeleted: false,
  });

  const [uploading, setUploading] = useState(false);

  const getImageUrl = (item: AssetsItem) => {
    if (item.type === 'image') {
      return `/api/public/assets-items/${item.id}/stream`;
    }
    return item.url;
  };

  const customRequest: UploadProps['customRequest'] = async (options) => {
    const { onSuccess, onError, file } = options;

    const uploadBody: AssetsItemControllerUploadFileBody = {
      file: file as File,
      name: (file as File).name || 'Untitled',
      description: '',
    };

    try {
      setUploading(true);
      await assetsItemControllerUploadFile(uploadBody);
      message.success('File uploaded successfully');
      mutateAssetsItems();
      onSuccess?.(file as File, file as File);
    } catch (error) {
      message.error('Failed to upload file');
      onError?.(error as Error);
    } finally {
      setUploading(false);
    }
  };

  const handleChange: UploadProps['onChange'] = (info) => {
    if (info.file.status === 'done') {
      mutateAssetsItems();
    }
  };

  return (
    <Card
      title="Assets Management"
      extra={
        <Upload
          customRequest={customRequest}
          onChange={handleChange}
          showUploadList={false}
          accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.glb,.gltf,.obj"
          multiple
        >
          <Button type="primary" icon={<UploadOutlined />} loading={uploading}>
            Upload
          </Button>
        </Upload>
      }
      className="flex flex-col h-full"
      classNames={{
        body: 'h-full overflow-y-auto my-2',
      }}
    >
      <Spin spinning={isLoading || uploading}>
        <Row gutter={[16, 16]}>
          {assetsItems?.map((item) => (
            <Col key={item.id} xs={12} sm={8} md={6} lg={4} xl={3}>
              <Card
                hoverable
                cover={
                  item.type === 'image' ? (
                    <Image
                      src={getImageUrl(item)}
                      alt={item.name}
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                      preview={{
                        src: getImageUrl(item),
                      }}
                    />
                  ) : (
                    <Image
                      src={`https://placehold.co/600x400/?text=${item.type}`}
                      alt={item.name}
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                      preview={{
                        src: `https://placehold.co/600x400/?text=${item.type}`,
                      }}
                    />
                  )
                }
                size="small"
              >
                <Card.Meta
                  title={
                    <Text ellipsis style={{ fontSize: 12 }}>
                      {item.name}
                    </Text>
                  }
                  description={
                    <Text ellipsis type="secondary" style={{ fontSize: 11 }}>
                      {item.description || 'No description'}
                    </Text>
                  }
                />
              </Card>
            </Col>
          ))}
        </Row>
        {!isLoading && (!assetsItems || assetsItems.length === 0) && (
          <div
            style={{
              textAlign: 'center',
              padding: '40px 0',
              color: '#999',
            }}
          >
            <Text type="secondary">
              No assets found. Upload some files to get started.
            </Text>
          </div>
        )}
      </Spin>
    </Card>
  );
}
