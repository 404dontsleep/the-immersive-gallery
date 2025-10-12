import { Canvas } from "@react-three/fiber";
import React from "react";

export default function CanvasProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Canvas
      gl={{
        stencil: true,
        antialias: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
        localClippingEnabled: true,
      }}
      camera={{ position: [0, 1.2, 0] }}
      dpr={window.devicePixelRatio}
      shadows
    >
      {children}
    </Canvas>
  );
}
