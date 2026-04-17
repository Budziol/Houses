import { useThree, useFrame } from "@react-three/fiber";
import { useEffect } from "react";
import { useLoadingStore } from "../store/useLoadingStore";

export function ReadyTracker() {
  const { gl, scene, camera } = useThree();
  const setSceneReady = useLoadingStore((state) => state.setSceneReady);

  useEffect(() => {
    // Wymuszamy kompilację shaderów dla całej sceny
    // To sprawi, że "lag" wydarzy się, gdy loader jeszcze JEST widoczny
    gl.compile(scene, camera);

    // Opcjonalnie: upewnij się, że cienie też są gotowe
    gl.shadowMap.needsUpdate = true;
  }, [gl, scene, camera]);

  let frames = 0;
  useFrame(() => {
    // Dajemy mu jeszcze 10 klatek "oddechu" po kompilacji
    if (frames < 10) {
      frames++;
    } else if (frames === 10) {
      setSceneReady(true);
      frames++;
    }
  });

  return null;
}
