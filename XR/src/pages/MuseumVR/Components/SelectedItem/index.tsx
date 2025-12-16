import { useMenuStore } from '@/stores/menu.store';

export default function SelectedItem() {
  const { selectedItem } = useMenuStore();

  if (!selectedItem) return null;

  return <group></group>;
}
