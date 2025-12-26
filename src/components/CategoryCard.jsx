import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";

export const CategoryCard = ({ title, image, color, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardWrapper
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <GlowEffect
        $color={color}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      <Card
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <CardImage
          src={image}
          alt={title}
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />

        <Overlay $color={color} />

        <ShimmerEffect
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6 }}
        />

        <CardContent>
          <CardTitle
            animate={{ y: isHovered ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {title}
          </CardTitle>
          <Underline
            initial={{ width: "30%" }}
            animate={{ width: isHovered ? "60%" : "30%" }}
            transition={{ duration: 0.3 }}
          />
        </CardContent>

        <DecorativeCircle
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? 180 : 0 
          }}
          transition={{ duration: 0.5 }}
        />
      </Card>
    </CardWrapper>
  );
};

const CardWrapper = styled(motion.div)`
  position: relative;
  flex-shrink: 0;
  width: 16rem;
  height: 20rem;
  cursor: pointer;
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  opacity: 0;
  filter: blur(3rem);
  background: ${props => props.$color};
`;

const Card = styled(motion.div)`
  position: relative;
  height: 100%;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    ${props => props.$color}ee 0%,
    ${props => props.$color}88 30%,
    transparent 60%
  );
`;

const ShimmerEffect = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
`;

const CardContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
`;

const CardTitle = styled(motion.h3)`
  font-size: 1.25rem;
  font-weight: 700;
  color: white;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.5));
`;

const Underline = styled(motion.div)`
  height: 2px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 9999px;
  margin-top: 0.5rem;
`;

const DecorativeCircle = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
`;
