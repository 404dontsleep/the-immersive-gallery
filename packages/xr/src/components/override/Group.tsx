import { type GroupProps } from "@react-three/fiber";

type OverrideGroupProps = GroupProps & {
  pointerEventsType?: {
    deny?: "grab" | "touch" | "ray" | "all";
  };
};

export default function Group(props: OverrideGroupProps) {
  return <group {...props} />;
}
