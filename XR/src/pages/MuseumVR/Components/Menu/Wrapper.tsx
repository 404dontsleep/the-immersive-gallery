import { IfInSessionMode } from '@react-three/xr';
import XRProvider from './XRProvider';
import Menu from '.';
import WebProvider from './WebProvider';
import { Defaults } from '@react-three/uikit-default';
import { colors } from '@react-three/uikit-default';

export default function WrapperMenu() {
  return (
    <Defaults {...colors}>
      <IfInSessionMode allow={['immersive-vr', 'immersive-ar']}>
        <XRProvider>
          <Menu />
        </XRProvider>
      </IfInSessionMode>
      <IfInSessionMode deny={['immersive-vr', 'immersive-ar']}>
        <WebProvider>
          <Menu />
        </WebProvider>
      </IfInSessionMode>
    </Defaults>
  );
}
