import { Badge, Card, Dropdown, List } from 'antd';
import { BellDotIcon } from 'lucide-react';

export default function NotificationDropdown() {
  return (
    <Dropdown
      trigger={['click']}
      popupRender={() => (
        <div className="pt-3 w-sm">
          <Card title="Notifications">
            <List size="small">
              <List.Item>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </List.Item>
            </List>
          </Card>
        </div>
      )}
    >
      <Badge count={10}>
        <BellDotIcon />
      </Badge>
    </Dropdown>
  );
}
