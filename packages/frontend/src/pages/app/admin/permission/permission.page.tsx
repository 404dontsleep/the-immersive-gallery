import {
  permissionControllerCreate,
  permissionControllerDelete,
  permissionControllerUpdate,
  PermissionRelationsDtoUnitType,
  usePermissionControllerFindAll,
  usePermissionControllerFindAllWithRelations,
  usePermissionControllerUpdateRelations,
  type PermissionDto,
} from '@api';
import { Button, Card, Flex, Layout, Space, Tree, Typography } from 'antd';
import { type DataNode, type TreeProps } from 'antd/es/tree';
import { DeleteIcon, EditIcon } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import usePermissionStore from './components/usePermissionStore';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedPermissionModal from './components/SelectedPermissionModal';
import usePermissionTree, {
  type PermissionTreeNode,
} from './utils/usePermissionTree';

function convertToAntdTreeData(
  tree: PermissionTreeNode[],
  parentKey: string = '',
): DataNode[] {
  return tree.map((node) => {
    const currentKey = parentKey ? `${parentKey}-${node.id}` : `${node.id}`;

    return {
      key: currentKey,
      title: node.name,
      children: convertToAntdTreeData(node.children, currentKey),
    };
  });
}

export default function PermissionPage() {
  const { setSelectedData } = usePermissionStore();
  const permissionTree = usePermissionTree();
  const { data: permissions, mutate: mutatePermissions } =
    usePermissionControllerFindAll();
  const { mutate: mutatePermissionsWithRelations } =
    usePermissionControllerFindAllWithRelations();
  const { trigger: updatePermissioRelations } =
    usePermissionControllerUpdateRelations({
      swr: {
        onSuccess: () => {
          mutatePermissionsWithRelations();
        },
      },
    });

  const findPermission = useCallback(
    (name: string) => {
      return permissions?.find((permission) => permission.name === name);
    },
    [permissions],
  );

  const onDrop: TreeProps['onDrop'] = (info) => {
    const {
      dragNode,
      node,
      dropPosition,
      event: { ctrlKey },
    } = info;
    if (!dragNode.key || !node.key) return;
    const dragNodeKey = String(dragNode.key).split('-');
    const nodeKey = String(node.key).split('-');
    const dragKey = dragNodeKey.pop();
    const parentId = dragNodeKey.pop();
    updatePermissioRelations({
      id: Number(dragKey),
      parents: [
        ...(!ctrlKey
          ? [
              {
                type: PermissionRelationsDtoUnitType.remove,
                id: Number(parentId),
              },
            ]
          : []),
        ...(dropPosition === -1
          ? [
              {
                type: PermissionRelationsDtoUnitType.remove,
                id: Number(parentId),
              },
            ]
          : [
              {
                type: PermissionRelationsDtoUnitType.add,
                id: Number(nodeKey.pop()),
              },
            ]),
      ],
      children: [],
    });
  };

  const titleRender = useMemo<TreeProps['titleRender']>(
    () => (props: DataNode) => {
      const permission = findPermission(props?.title as string);
      if (!permission) return <></>;
      return (
        <Flex vertical gap={4}>
          <Flex align="center" gap={4}>
            {typeof props?.title === 'function'
              ? props?.title(props)
              : props?.title}
            {!permission.isLocked && (
              <Space.Compact>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setSelectedData(permission, ItemMode.EDIT)}
                >
                  <Typography.Text type="secondary">
                    <EditIcon />
                  </Typography.Text>
                </Button>
                <Button
                  type="text"
                  size="small"
                  onClick={() => setSelectedData(permission, ItemMode.DELETE)}
                >
                  <Typography.Text type="danger">
                    <DeleteIcon />
                  </Typography.Text>
                </Button>
              </Space.Compact>
            )}
          </Flex>
          <Typography.Text type="secondary" ellipsis>
            {permission.description}
          </Typography.Text>
        </Flex>
      );
    },
    [findPermission, setSelectedData],
  );

  const onOk = (value: PermissionDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      permissionControllerCreate(value).then(() => {
        mutatePermissions();
        mutatePermissionsWithRelations();
      });
    }
    if (itemMode === ItemMode.EDIT) {
      permissionControllerUpdate(value.id, value).then(() => {
        mutatePermissions();
        mutatePermissionsWithRelations();
      });
    }
    if (itemMode === ItemMode.DELETE) {
      permissionControllerDelete(value.id).then(() => {
        mutatePermissions();
        mutatePermissionsWithRelations();
      });
    }
  };

  const treeData = useMemo(() => {
    return convertToAntdTreeData(permissionTree);
  }, [permissionTree]);

  return (
    <Layout className="h-full">
      <Card
        title="Permission"
        extra={
          <Button onClick={() => setSelectedData(null, ItemMode.CREATE)}>
            Add
          </Button>
        }
        className="flex flex-col h-full"
        classNames={{
          body: 'h-full overflow-y-auto my-2',
        }}
      >
        <Tree
          defaultExpandParent
          showIcon
          showLine
          treeData={treeData}
          draggable
          expandAction="doubleClick"
          onDrop={onDrop}
          checkStrictly
          titleRender={titleRender}
        />
        <SelectedPermissionModal onOk={onOk} />
      </Card>
    </Layout>
  );
}
