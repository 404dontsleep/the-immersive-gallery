import {
  useUserControllerFindOneWithPermissions,
  type PermissionDtoChildren,
} from '@api';
import { Modal } from 'antd';
import PermissionSelect from '../../permission/components/PermissionSelect';
import { useEffect, useState } from 'react';
type UserPermissionModalProps = {
  userId?: number;
  onCancel?: () => void;
  onOk?: (value: PermissionDtoChildren[]) => void;
};

const UserPermissionModal: React.FC<UserPermissionModalProps> = (props) => {
  const { userId, onCancel, onOk } = props;
  const { data: user, mutate: mutateUser } =
    useUserControllerFindOneWithPermissions(userId ?? 0);
  const [permissions, setPermissions] = useState<
    (PermissionDtoChildren | undefined)[]
  >([]);
  useEffect(() => {
    setPermissions(user?.permissions ?? []);
  }, [user]);

  const handleChangePermissions = (
    value: (PermissionDtoChildren | undefined)[],
  ) => {
    setPermissions(value);
  };

  const handleOk = async () => {
    await Promise.resolve(
      onOk?.(
        permissions.filter(
          (permission) => permission !== undefined,
        ) as PermissionDtoChildren[],
      ),
    ).then(() => {
      mutateUser();
      onCancel?.();
    });
  };

  return (
    <Modal
      open={!!userId}
      onCancel={onCancel}
      onOk={handleOk}
      title="User Permission"
      width={'100%'}
    >
      <PermissionSelect
        value={permissions}
        onChange={handleChangePermissions}
      />
    </Modal>
  );
};

export default UserPermissionModal;
