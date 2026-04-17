"use client";

import { useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Model() {
  const { viewport } = useThree();

  useGLTF.preload("/models/KV_House1.glb");

  const { scene } = useGLTF("/models/KV_House1.glb");

  const ref = useRef<THREE.Object3D>(null!);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Nasłuchuj resize całego okna
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scale = viewport.width / 35;

  // useGSAP(() => {
  //   if (!ref.current) return;

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: ".trigger-benefits",
  //       start: "top bottom",
  //       end: "top center",
  //       scrub: true,
  //     },
  //   });

  //   tl.fromTo(
  //     ref.current.rotation,
  //     { x: 0, y: 0, z: 0 }, // START (A)
  //     {
  //       x: 0,
  //       y: -0.95,
  //       z: 0,
  //       ease: "none",
  //     }, // ŚRODEK (B)
  //   );
  // }, [camera]);

  useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mesh = child;

        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
    });
  }, [scene]);

  // const bottomY = isMobile ? -viewport.height / 3.25 : 0;

  useFrame(({ clock }) => {
    if (!ref.current) return;

    // Animacja lewo-prawo: sinus daje płynny ruch
    ref.current.rotation.y = Math.sin(clock.getElapsedTime()) * 0.02;
  });

  const posY = isMobile ? 1 : 0;

  return <primitive ref={ref} object={scene} scale={scale} />;
}
