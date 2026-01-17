import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import { Sparkles, Users, Baby, PartyPopper, Grid3x3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useIsMobile } from "../hooks/use-mobile";

const categories = [
  {
    id: 1,
    name: "Parties",
    icon: PartyPopper,
    color: "hsl(340, 80%, 65%)",
    gradient: "linear-gradient(135deg, hsl(340, 80%, 65%), hsl(10, 90%, 65%))",
  },
  {
    id: 2,
    name: "Workshops",
    icon: Users,
    color: "hsl(270, 60%, 70%)",
    gradient: "linear-gradient(135deg, hsl(270, 60%, 70%), hsl(240, 70%, 65%))",
  },
  {
    id: 3,
    name: "Baby Showers",
    icon: Baby,
    color: "hsl(175, 70%, 45%)",
    gradient: "linear-gradient(135deg, hsl(175, 70%, 45%), hsl(200, 80%, 55%))",
  },
  {
    id: 4,
    name: "Fiesta & Fair",
    icon: Sparkles,
    color: "hsl(40, 95%, 55%)",
    gradient: "linear-gradient(135deg, hsl(40, 95%, 55%), hsl(30, 90%, 60%))",
  },
  {
    id: 5,
    name: "Others",
    icon: Grid3x3,
    color: "hsl(150, 60%, 50%)",
    gradient: "linear-gradient(135deg, hsl(150, 60%, 50%), hsl(120, 70%, 55%))",
  },
];

export const CategoriesSpread = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const isMobile = useIsMobile();

  const getMergedPosition = () => ({
    x: 0,
    y: 0,
    rotate: 0,
    scale: 0.8,
  });

  const getSpreadPosition = (index) => {
    const desktopPositions = [
      { x: -280, y: -80, rotate: -15 },
      { x: -140, y: 100, rotate: 8 },
      { x: 0, y: -120, rotate: 0 },
      { x: 140, y: 90, rotate: -10 },
      { x: 280, y: -60, rotate: 12 },
    ];

    const mobilePositions = [
      { x: -85, y: -10, rotate: -10 },
      { x: -85, y: 155, rotate: 8 },
      { x: 0, y: -170, rotate: 0 },
      { x: 85, y: 155, rotate: -8 },
      { x: 85, y: -10, rotate: 10 },
    ];

    const positions = isMobile ? mobilePositions : desktopPositions;
    return { ...positions[index], scale: 1 };
  };

  return (
    <CategoriesSection ref={containerRef}>
      <SectionBackground>
        <BackgroundBlob1
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <BackgroundBlob2
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </SectionBackground>

      <ContentWrapper>
        <SectionTitle
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          Our <GradientText>Event Categories</GradientText>
        </SectionTitle>

        <SectionSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Discover the perfect celebration for every occasion
        </SectionSubtitle>

        <CardsContainer>
          {categories.map((category, index) => {
            const Icon = category.icon;
            const mergedPos = getMergedPosition();
            const spreadPos = getSpreadPosition(index);

            return (
              <CategoryCard
                key={category.id}
                initial={mergedPos}
                animate={
                  isInView
                    ? spreadPos
                    : mergedPos
                }
                transition={{
                  duration: 0.8,
                  delay: isInView ? index * 0.1 : 0,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{
                  scale: 1.1,
                  rotate: 0,
                  y: -10,
                  transition: { duration: 0.3 },
                }}
                $gradient={category.gradient}
              >
                <CardGlow $color={category.color} />
                
                <CardContent>
                  <IconWrapper
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Icon size={40} strokeWidth={2} />
                  </IconWrapper>

                  <CategoryName>{category.name}</CategoryName>

                  <CardShine
                    animate={{ x: ["-100%", "200%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                </CardContent>

                <CardBorder />
              </CategoryCard>
            );
          })}
        </CardsContainer>

        <CallToAction
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <CTAText>Ready to plan your perfect event?</CTAText>
          <CTAButton
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/gallery')}
          >
            <ButtonShine
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <span style={{ position: 'relative', zIndex: 10 }}>Explore Events</span>
          </CTAButton>
        </CallToAction>
      </ContentWrapper>
    </CategoriesSection>
  );
};

const CategoriesSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 1rem;
  overflow: hidden;
`;

const SectionBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const BackgroundBlob1 = styled(motion.div)`
  position: absolute;
  top: 15%;
  left: 15%;
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  background: hsl(340, 80%, 65%);
  filter: blur(80px);
`;

const BackgroundBlob2 = styled(motion.div)`
  position: absolute;
  bottom: 15%;
  right: 15%;
  width: 35rem;
  height: 35rem;
  border-radius: 50%;
  background: hsl(175, 70%, 45%);
  filter: blur(80px);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 900;
  color: #2d3436;
  text-align: center;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
  
  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(
    135deg,
    hsl(10, 90%, 65%),
    hsl(340, 80%, 65%),
    hsl(270, 60%, 70%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #636e72;
  text-align: center;
  margin-bottom: 4rem;
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const CardsContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    height: 400px;
  }

  @media (max-width: 640px) {
    height: 560px;
  }

  @media (max-width: 480px) {
    height: 600px;
  }
`;

const CategoryCard = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 240px;
  background: ${props => props.$gradient};
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  
  @media (max-width: 768px) {
    width: 160px;
    height: 200px;
  }
  
  @media (max-width: 640px) {
    width: 140px;
    height: 180px;
  }
`;

const CardGlow = styled.div`
  position: absolute;
  inset: -2px;
  background: ${props => props.$color};
  border-radius: 20px;
  opacity: 0;
  filter: blur(20px);
  transition: opacity 0.3s ease;
  
  ${CategoryCard}:hover & {
    opacity: 0.6;
  }
`;

const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  color: white;
  z-index: 10;
`;

const IconWrapper = styled(motion.div)`
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
    
    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

const CategoryName = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const CardShine = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
`;

const CardBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 20px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  pointer-events: none;
`;

const CallToAction = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const CTAText = styled.p`
  font-size: 1.25rem;
  color: #2d3436;
  font-weight: 600;
  
  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const CTAButton = styled(motion.button)`
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, hsl(10, 90%, 65%), hsl(340, 80%, 65%));
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const ButtonShine = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
`;
