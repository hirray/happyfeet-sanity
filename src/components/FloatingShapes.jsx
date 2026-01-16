import { motion } from "framer-motion";

const shapes = [
  { type: "circle", color: "coral", size: 64, delay: 0, duration: 8, x: "10%", y: "20%" },
  { type: "circle", color: "mint", size: 96, delay: 1, duration: 10, x: "80%", y: "15%" },
  { type: "square", color: "lavender", size: 48, delay: 2, duration: 7, x: "70%", y: "60%" },
  { type: "circle", color: "sunny", size: 80, delay: 0.5, duration: 9, x: "20%", y: "70%" },
  { type: "square", color: "blush", size: 56, delay: 1.5, duration: 11, x: "90%", y: "80%" },
  { type: "circle", color: "sky", size: 40, delay: 3, duration: 6, x: "5%", y: "50%" },
  { type: "circle", color: "peach", size: 72, delay: 2.5, duration: 12, x: "50%", y: "10%" },
  { type: "square", color: "coral2", size: 32, delay: 4, duration: 8, x: "30%", y: "85%" },
  { type: "circle", color: "mint2", size: 24, delay: 1.2, duration: 7, x: "60%", y: "40%" },
  { type: "square", color: "lavender2", size: 40, delay: 3.5, duration: 9, x: "85%", y: "35%" },
  { type: "circle", color: "sunny2", size: 56, delay: 0.8, duration: 10, x: "15%", y: "35%" },
  { type: "circle", color: "blush2", size: 32, delay: 2.2, duration: 8, x: "45%", y: "75%" },
];

const colorToRgba = {
  coral: "rgba(255, 107, 107, 0.20)",
  coral2: "rgba(255, 107, 107, 0.15)",
  mint: "rgba(106, 176, 76, 0.30)",
  mint2: "rgba(106, 176, 76, 0.20)",
  lavender: "rgba(165, 94, 234, 0.25)",
  lavender2: "rgba(165, 94, 234, 0.20)",
  sunny: "rgba(249, 202, 36, 0.30)",
  sunny2: "rgba(249, 202, 36, 0.20)",
  blush: "rgba(255, 159, 243, 0.25)",
  blush2: "rgba(255, 159, 243, 0.30)",
  sky: "rgba(72, 219, 251, 0.20)",
  peach: "rgba(255, 159, 67, 0.25)",
};

const FloatingShapes = () => {
  return (
    <div
      className="pointer-events-none"
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className={shape.type === "circle" ? "" : ""}
          style={{
            position: "absolute",
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
            background: colorToRgba[shape.color],
            borderRadius: shape.type === "circle" ? 9999 : 10,
            transform: shape.type === "square" ? "rotate(45deg)" : undefined,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            rotate: shape.type === "square" ? [45, 90, 45] : [0, 10, -10, 0],
          }}
          transition={{
            opacity: { duration: 0.5, delay: shape.delay },
            scale: { duration: 0.5, delay: shape.delay },
            y: {
              duration: shape.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
            x: {
              duration: shape.duration * 1.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
            rotate: {
              duration: shape.duration * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: shape.delay,
            },
          }}
        />
      ))}
    </div>
  );
};

export default FloatingShapes;
