import type { GroupProps } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { type Group, Matrix4 } from 'three';
import ItemController from './ItemController';
// import { Line } from '@react-three/drei';
import { useMenuStore } from '@/stores/menu.store';

export type HandleItemProps = {} & GroupProps;
export default function HandleItem({ children, ...props }: HandleItemProps) {
  const itemRef = useRef<Group>(null);
  const { selectedItem, mode } = useMenuStore();

  useEffect(() => {
    if (selectedItem) {
      const matrix = new Matrix4();
      matrix.makeTranslation(0, 1, -1);
      itemRef.current!.matrix.copy(matrix);
    } else {
      const matrix = new Matrix4();
      itemRef.current!.matrix.copy(matrix);
    }
  }, [selectedItem, itemRef, mode]);

  return (
    <>
      <group ref={itemRef} {...props} position={[0, 1, -1]}>
        {children}
        {/* <Line points={[0, 0, 0, 0.3, 0, 0]} color="red" />
        <Line points={[0, 0, 0, 0, 0.3, 0]} color="green" />
        <Line points={[0, 0, 0, 0, 0, 0.3]} color="blue" /> */}
      </group>

      <ItemController itemRef={itemRef} />
    </>
  );
}
