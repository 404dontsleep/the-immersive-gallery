import { useContext } from 'react';
import { ItemContext } from '.';
import type { ItemContextStore } from '.';

export default function useItemContext(): ItemContextStore {
  const context = useContext(ItemContext);
  if (!context) {
    throw new Error('useItemContext must be used within a ItemContextProvider');
  }
  return context;
}
