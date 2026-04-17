"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

type Props = {
  floor: number;
  showWalls: boolean;
  showFurnitures: boolean;
  showRoof: boolean;
  showSecondWalls: boolean;
  showSecondFurnitures: boolean;
  showFoundation: boolean;
};

export default function Model({
  floor,
  showWalls,
  showFurnitures,
  showRoof,
  showSecondWalls,
  showSecondFurnitures,
  showFoundation,
}: Props) {
  const { viewport } = useThree();

  useGLTF.preload("/models/KV_House1.glb");

  const { scene } = useGLTF("/models/KV_House1.glb");

  const ref = useRef<THREE.Object3D>(null!);

  const initialScale = useRef(viewport.width / 35);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  useEffect(() => {
    scene.traverse((child) => {
      console.log(child.name);
      if (floor === 1) {
        if (child.name.toLowerCase().startsWith("walls")) {
          child.visible = showWalls;

          // Jeśli to jest Mesh, upewnij się, że jego dzieci też reagują
          child.castShadow = showWalls;
        }
        if (child.name.toLowerCase().startsWith("furniture")) {
          child.visible = showFurnitures;

          // Jeśli to jest Mesh, upewnij się, że jego dzieci też reagują
          child.castShadow = showFurnitures;
        }
        if (child.name.toLowerCase().startsWith("secondfoundation")) {
          child.visible = showFoundation;

          child.castShadow = showFoundation;
        }
      } else {
        if (child.name.toLowerCase().includes("secondwalls")) {
          child.visible = showSecondWalls;

          // Jeśli to jest Mesh, upewnij się, że jego dzieci też reagują
          child.castShadow = showSecondWalls;
        }
        if (child.name.toLowerCase().includes("secondfurniture")) {
          child.visible = showSecondFurnitures;

          // Jeśli to jest Mesh, upewnij się, że jego dzieci też reagują
          child.castShadow = showSecondFurnitures;
        }
        if (child.name.toLowerCase().includes("roof")) {
          child.visible = showRoof;

          child.castShadow = showRoof;
        }
      }
    });
  }, [
    showWalls,
    showFurnitures,
    showRoof,
    showSecondWalls,
    showSecondFurnitures,
    showFoundation,
    scene,
  ]);

  return <primitive ref={ref} object={scene} scale={initialScale.current} />;
}
