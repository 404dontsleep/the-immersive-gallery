import { useRef, useState, useEffect } from 'react';
import { useGLTF, OrbitControls, Environment } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { XR_CONFIG } from '../../config/constants';

interface Item3DViewProps {
  modelUrl: string;
  autoRotate?: boolean;
  enableInteraction?: boolean;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export function Item3DView({
  modelUrl,
  autoRotate = true,
  enableInteraction = true,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: Item3DViewProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const initialRotation = useRef(rotation);

  // Load 3D model
  const { scene } = useGLTF(modelUrl);
  // const scene = useRef<THREE.Group>(null);

  // Handle auto-rotation after inactivity
  useFrame(() => {
    if (!groupRef.current || !autoRotate) return;

    const timeSinceLastInteraction = Date.now() - lastInteractionTime;
    const shouldAutoRotate =
      !isUserInteracting &&
      timeSinceLastInteraction > XR_CONFIG.AUTO_ROTATE_TIMEOUT;

    if (shouldAutoRotate) {
      groupRef.current.rotation.y += XR_CONFIG.AUTO_ROTATE_SPEED * 0.01;
    }
  });

  useEffect(() => {
    if (!enableInteraction) return;

    const handleInteractionStart = () => {
      setIsUserInteracting(true);
      setLastInteractionTime(Date.now());
    };

    const handleInteractionEnd = () => {
      setIsUserInteracting(false);
      setLastInteractionTime(Date.now());
    };

    window.addEventListener('mousedown', handleInteractionStart);
    window.addEventListener('mouseup', handleInteractionEnd);
    window.addEventListener('touchstart', handleInteractionStart);
    window.addEventListener('touchend', handleInteractionEnd);

    return () => {
      window.removeEventListener('mousedown', handleInteractionStart);
      window.removeEventListener('mouseup', handleInteractionEnd);
      window.removeEventListener('touchstart', handleInteractionStart);
      window.removeEventListener('touchend', handleInteractionEnd);
    };
  }, [enableInteraction]);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} />

      <group
        ref={groupRef}
        position={position}
        rotation={initialRotation.current}
        scale={scale}
      >
        <primitive object={scene} />
      </group>

      {enableInteraction && (
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minDistance={0}
          maxDistance={100}
        />
      )}

      <Environment preset="studio" />
    </>
  );
}
