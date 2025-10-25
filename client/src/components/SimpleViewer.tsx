import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { Box } from "@react-three/drei/core/shapes";
import { ModelErrorBoundary } from "./ModelErrorBoundary";

function SimpleBox() {
  return (
    <Box position={[0, 0, 0]} args={[1, 1, 1]}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
}

export default function RobotViewer({
  height = "75vh",
}: {
  modelPath?: string;
  height?: string | number;
}) {
  return (
    <div
      className="w-full rounded-lg border border-border bg-card overflow-hidden"
      style={{ height }}
    >
      <ModelErrorBoundary>
        <Canvas camera={{ position: [3, 3, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Suspense fallback={null}>
            <SimpleBox />
            <OrbitControls />
          </Suspense>
        </Canvas>
      </ModelErrorBoundary>
    </div>
  );
}
