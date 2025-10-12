import { OrbitControls } from "@react-three/drei";
import { createXRStore, NotInXR, PointerEvents, XR } from "@react-three/xr";
import { OrbitHandles } from "@react-three/handle";
import { Physics } from "@react-three/rapier";
const store = createXRStore({
  frameBufferScaling: 1.3,
});
export default function XRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Physics debug={true} gravity={[0, -0.98, 0]}>
      <XR store={store}>
        {children}
        <NotInXR>
          <OrbitControls />
        </NotInXR>
        <PointerEvents />
        <OrbitHandles />
      </XR>
    </Physics>
  );
}
