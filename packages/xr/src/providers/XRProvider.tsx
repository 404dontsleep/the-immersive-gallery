import { PointerEvents, XR } from '@react-three/xr';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import { xrStore } from '@/stores/xr.store';
export default function XRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Physics debug={true} gravity={[0, -0.98, 0]}>
      <XR store={xrStore}>
        {children}
        <PointerEvents />
        <OrbitControls />
      </XR>
    </Physics>
  );
}
