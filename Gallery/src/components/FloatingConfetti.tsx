import { motion } from "framer-motion";
import { useMemo } from "react";

const colors = [
  "hsl(10 90% 65%)",   // coral
  "hsl(175 70% 45%)",  // teal
  "hsl(40 95% 55%)",   // amber
  "hsl(340 80% 65%)",  // rose
  "hsl(270 60% 70%)",  // lavender
  "hsl(200 80% 60%)",  // sky
];

const shapes = ["circle", "square", "triangle"];

interface ConfettiPiece {
  id: number;
  x: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  shape: string;
  rotation: number;
}

export const FloatingConfetti = () => {
  const confettiPieces = useMemo<ConfettiPiece[]>(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 10,
      size: 6 + Math.random() * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      rotation: Math.random() * 360,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {confettiPieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}%`,
            width: piece.size,
            height: piece.size,
            backgroundColor: piece.shape !== "triangle" ? piece.color : "transparent",
            borderRadius: piece.shape === "circle" ? "50%" : piece.shape === "square" ? "2px" : "0",
            borderLeft: piece.shape === "triangle" ? `${piece.size / 2}px solid transparent` : undefined,
            borderRight: piece.shape === "triangle" ? `${piece.size / 2}px solid transparent` : undefined,
            borderBottom: piece.shape === "triangle" ? `${piece.size}px solid ${piece.color}` : undefined,
          }}
          initial={{ y: -100, rotate: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "100vh"],
            rotate: [0, piece.rotation + 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};
