import './MuseumVR.css';
import { CameraControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { XR, XROrigin } from '@react-three/xr';
import { xrStore } from '@/stores/xr.store';
import { useUserEventStore } from '@/stores/event.store';
import { useMemo } from 'react';
import MuseumRoom from './Components/MuseumRoom';
import WrapperMenu from './Components/Menu/Wrapper';
import { setPreferredColorScheme } from '@react-three/uikit';

setPreferredColorScheme('light');

export function MuseumVRPage() {
  const { orbitControlsMap } = useUserEventStore();

  const isOrbitControlsEnabled = useMemo(() => {
    return Array.from(orbitControlsMap.values()).every((e) => e === false);
  }, [orbitControlsMap]);

  return (
    <div className="museum-vr-page">
      <Canvas
        gl={{
          antialias: true,
          localClippingEnabled: true,
        }}
      >
        <XR store={xrStore}>
          <XROrigin>
            <ambientLight intensity={0.4} />
            <directionalLight
              position={[5, 10, 5]}
              intensity={0.8}
              castShadow
            />

            <MuseumRoom />

            {/* <group position={[0, 0, 0]}>
            <DongSonDrum position={[0, 0.5, 0]} />
          </group> */}

            {/* <ItemList /> */}
            <WrapperMenu />

            <CameraControls enabled={isOrbitControlsEnabled} />
          </XROrigin>
        </XR>
      </Canvas>
    </div>
  );
}
