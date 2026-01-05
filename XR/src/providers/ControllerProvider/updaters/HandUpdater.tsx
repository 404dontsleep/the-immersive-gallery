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

export default function HandUpdater() {
  const controllerStateRef = useController();

  const handLeft = useXRInputSourceState('hand', 'left');
  const handRight = useXRInputSourceState('hand', 'right');

  useFrame(() => {
    if (handLeft == null || handRight == null) {
      return;
    }
    const squeezeLeft =
      (handLeft?.inputSource?.gamepad?.buttons[0].value ?? 0) === 0
        ? 'default'
        : 'pressed';
    const squeezeRight =
      (handRight?.inputSource?.gamepad?.buttons[0].value ?? 0) === 0
        ? 'default'
        : 'pressed';

    if (
      (squeezeLeft === 'default' || squeezeLeft === 'pressed') &&
      (squeezeRight === 'default' || squeezeRight === 'pressed')
    ) {
      controllerStateRef.left.squeeze =
        stateMap[squeezeLeft][controllerStateRef!.left.squeeze];
      controllerStateRef!.right.squeeze =
        stateMap[squeezeRight][controllerStateRef!.right.squeeze];
    }

    controllerStateRef.left.position?.copy(
      handLeft.object?.getWorldPosition(new Vector3()) ?? new Vector3(),
    );
    controllerStateRef.right.position?.copy(
      handRight.object?.getWorldPosition(new Vector3()) ?? new Vector3(),
    );
  });
  return null;
}
