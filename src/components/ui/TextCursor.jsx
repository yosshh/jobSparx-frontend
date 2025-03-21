import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TextCursor = ({
  text = "⚛️",
  delay = 0.01,
  exitDuration = 0.5,
  maxPoints = 5,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"], // Default gradient colors
  animationSpeed = 3, // Animation speed in seconds
}) => {
  const [trail, setTrail] = useState([]);
  const idCounter = useRef(0);

  const handleMouseMove = (e) => {
    setTrail((prev) => {
      let newTrail = [...prev];
      newTrail.push({
        id: idCounter.current++,
        x: e.clientX,
        y: e.clientY,
      });
      return newTrail.slice(-maxPoints);
    });
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ opacity: { duration: exitDuration, ease: "easeOut", delay } }}
            className="absolute text-3xl font-bold"
            style={{
              left: item.x,
              top: item.y,
              backgroundImage: `linear-gradient(90deg, ${colors.join(", ")})`,
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: `gradientAnimation ${animationSpeed}s linear infinite`,
            }}
          >
            {text}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default TextCursor;
