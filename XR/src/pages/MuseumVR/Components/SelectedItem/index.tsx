import HandleItem from './HandleItem';

export default function SelectedItem() {
  return (
    <group>
      <HandleItem>
        <mesh>
          <boxGeometry args={[0.1, 0.1, 0.1]} />
          <meshStandardMaterial color="red" transparent opacity={0} />
        </mesh>
      </HandleItem>
    </group>
  );
}
