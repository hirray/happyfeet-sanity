import { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const LETTERS = ['H', 'A', 'P', 'P', 'Y', 'F', 'E', 'E', 'T'];

const letterColors = [
  'hsl(0, 80%, 55%)',
  'hsl(25, 95%, 55%)',
  'hsl(45, 100%, 60%)',
  'hsl(140, 70%, 45%)',
  'hsl(180, 70%, 50%)',
  'hsl(210, 90%, 55%)',
  'hsl(270, 70%, 60%)',
  'hsl(330, 80%, 65%)',
  'hsl(0, 80%, 55%)',
];

const TrainAnimation = () => {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;
      
      // Start animation only when section enters viewport
      const startPoint = windowHeight * 0.8; // Start when section is 80% down the viewport
      const endPoint = -sectionHeight * 0.5; // End when section is 50% past viewport
      
      const currentPosition = rect.top;
      const totalDistance = startPoint - endPoint;
      const traveled = startPoint - currentPosition;
      
      const progress = Math.min(Math.max(traveled / totalDistance, 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Slower train movement - only moves 150% instead of 200%
  const trainTranslateX = 100 - (scrollProgress * 150);
  const isMoving = scrollProgress > 0 && scrollProgress < 1;

  return (
    <SectionContainer ref={sectionRef}>
      <SkyBackground />
      
      <TitleContainer>
        <Title>
          All Aboard the <RedText>Fun Train!</RedText>
        </Title>
        <Subtitle>Scroll down to see the magic happen ✨</Subtitle>
        
        <ProgressBar>
          <ProgressFill style={{ width: `${scrollProgress * 100}%` }} />
        </ProgressBar>
      </TitleContainer>

      <TrainContainer>
        <TrainWrapper style={{ transform: `translateX(${trainTranslateX}%)` }}>
          <TrainEngine $isMoving={isMoving}>
            <Chimney>
              {isMoving && (
                <>
                  <SmokePuff style={{ animationDelay: '0s' }} />
                  <SmokePuff style={{ animationDelay: '0.3s' }} />
                  <SmokePuff style={{ animationDelay: '0.6s' }} />
                </>
              )}
            </Chimney>

            <EngineBody>
              <EngineCabin>
                <CabinWindow />
              </EngineCabin>
              
              <BoilerFront />
              
              <DecorativeStripe1 />
              <DecorativeStripe2 />
            </EngineBody>

            <CowCatcher />

            <Wheel $position="left-8" $size="large" $isMoving={isMoving} />
            <Wheel $position="right-12" $size="large" $isMoving={isMoving} />
          </TrainEngine>

          {LETTERS.map((letter, index) => (
            <TrainCompartment key={index} $isMoving={isMoving}>
              <ConnectorChain />
              
              <CompartmentBody $color={letterColors[index]}>
                <LetterDisplay>{letter}</LetterDisplay>
                <DecorativeFrame />
                <BottomDetail />
              </CompartmentBody>

              <Wheel $position="left-6" $size="medium" $isMoving={isMoving} />
              <Wheel $position="right-2" $size="medium" $isMoving={isMoving} />
            </TrainCompartment>
          ))}
        </TrainWrapper>

        <RailroadTrack />
      </TrainContainer>

      <DecorativeSun>☀️</DecorativeSun>
      <Cloud1>☁️</Cloud1>
      <Cloud2>☁️</Cloud2>
      <Cloud3>☁️</Cloud3>
      
      <Tree1>🌲</Tree1>
      <Tree2>🌳</Tree2>
      <Tree3>🌲</Tree3>
      <Tree4>🌳</Tree4>
    </SectionContainer>
  );
};

const smokeAnimation = keyframes`
  0% {
    transform: translateY(0) scale(1);
    opacity: 0.6;
  }
  100% {
    transform: translateY(-60px) scale(1.5);
    opacity: 0;
  }
`;

const wheelSpin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const pulseScale = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
`;

const bounceSubtle = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const SectionContainer = styled.section`
  position: relative;
  padding: 8rem 0;
  overflow: hidden;
  background: linear-gradient(to bottom, 
    rgba(135, 206, 250, 0.1) 0%,
    transparent 50%,
    transparent 100%
  );
  
  @media (min-width: 768px) {
    padding: 10rem 0;
  }
`;

const SkyBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, 
    rgba(135, 206, 250, 0.15) 0%,
    transparent 100%
  );
`;

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 10;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 800;
  color: #2d3436;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const RedText = styled.span`
  color: hsl(0, 80%, 55%);
`;

const Subtitle = styled.p`
  color: #636e72;
  font-size: 1.1rem;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 200px;
  height: 8px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  margin: 1rem auto 0;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, 
    hsl(0, 80%, 55%) 0%,
    hsl(45, 100%, 60%) 50%,
    hsl(140, 70%, 45%) 100%
  );
  border-radius: 10px;
  transition: width 0.1s linear;
`;

const TrainContainer = styled.div`
  position: relative;
  height: 280px;
  
  @media (min-width: 768px) {
    height: 320px;
  }
`;

const TrainWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  left: 0;
  display: flex;
  align-items: flex-end;
  will-change: transform;
  transition: transform 0.1s linear;
`;

const TrainEngine = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 180px;
  height: 140px;
  
  @media (min-width: 768px) {
    width: 220px;
    height: 160px;
  }
`;

const Chimney = styled.div`
  position: absolute;
  top: -30px;
  left: 40px;
  width: 32px;
  height: 40px;
  background: hsl(0, 80%, 45%);
  border-radius: 8px 8px 0 0;
  z-index: 5;
`;

const SmokePuff = styled.div`
  position: absolute;
  top: -30px;
  left: 4px;
  width: 24px;
  height: 24px;
  background: rgba(150, 150, 150, 0.5);
  border-radius: 50%;
  animation: ${smokeAnimation} 1s ease-out infinite;
`;

const EngineBody = styled.div`
  position: absolute;
  bottom: 32px;
  left: 0;
  width: 100%;
  height: 90px;
  background: linear-gradient(to bottom, hsl(0, 80%, 60%), hsl(0, 80%, 50%));
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-bottom: 4px solid hsl(45, 100%, 50%);
  
  @media (min-width: 768px) {
    height: 110px;
  }
`;

const EngineCabin = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 100%;
  background: hsl(0, 80%, 50%);
  border-radius: 0 12px 12px 0;
  border-left: 2px solid rgba(255, 215, 0, 0.3);
  
  @media (min-width: 768px) {
    width: 100px;
  }
`;

const CabinWindow = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  width: 50px;
  height: 50px;
  background: rgba(255, 215, 0, 0.9);
  border-radius: 4px;
  border: 3px solid hsl(45, 100%, 50%);
  box-shadow: inset 0 2px 10px rgba(0, 0, 0, 0.2);
  
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const BoilerFront = styled.div`
  position: absolute;
  top: 12px;
  left: 24px;
  width: 50px;
  height: 50px;
  background: rgba(255, 215, 0, 0.7);
  border-radius: 50%;
  border: 3px solid hsl(45, 100%, 50%);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  
  @media (min-width: 768px) {
    width: 60px;
    height: 60px;
  }
`;

const DecorativeStripe1 = styled.div`
  position: absolute;
  bottom: 12px;
  left: 24px;
  right: 100px;
  height: 12px;
  background: hsl(45, 100%, 50%);
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const DecorativeStripe2 = styled.div`
  position: absolute;
  bottom: 32px;
  left: 24px;
  right: 110px;
  height: 8px;
  background: rgba(255, 215, 0, 0.6);
  border-radius: 4px;
`;

const CowCatcher = styled.div`
  position: absolute;
  bottom: 24px;
  left: -8px;
  width: 0;
  height: 0;
  border-right: 30px solid hsl(0, 80%, 50%);
  border-bottom: 22px solid transparent;
  border-top: 22px solid transparent;
`;

const TrainCompartment = styled.div`
  position: relative;
  flex-shrink: 0;
  width: 90px;
  height: 140px;
  
  @media (min-width: 768px) {
    width: 110px;
    height: 160px;
  }
`;

const ConnectorChain = styled.div`
  position: absolute;
  left: 0;
  top: 50%;
  transform: translate(-12px, -50%);
  z-index: 10;
  width: 24px;
  height: 12px;
  background: #555;
  border-radius: 50%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

const CompartmentBody = styled.div`
  position: absolute;
  bottom: 32px;
  left: 16px;
  right: 0;
  height: 90px;
  background: ${props => props.$color || 'hsl(210, 90%, 55%)'};
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border-top: 4px solid hsl(45, 100%, 50%);
  
  @media (min-width: 768px) {
    height: 110px;
  }
`;

const LetterDisplay = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  user-select: none;
  
  @media (min-width: 768px) {
    font-size: 4rem;
  }
`;

const DecorativeFrame = styled.div`
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  bottom: 40px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
`;

const BottomDetail = styled.div`
  position: absolute;
  bottom: 8px;
  left: 12px;
  right: 12px;
  height: 6px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
`;

const Wheel = styled.div`
  position: absolute;
  bottom: 0;
  ${props => props.$position}: 0;
  width: ${props => props.$size === 'large' ? '50px' : '40px'};
  height: ${props => props.$size === 'large' ? '50px' : '40px'};
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #2d3436;
    border-radius: 50%;
    border: 4px solid #555;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    animation: ${props => props.$isMoving ? wheelSpin : 'none'} 0.3s linear infinite;
  }
  
  &::after {
    content: '';
    position: absolute;
    inset: 8px;
    background: #555;
    border-radius: 50%;
  }
  
  @media (min-width: 768px) {
    width: ${props => props.$size === 'large' ? '56px' : '48px'};
    height: ${props => props.$size === 'large' ? '56px' : '48px'};
  }
`;

const RailroadTrack = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 32px;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
    background: linear-gradient(to bottom, #7f8c8d, #555);
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  
  &::before {
    bottom: 20px;
  }
  
  &::after {
    bottom: 4px;
  }
`;

const DecorativeSun = styled.div`
  position: absolute;
  top: 4rem;
  right: 10%;
  font-size: 3.5rem;
  animation: ${pulseScale} 3s ease-in-out infinite;
`;

const Cloud1 = styled.div`
  position: absolute;
  top: 7rem;
  right: 25%;
  font-size: 2rem;
  animation: ${bounceSubtle} 4s ease-in-out infinite;
  animation-delay: 0.5s;
`;

const Cloud2 = styled.div`
  position: absolute;
  top: 5rem;
  left: 15%;
  font-size: 2rem;
  animation: ${bounceSubtle} 4s ease-in-out infinite;
  animation-delay: 0.3s;
`;

const Cloud3 = styled.div`
  position: absolute;
  top: 9rem;
  left: 8%;
  font-size: 1.5rem;
  animation: ${bounceSubtle} 4s ease-in-out infinite;
  animation-delay: 0.7s;
`;

const Tree1 = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 5%;
  font-size: 2.5rem;
`;

const Tree2 = styled.div`
  position: absolute;
  bottom: 6rem;
  left: 8%;
  font-size: 2rem;
`;

const Tree3 = styled.div`
  position: absolute;
  bottom: 6rem;
  right: 5%;
  font-size: 2.5rem;
`;

const Tree4 = styled.div`
  position: absolute;
  bottom: 6rem;
  right: 10%;
  font-size: 2rem;
`;

export default TrainAnimation;
