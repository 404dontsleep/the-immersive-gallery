import { MenuMode, useMenuStore } from '@/stores/menu.store';
import { Line } from '@react-three/drei';
import { Root } from '@react-three/uikit';
import { XRSpace, useXRInputSourceState } from '@react-three/xr';
import { useEffect } from 'react';

export type XRProviderProps = {
  children: React.ReactNode;
};

const CONFIG_SPACE: Record<
  string,
  { position: [number, number, number]; rotation: [number, number, number] }
> = {
  HAND: {
    position: [0, 0, 0],
    rotation: [-Math.PI / 2, 0, -Math.PI / 2] as [number, number, number],
  },
  CONTROLLER: {
    position: [0, 0, 0],
    rotation: [0, 0, -Math.PI / 2],
  },
};

export default function XRProvider({ children }: XRProviderProps) {
  const { setMode } = useMenuStore();
  useEffect(() => {
    setMode(MenuMode.XR);

    return () => {
      setMode(MenuMode.WEB);
    };
  }, [setMode]);

  const leftHand = useXRInputSourceState('hand', 'left');
  const leftController = useXRInputSourceState('controller', 'left');
  const space =
    leftHand?.inputSource?.gripSpace ??
    leftController?.inputSource?.gripSpace ??
    null;

  if (space == null) {
    return null;
  }

  const configSpace =
    CONFIG_SPACE[leftHand?.inputSource?.gripSpace ? 'HAND' : 'CONTROLLER'];

  if (configSpace == null) {
    return null;
  }

  return (
    <XRSpace space={space}>
      <group position={configSpace.position} rotation={configSpace.rotation}>
        <Line points={[0, 0, 0, 0.1, 0, 0]} color="red" />
        <Line points={[0, 0, 0, 0, 0.1, 0]} color="green" />
        <Line points={[0, 0, 0, 0, 0, 0.1]} color="blue" />
        <group position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <group position={[0.2, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <Root sizeX={0.4} sizeY={0.4} pixelSize={0.0005}>
              {children}
            </Root>
          </group>
        </group>
      </group>
    </XRSpace>
  );
}
