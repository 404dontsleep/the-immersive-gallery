import type { SysMarkdownComponents } from './defineComponents';
import ItemMarkdown from './ItemMarkdown';

const components = [ItemMarkdown];

const componentsMap = components.reduce<
  Record<string, (args: SysMarkdownComponents) => React.ReactNode>
>((acc, component) => {
  if (component.prototype.className) {
    acc[component.prototype.className] = component;
  }
  return acc;
}, {});

export default componentsMap;
