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
  Breadcrumb,
} from 'antd';
import {
  assetsItemControllerUploadFile,
  assetsItemControllerUpdate,
  useAssetsItemControllerFindAll,
  type AssetsItem,
  type AssetsItemControllerUploadFileBody,
  type AssetsItemDto,
  assetsItemControllerDelete,
  assetsItemControllerCreateFolder,
  type CreateFolderDto,
} from '@api';
import { UploadOutlined, FolderOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd/es/upload';
import { useState, useMemo, useEffect, useRef } from 'react';
import useAssetsStore from './components/useAssetsStore';
import SelectedAssetModal from './components/SelectedAssetModal';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import { PenIcon, TrashIcon, FolderPlus, Move } from 'lucide-react';
import { useLanguageStore } from '@/stores/language.store';
import MoveAssetModal from './components/MoveAssetModal';

const { Text } = Typography;

export default function AssetsPage() {
  const { setSelectedData } = useAssetsStore();
  const { getLanguage } = useLanguageStore();
  const [currentParentId, setCurrentParentId] = useState<number | null>(null);
  const {
    data: allAssetsItems,
    isLoading,
    mutate: mutateAssetsItems,
  } = useAssetsItemControllerFindAll({
    withDeleted: false,
  });

  const [uploading, setUploading] = useState(false);
  const [creatingFolder, setCreatingFolder] = useState(false);
  const [moveModalOpen, setMoveModalOpen] = useState(false);
  const [assetToMove, setAssetToMove] = useState<AssetsItem | null>(null);
  const pendingFolderRef = useRef<{
    name: string;
    parentId: number | null;
  } | null>(null);

  // Tìm folder mới tạo sau khi data được cập nhật
  useEffect(() => {
    if (pendingFolderRef.current && allAssetsItems) {
      const { name, parentId } = pendingFolderRef.current;
      const newFolder = allAssetsItems.find(
        (item) =>
          item.type === 'folder' &&
          item.name === name &&
          item.parentId === parentId,
      );

      if (newFolder) {
        setSelectedData(newFolder, ItemMode.EDIT);
        pendingFolderRef.current = null;
      }
    }
  }, [allAssetsItems, setSelectedData]);

  // Filter assets theo parentId hiện tại và sắp xếp: folders lên đầu
  const assetsItems = useMemo(() => {
    if (!allAssetsItems) return [];
    return allAssetsItems
      .filter((item) => {
        const itemParentId = item.parentId ?? null;
        return itemParentId === currentParentId;
      })
      .sort((a, b) => {
        // Folders lên đầu
        if (a.type === 'folder' && b.type !== 'folder') return -1;
        if (a.type !== 'folder' && b.type === 'folder') return 1;
        // Nếu cùng loại, sắp xếp theo tên
        return a.name.localeCompare(b.name);
      });
  }, [allAssetsItems, currentParentId]);

  // Build breadcrumb từ parent chain
  const breadcrumbItems = useMemo(() => {
    if (currentParentId === null) return [];

    const buildPath = (
      parentId: number | null,
      items: AssetsItem[],
    ): AssetsItem[] => {
      if (parentId === null) return [];
      const parent = items.find((item) => item.id === parentId);
      if (!parent) return [];
      return [...buildPath(parent.parentId ?? null, items), parent];
    };

    const path = buildPath(currentParentId, allAssetsItems || []);
    return path;
  }, [currentParentId, allAssetsItems]);

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
      parentId: currentParentId ?? undefined,
    };

    try {
      setUploading(true);
      const uploadedAsset = await assetsItemControllerUploadFile(uploadBody);
      message.success('File uploaded successfully');
      mutateAssetsItems();

      // Hiển thị modal để cập nhật name và description
      if (uploadedAsset) {
        setSelectedData(uploadedAsset, ItemMode.EDIT);
      }

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

  const generateRandomName = () => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `Folder_${timestamp}_${random}`;
  };

  const handleCreateFolder = async () => {
    try {
      setCreatingFolder(true);
      const randomName = generateRandomName();
      const createFolderDto: CreateFolderDto = {
        name: randomName,
        parentId: currentParentId ?? undefined,
      };

      await assetsItemControllerCreateFolder(createFolderDto);
      message.success('Folder created successfully');

      // Lưu thông tin folder đang chờ để tìm sau khi data được cập nhật
      pendingFolderRef.current = {
        name: randomName,
        parentId: currentParentId,
      };

      // Refresh data
      await mutateAssetsItems();
    } catch {
      message.error('Failed to create folder');
      pendingFolderRef.current = null;
    } finally {
      setCreatingFolder(false);
    }
  };

  const onOk = (value: AssetsItemDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.EDIT) {
      const id = value.id as number | undefined;
      if (!id) return;
      return assetsItemControllerUpdate(id, value).then(() => {
        mutateAssetsItems();
      });
    }
    if (itemMode === ItemMode.DELETE) {
      const id = value.id as number | undefined;
      if (!id) return;
      return assetsItemControllerDelete(id).then(() => {
        mutateAssetsItems();
      });
    }
  };

  const handleMove = async (targetParentId: number | null) => {
    if (!assetToMove) return;

    await assetsItemControllerUpdate(assetToMove.id, {
      id: assetToMove.id,
      name: assetToMove.name,
      description: assetToMove.description,
      parentId: targetParentId ?? undefined,
    });

    await mutateAssetsItems();

    // Nếu đang ở trong folder đã move, quay về root hoặc parent
    if (currentParentId === assetToMove.id) {
      setCurrentParentId(targetParentId);
    }
  };

  return (
    <Card
      title="Assets Management"
      extra={
        <>
          <Button
            type="default"
            icon={<FolderPlus size={16} />}
            onClick={handleCreateFolder}
            loading={creatingFolder}
            style={{ marginRight: 8 }}
          >
            Create Folder
          </Button>
          <Upload
            customRequest={customRequest}
            onChange={handleChange}
            showUploadList={false}
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.glb,.gltf,.obj"
            multiple
          >
            <Button
              type="primary"
              icon={<UploadOutlined />}
              loading={uploading}
            >
              Upload
            </Button>
          </Upload>
        </>
      }
      className="flex flex-col h-full"
      classNames={{
        body: 'h-full overflow-y-auto my-2',
      }}
    >
      {breadcrumbItems.length > 0 && (
        <Breadcrumb
          style={{ marginBottom: 16 }}
          items={[
            {
              title: (
                <Button type="link" onClick={() => setCurrentParentId(null)}>
                  Root
                </Button>
              ),
            },
            ...breadcrumbItems.map((folder, index) => ({
              title:
                index === breadcrumbItems.length - 1 ? (
                  getLanguage(folder.name)
                ) : (
                  <Button
                    type="link"
                    onClick={() => setCurrentParentId(folder.id)}
                  >
                    {getLanguage(folder.name)}
                  </Button>
                ),
            })),
          ]}
        />
      )}
      <Spin spinning={isLoading || uploading}>
        <Row gutter={[16, 16]}>
          {assetsItems?.map((item) => (
            <Col key={item.id} span={12} sm={12} md={8} lg={6} xl={4}>
              <Card
                hoverable
                onClick={
                  item.type === 'folder'
                    ? () => {
                        // Navigate vào folder
                        setCurrentParentId(item.id);
                      }
                    : undefined
                }
                actions={[
                  <Button
                    key="edit"
                    type="link"
                    icon={<PenIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedData(item, ItemMode.EDIT);
                    }}
                  />,
                  <Button
                    key="move"
                    type="link"
                    icon={<Move size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setAssetToMove(item);
                      setMoveModalOpen(true);
                    }}
                  />,
                  <Button
                    key="delete"
                    danger
                    type="link"
                    icon={<TrashIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedData(item, ItemMode.DELETE);
                    }}
                  />,
                ]}
                cover={
                  item.type === 'folder' ? (
                    <div
                      style={{
                        width: '100%',
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#f0f0f0',
                      }}
                    >
                      <FolderOutlined
                        style={{ fontSize: 64, color: '#1890ff' }}
                      />
                    </div>
                  ) : item.type === 'image' ? (
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
                      {getLanguage(item.name)}
                    </Text>
                  }
                  description={
                    <Text ellipsis type="secondary" style={{ fontSize: 11 }}>
                      {getLanguage(item.description) || 'No description'}
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
      <SelectedAssetModal onOk={onOk} />
      <MoveAssetModal
        open={moveModalOpen}
        asset={assetToMove}
        allAssets={allAssetsItems || []}
        onCancel={() => {
          setMoveModalOpen(false);
          setAssetToMove(null);
        }}
        onOk={handleMove}
      />
    </Card>
  );
}
