import React, { useRef } from 'react';
import { ControllerContext } from './context';
import { SqueezeState, type ControllerState } from './types';
import { ControllerUpdater } from './updaters';
import { Vector3 } from 'three';
import HandUpdater from './updaters/HandUpdater';

type ControllerProps = {
  children: React.ReactNode;
};

export default function ControllerProvider({ children }: ControllerProps) {
  const controllerStateRef = useRef<ControllerState>({
    left: {
      squeeze: SqueezeState.IDLE,
      trigger: SqueezeState.IDLE,
      position: new Vector3(),
    },
    right: {
      squeeze: SqueezeState.IDLE,
      trigger: SqueezeState.IDLE,
      position: new Vector3(),
    },
  });

  return (
    <ControllerContext.Provider value={controllerStateRef.current}>
      <ControllerUpdater />
      <HandUpdater />
      {children}
    </ControllerContext.Provider>
  );
}
