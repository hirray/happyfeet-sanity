import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

export const EnvelopeQuote = () => {
  const containerRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <QuoteSection ref={containerRef}>
      <QuoteBackground>
        <BackgroundCircle1
          animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <BackgroundCircle2
          animate={{ scale: [1.15, 1, 1.15], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </QuoteBackground>

      {/* Floating Terracotta Circles */}
      <FloatingCircle
        style={{ top: '15%', left: '6%', width: 90, height: 90 }}
        animate={{
          x: [0, 45, 80, 35, -15, 0],
          y: [0, 20, -20, 30, -10, 0],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingCircle
        style={{ bottom: '12%', right: '10%', width: 65, height: 65 }}
        animate={{
          x: [0, -35, -10, -55, 20, 0],
          y: [0, -20, 18, -25, 12, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingCircle
        style={{ top: '50%', right: '5%', width: 110, height: 110 }}
        animate={{
          x: [0, 50, -45, 25, -20, 0],
          y: [0, -30, 30, -18, 22, 0],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <QuoteContent>
        <SectionLabel
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          A Message For You
        </SectionLabel>

        <CardContainer
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <CardWrapper
            animate={{
              rotate: [0, -2, 2, -2, 0],
              y: [0, -5, 0, -3, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CardInner>
              <BottomFlap />
              <LeftFlap />
              <RightFlap />
              
              <CardContent className="card-content">
                <CardTitle>WELCOME TO HAPPYFEET ACTIVITY CLUB</CardTitle>
                <CardText>
                  Every celebration is a story waiting to be told, a memory waiting to be made
                </CardText>

                <CardSignature>HAPPYFEET</CardSignature>
              </CardContent>

              <TopFlap className="top-flap" />

              <Seal className="seal">
                HF
              </Seal>
            </CardInner>
          </CardWrapper>
        </CardContainer>
      </QuoteContent>
    </QuoteSection>
  );
};

const QuoteSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  overflow: hidden;
`;

const QuoteBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const BackgroundCircle1 = styled(motion.div)`
  position: absolute;
  top: 8%;
  left: 8%;
  width: 28rem;
  height: 28rem;
  border-radius: 50%;
  background: #9e634e;
  filter: blur(90px);
`;

const BackgroundCircle2 = styled(motion.div)`
  position: absolute;
  bottom: 8%;
  right: 8%;
  width: 34rem;
  height: 34rem;
  border-radius: 50%;
  background: #9e634e;
  filter: blur(90px);
`;

const QuoteContent = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
`;

const SectionLabel = styled(motion.div)`
  text-align: center;
  font-size: 0.875rem;
  font-weight: 600;
  color: #a76b53;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 3rem;
`;

const CardContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
`;

const CardWrapper = styled(motion.div)`
  position: relative;
  background: #000000;
  width: 600px;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.7s ease;
  border-radius: 8px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    width: 450px;
  }
  
  @media (max-width: 640px) {
    width: 350px;
  }
  
  &:hover {
    .card-content {
      transform: translateY(-5rem);
      transition-duration: 1s;
    }
    
    .seal {
      opacity: 0;
      transform: scale(0) rotate(180deg);
    }
    
    .top-flap {
      clip-path: polygon(50% 0%, 100% 0, 0 0);
      transition-duration: 0.1s;
    }
  }
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CardContent = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 2rem 0;
  transition: all 0.3s ease;
  z-index: 10;
  border-radius: 8px;
  
  @media (max-width: 640px) {
    padding: 1.5rem 0;
  }
`;

const CardTitle = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: #b83d0cff;
  font-family: Georgia, serif;
  margin-bottom: 1rem;
  text-align: center;
  line-height: 1.2;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
    padding: 0 1.5rem;
  }
  
  @media (max-width: 640px) {
    font-size: 1.1rem;
    padding: 0 1.25rem;
  }
  
  @media (max-width: 420px) {
    font-size: 1rem;
  }
`;

const CardText = styled.p`
  padding: 0 3rem;
  font-size: 1.125rem;
  color: #111827;
  text-align: center;
  margin-bottom: 0.5rem;
  line-height: 1.6;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 2.5rem;
  }
  
  @media (max-width: 640px) {
    font-size: 0.875rem;
    padding: 0 2rem;
  }
  
  @media (max-width: 420px) {
    font-size: 0.82rem;
    padding: 0 1.5rem;
  }
`;

const CardSubtext = styled.p`
  font-family: Georgia, serif;
  font-size: 1rem;
  color: #1f2937;
  text-align: center;
  font-style: italic;
  margin-bottom: 0.5rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 0.875rem;
  }
  
  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

const CardSignature = styled.p`
  font-family: sans-serif;
  font-size: 0.875rem;
  color: #38517bff;
  padding-top: 2rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  
  @media (max-width: 640px) {
    font-size: 0.75rem;
  }
`;

const Seal = styled.button`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #a76b53;
  color: #fdfcf0;
  width: 4rem;
  aspect-ratio: 1;
  border-radius: 50%;
  z-index: 50;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  clip-path: polygon(50% 0%, 80% 10%, 100% 35%, 100% 70%, 80% 90%, 50% 100%, 20% 90%, 0% 70%, 0% 35%, 20% 10%);
  transition: all 1s ease;
  border: 5px solid #905a45;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 640px) {
    width: 3rem;
    font-size: 0.875rem;
    border: 4px solid #905a45;
  }
`;

const TopFlap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #262626;
  clip-path: polygon(50% 50%, 100% 0, 0 0);
  transition: all 1s ease;
  z-index: 30;
  border-radius: 8px 8px 0 0;
`;

const LeftFlap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #171717;
  clip-path: polygon(50% 50%, 0 0, 0 100%);
  transition: all 0.7s ease;
  z-index: 25;
  border-radius: 8px 0 0 8px;
`;

const RightFlap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #262626;
  clip-path: polygon(50% 50%, 100% 0, 100% 100%);
  transition: all 0.7s ease;
  z-index: 25;
  border-radius: 0 8px 8px 0;
`;

const BottomFlap = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: #171717;
  clip-path: polygon(50% 50%, 100% 100%, 0 100%);
  transition: all 0.7s ease;
  z-index: 25;
  border-radius: 0 0 8px 8px;
`;

const FloatingCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(176, 125, 106, 0.22);
  pointer-events: none;
  z-index: 2;
`;
