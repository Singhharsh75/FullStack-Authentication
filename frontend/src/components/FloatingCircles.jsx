import React from "react";
import { motion } from "framer-motion";

const FloatingCircles = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      className={`${size} ${color} absolute rounded-full blur-xl opacity-20`}
      style={{ top, left }}
      animate={{
        x: ["0%", "100%", "0%"],
        y: ["0%", "100%", "0%"],
        rotate: [0, 360],
      }}
      transition={{
        ease: "linear",
        duration: 20,
        delay,
        repeat: Infinity,
      }}
    />
  );
};

export default FloatingCircles;
