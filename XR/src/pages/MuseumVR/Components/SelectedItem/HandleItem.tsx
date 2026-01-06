import type { GroupProps } from '@react-three/fiber';
import { useRef } from 'react';
import type { Group } from 'three';
import ItemController from './ItemController';
// import { Line } from '@react-three/drei';

export type HandleItemProps = {} & GroupProps;
export default function HandleItem({ children, ...props }: HandleItemProps) {
  const itemRef = useRef<Group>(null);

  return (
    <>
      <group ref={itemRef} {...props}>
        {children}
        {/* <Line points={[0, 0, 0, 0.3, 0, 0]} color="red" />
        <Line points={[0, 0, 0, 0, 0.3, 0]} color="green" />
        <Line points={[0, 0, 0, 0, 0, 0.3]} color="blue" /> */}
      </group>

      <ItemController itemRef={itemRef} />
    </>
  );
}
