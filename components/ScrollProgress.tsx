import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2.5px",
        transformOrigin: "0%",
        scaleX,
        background:
          "linear-gradient(90deg, #8b5cf6 0%, #22d3ee 55%, #fcd34d 100%)",
        boxShadow:
          "0 0 12px rgba(34, 211, 238, 0.65), 0 0 20px rgba(252, 211, 77, 0.45)",
        zIndex: 9999,
        pointerEvents: "none",
      }}
    />
  );
};

export default ScrollProgress;

