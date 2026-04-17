"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import ModelLoader from "../../../../components/model-loader";
import { ReadyTracker } from "../../../../components/ready-tracker";
import Model from "./offer-model";
import { OrbitControls } from "@react-three/drei";

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
type Props = {
  floor: number;
  showWalls: boolean;
  showFurnitures: boolean;
  showRoof: boolean;
  showSecondWalls: boolean;
  showSecondFurnitures: boolean;
  showFoundation: boolean;
};

const OfferScene = ({
  floor,
  showWalls,
  showFurnitures,
  showRoof,
  showSecondWalls,
  showSecondFurnitures,
  showFoundation,
}: Props) => {
  return (
    <Canvas
      shadows
      camera={{ position: [16.24, 10.74, 23.43], fov: 45 }}
      className="bg-gray-100"
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
        <Model
          floor={floor}
          showWalls={showWalls}
          showFurnitures={showFurnitures}
          showRoof={showRoof}
          showSecondFurnitures={showSecondFurnitures}
          showSecondWalls={showSecondWalls}
          showFoundation={showFoundation}
        />
        <ReadyTracker />
      </Suspense>
      <OrbitControls maxPolarAngle={Math.PI / 1.75} />
    </Canvas>
  );
};
export default OfferScene;
