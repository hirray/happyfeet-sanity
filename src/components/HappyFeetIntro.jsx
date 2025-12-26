import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
const AnimatedNumber = ({ value, suffix = '', isVisible }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const targetValue = useRef(value);
  const animationRef = useRef(null);
  useEffect(() => {
    if (!isVisible) {
      setDisplayValue(0);
      return;
    }
    const startValue = 0;
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();
    const endTime = startTime + duration;
    const animate = () => {
      const now = Date.now();
      const progress = Math.min(1, (now - startTime) / duration);
      
      // Ease-out function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * (targetValue.current - startValue) + startValue);
      
      setDisplayValue(currentValue);
      if (now < endTime) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetValue.current);
      }
    };
    // Start the animation
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, value]);
  return <span className="number">{displayValue}{suffix}</span>;
};
const HappyFeetIntro = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);
  // Check if the card back is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.5, // Trigger when 50% of the element is visible
      }
    );
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);
  return (
    <StyledWrapper>
      <motion.div 
        className="container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div 
          className={`card ${isFlipped ? 'flipped' : ''}`}
          onMouseEnter={() => setIsFlipped(true)}
          onMouseLeave={() => setIsFlipped(false)}
        >
          <div className="card-front">
            <h3>Welcome to HappyFeet</h3>
          </div>
          <div className="card-back" ref={cardRef}>
            <div className="content">
              <p>
                At HappyFeet, we believe in creating magical moments that last a lifetime. 
                Our passion for celebration and attention to detail transforms ordinary events 
                into extraordinary experiences.
              </p>
              <div className="stats">
                <div className="stat">
                  <AnimatedNumber value={500} suffix="+" isVisible={isFlipped && isVisible} />
                  <span className="label">Events</span>
                </div>
                <div className="stat">
                  <AnimatedNumber value={98} suffix="%" isVisible={isFlipped && isVisible} />
                  <span className="label">Satisfaction</span>
                </div>
                <div className="stat">
                  <AnimatedNumber value={10} suffix="+" isVisible={isFlipped && isVisible} />
                  <span className="label">Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    width: 100%;
    max-width: 1000px;
    height: 300px;
    margin: 6rem auto 4rem;
    perspective: 1000px;
  }

  .card {
    position: relative;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transform-origin: center center;
    cursor: pointer;
    border-radius: 20px;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
    will-change: transform, box-shadow;
  }

  .card:hover {
    transform: translateZ(20px);
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
  }

  .card.flipped {
    transform: rotateY(180deg) translateZ(20px);
  }

  .card-front,
  .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2.5rem;
    box-sizing: border-box;
    transition: all 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
    transform-style: preserve-3d;
  }

  .card-front {
    background: linear-gradient(135deg, #6c63ff, #4a45b1);
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transform: rotateY(0deg);
    z-index: 2;
  }

  .card-back {
    background: linear-gradient(145deg, #1a1a1a, #2d2d2d);
    color: white;
    transform: rotateY(180deg);
    overflow: hidden;
    z-index: 1;
    padding: 2.5rem 3rem;
  }

  h3 {
    font-size: 2.5rem;
    margin: 0;
    text-align: center;
    background: linear-gradient(90deg, #ffffff, #e0e0e0);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    padding: 0 20px;
  }

  .content {
    text-align: center;
    max-width: 800px;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: #e0e0e0;
  }

  .stats {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 2rem;
  }

  .stat {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .number {
    font-size: 2.5rem;
    font-weight: 700;
    color: #4ecdc4;
    margin-bottom: 0.5rem;
    display: inline-block;
    min-width: 80px;
    text-align: center;
    font-family: 'Poppins', sans-serif;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .label {
    font-size: 0.9rem;
    color: #a0a0a0;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 768px) {
    .container {
      height: 400px;
    }
    
    h3 {
      font-size: 2rem;
    }
    
    .stats {
      flex-direction: column;
      gap: 1.5rem;
    }
    
    p {
      font-size: 1rem;
    }

    .number {
      font-size: 2rem;
    }
  }
`;

export default HappyFeetIntro;