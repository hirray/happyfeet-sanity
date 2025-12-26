import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

const QuoteSection = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #6c63ff 0%, #ff6b9d 100%);
  position: relative;
  overflow: hidden;
  color: white;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const QuoteText = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 800;
  text-align: center;
  line-height: 1.3;
  margin: 0;
  max-width: 1000px;
  margin: 0 auto;
  transform: rotate(-2deg);
  text-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const AnimatedQuote = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animate the quote from right to left as user scrolls
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["30%", "-30%"]
  );

  // Add some rotation based on scroll
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [2, 0, -2]
  );

  // Change opacity based on scroll
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0]
  );

  return (
    <QuoteSection ref={ref}>
      <Container>
        <QuoteText
          style={{
            x,
            rotate,
            opacity
          }}
        >
          HappyFeet Events — Where Creativity Meets Celebration.
        </QuoteText>
      </Container>
    </QuoteSection>
  );
};

export default AnimatedQuote;