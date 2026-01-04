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
    position: [number, number, number];
  };
  right: {
    squeeze: SqueezeState;
    trigger: SqueezeState;
    position: [number, number, number];
  };
};
