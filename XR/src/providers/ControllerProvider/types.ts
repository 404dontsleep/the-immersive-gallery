import { Vector3 } from 'three';

export enum SqueezeState {
  IDLE = 'idle',
  START_PRESS = 'startPress',
  PRESSED = 'pressed',
  END_PRESS = 'endPress',
}

export type ControllerState = {
  left: {
    squeeze: SqueezeState;
    trigger: SqueezeState;
    position: Vector3;
  };
  right: {
    squeeze: SqueezeState;
    trigger: SqueezeState;
    position: Vector3;
  };
};
