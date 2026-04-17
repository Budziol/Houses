"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function useSectionSnap() {
  useEffect(() => {
    if (window.innerWidth < 1024) return;

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("section"),
    );

    let isLocked = false;

    const getClosestIndex = () => {
      const scroll = window.scrollY;

      let index = 0;
      let min = Infinity;

      sections.forEach((s, i) => {
        const dist = Math.abs(s.offsetTop - scroll);
        if (dist < min) {
          min = dist;
          index = i;
        }
      });

      return index;
    };

    const scrollTo = (index: number) => {
      if (index < 0 || index >= sections.length) return;

      isLocked = true;

      lenis.scrollTo(sections[index], {
        duration: 1.1,
        lock: true, // 🔥 ważne (Lenis blokuje input)
        onComplete: () => {
          // mały delay = stabilność
          setTimeout(() => {
            isLocked = false;
          }, 100);
        },
      });
    };

    const onWheel = (e: WheelEvent) => {
      if (isLocked) return;

      const currentIndex = getClosestIndex();
      const current = sections[currentIndex];

      if (!current) return;

      const goingDown = e.deltaY > 0;

      const rect = current.getBoundingClientRect();

      const isTall = current.scrollHeight > window.innerHeight;

      const atBottom = rect.bottom <= window.innerHeight + 2;
      const atTop = rect.top >= -2;

      // 👉 allow normal scroll inside tall section
      if (isTall) {
        if (goingDown && !atBottom) return;
        if (!goingDown && !atTop) return;
      }

      // 🔥 CRITICAL: lock immediately
      isLocked = true;

      scrollTo(currentIndex + (goingDown ? 1 : -1));
    };

    window.addEventListener("wheel", onWheel, { passive: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      window.removeEventListener("wheel", onWheel);
      lenis.destroy();
    };
  }, []);
}

export function SectionSnapProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSectionSnap(); // 👈 TU dopiero odpalasz hook

  return <>{children}</>;
}
