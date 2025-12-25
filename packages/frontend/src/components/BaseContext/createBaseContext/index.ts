import { create } from 'zustand';

const ItemMode = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  RESTORE: 'RESTORE',
} as const;

export type ItemMode = (typeof ItemMode)[keyof typeof ItemMode];
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
export type BaseContextStore<T, W> = {
  data: T[];
  setData: (data: T[]) => void;
  selectedData: T | null;
  setSelectedData: (data: T | null, itemMode: ItemMode) => void;
  itemMode: ItemMode;
  setItemMode: (itemMode: ItemMode) => void;
  filter: DeepPartial<W>;
  setFilter: (filter: DeepPartial<W>) => void;
};
export default function createBaseContext<T, W = unknown>() {
  const store = create<BaseContextStore<T, W>>((set) => ({
    data: [],
    setData: (data: T[]) => set({ data }),
    selectedData: null,
    setSelectedData: (data: T | null, itemMode: ItemMode) =>
      set({ selectedData: data, itemMode }),
    itemMode: ItemMode.VIEW,
    setItemMode: (itemMode: ItemMode) => set({ itemMode }),
    filter: {},
    setFilter: (filter: DeepPartial<W>) => set({ filter }),
  }));

  return store;
}
export { ItemMode };
