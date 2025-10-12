import { useRef, useState } from "react";
import ItemInfo from "../uis/ItemInfo";
import { defaultApply, Handle, HandleTarget } from "@react-three/handle";
import type { Group } from "three";
type ItemViewProps = {
  children?: React.ReactNode;
};
export default function ItemView({ children }: ItemViewProps) {
  const textRef = useRef<string>("");
  const groupRef = useRef<Group>(null);
  return (
    <group position={[0, 1, -0.5]}>
      <group position={[0, -0.1, 0.1]}>
        <HandleTarget>
          <Handle
            apply={(state, target) => {
              defaultApply(state, target);
              target.position.x = Math.max(
                Math.min(target.position.x, 0.1),
                -0.1,
              );
              const norm = target.position.x / 0.1;
              groupRef.current!.rotation.y = norm * Math.PI;
            }}
            translate="x"
            scale={{ uniform: true }}
            rotate={{ x: false, y: false, z: false }}
            targetRef="from-context"
            stopPropagation
          >
            <mesh>
              <sphereGeometry args={[0.01, 32, 32]} />
              <meshNormalMaterial />
            </mesh>
          </Handle>
        </HandleTarget>
      </group>
      <group ref={groupRef}>{children}</group>
      <group position={[0, 0.2, 0]}>
        <ItemInfo description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
      </group>
    </group>
  );
}
