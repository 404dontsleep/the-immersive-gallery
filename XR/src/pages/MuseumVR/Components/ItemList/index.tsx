import type { Item } from '@/types';
import WebItemList from './WebItemList';
import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { itemsService } from '@/services/items.service';
import { useUserEventStore } from '@/stores/event.store';

export default function ItemList() {
  const [items, setItems] = useState<Item[]>([]);
  const { setOrbitControls, orbitControlsMap } = useUserEventStore();
  const onItemClick = (item: Item) => {
    console.log(item);
  };

  useEffect(() => {
    itemsService.getItems().then((items) => {
      setItems(items);
    });
  }, []);

  const onShowItemList = (isShow: boolean) => {
    setOrbitControls('item-list', isShow);
  };

  const isShowItemList = useMemo(() => {
    return orbitControlsMap.get('item-list') || false;
  }, [orbitControlsMap]);

  return (
    <WebItemList
      items={items}
      onItemClick={onItemClick}
      onShowItemList={onShowItemList}
      isShowItemList={isShowItemList}
    />
  );
}
