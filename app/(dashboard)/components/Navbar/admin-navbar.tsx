"use client";

import { useEffect, useState } from "react";
import {
  useMotionValueEvent,
  useScroll,
  motion,
  AnimatePresence,
} from "motion/react";
import { Menu } from "lucide-react";
import Logo from "@/components/logo";
import AdminMobileNavMenu from "./admin-mobile-nav-menu";
import AdminNavMenu from "./admin-nav-menu";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 10);
  });

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 px-8 lg:px-16 py-6"
      initial={false}
      animate={
        isScrolled
          ? {
              backgroundColor: "rgba(255, 255, 255, 1)",
              boxShadow: "rgba(0, 0, 0, 0.1) 1px 1px 10px 0px", // Bez średnika!
            }
          : {
              backgroundColor: "rgba(255, 255, 255, 0)",
              boxShadow: "rgba(0, 0, 0, 0) 1px 1px 10px 0px", // Bez średnika!
            }
      }
    >
      <div className="max-w-[1440px] mx-auto flex flex-row gap-10 items-center justify-between relative z-50">
        <div className="w-[242px]">
          <Logo />
        </div>
        <AdminNavMenu />
        <button
          className="flex md:hidden cursor-pointer"
          onClick={() => setIsOpen((o) => !o)}
        >
          <Menu />
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: "-120%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
            className="flex md:hidden flex-col absolute left-0 top-0 w-full bg-white z-20  min-h-screen pt-15 pb-8 px-4"
          >
            <AdminMobileNavMenu close={() => setIsOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
export default AdminNavbar;
