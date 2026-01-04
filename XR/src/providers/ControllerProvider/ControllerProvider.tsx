import React, { useRef } from 'react';
import { ControllerContext } from './context';
import { SqueezeState, type ControllerState } from './types';
import { ControllerUpdater } from './updaters';

type ControllerProps = {
  children: React.ReactNode;
};

export default function ControllerProvider({ children }: ControllerProps) {
  const controllerStateRef = useRef<ControllerState>({
    left: {
      squeeze: SqueezeState.IDLE,
      trigger: SqueezeState.IDLE,
      position: [0, 0, 0],
    },
    right: {
      squeeze: SqueezeState.IDLE,
      trigger: SqueezeState.IDLE,
      position: [0, 0, 0],
    },
  });

  return (
    <ControllerContext.Provider value={controllerStateRef.current}>
      <ControllerUpdater />
      {children}
    </ControllerContext.Provider>
  );
}
