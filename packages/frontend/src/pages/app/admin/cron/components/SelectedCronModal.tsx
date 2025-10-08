import { Form } from 'antd';
import type React from 'react';
import useCronStore from './useCronStore';

import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import type { SysCronDto } from '@api';
import Wrapper from '@/components/BaseContext/Wrapper';

type SelectedCronModalProps = {
  onOk?: (value: SysCronDto, itemMode: ItemMode) => void;
};

const SelectedCronModal: React.FC<SelectedCronModalProps> = (props) => {
  return (
    <BaseContext
      store={useCronStore}
      title={{
        TITLE_EDIT: 'Edit Cron',
        TITLE_VIEW: 'View Cron',
      }}
      onOk={props.onOk}
    >
      <Form.Item<SysCronDto> name="name" label="Name" hidden>
        <Wrapper.Input placeholder="Enter id" />
      </Form.Item>
      <Form.Item<SysCronDto> name="cronExpression" label="Cron Expression">
        <Wrapper.Input placeholder="Enter cron expression" />
      </Form.Item>
      <Form.Item<SysCronDto> name="enabled" label="Enabled">
        <Wrapper.InputBoolean />
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedCronModal;
