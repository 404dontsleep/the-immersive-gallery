import { useItemTypeControllerFindAll } from '@api';
import SysItem from './index';
import type { SysItemIdProps } from './type';

export default function SysItemId(props: SysItemIdProps) {
  const { data: itemTypes } = useItemTypeControllerFindAll();
  const itemType = itemTypes?.find((item) => item.id === props.id);
  return (
    <SysItem
      {...props}
      name={itemType?.name}
      description={itemType?.description}
      image={itemType?.symbol}
    />
  );
}
