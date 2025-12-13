import type { GroupProps } from '@react-three/fiber';

export type PortalProps = {
  children?: React.ReactNode;
} & GroupProps;

export default function Portal({ children, ...props }: PortalProps) {
  return (
    <group {...props}>
      <mesh>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial color="red" />
      </mesh>
      <group>{children}</group>
    </group>
  );
}
