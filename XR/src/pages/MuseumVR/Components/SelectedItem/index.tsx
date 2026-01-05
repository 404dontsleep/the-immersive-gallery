import { useMenuStore } from '@/stores/menu.store';
import HandleItem from './HandleItem';
import { useMemo } from 'react';
import { AssetsItemType } from '@/shared/api';
import { Gltf } from '@react-three/drei';

export default function SelectedItem() {
  const { selectedItem } = useMenuStore();

  const assetModel = useMemo(() => {
    if (!selectedItem) return null;
    const asset = selectedItem.assets.find(
      (asset) => asset.type === AssetsItemType.model,
    );
    if (!asset) return null;
    return `${import.meta.env.VITE_API_URL}/api/public/assets-items/${asset.id}/stream`;
  }, [selectedItem]);

  if (!assetModel) return null;

  return (
    <group>
      <HandleItem>
        {/* <mesh>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="red" transparent opacity={0} />
        </mesh> */}
        <Gltf src={assetModel} />
      </HandleItem>
    </group>
  );
}
