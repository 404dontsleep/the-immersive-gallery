import { Environment } from '@react-three/drei';

export default function MuseumRoom() {
  return (
    <group>
      <Environment
        preset="dawn"
        background={true}
        environmentIntensity={0.5}
        backgroundBlurriness={0.3}
      />
    </group>
  );
}
