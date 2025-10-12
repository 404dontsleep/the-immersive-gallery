import { useFrame, type GroupProps } from "@react-three/fiber";
import { useRef, useState } from "react";
import { Quaternion, Vector3 } from "three";

import * as random from "maath/random";
import * as buffer from "maath/buffer";
import * as misc from "maath/misc";
import { Points } from "@react-three/drei";

const rotationAxis = new Vector3(0, 0, 1).normalize();
const q = new Quaternion();

const SIZE = {
  WIDTH: 5,
  HEIGHT: 3,
  DEPTH: 6,
  WALL_THICKNESS: 0.01,
};
const walls: {
  position: GroupProps["position"];
  rotation: GroupProps["rotation"];
  size: [number, number, number];
}[] = [
  {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    size: [SIZE.WIDTH, SIZE.WALL_THICKNESS, SIZE.DEPTH],
  }, // floor
  {
    position: [0, SIZE.HEIGHT, 0],
    rotation: [0, 0, 0],
    size: [SIZE.WIDTH, SIZE.WALL_THICKNESS, SIZE.DEPTH],
  }, // top
  {
    position: [SIZE.WIDTH / 2, SIZE.HEIGHT / 2, 0],
    rotation: [0, 0, 0],
    size: [SIZE.WALL_THICKNESS, SIZE.HEIGHT, SIZE.DEPTH],
  }, // right
  {
    position: [0, SIZE.HEIGHT / 2, -SIZE.DEPTH / 2],
    rotation: [0, 0, 0],
    size: [SIZE.WIDTH, SIZE.HEIGHT, SIZE.WALL_THICKNESS],
  }, // back
  // {
  //   position: [-SIZE.WIDTH / 2, SIZE.HEIGHT / 2, 0],
  //   rotation: [0, 0, 0],
  //   size: [SIZE.WALL_THICKNESS, SIZE.HEIGHT, SIZE.DEPTH],
  // }, // left
  // {
  //   position: [0, SIZE.HEIGHT / 2, SIZE.DEPTH / 2],
  //   rotation: [0, 0, 0],
  //   size: [SIZE.WIDTH, SIZE.HEIGHT, SIZE.WALL_THICKNESS],
  // }, // front
];
// Hàm này tạo ra các điểm theo đường hình sin trên một vòng tròn
// Hàm này tạo ra các điểm theo đường hình sin trên một vòng tròn và trả về dưới dạng ArrayBuffer (Float32Array)
function generatePoints({
  numPoints = 200,
  radius = 1,
  offset = 0.1,
  frequency = 10,
  start = 0,
}: {
  numPoints?: number;
  radius?: number;
  offset?: number;
  frequency?: number;
  start?: number;
} = {}): ArrayBuffer {
  const points = new Float32Array(numPoints * 3);
  for (let i = 0; i < numPoints; i++) {
    const t = (i / numPoints) * Math.PI * 2 + start;
    const x =
      Math.cos(t) * radius + Math.cos(t) * offset * Math.sin(t * frequency);
    const z = Math.cos(t * frequency) * offset;
    const y =
      Math.sin(t) * radius + Math.sin(t) * offset * Math.sin(t * frequency);
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points.buffer;
}
const length = 3600;
const arr_360 = Array.from({ length: length }, (_, i) => i).map((i) => {
  return new Float32Array(
    generatePoints({
      numPoints: 200,
      radius: 0.1,
      offset: 0.03,
      frequency: 30,
      start: (i / length) * Math.PI * 2,
    }),
  );
});
export default function MuseumScene() {
  const [{ final }] = useState(() => {
    const final = arr_360[0];

    return { final };
  });

  useFrame(({ clock }) => {
    const et = clock.getElapsedTime();
    const t = Math.floor(et * 100) % length;
    const next_t = (t + 20) % length;
    buffer.lerp(arr_360[t], arr_360[next_t], final, 1);
    buffer.rotate(final, {
      q: q.setFromAxisAngle(rotationAxis, et * 0.01),
    });
  });

  return (
    <group>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.6} castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.6} castShadow />
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[SIZE.WIDTH, SIZE.DEPTH]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>
      {walls.map((wall, index) => (
        <mesh
          key={index}
          position={wall.position}
          rotation={wall.rotation}
          receiveShadow
        >
          <boxGeometry args={wall.size} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
      ))}
      <group name="exhibit" position={[0, 0, -1]}>
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.4, 0.7, 0.4]} />
          <meshPhongMaterial color="#ffffff" />
        </mesh>
        <group position={[0, 0.9, 0]}>
          <Points positions={final as Float32Array}>
            <pointsMaterial size={0.01} />
          </Points>
          <mesh castShadow receiveShadow>
            <torusGeometry args={[0.1, 0.02, 16, 64]} />
            <meshNormalMaterial />
          </mesh>
        </group>
      </group>
    </group>
  );
}
