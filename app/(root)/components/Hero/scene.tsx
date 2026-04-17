"use client";

import { Canvas } from "@react-three/fiber";
import Model from "./model";
import { Suspense } from "react";
import ModelLoader from "../../../../components/model-loader";
import { ReadyTracker } from "../../../../components/ready-tracker";

// function CameraMove() {
//   const scroll = useScroll();
//   const { camera } = useThree();

//   useFrame(() => {
//     const t = scroll.offset;
//     camera.position.x = 10 + t * 10;
//   });

//   return null;
// }

// function CameraDebugger() {
//   const { camera } = useThree();
//   const controlsRef = useRef<OrbitControlsImpl | null>(null);

//   return (
//     <OrbitControls
//       ref={controlsRef}
//       onEnd={() => {
//         if (!controlsRef.current) return;

//         console.log("camera position", camera.position);
//         console.log("camera rotation", camera.rotation);
//         console.log("controls target", controlsRef.current.target);
//       }}
//     />
//   );
// }

const KVScene = () => {
  return (
    <Canvas
      shadows
      camera={{ position: [16.24, 10.74, 23.43], fov: 45 }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight color={"#FFEAC9"} intensity={0.35} />

      <directionalLight
        color={"#FFEAC9"}
        position={[28.702073384900505, 30.275956208061277, 26.72955889712889]}
        intensity={3}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={100}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
        shadow-bias={-0.001}
        shadow-normalBias={0.11}
      />
      <Suspense fallback={<ModelLoader />}>
        <Model />
        <ReadyTracker />
      </Suspense>
      {/* <CameraDebugger /> */}
    </Canvas>
  );
};
export default KVScene;
