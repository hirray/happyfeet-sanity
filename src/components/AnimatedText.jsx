import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useAnimation, useInView } from 'framer-motion';

const AnimatedText = ({ text }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.04 * i }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <TextContainer
      ref={ref}
      variants={container}
      initial="hidden"
      animate={controls}
    >
      {text.split('').map((char, index) => (
        <Letter
          key={index}
          variants={child}
          whileHover={{ scale: 1.2, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </Letter>
      ))}
    </TextContainer>
  );
};

const TextContainer = styled(motion.h1)`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: 5rem;
  font-weight: 800;
  margin: 0;
  line-height: 1.2;
  color: #2d3436;
  text-transform: uppercase;
  letter-spacing: 2px;

  @media (max-width: 768px) {
    font-size: 3.5rem;
  }
`;

const Letter = styled(motion.span)`
  display: inline-block;
  position: relative;
  cursor: default;
  user-select: none;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 100%;
    height: 3px;
    background: #6c63ff;
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  &:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

export default AnimatedText;
