import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Suspense } from "react";

const Model = ({ path }: { path: string }) => {
  const { scene } = useGLTF(path);
  return <primitive object={scene} scale={0.6} />;
};

const IndustryIcon = ({ modelPath }: { modelPath: string }) => (
  <div className="w-32 h-32 mx-auto">
    <Canvas camera={{ position: [0, 0, 3] }}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[2, 2, 2]} />
      <Suspense fallback={null}>
        <Model path={modelPath} />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />
    </Canvas>
  </div>
);

export default IndustryIcon;
