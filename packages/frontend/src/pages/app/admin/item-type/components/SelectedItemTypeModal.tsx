import { Alert, Col, Flex, Form, Input, Row } from 'antd';
import type React from 'react';
import useItemTypeStore from './useItemTypeStore';

import type { ItemTypeDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import SysItem from '@/components/Sys/Item';

type SelectedItemTypeModalProps = {
  onOk?: (value: ItemTypeDto, itemMode: ItemMode) => void;
};

const SelectedItemTypeModal: React.FC<SelectedItemTypeModalProps> = (props) => {
  return (
    <BaseContext
      store={useItemTypeStore}
      title={{
        TITLE_CREATE: 'Create Item Type',
        TITLE_EDIT: 'Edit Item Type',
        TITLE_VIEW: 'View Item Type',
        TITLE_DELETE: 'Delete Item Type',
      }}
      onOk={props.onOk}
      deleteMessage={
        <>
          <Form.Item<ItemTypeDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to delete this item?"
            type="error"
          />
        </>
      }
      restoreMessage={
        <>
          <Form.Item<ItemTypeDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this item?"
            type="success"
          />
        </>
      }
    >
      <Row>
        <Col span={6}>
          <Flex justify="center" align="center" className="h-full">
            <Form.Item shouldUpdate>
              {({ getFieldsValue }) => {
                const { symbol, name, description } = getFieldsValue();
                return (
                  <SysItem
                    image={symbol}
                    amount={999}
                    name={name}
                    description={description}
                  />
                );
              }}
            </Form.Item>
          </Flex>
        </Col>
        <Col span={18}>
          <Form.Item<ItemTypeDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Form.Item<ItemTypeDto>
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder="Enter item type name" />
          </Form.Item>
          <Form.Item<ItemTypeDto> name="description" label="Description">
            <Input placeholder="Enter description" />
          </Form.Item>
          <Form.Item<ItemTypeDto> name="symbol" label="Symbol">
            <Input placeholder="Enter symbol" />
          </Form.Item>
        </Col>
      </Row>
    </BaseContext>
  );
};

export default SelectedItemTypeModal;
