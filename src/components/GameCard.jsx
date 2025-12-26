import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const colorMap = {
  red: 'hsl(0, 80%, 55%)',
  orange: 'hsl(25, 95%, 55%)',
  yellow: 'hsl(45, 100%, 60%)',
  green: 'hsl(140, 70%, 45%)',
  teal: 'hsl(180, 70%, 50%)',
  blue: 'hsl(210, 90%, 55%)',
  purple: 'hsl(270, 70%, 60%)',
  pink: 'hsl(330, 80%, 65%)',
};

export const GameCard = ({ title, color, delay = 0, icon, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const bgColor = colorMap[color];

  return (
    <CardWrapper
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: delay / 1000 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <DecorativeRing1 $color={bgColor} $isHovered={isHovered} />
      <DecorativeRing2 $color={bgColor} $isHovered={isHovered} />
      
      <MainCard $color={bgColor} $isHovered={isHovered}>
        <InnerGradient />
        
        <IconContainer $isHovered={isHovered}>
          <IconText>{icon}</IconText>
        </IconContainer>

        <ShineEffect $isHovered={isHovered} />
      </MainCard>

      <TitleButton $color={bgColor} $isHovered={isHovered}>
        {title}
      </TitleButton>
    </CardWrapper>
  );
};

const CardWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const DecorativeRing1 = styled.div`
  position: absolute;
  top: -1rem;
  left: -1rem;
  right: -1rem;
  bottom: -1rem;
  border-radius: 50%;
  border: 2px solid ${props => props.$color};
  opacity: ${props => props.$isHovered ? 1 : 0};
  transform: ${props => props.$isHovered ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.5s ease;
  pointer-events: none;
`;

const DecorativeRing2 = styled.div`
  position: absolute;
  top: -2rem;
  left: -2rem;
  right: -2rem;
  bottom: -2rem;
  border-radius: 50%;
  border: 1px solid ${props => props.$color};
  opacity: ${props => props.$isHovered ? 0.6 : 0};
  transform: ${props => props.$isHovered ? 'scale(1.1)' : 'scale(1)'};
  transition: all 0.7s ease 0.1s;
  pointer-events: none;
`;

const MainCard = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: ${props => props.$color};
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transform: ${props => props.$isHovered ? 'scale(1.1) rotate(3deg)' : 'scale(1) rotate(0deg)'};
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 4px solid rgba(255, 255, 255, 0.9);
  
  &:hover {
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 768px) {
    width: 180px;
    height: 180px;
  }
`;

const InnerGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, transparent 100%);
  pointer-events: none;
`;

const IconContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${props => props.$isHovered ? 'scale(1.25) rotate(12deg)' : 'scale(1) rotate(0deg)'};
  transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
`;

const IconText = styled.span`
  font-size: 4rem;
  
  @media (min-width: 768px) {
    font-size: 5rem;
  }
`;

const ShineEffect = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    transparent 0%,
    rgba(255, 255, 255, 0.5) 50%,
    transparent 100%
  );
  transform: ${props => props.$isHovered ? 'translateX(100%)' : 'translateX(-100%)'};
  transition: transform 0.7s ease;
`;

const TitleButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  color: white;
  background: ${props => props.$color};
  border: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transform: ${props => props.$isHovered ? 'scale(1.05)' : 'scale(1)'};
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

export default GameCard;
