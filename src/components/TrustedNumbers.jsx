import React, { useRef, useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView } from 'framer-motion';

const StatsSection = styled.section`
  padding: 6rem 2rem;
  background: white;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  margin-top: 4rem;
  text-align: center;
`;

const StatItem = styled(motion.div)`
  padding: 2rem;
  position: relative;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(108, 99, 255, 0.05), rgba(255, 107, 157, 0.05));
    border-radius: 20px;
    z-index: -1;
    transform: scale(0.95);
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scale(1);
  }
`;

const StatNumber = styled(motion.div)`
  font-size: 3.5rem;
  font-weight: 800;
  background: linear-gradient(90deg, #6c63ff, #ff6b9d);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
  font-family: 'Poppins', sans-serif;
`;

const StatLabel = styled.p`
  font-size: 1.1rem;
  color: #5a4b8c;
  font-weight: 500;
`;

const TrustedNumbers = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const stats = [
    { number: 500, label: 'Happy Kids', suffix: '+' },
    { number: 200, label: 'Events Hosted', suffix: '+' },
    { number: 100, label: 'Trusted Clients', suffix: '+' },
    { number: 50, label: 'Schools & Communities', suffix: '+' }
  ];

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <StatsSection ref={ref}>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 style={{ 
            textAlign: 'center', 
            fontSize: '2.5rem', 
            marginBottom: '1rem',
            color: '#2d3436'
          }}>
            Our Impact in Numbers
          </h2>
          <p style={{ 
            textAlign: 'center', 
            fontSize: '1.2rem', 
            color: '#636e72',
            maxWidth: '700px',
            margin: '0 auto 2rem'
          }}>
            Bringing joy and creativity to families and schools across the region
          </p>
        </motion.div>

        <StatsGrid
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {stats.map((stat, index) => (
            <StatItem key={index} variants={item}>
              <AnimatedNumber 
                value={stat.number} 
                suffix={stat.suffix} 
                isVisible={isInView} 
              />
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
          ))}
        </StatsGrid>
      </Container>
    </StatsSection>
  );
};

const AnimatedNumber = ({ value, suffix = '', isVisible }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!isVisible) {
      setDisplayValue(0);
      return;
    }

    const startValue = 0;
    const duration = 5000; // 2 seconds
    const startTime = Date.now();
    const endTime = startTime + duration;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);
      
      // Ease-out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * (value - startValue) + startValue);
      
      setDisplayValue(currentValue);

      if (now < endTime) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, value]);

  return (
    <StatNumber>
      {displayValue.toLocaleString()}{suffix}
    </StatNumber>
  );
};

export default TrustedNumbers;