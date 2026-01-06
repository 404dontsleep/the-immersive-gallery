import { Environment } from '@react-three/drei';
import { IfInSessionMode } from '@react-three/xr';

export default function MuseumRoom() {
  return (
    <group>
      <IfInSessionMode deny={['immersive-ar']}>
        <Environment
          preset="dawn"
          background={true}
          environmentIntensity={0.5}
          backgroundBlurriness={0.3}
        />
      </IfInSessionMode>
      <IfInSessionMode allow={['immersive-ar']}>
        {' '}
        <Environment
          preset="dawn"
          background={false}
          environmentIntensity={0.5}
          backgroundBlurriness={0.3}
        />{' '}
      </IfInSessionMode>
    </group>
  );
}
