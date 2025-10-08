import {
  Button,
  Card,
  Flex,
  Input,
  Space,
  Table,
  type TableColumnsType,
} from 'antd';
import useUserStore from './components/useUserStore';
import {
  userControllerCreate,
  userControllerDelete,
  userControllerUpdate,
  userControllerUpdateWithInventoriesTracking,
  userControllerUpdateWithPermissions,
  useUserControllerFindAll,
  type PermissionDtoChildren,
  type User,
  type UserDto,
  type UserInventoriesTrackingDto,
} from '@api';
import { useEffect, useMemo, useState } from 'react';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import SelectedUserModal from './components/SelectedUserModal';
import {
  ArchiveRestore,
  PenIcon,
  PlusIcon,
  SearchIcon,
  StoreIcon,
  TrashIcon,
  UserIcon,
} from 'lucide-react';
import useDebounce from '@/hooks/useDebounce';
import UserPermissionModal from './components/UserPermissionModal';
import UserInventoryModalV2 from './components/UserInventoryModalV2';

export default function UserPage() {
  const { setSelectedData, setFilter, filter } = useUserStore();
  const {
    data: users,
    mutate: mutateUsers,
    isLoading: isLoadingUsers,
  } = useUserControllerFindAll({
    withDeleted: true,
    where: filter,
  });
  const [search, setSearch] = useState('');
  const [userPermissionModalUserId, setUserPermissionModalUserId] = useState<
    number | undefined
  >(undefined);
  const [userInventoryModalUserId, setUserInventoryModalUserId] = useState<
    number | undefined
  >(undefined);
  const { debouncedValue: debouncedSearch, isDebouncing } = useDebounce(
    search,
    300,
  );
  const columns = useMemo<TableColumnsType<User>>(() => {
    return [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 32,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        render: (_, record) => (
          <Flex gap={4} align="center">
            <Button
              type="text"
              className="underline"
              onClick={() => setSelectedData(record, ItemMode.VIEW)}
            >
              {record.email}
            </Button>
          </Flex>
        ),
      },
      {
        title: 'Actions',
        render: (_, record) => (
          <Space.Compact>
            <Button onClick={() => setSelectedData(record, ItemMode.EDIT)}>
              <PenIcon />
            </Button>
            <Button
              danger
              onClick={() => setSelectedData(record, ItemMode.DELETE)}
              disabled={record.deletedAt !== null}
            >
              <TrashIcon />
            </Button>
            <Button
              type="dashed"
              onClick={() => setSelectedData(record, ItemMode.RESTORE)}
              disabled={record.deletedAt === null}
            >
              <ArchiveRestore />
            </Button>
            <Button
              type="dashed"
              onClick={() => setUserPermissionModalUserId(record.id)}
            >
              <UserIcon />
            </Button>
            <Button
              type="dashed"
              onClick={() => setUserInventoryModalUserId(record.id)}
            >
              <StoreIcon />
            </Button>
          </Space.Compact>
        ),
        fixed: 'right',
        width: 180,
      },
    ];
  }, [setSelectedData]);

  const handleTest = () => {
    setSelectedData(null, ItemMode.CREATE);
  };

  const handleOk = (value: UserDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      userControllerCreate(value).then(() => {
        mutateUsers();
      });
    }
    if (itemMode === ItemMode.EDIT && value.id) {
      userControllerUpdate(value.id, value).then(() => {
        mutateUsers();
      });
    }
    if (itemMode === ItemMode.DELETE && value.id) {
      userControllerDelete(value.id).then(() => {
        mutateUsers();
      });
    }
    if (itemMode === ItemMode.RESTORE && value.email) {
      userControllerCreate({ email: value.email }).then(() => {
        mutateUsers();
      });
    }
  };

  const handleOkUserPermission = (value: PermissionDtoChildren[]) => {
    if (userPermissionModalUserId) {
      return userControllerUpdateWithPermissions(userPermissionModalUserId, {
        permissions: value,
      }).then(() => {
        setUserPermissionModalUserId(undefined);
      });
    }
  };

  // const handleOkUserInventory = (value: UserInventoriesDto) => {
  //   if (userInventoryModalUserId) {
  //     return userControllerUpdateWithInventories(
  //       userInventoryModalUserId,
  //       value,
  //     ).then(() => {
  //       setUserInventoryModalUserId(undefined);
  //     });
  //   }
  // };

  const handleOkUserInventoryTracking = (
    value: UserInventoriesTrackingDto[],
  ) => {
    if (userInventoryModalUserId) {
      return userControllerUpdateWithInventoriesTracking(
        userInventoryModalUserId,
        value,
      );
    }
  };

  useEffect(() => {
    setFilter({
      email: { contains: debouncedSearch },
    });
  }, [debouncedSearch, setFilter]);

  return (
    <Card
      className="flex flex-col h-full"
      title="User Management"
      classNames={{
        body: 'h-full overflow-y-auto my-2',
      }}
      extra={
        <Button type="primary" onClick={handleTest}>
          <PlusIcon /> Add User
        </Button>
      }
    >
      <Table
        title={() => (
          <Input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            addonAfter={<SearchIcon />}
          />
        )}
        size="small"
        tableLayout="auto"
        dataSource={users}
        columns={columns}
        pagination={{ responsive: true }}
        rowKey="id"
        loading={isDebouncing || isLoadingUsers}
      />
      <SelectedUserModal onOk={handleOk} />
      <UserPermissionModal
        userId={userPermissionModalUserId}
        onCancel={() => setUserPermissionModalUserId(undefined)}
        onOk={handleOkUserPermission}
      />
      {/* <UserInventoryModal
        userId={userInventoryModalUserId}
        onCancel={() => setUserInventoryModalUserId(undefined)}
        onOk={handleOkUserInventory}
      /> */}
      <UserInventoryModalV2
        userId={userInventoryModalUserId}
        onCancel={() => setUserInventoryModalUserId(undefined)}
        onOk={handleOkUserInventoryTracking}
      />
    </Card>
  );
}
