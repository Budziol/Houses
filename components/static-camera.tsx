import { useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { PerspectiveCamera } from "three";

export default function StaticCamera() {
  const { camera } = useThree();

  useEffect(() => {
    const perspectiveCamera = camera as PerspectiveCamera;

    perspectiveCamera.lookAt(0, 0, 0);
    perspectiveCamera.position.set(16.24, 10.74, 23.43);
    perspectiveCamera.fov = 50; // np. 50 stopni
    perspectiveCamera.updateProjectionMatrix();
  }, [camera]);

  return null;
}
