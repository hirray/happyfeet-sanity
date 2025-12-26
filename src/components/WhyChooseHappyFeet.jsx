import React, { useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView, useAnimation } from 'framer-motion';

// Keyframes for animations
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const glow = keyframes`
  0% { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
  50% { filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.6)); }
  100% { filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3)); }
`;

const StyledSection = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #f8f4ff 0%, #f0e9ff 100%);
  overflow: hidden;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
`;

const SectionInner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const AnimatedHeading = styled(motion.h2)`
  font-size: 4rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(90deg, #6c63ff, #ff6b9d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  display: inline-block;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subheading = styled(motion.p)`
  font-size: 1.25rem;
  text-align: center;
  max-width: 700px;
  margin: 0 auto 4rem;
  color: #5a4b8c;
  line-height: 1.6;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const Card = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;
  z-index: 1;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%);
    z-index: -1;
    border-radius: 20px;
  }
  
  &:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 15px 40px rgba(108, 99, 255, 0.2);
  }
`;

const CardIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #6c63ff, #a29bfe);
  color: white;
  font-size: 1.5rem;
  animation: ${float} 6s ease-in-out infinite;
  box-shadow: 0 10px 20px rgba(108, 99, 255, 0.2);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #2d3436;
`;

const CardText = styled.p`
  color: #636e72;
  line-height: 1.6;
`;

const FloatingElements = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const FloatingElement = styled.div`
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.1), rgba(255, 107, 157, 0.1));
  filter: blur(20px);
  opacity: 0.6;
  
  &:nth-child(1) {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -100px;
    animation: ${glow} 8s ease-in-out infinite;
  }
  
  &:nth-child(2) {
    width: 200px;
    height: 200px;
    bottom: -50px;
    left: -50px;
    animation: ${glow} 10s ease-in-out infinite reverse;
  }
`;

const WhyChooseHappyFeet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100
      }
    }
  };

  const valueCards = [
    {
      icon: '🎨',
      title: 'Creative First Approach',
      text: 'Every event is uniquely designed — no templates, no repetition.'
    },
    {
      icon: '👧👦',
      title: 'Kids-Focused Experiences',
      text: 'Designed to spark imagination, curiosity, and joy.'
    },
    {
      icon: '🎭',
      title: 'Art + Activity Experts',
      text: 'From slime to canvas to DIY crafts — we do it all.'
    },
    {
      icon: '✨',
      title: 'Stress-Free Execution',
      text: 'We handle everything. You enjoy the smiles.'
    },
    {
      icon: '🏆',
      title: 'Trusted by Families & Schools',
      text: 'Loved by parents, trusted by institutions.'
    }
  ];

  return (
    <StyledSection ref={ref}>
      <FloatingElements>
        <FloatingElement />
        <FloatingElement />
      </FloatingElements>
      
      <SectionInner>
        <AnimatedHeading
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Why Choose HappyFeet?
        </AnimatedHeading>
        
        <Subheading
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Because your events deserve more than just planning — they deserve magic.
        </Subheading>
        
        <CardsContainer
          variants={container}
          initial="hidden"
          animate={controls}
        >
          {valueCards.map((card, index) => (
            <Card
              key={index}
              variants={item}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 40px rgba(108, 99, 255, 0.15)'
              }}
            >
              <CardIcon>{card.icon}</CardIcon>
              <CardTitle>{card.title}</CardTitle>
              <CardText>{card.text}</CardText>
            </Card>
          ))}
        </CardsContainer>
      </SectionInner>
    </StyledSection>
  );
};

export default WhyChooseHappyFeet;
