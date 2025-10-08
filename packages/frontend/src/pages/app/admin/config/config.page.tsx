import {
  sysConfigControllerCreate,
  sysConfigControllerUpdate,
  useSysConfigControllerFindAll,
  type SysConfigDto,
} from '@api';
import { Button, Collapse, Flex, Typography } from 'antd';

import { Card, Layout } from 'antd';
import SelectedConfigModal from './components/SelectedConfigModal';
import { ItemMode } from '@/components/BaseContext/createBaseContext';
import { EditIcon } from 'lucide-react';
import useConfigStore from './components/useConfigStore';
import UnitValue from './components/UnitValue';

export default function ConfigPage() {
  const { data: configs, mutate: mutateConfigs } =
    useSysConfigControllerFindAll();

  const { setSelectedData } = useConfigStore();
  const handleOk = (value: SysConfigDto, itemMode: ItemMode) => {
    if (itemMode === ItemMode.CREATE) {
      return sysConfigControllerCreate(value).then(() => {
        mutateConfigs();
      });
    }
    if (itemMode === ItemMode.EDIT) {
      return sysConfigControllerUpdate(value.id, value).then(() => {
        mutateConfigs();
      });
    }
  };
  return (
    <Layout className="h-full">
      <Card
        title="Config"
        className="flex flex-col h-full"
        classNames={{
          body: 'h-full overflow-y-auto my-2',
        }}
      >
        <Collapse>
          {configs?.map((config) => (
            <Collapse.Panel
              extra={
                <Button
                  type="text"
                  size="small"
                  onClick={() => setSelectedData(config, ItemMode.EDIT)}
                >
                  <Typography.Text type="secondary">
                    <EditIcon />
                  </Typography.Text>
                </Button>
              }
              header={
                <Flex vertical gap={4}>
                  <Typography.Text>{config.key}</Typography.Text>
                  <Typography.Text type="secondary">
                    {config.description}
                  </Typography.Text>
                </Flex>
              }
              key={config.id}
            >
              <UnitValue
                value={config.value}
                options={{
                  readOnly: true,
                }}
              />
            </Collapse.Panel>
          ))}
        </Collapse>
        <SelectedConfigModal onOk={handleOk} />
      </Card>
    </Layout>
  );
}
