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
        <BackgroundWave1
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <BackgroundWave2
          animate={{
            x: [0, -100, 0],
            y: [0, -50, 0],
            scale: [1.1, 1, 1.1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </SectionBackground>

      <ContentWrapper>
        <HeaderSection>
          <SectionTitle
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            Explore Our <GradientText>Decor Themes</GradientText>
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
                  <PolaroidCard className="polaroid-card">
                    <CardImage
                      className="card-image"
                      src={theme.image}
                      alt={theme.name}
                    />
                    <CardLabel className="card-label">{theme.name}</CardLabel>
                  </PolaroidCard>
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
    </ThemesSection>
  );
};

const ThemesSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0;
  overflow: hidden;
`;

const SectionBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const BackgroundWave1 = styled(motion.div)`
  position: absolute;
  top: -10%;
  left: -10%;
  width: 50%;
  height: 50%;
  border-radius: 50%;
  background: radial-gradient(circle, hsl(340, 80%, 65%, 0.15), transparent);
  filter: blur(60px);
`;

const BackgroundWave2 = styled(motion.div)`
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  background: radial-gradient(circle, hsl(270, 60%, 70%, 0.15), transparent);
  filter: blur(60px);
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
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 900;
  color: #2d3436;
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
    hsl(340, 80%, 65%),
    hsl(270, 60%, 70%),
    hsl(175, 70%, 45%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #636e72;

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
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid hsl(340, 80%, 65%);
  color: hsl(340, 80%, 65%);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
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
    background: hsl(340, 80%, 65%);
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
  width: 220px;
  max-width: 400px;
  transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;
  cursor: pointer;
  
  &:hover {
    transform: rotate(5deg) scale(1.08) translateY(-15px);
    
    .polaroid-card {
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.35);
    }
    
    .polaroid-card::before {
      transform: translateY(-3%) rotate(-4deg) scale(0.98);
    }
    
    .polaroid-card::after {
      transform: translateY(3%) rotate(4deg) scale(0.98);
    }
    
    .card-image {
      transform: scale(1.05);
    }
    
    .card-label {
      color: hsl(340, 80%, 65%);
      transform: translateX(-50%) scale(1.1);
    }
  }
  
  @media (max-width: 768px) {
    width: 200px;
  }
`;

const PolaroidCard = styled.div`
  aspect-ratio: 3 / 4;
  border: 4px solid #000;
  background-color: #fff;
  position: relative;
  transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  padding: 5% 5% 15% 5%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  
  &::before,
  &::after {
    content: "";
    display: block;
    position: absolute;
    height: 100%;
    width: 100%;
    border: 4px solid #000;
    background-color: #fff;
    transform-origin: center center;
    z-index: -1;
    transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    top: 0;
    left: 0;
  }
  
  &::before {
    transform: translateY(-2%) rotate(-6deg);
  }
  
  &::after {
    transform: translateY(2%) rotate(6deg);
  }
`;

const CardImage = styled.img`
  width: 100%;
  border: 4px solid #000;
  background-color: #eee;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  display: block;
  transition: 0.3s ease;
`;

const CardLabel = styled.div`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.125rem;
  font-weight: 700;
  color: #2d3436;
  text-align: center;
  width: 90%;
  font-family: 'Courier New', monospace;
  transition: 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
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
  font-size: 0.875rem;
  font-weight: 600;
`;

const IndicatorArrow = styled(motion.span)`
  font-size: 1.25rem;
  font-weight: 700;
`;
