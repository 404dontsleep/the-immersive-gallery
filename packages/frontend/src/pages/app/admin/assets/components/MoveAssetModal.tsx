import { Modal, Tree, message } from 'antd';
import type { DataNode } from 'antd/es/tree';
import type { AssetsItem } from '@api';
import { useState, useMemo, useEffect } from 'react';
import { useLanguageStore } from '@/stores/language.store';

type MoveAssetModalProps = {
  open: boolean;
  asset: AssetsItem | null;
  allAssets: AssetsItem[];
  onCancel: () => void;
  onOk: (targetParentId: number | null) => Promise<void>;
};

function buildTreeData(
  assets: AssetsItem[],
  excludeId: number | null,
  getLanguage: (text: string) => string,
): DataNode[] {
  // Tìm tất cả children của asset đang move (đệ quy)
  const getAllChildrenIds = (parentId: number | null): number[] => {
    const children = assets.filter(
      (item) => (item.parentId ?? null) === parentId,
    );
    const childrenIds = children.map((item) => item.id);
    const nestedIds = children.flatMap((item) => getAllChildrenIds(item.id));
    return [...childrenIds, ...nestedIds];
  };

  const excludeIds = excludeId
    ? [excludeId, ...getAllChildrenIds(excludeId)]
    : [];

  // Filter chỉ lấy folders và loại trừ asset đang move và tất cả children của nó
  const folders = assets.filter(
    (item) => item.type === 'folder' && !excludeIds.includes(item.id),
  );

  // Build tree structure
  const buildNode = (parentId: number | null): DataNode[] => {
    return folders
      .filter((item) => {
        const itemParentId = item.parentId ?? null;
        return itemParentId === parentId;
      })
      .map((item) => ({
        key: item.id.toString(),
        title: getLanguage(item.name),
        children: buildNode(item.id),
      }));
  };

  return buildNode(null);
}

export default function MoveAssetModal({
  open,
  asset,
  allAssets,
  onCancel,
  onOk,
}: MoveAssetModalProps) {
  const { getLanguage } = useLanguageStore();
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const treeData = useMemo(() => {
    if (!asset) return [];
    return buildTreeData(allAssets, asset.id, getLanguage);
  }, [allAssets, asset, getLanguage]);

  useEffect(() => {
    if (open) {
      setSelectedKey(null);
    }
  }, [open]);

  const handleOk = async () => {
    if (!asset) return;

    const targetParentId =
      selectedKey === null ? null : parseInt(selectedKey, 10);

    // Không cho phép move vào chính nó hoặc vào children của nó
    if (targetParentId === asset.id) {
      message.error('Không thể di chuyển vào chính thư mục đó');
      return;
    }

    // Kiểm tra xem targetParentId có phải là child của asset không (đệ quy)
    const isDescendant = (
      ancestorId: number,
      descendantId: number | null,
    ): boolean => {
      if (descendantId === null) return false;
      if (descendantId === ancestorId) return true;
      const descendant = allAssets.find((item) => item.id === descendantId);
      if (!descendant) return false;
      return isDescendant(ancestorId, descendant.parentId ?? null);
    };

    if (targetParentId !== null && isDescendant(asset.id, targetParentId)) {
      message.error('Không thể di chuyển vào thư mục con');
      return;
    }

    try {
      setLoading(true);
      await onOk(targetParentId);
      message.success('Di chuyển thành công');
      onCancel();
    } catch {
      message.error('Di chuyển thất bại');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Di chuyển Asset"
      open={open}
      onOk={handleOk}
      onCancel={onCancel}
      confirmLoading={loading}
      okText="Di chuyển"
      cancelText="Hủy"
    >
      <div style={{ marginBottom: 16 }}>
        <strong>Di chuyển:</strong> {asset ? getLanguage(asset.name) : ''}
      </div>
      <div style={{ marginBottom: 8 }}>
        <strong>Chọn thư mục đích:</strong>
      </div>
      <Tree
        treeData={[
          {
            key: 'root',
            title: (
              <span
                style={{
                  cursor: 'pointer',
                  fontWeight: selectedKey === null ? 'bold' : 'normal',
                }}
                onClick={() => setSelectedKey(null)}
              >
                Root (Thư mục gốc)
              </span>
            ),
            children: treeData,
          },
        ]}
        selectedKeys={selectedKey ? [selectedKey] : ['root']}
        onSelect={(keys) => {
          const key = keys[0] as string;
          setSelectedKey(key === 'root' ? null : key);
        }}
        defaultExpandAll
        showLine
      />
    </Modal>
  );
}
