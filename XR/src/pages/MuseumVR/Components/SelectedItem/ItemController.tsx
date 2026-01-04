import { useFrame } from '@react-three/fiber';
import React from 'react';
import type { Group } from 'three';
import { useController } from '@/providers/ControllerProvider/useController';
import { SqueezeState } from '@/providers/ControllerProvider/types';

export type ItemControllerProps = {
  itemRef?: React.RefObject<Group>;
};

export default function ItemController({ itemRef }: ItemControllerProps) {
  const { left, right } = useController();
  useFrame(() => {
    if (left.squeeze === SqueezeState.END_PRESS) {
      console.log('end press');
    }
  });
  return <group></group>;
}
