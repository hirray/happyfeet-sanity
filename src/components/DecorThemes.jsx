import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const themes = [
  {
    id: 1,
    name: "Birthday",
    slug: "birthday",
    color: "#FF69B4",
    image: "/birthday.jpg",
  },
  {
    id: 2,
    name: "Fiesta",
    slug: "fiesta",
    color: "#DC143C",
    image: "/fiesta.jpeg",
  },
  {
    id: 3,
    name: "Corporate",
    slug: "corporate",
    color: "#FFD700",
    image: "/corporate.jpg",
  },
  {
    id: 4,
    name: "Kitty Party",
    slug: "kitty",
    color: "#FF1744",
    image: "/kitty.jpg",
  },
  {
    id: 5,
    name: "Workshop",
    slug: "workshop",
    color: "#9C27B0",
    image: "/workshop.jpg",
  },
  {
    id: 6,
    name: "Sip & Paint",
    slug: "sippaint",
    color: "#00BCD4",
    image: "/sipnpaintn.jpg",
  },
  {
    id: 7,
    name: "Baby Shower",
    slug: "babyshower",
    color: "#64B5F6",
    image: "/babyshower.jpg",
  },
  {
    id: 8,
    name: "Cooking Party",
    slug: "cooking",
    color: "#E1BEE7",
    image: "/cooking.jpg",
  },
  {
    id: 9,
    name: "Cake Painting",
    slug: "cakepainting",
    color: "#8D6E63",
    image: "/cakepainting.jpg",
  },
];

export const DecorThemes = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 350;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <ThemesSection ref={containerRef} id="decor-themes">
      <SectionBackground>
        {/* Removed background waves for a cleaner, elegant look matching Captured Moments */}
      </SectionBackground>

      <ContentWrapper>
        <HeaderSection>
          <SectionTitle
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            Explore Our Decor Themes
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your event with stunning themed decorations
          </SectionSubtitle>
        </HeaderSection>

        <ScrollWrapper>
          <ScrollButton
            onClick={() => scroll("left")}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            $position="left"
          >
            <ChevronLeft size={28} />
          </ScrollButton>

          <ScrollContainer ref={scrollContainerRef}>
            <CardsTrack>
              {themes.map((theme, index) => (
                <CardStack
                  key={theme.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={
                    isInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 50 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                  }}
                  onClick={() => navigate(`/decor-themes/${theme.slug}`)}
                >
                  <ElegantCard className="elegant-card">
                    <CardImage
                      className="card-image"
                      src={theme.image}
                      alt={theme.name}
                    />
                    <CardLabel className="card-label">{theme.name}</CardLabel>
                  </ElegantCard>
                </CardStack>
              ))}
            </CardsTrack>
          </ScrollContainer>

          <ScrollButton
            onClick={() => scroll("right")}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            $position="right"
          >
            <ChevronRight size={28} />
          </ScrollButton>
        </ScrollWrapper>

        <ScrollIndicator
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <IndicatorText>Scroll to explore more themes</IndicatorText>
          <IndicatorArrow
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            →
          </IndicatorArrow>
        </ScrollIndicator>
      </ContentWrapper>

      <BottomCurve>
        <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0,80 C320,180 640,20 960,110 C1180,170 1340,110 1440,80 L1440,180 L0,180 Z" fill="#a76b53" />
        </svg>
      </BottomCurve>
    </ThemesSection>
  );
};

const ThemesSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0 12vw 0;
  overflow: hidden;
  background-color: #eae3d8; /* Beige background to match the theme */
`;

const SectionBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const BackgroundWave1 = styled(motion.div)`
  display: none;
`;

const BackgroundWave2 = styled(motion.div)`
  display: none;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
`;

const HeaderSection = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  margin-bottom: 4rem;
  text-align: center;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  color: #2f2622;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 2px;
    background-color: #a76b53;
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #6a605a;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const ScrollWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 2rem;
`;

const ScrollButton = styled(motion.button)`
  position: absolute;
  ${(props) => (props.$position === "left" ? "left: 1rem;" : "right: 1rem;")}
  z-index: 20;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background: rgba(253, 252, 240, 0.95);
  border: 1px solid #a76b53;
  color: #a76b53;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(167, 107, 83, 0.1);
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    width: 3rem;
    height: 3rem;
  }
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  padding: 2rem 0;
  margin: 0 4rem;

  &::-webkit-scrollbar {
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(167, 107, 83, 0.5);
    border-radius: 10px;
  }

  @media (max-width: 768px) {
    margin: 0 3.5rem;
  }
`;

const CardsTrack = styled.div`
  display: flex;
  gap: 4rem;
  padding: 2rem 1rem;
  min-width: min-content;
`;

const CardStack = styled(motion.div)`
  width: 250px;
  max-width: 400px;
  transition: all 0.3s ease;
  flex-shrink: 0;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-8px);
    
    .elegant-card {
      box-shadow: 0 12px 30px rgba(167, 107, 83, 0.15);
      border-color: #b48d7b;
    }
    
    .card-image {
      transform: scale(1.02);
    }
    
    .card-label {
      color: #a76b53;
    }
  }
  
  @media (max-width: 768px) {
    width: 220px;
  }
`;

const ElegantCard = styled.div`
  aspect-ratio: 3 / 4;
  border: 4px solid rgba(167, 107, 83, 0.1);
  background-color: #fff;
  border-radius: 4px;
  position: relative;
  transition: all 0.3s ease;
  padding: 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const CardImage = styled.img`
  width: 100%;
  height: 80%;
  object-fit: cover;
  display: block;
  transition: 0.3s ease;
  background-color: #f5f5f5;
`;

const CardLabel = styled.div`
  height: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: #2f2622;
  text-align: center;
  width: 100%;
  font-family: 'Playfair Display', serif;
  transition: all 0.3s ease;
  background-color: white;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 3rem;
  color: #636e72;
`;

const IndicatorText = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.5px;
`;

const IndicatorArrow = styled(motion.span)`
  font-size: 1.25rem;
  font-weight: 700;
`;

const BottomCurve = styled.div`
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 12vw;
  min-height: 90px;
  max-height: 180px;
  z-index: 15;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;
