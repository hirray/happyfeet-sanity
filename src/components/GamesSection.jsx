import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { GameCard } from './GameCard';
import { GameModal } from './GameModal';

const games = [
  { title: "Puzzle Quest", color: "red", icon: "🧩" },
  { title: "Color Splash", color: "orange", icon: "🎨" },
  { title: "Space Jump", color: "yellow", icon: "🚀" },
  { title: "Nature Walk", color: "green", icon: "🌿" },
  { title: "Ocean Dive", color: "teal", icon: "🐠" },
  { title: "Sky Race", color: "blue", icon: "✈️" },
  { title: "Magic Spell", color: "purple", icon: "🔮" },
  { title: "Candy Land", color: "pink", icon: "🍬" },
];

export const GamesSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [selectedGame, setSelectedGame] = useState(null);

  return (
    <SectionContainer ref={sectionRef}>
      {/* Background decorations */}
      <DecorationsContainer>
        {/* Large decorative circles */}
        <LargeCircle1 />
        <LargeCircle2 />
        <LargeCircle3 />
        
        {/* Small floating dots */}
        <FloatingDot style={{ top: '10%', left: '10%', backgroundColor: 'hsl(0, 80%, 55%)', animationDelay: '0s' }} />
        <FloatingDot style={{ top: '20%', right: '15%', backgroundColor: 'hsl(45, 100%, 60%)', animationDelay: '0.5s' }} />
        <FloatingDot style={{ bottom: '20%', left: '20%', backgroundColor: 'hsl(210, 90%, 55%)', animationDelay: '1s' }} />
        <FloatingDot style={{ bottom: '30%', right: '25%', backgroundColor: 'hsl(330, 80%, 65%)', animationDelay: '1.5s' }} />
        
        {/* Floating rings */}
        <FloatingRing style={{ top: '15%', right: '10%', borderColor: 'hsl(140, 70%, 45%)', animationDelay: '0s' }} />
        <FloatingRing style={{ bottom: '25%', left: '5%', borderColor: 'hsl(270, 70%, 60%)', animationDelay: '2s' }} />
        
        {/* Dashed connector lines */}
        <DashedLineWrapper style={{ top: '30%', left: '30%', transform: 'rotate(12deg)' }}>
          <svg width="100" height="50">
            <path
              d="M0 25 Q50 0 100 25"
              fill="none"
              stroke="hsl(210, 20%, 70%)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </DashedLineWrapper>
        <DashedLineWrapper style={{ bottom: '35%', right: '35%', transform: 'rotate(-12deg)' }}>
          <svg width="100" height="50">
            <path
              d="M0 25 Q50 0 100 25"
              fill="none"
              stroke="hsl(210, 20%, 70%)"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>
        </DashedLineWrapper>
      </DecorationsContainer>

      {/* Title */}
      <TitleContainer
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <RainbowTitle>GAMES</RainbowTitle>
        <TitleUnderline />
      </TitleContainer>

      {/* Games grid */}
      <GamesGrid>
        {games.map((game, index) => (
          <motion.div
            key={game.title}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: index * 0.1 }}
          >
            <GameCard
              title={game.title}
              color={game.color}
              icon={game.icon}
              delay={index * 100}
              onClick={() => setSelectedGame(game.title)}
            />
          </motion.div>
        ))}
      </GamesGrid>
      
      <GameModal 
        game={selectedGame} 
        onClose={() => setSelectedGame(null)} 
      />
    </SectionContainer>
  );
};

const bounceSubtle = keyframes`
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-20px) scale(1.1);
  }
`;

const spinSlow = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-15px);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.6;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
`;

const SectionContainer = styled.section`
  position: relative;
  padding: 4rem 0;
  overflow: hidden;
  
  @media (min-width: 768px) {
    padding: 6rem 0;
  }
`;

const DecorationsContainer = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const LargeCircle1 = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: hsl(140, 70%, 45%, 0.1);
  transform: translate(-50%, -50%);
  animation: ${pulse} 4s ease-in-out infinite;
  
  @media (min-width: 768px) {
    width: 400px;
    height: 400px;
  }
`;

const LargeCircle2 = styled.div`
  position: absolute;
  top: 20%;
  right: 0;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: hsl(45, 100%, 60%, 0.2);
  transform: translateX(33%);
  animation: ${pulse} 5s ease-in-out infinite;
  animation-delay: 1s;
  
  @media (min-width: 768px) {
    width: 300px;
    height: 300px;
  }
`;

const LargeCircle3 = styled.div`
  position: absolute;
  bottom: 0;
  left: 25%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: hsl(210, 90%, 55%, 0.1);
  animation: ${pulse} 6s ease-in-out infinite;
  animation-delay: 2s;
  
  @media (min-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const FloatingDot = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  animation: ${bounceSubtle} 3s ease-in-out infinite;
  
  @media (min-width: 768px) {
    width: 16px;
    height: 16px;
  }
`;

const FloatingRing = styled.div`
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 2px solid;
  animation: ${spinSlow} 20s linear infinite;
  
  @media (min-width: 768px) {
    width: 80px;
    height: 80px;
  }
`;

const DashedLineWrapper = styled.div`
  position: absolute;
  animation: ${float} 4s ease-in-out infinite;
`;

const TitleContainer = styled(motion.div)`
  position: relative;
  text-align: center;
  margin-bottom: 3rem;
  
  @media (min-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const RainbowTitle = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  background: linear-gradient(
    90deg,
    #ff6b6b 0%,
    #f9ca24 20%,
    #6ab04c 40%,
    #4834d4 60%,
    #e056fd 80%,
    #ff6b6b 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  background-size: 200% auto;
  animation: gradient-shift 3s linear infinite;
  display: inline-block;
  
  @keyframes gradient-shift {
    0% {
      background-position: 0% center;
    }
    100% {
      background-position: 200% center;
    }
  }
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const TitleUnderline = styled.div`
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 4px;
  background: linear-gradient(90deg, #ff6b6b 0%, #f9ca24 50%, #4834d4 100%);
  border-radius: 2px;
`;

const GamesGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem 2rem;
  justify-items: center;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    gap: 4rem 3rem;
  }
`;

export default GamesSection;
