import { useFrame } from '@react-three/fiber';
import { useXRInputSourceState } from '@react-three/xr';
import { SqueezeState } from '../types';
import { useController } from '../useController';
import { Vector3 } from 'three';

const stateMap: Record<
  'default' | 'pressed',
  Record<SqueezeState, SqueezeState>
> = {
  default: {
    [SqueezeState.IDLE]: SqueezeState.IDLE,
    [SqueezeState.END_PRESS]: SqueezeState.IDLE,
    [SqueezeState.START_PRESS]: SqueezeState.END_PRESS,
    [SqueezeState.PRESSED]: SqueezeState.END_PRESS,
  },
  pressed: {
    [SqueezeState.IDLE]: SqueezeState.START_PRESS,
    [SqueezeState.START_PRESS]: SqueezeState.PRESSED,
    [SqueezeState.PRESSED]: SqueezeState.PRESSED,
    [SqueezeState.END_PRESS]: SqueezeState.START_PRESS,
  },
};

export default function ControllerUpdater() {
  const controllerStateRef = useController();

  const controllerLeft = useXRInputSourceState('controller', 'left');
  const controllerRight = useXRInputSourceState('controller', 'right');

  useFrame(() => {
    if (controllerLeft == null || controllerRight == null) {
      return;
    }
    const squeezeLeft = controllerLeft.gamepad['xr-standard-squeeze'];
    const squeezeRight = controllerRight.gamepad['xr-standard-squeeze'];
    if (
      (squeezeLeft?.state === 'default' || squeezeLeft?.state === 'pressed') &&
      (squeezeRight?.state === 'default' || squeezeRight?.state === 'pressed')
    ) {
      controllerStateRef.left.squeeze =
        stateMap[squeezeLeft.state][controllerStateRef!.left.squeeze];
      controllerStateRef!.right.squeeze =
        stateMap[squeezeRight.state][controllerStateRef!.right.squeeze];
    }

    const triggerLeft = controllerLeft.gamepad['xr-standard-trigger'];
    const triggerRight = controllerRight.gamepad['xr-standard-trigger'];
    if (triggerLeft?.state === 'default' || triggerLeft?.state === 'pressed') {
      controllerStateRef!.left.trigger =
        stateMap[triggerLeft.state][controllerStateRef!.left.trigger];
    }
    if (
      triggerRight?.state === 'default' ||
      triggerRight?.state === 'pressed'
    ) {
      controllerStateRef!.right.trigger =
        stateMap[triggerRight.state][controllerStateRef!.right.trigger];
    }

    controllerStateRef.left.position?.copy(
      controllerLeft.object?.getWorldPosition(new Vector3()) ?? new Vector3(),
    );
    controllerStateRef.right.position?.copy(
      controllerRight.object?.getWorldPosition(new Vector3()) ?? new Vector3(),
    );
  });
  return null;
}
