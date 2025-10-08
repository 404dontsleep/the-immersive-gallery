import { Alert, Flex } from 'antd';
import type { SysMarkdownComponents } from './defineComponents';
import SysItem, { type SysItemProps } from '../../Item';

export default function ItemMarkdown({ children }: SysMarkdownComponents) {
  try {
    const item = JSON.parse(children);
    return (
      <Flex className="overflow-auto w-full" wrap gap={10}>
        {item.map((item: SysItemProps, index: number) => (
          <SysItem key={index} {...item} />
        ))}
      </Flex>
    );
  } catch (e) {
    return (
      <Flex>
        <Alert message={(e as Error).message} type="error" />
      </Flex>
    );
  }
}

ItemMarkdown.prototype.className = 'language-item';
