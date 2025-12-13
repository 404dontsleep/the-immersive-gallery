import Portal, { type PortalProps } from '../Components/Portal';

export default function DongSonDrum(props: PortalProps) {
  return (
    <Portal {...props}>
      <mesh>
        <cylinderGeometry args={[0.5, 0.5, 1, 32]} />
        <meshStandardMaterial />
      </mesh>
    </Portal>
  );
}
