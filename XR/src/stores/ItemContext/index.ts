import { createContext } from 'react';
import type { Item, Category, AssetsItem } from '@/shared/api';

export interface ItemContextStore {
  items: Item[];
  setItems: (items: Item[]) => void;
  categories: Category[];
  assets: AssetsItem[];
  setCategories: (categories: Category[]) => void;
  setAssets: (assets: AssetsItem[]) => void;
}

export const ItemContext = createContext<ItemContextStore | undefined>(
  undefined,
);
