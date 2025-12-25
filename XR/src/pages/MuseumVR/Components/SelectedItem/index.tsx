import { AssetsItemType } from '@/shared/api';
import { useMenuStore } from '@/stores/menu.store';
import { Gltf } from '@react-three/drei';
import { useMemo } from 'react';

export default function SelectedItem() {
  const { selectedItem } = useMenuStore();

  const itemModelUrl = useMemo(() => {
    const assets = selectedItem?.assets.find(
      (asset) => asset.type === AssetsItemType.model,
    );
    return assets
      ? `${import.meta.env.VITE_API_URL}/api/public/assets-items/${assets.id}/stream`
      : null;
  }, [selectedItem?.assets]);
  if (!selectedItem) return null;

  return <group>{itemModelUrl && <Gltf src={itemModelUrl} />}</group>;
}
