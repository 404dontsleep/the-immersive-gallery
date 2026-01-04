import type { GroupProps } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import ItemController from './ItemController';

export type HandleItemProps = {} & GroupProps;
export default function HandleItem({ children, ...props }: HandleItemProps) {
  const itemRef = useRef<Group>(null);

  return (
    <>
      <group ref={itemRef} {...props}>
        {children}
      </group>

      <ItemController itemRef={itemRef} />
    </>
  );
}
