import { AssetsItemType } from '@/shared/api';
import { useMenuStore } from '@/stores/menu.store';
import { Box, Gltf } from '@react-three/drei';
import { Handle, HandleTarget } from '@react-three/handle';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

export default function SelectedItem() {
  const { selectedItem } = useMenuStore();
  const handleTargetRef = useRef<THREE.Object3D>(null);

  const itemModelUrl = useMemo(() => {
    const assets = selectedItem?.assets.find(
      (asset) => asset.type === AssetsItemType.model,
    );

    if (handleTargetRef.current) {
      handleTargetRef.current.position.set(0, 1, -0.5);
    }

    return assets
      ? `${import.meta.env.VITE_API_URL}/api/public/assets-items/${assets.id}/stream`
      : null;
  }, [selectedItem?.assets]);

  const Model = useMemo(() => {
    if (!itemModelUrl) return null;
    return <Gltf src={itemModelUrl} />;
  }, [itemModelUrl]);

  if (!selectedItem) return null;

  return (
    <group>
      <HandleTarget ref={handleTargetRef}>
        <Handle targetRef="from-context">
          <mesh>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshStandardMaterial color="red" transparent opacity={0} />
          </mesh>
        </Handle>
        <group>{Model}</group>
      </HandleTarget>
    </group>
  );
}
