import { PointerEvents, XR } from '@react-three/xr';
import { OrbitHandles } from '@react-three/handle';
import { Physics } from '@react-three/rapier';
import { useXRStore } from './useXRStore';

export default function XRProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Physics debug={true} gravity={[0, -0.98, 0]}>
      <XR store={useXRStore}>
        {children}
        <PointerEvents />
        <OrbitHandles />
      </XR>
    </Physics>
  );
}
