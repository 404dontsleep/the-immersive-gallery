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
import SelectedItem from './Components/SelectedItem';
import { ItemContextProvider } from '@/stores/ItemContext/item.store';

setPreferredColorScheme('light');

export function MuseumVRPage() {
  const { orbitControlsMap } = useUserEventStore();

  const isOrbitControlsEnabled = useMemo(() => {
    return Array.from(orbitControlsMap.values()).every((e) => e === false);
  }, [orbitControlsMap]);

  return (
    <ItemContextProvider>
      <div className="museum-vr-page">
        <Canvas
          gl={{
            antialias: true,
            localClippingEnabled: true,
          }}
        >
          <XR store={xrStore}>
            <XROrigin>
              <MuseumRoom />
              <SelectedItem />
              <WrapperMenu />

              <CameraControls enabled={isOrbitControlsEnabled} />
            </XROrigin>
          </XR>
        </Canvas>
      </div>
    </ItemContextProvider>
  );
}
