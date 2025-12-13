import type { ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { XR, createXRStore } from '@react-three/xr';

interface XRProviderProps {
  children: ReactNode;
}

export function XRProvider({ children }: XRProviderProps) {
  return <>{children}</>;
}

interface XRCanvasProps {
  children: ReactNode;
  xrEnabled?: boolean;
}

const xrStore = createXRStore();

export function XRCanvas({ children, xrEnabled = false }: XRCanvasProps) {
  if (!xrEnabled) {
    return (
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </Canvas>
    );
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ width: '100%', height: '100%' }}
    >
      <XR store={xrStore}>{children}</XR>
    </Canvas>
  );
}
