import { Form, Input } from 'antd';
import type React from 'react';

import type { SysConfigDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import useConfigStore from './useConfigStore';
import SysSelectPermission from '@/components/Sys/Select/Permission';
import UnitValue from './UnitValue';

type SelectedConfigModalProps = {
  onOk?: (value: SysConfigDto, itemMode: ItemMode) => void;
};

const SelectedConfigModal: React.FC<SelectedConfigModalProps> = (props) => {
  const beforeOk = (value: SysConfigDto, itemMode: ItemMode) =>
    props.onOk?.(value, itemMode);

  return (
    <BaseContext
      store={useConfigStore}
      title={{
        TITLE_CREATE: 'Create Config',
        TITLE_EDIT: 'Edit Config',
        TITLE_VIEW: 'View Config',
        TITLE_DELETE: 'Delete Config',
        TITLE_RESTORE: 'Restore Config',
      }}
      onOk={beforeOk}
      styles={{
        modal: {
          width: 1000,
        },
      }}
    >
      <Form.Item<SysConfigDto> name="id" label="Id" hidden>
        <Input placeholder="Enter id" />
      </Form.Item>
      <Form.Item<SysConfigDto> name="description" label="Description">
        <Input placeholder="Enter description" />
      </Form.Item>
      <Form.Item<SysConfigDto> name="value" label="Value">
        <UnitValue />
      </Form.Item>
      <Form.Item<SysConfigDto> name="allowPermission" label="Allow Permission">
        <SysSelectPermission allowClear mode="multiple" />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedConfigModal;
