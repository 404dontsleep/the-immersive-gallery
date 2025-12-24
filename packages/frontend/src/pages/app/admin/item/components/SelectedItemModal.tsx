import { Alert, Button, Flex, Form, Input } from 'antd';
import type React from 'react';
import useItemStore from './useItemStore';
import type { AssetsItemUnitDto, ItemDto } from '@api';
import BaseContext from '@/components/BaseContext';
import type { ItemMode } from '@/components/BaseContext/createBaseContext';
import { SysInput } from '@/components/BaseContext/Wrapper/Input';
import SelectCategorys from '../../category/components/SelectCategorys';
import SelectAssets from '../../assets/components/SelectAssets';
import { PlusIcon, TrashIcon } from 'lucide-react';

type SelectedItemModalProps = {
  onOk?: (value: ItemDto, itemMode: ItemMode) => void;
};

const SelectedItemModal: React.FC<SelectedItemModalProps> = (props) => {
  const beforeOk = async (value: ItemDto, itemMode: ItemMode) => {
    value.assets = value.assets?.filter(
      (asset: AssetsItemUnitDto) => asset?.id !== undefined,
    );
    value.category =
      value.category?.id !== undefined ? value.category : undefined;
    value.assets = value.assets?.map((asset: AssetsItemUnitDto) => ({
      id: asset.id,
    }));
    return props.onOk?.(value, itemMode);
  };

  return (
    <BaseContext
      store={useItemStore}
      title={{
        TITLE_CREATE: 'Create Item',
        TITLE_EDIT: 'Edit Item',
        TITLE_VIEW: 'View Item',
        TITLE_DELETE: 'Delete Item',
      }}
      onOk={beforeOk}
      deleteMessage={
        <>
          <Form.Item<ItemDto> name="id" label="Id" hidden>
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
          <Form.Item<ItemDto> name="id" label="Id" hidden>
            <Input placeholder="Enter id" />
          </Form.Item>
          <Alert
            message="Are you sure you want to restore this item?"
            type="success"
          />
        </>
      }
    >
      <Form.Item<ItemDto> name="id" label="Id" hidden>
        <Input placeholder="Enter id" />
      </Form.Item>
      <Form.Item<ItemDto>
        name="name"
        label="Name"
        rules={[{ required: true, message: 'Please enter a name' }]}
      >
        <SysInput placeholder="Enter item name" />
      </Form.Item>
      <Form.Item<ItemDto>
        name="description"
        label="Description"
        rules={[{ required: true, message: 'Please enter description' }]}
      >
        <SysInput placeholder="Enter description" />
      </Form.Item>
      <Form.Item<ItemDto>
        name={['category', 'id']}
        label="Categories"
        rules={[{ required: true, message: 'Please select categories' }]}
      >
        <SelectCategorys />
      </Form.Item>
      <Form.Item<ItemDto> name="assets" label="Assets">
        <Form.List name="assets" initialValue={[{ id: undefined }]}>
          {(fields, { add, remove }) => (
            <>
              <Flex gap={6} vertical>
                {fields.map((field) => (
                  <Flex key={field.key} gap={6}>
                    <Form.Item
                      key={field.key}
                      noStyle
                      isListField
                      name={[field.name, 'id']}
                    >
                      <SelectAssets />
                    </Form.Item>
                    <Button
                      type="dashed"
                      danger
                      onClick={() => remove(field.key)}
                    >
                      <TrashIcon />
                    </Button>
                  </Flex>
                ))}
              </Flex>
              <Button
                className="w-full mt-2"
                type="dashed"
                onClick={() => add({ id: undefined })}
              >
                <PlusIcon /> Add Asset
              </Button>
            </>
          )}
        </Form.List>
      </Form.Item>
    </BaseContext>
  );
};

export default SelectedItemModal;
