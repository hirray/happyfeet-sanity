import { motion } from "framer-motion";
import { useMemo } from "react";
import styled from "styled-components";

const colors = [
  "hsl(10, 90%, 65%)",   // coral
  "hsl(175, 70%, 45%)",  // teal
  "hsl(40, 95%, 55%)",   // amber
  "hsl(340, 80%, 65%)",  // rose
  "hsl(270, 60%, 70%)",  // lavender
  "hsl(200, 80%, 60%)",  // sky
];

const shapes = ["circle", "square", "triangle"];

export const FloatingConfetti = () => {
  const confettiPieces = useMemo(() => {
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
    <ConfettiContainer>
      {confettiPieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          $shape={piece.shape}
          $size={piece.size}
          $color={piece.color}
          style={{
            left: `${piece.x}%`,
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
    </ConfettiContainer>
  );
};

const ConfettiContainer = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
`;

const ConfettiPiece = styled(motion.div)`
  position: absolute;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  background-color: ${props => props.$shape !== "triangle" ? props.$color : "transparent"};
  border-radius: ${props => 
    props.$shape === "circle" ? "50%" : 
    props.$shape === "square" ? "2px" : 
    "0"
  };
  border-left: ${props => 
    props.$shape === "triangle" ? `${props.$size / 2}px solid transparent` : "none"
  };
  border-right: ${props => 
    props.$shape === "triangle" ? `${props.$size / 2}px solid transparent` : "none"
  };
  border-bottom: ${props => 
    props.$shape === "triangle" ? `${props.$size}px solid ${props.$color}` : "none"
  };
`;
