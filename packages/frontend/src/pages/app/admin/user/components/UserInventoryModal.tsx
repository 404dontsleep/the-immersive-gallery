import {
  useItemTypeControllerFindAll,
  useUserControllerFindOneWithInventories,
  type InventoriesUnitDto,
  type UserInventoriesDto,
} from '@api';
import { Button, Flex, InputNumber, Modal, Select, Row, Col } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { SysDatePicker } from '@/components/BaseContext/Wrapper/DatePicker';

type UserInventoryModalProps = {
  userId?: number;
  onOk?: (value: UserInventoriesDto) => void;
  onCancel?: () => void;
};

const UserInventoryModal: React.FC<UserInventoryModalProps> = ({
  userId,
  onOk,
  onCancel,
}) => {
  const { data: user, mutate: mutateUser } =
    useUserControllerFindOneWithInventories(userId ?? 0);
  const { data: itemTypes } = useItemTypeControllerFindAll();
  const [inventories, setInventories] = useState<
    (InventoriesUnitDto | undefined)[]
  >([]);

  // Lấy danh sách itemType từ user?.inventories
  const itemTypeOptions = useMemo(() => {
    const allItemTypes =
      itemTypes?.map((item) => ({
        label: item.name,
        value: item.id,
      })) ?? [];
    // Loại bỏ trùng lặp theo id
    const unique = new Map();
    allItemTypes.forEach((item) => {
      if (item.value) unique.set(item.value, item);
    });
    return Array.from(unique.values());
  }, [itemTypes]);

  useEffect(() => {
    setInventories(
      user?.inventories?.map((inv) => ({
        action: 'set',
        itemId: inv.itemType?.id,
        quantity: inv.quantity,
        expirationDate: inv.expirationDate,
      })) ?? [
        {
          action: 'set',
          itemId: itemTypeOptions[0]?.value ?? 0,
          quantity: 1,
        },
      ],
    );
  }, [itemTypeOptions, user]);

  const handleAddInventory = () => {
    setInventories([
      ...inventories,
      {
        action: 'set',
        itemId: itemTypeOptions[0]?.value ?? 0,
        quantity: 1,
      },
    ]);
  };

  const handleChangeInventory = (
    index: number,
    key: keyof InventoriesUnitDto,
    value: unknown,
  ) => {
    setInventories(
      inventories.map((inv, i) =>
        i === index ? { ...inv, [key]: value } : inv,
      ) as InventoriesUnitDto[],
    );
  };

  const handleRemoveInventory = (index: number) => {
    setInventories(inventories.filter((_, i) => i !== index));
  };

  const handleOk = async () => {
    // Lọc bỏ undefined và các inventory không hợp lệ
    const filtered = inventories.filter(
      (inv) => inv && inv.itemId,
    ) as InventoriesUnitDto[];
    await Promise.resolve(
      onOk?.({
        inventories: filtered.map((inv) => ({
          action: inv.action,
          itemId: inv.itemId,
          quantity: inv.quantity,
          expirationDate: inv.expirationDate,
        })),
      }),
    ).then(() => {
      mutateUser();
      onCancel?.();
    });
  };

  return (
    <Modal
      //   destroyOnHidden
      title="User Inventory"
      open={!!userId}
      onCancel={onCancel}
      onOk={handleOk}
      width={700}
    >
      <Flex gap={6} vertical>
        {inventories.map((inv, index) => (
          <Row key={index} gutter={6}>
            <Col span={9}>
              <Select
                className="w-full"
                placeholder="Chọn Item"
                options={itemTypeOptions}
                value={inv?.itemId}
                onChange={(value) =>
                  handleChangeInventory(index, 'itemId', value)
                }
                showSearch
                optionFilterProp="label"
              />
            </Col>
            <Col span={6}>
              <InputNumber
                min={0}
                className="w-full"
                value={inv?.quantity}
                onChange={(value) =>
                  handleChangeInventory(index, 'quantity', value ?? 1)
                }
                placeholder="Số lượng"
              />
            </Col>
            <Col span={6}>
              <SysDatePicker
                className="w-full"
                value={inv?.expirationDate ?? null}
                onChange={(date) =>
                  handleChangeInventory(index, 'expirationDate', date ?? null)
                }
                placeholder="Ngày hết hạn"
                format="YYYY-MM-DD"
              />
            </Col>
            <Col span={3}>
              <Button
                className="w-full"
                type="dashed"
                danger
                onClick={() => handleRemoveInventory(index)}
              >
                Xóa
              </Button>
            </Col>
          </Row>
        ))}
        <Button type="dashed" onClick={handleAddInventory}>
          Thêm vật phẩm
        </Button>
      </Flex>
    </Modal>
  );
};

export default UserInventoryModal;
