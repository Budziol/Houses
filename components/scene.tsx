"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  AccumulativeShadows,
  RandomizedLight,
} from "@react-three/drei";
import Model from "../app/(root)/components/Hero/model";

export default function Scene() {
  return (
    <Canvas shadows camera={{ position: [10, 10, 10], fov: 50 }}>
      <ambientLight intensity={0.2} />
      {/* <directionalLight position={[5, 5, 5]} /> */}

      <Environment preset="sunset" />

      <Model />

      <AccumulativeShadows
        position={[0, 0, 0]}
        frames={60}
        alphaTest={0.9}
        scale={20}
      >
        <RandomizedLight
          amount={8}
          radius={5}
          ambient={0.5}
          intensity={1}
          position={[5, 8, 5]}
          bias={0.001}
        />
      </AccumulativeShadows>

      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <shadowMaterial opacity={0.3} />
      </mesh>

      {/* <OrbitControls /> */}
    </Canvas>
  );
}
