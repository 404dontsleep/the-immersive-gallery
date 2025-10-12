import { Trail } from "@react-three/drei";
import { useXRInputSourceState, XRSpace } from "@react-three/xr";
import ItemInfo from "../uis/ItemInfo";
import Group from "../override/Group";
import ItemView from "../3d/ItemView";

export default function TestScene() {
  const hand = useXRInputSourceState("hand", "right");
  const array: Partial<{
    [key in XRHandJoint]: number;
  }> = {
    // "thumb-metacarpal": 0,
    // "index-finger-metacarpal": 1,
    // "index-finger-phalanx-proximal": 2,
    // "index-finger-phalanx-distal": 3,
    "index-finger-tip": 4,
    // "middle-finger-metacarpal": 5,
    // "middle-finger-phalanx-proximal": 6,
    // "middle-finger-phalanx-distal": 7,
    "middle-finger-tip": 8,
    // "ring-finger-metacarpal": 9,
    // "ring-finger-phalanx-proximal": 10,
    // "ring-finger-phalanx-distal": 11,
    "ring-finger-tip": 12,
    // "index-finger-phalanx-intermediate": 13,
    // "middle-finger-phalanx-intermediate": 14,
    // "ring-finger-phalanx-intermediate": 15,
    // "pinky-finger-metacarpal": 16,
    // "pinky-finger-phalanx-proximal": 17,
    // "pinky-finger-phalanx-distal": 18,
    "pinky-finger-tip": 19,
    // "pinky-finger-phalanx-intermediate": 20,
    // wrist: 21,
    // "thumb-phalanx-distal": 11,
    "thumb-tip": 11,
    // "thumb-phalanx-proximal": 11,
  };
  const qq = Object.keys(array)
    .map((key) => {
      return hand?.inputSource.hand.get(key as XRHandJoint);
    })
    .filter(Boolean) as XRJointSpace[];

  return (
    <>
      <group>
        <ItemView>
          <mesh>
            <boxGeometry args={[0.1, 0.1, 0.1]} />
            <meshNormalMaterial />
          </mesh>
        </ItemView>
      </group>
      {/* <XRSpace space={"viewer"}>
        <Group position={[0, 0, -0.5]} pointerEventsType={{ deny: "grab" }}>
          <ItemInfo description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
        </Group>
      </XRSpace> */}
      {/* {qq.map((a) => (
        <XRSpace space={a}>
          <Trail width={0.1}>
            <mesh position={[0, 0, -0.1]}>
              <sphereGeometry args={[0.01, 16, 16]} />
              <meshNormalMaterial />
              <pointLight intensity={0.01} />
            </mesh>
          </Trail>
        </XRSpace>
      ))} */}
    </>
  );
}
