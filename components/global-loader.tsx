"use client";

import { useProgress } from "@react-three/drei";
import { useLoadingStore } from "../store/useLoadingStore";
import { useEffect, useState } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function GlobalLoader() {
  const { progress } = useProgress();
  const isSceneReady = useLoadingStore((state) => state.isSceneReady);
  const [isExited, setIsExited] = useState(false);

  const pathname = usePathname();

  const shouldShowLoader = pathname === "/";

  useEffect(() => {
    if (progress === 100 && isSceneReady) {
      // Mały delay (np. 200ms) daje przeglądarce czas na ustabilizowanie wątku po kompilacji
      const timer = setTimeout(() => {
        gsap.to(".loader-overlay", {
          autoAlpha: 0, // Zamiast samego opacity
          duration: 1,
          ease: "power2.inOut",
          force3D: true, // Wymusza warstwę GPU dla animacji loadera
          onComplete: () => setIsExited(true),
        });
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [progress, isSceneReady]);

  if (!shouldShowLoader) return null;
  if (isExited) return null;

  return (
    <div
      className="loader-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#FFEAC9", // Twój kolor z ambientLight
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: "bold" }}>
        {progress.toFixed(0)}%
      </div>
      <p>Przygotowywanie sceny...</p>
    </div>
  );
}
