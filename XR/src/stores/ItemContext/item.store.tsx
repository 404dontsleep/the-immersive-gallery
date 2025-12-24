import type { Category, AssetsItem, Item } from '@/shared/api';
import { useCallback, useEffect, useState } from 'react';
import itemService from './item.service';
import { ItemContext } from '.';

export function ItemContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const [items, setItems] = useState<Item[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [assets, setAssets] = useState<AssetsItem[]>([]);

  const fetchItems = useCallback(async () => {
    const response = await itemService.getItems();
    const categories = await itemService.getCategories();
    const assets = await itemService.getAssetsItems();
    setItems(response);
    setCategories(categories);
    setAssets(assets);
  }, []);

  const fetchCategories = useCallback(async () => {
    const response = await itemService.getCategories();
    setCategories(response);
  }, []);

  const fetchAssetsItems = useCallback(async () => {
    const response = await itemService.getAssetsItems();
    setAssets(response);
  }, []);

  useEffect(() => {
    fetchItems();
    fetchCategories();
    fetchAssetsItems();
  }, [fetchItems, fetchCategories, fetchAssetsItems]);

  return (
    <ItemContext.Provider
      value={{
        items,
        setItems,
        categories,
        assets,
        setCategories,
        setAssets,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
}
