import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Custom icons for the stats card
const BalloonIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M12 16c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z" />
    <path d="M12 16c-.5 1-1.5 2-1.5 3" />
    <path d="M12 16c.5 1 1.5 2 1.5 3" />
    <path d="M10.5 19h3" />
  </svg>
);

const PopperIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M2 22l6-6" />
    <path d="M8 16L20 4l-4-4L4 12l4 4z" />
    <path d="M12 8l4 4" />
    <path d="M17 3l1.5 1.5" />
    <path d="M19 7l1.5 1.5" />
  </svg>
);

const SmileIcon = ({ size = 24, ...props }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const slidesContent = [
  {
    title: "Beautiful Moments. Perfectly Planned.",
    subtitle: "From birthdays to corporate gatherings, we create meaningful experiences filled with joy, laughter and unforgettable memories.",
    archImg: "/birthday4.jpg",
    leftImg: "/corporate.jpg",
    rightImg: "/gallery1.jpg"
  },
  {
    title: "Joyful Play. Creative Learning.",
    subtitle: "Engage in fun-filled activities and hands-on workshops designed to inspire young minds and unleash their imagination.",
    archImg: "/activity8.jpeg",
    leftImg: "/activity1.jpg",
    rightImg: "/santa10.jpeg"
  },
  {
    title: "Dream Big. Celebrate Together.",
    subtitle: "Stunning themed decorations and bespoke event styling that turn any ordinary space into a wonderland.",
    archImg: "/disco.jpg",
    leftImg: "/cooking1.jpg",
    rightImg: "/landing7.jpg"
  },
  {
    title: "Magical Parties. Lasting Memories.",
    subtitle: "Every detail meticulously planned to ensure your special day is absolutely perfect, leaving smiles on every face.",
    archImg: "/sipnpaint2.jpg",
    leftImg: "/landing2.jpeg",
    rightImg: "/landing1.jpeg"
  }
];

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Book Event", to: "/book-event" },
  { label: "Gallery", to: "/gallery" },
  { label: "Kits", to: "/kits" },
  { label: "Games", to: "/games" },
  { label: "Activity", to: "/activity" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/about#contact-section" }
];

export const HeroSlider = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slidesContent.length);
    }, 4500); // 4.5 seconds for slower, smoother reading
    return () => clearInterval(timer);
  }, []);

  const slide = slidesContent[currentIndex];
  const titleParts = slide.title.split(".");

  return (
    <>
      <HeroContainer>
        <GlowBackground />
        <DotGridBackground />

        {/* Smooth Floating White Circles */}
        <HeroFloatingCircle
          style={{ top: '20%', left: '10%', width: 12, height: 12 }}
          animate={{
            x: [0, 60, -40, 50, 0],
            y: [0, 40, -30, 20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <HeroFloatingCircle
          style={{ bottom: '25%', left: '15%', width: 8, height: 8 }}
          animate={{
            x: [0, -40, 50, -30, 0],
            y: [0, -50, 20, -30, 0],
          }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <HeroFloatingCircle
          style={{ top: '15%', right: '15%', width: 14, height: 14 }}
          animate={{
            x: [0, 50, -70, 30, 0],
            y: [0, -30, 40, -20, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <HeroFloatingCircle
          style={{ top: '50%', right: '8%', width: 10, height: 10 }}
          animate={{
            x: [0, -60, 40, -40, 0],
            y: [0, 30, -50, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <HeroFloatingCircle
          style={{ bottom: '18%', left: '45%', width: 9, height: 9 }}
          animate={{
            x: [0, 40, -40, 30, 0],
            y: [0, -30, 30, -25, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main Grid Content */}
        <GridWrapper>
          {/* Left Column */}
          <LeftColumn>
            <Tagline
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span>✦ &nbsp; PLAN. CELEBRATE. CHERISH. &nbsp; ✦</span>
            </Tagline>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Title>
                  {titleParts[0]}.
                  {titleParts[1] && titleParts[1].trim() && (
                    <>
                      <br />
                      <span>{titleParts[1].trim()}.</span>
                    </>
                  )}
                </Title>
                <Subtitle>{slide.subtitle}</Subtitle>
              </motion.div>
            </AnimatePresence>

            <ButtonGroup
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <CTAButton onClick={() => navigate("/book-event")}>
                BOOK YOUR EVENT <ArrowRight size={16} style={{ marginLeft: "8px" }} />
              </CTAButton>
              <SecondaryButton onClick={() => navigate("/gallery")}>
                EXPLORE MORE
              </SecondaryButton>
            </ButtonGroup>

            <StatsCard
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <StatItem>
                <BalloonIcon size={24} />
                <StatText>
                  <h4>500+</h4>
                  <p>Happy Events</p>
                </StatText>
              </StatItem>
              <StatDivider />
              <StatItem>
                <PopperIcon size={24} />
                <StatText>
                  <h4>50+</h4>
                  <p>Unique Themes</p>
                </StatText>
              </StatItem>
              <StatDivider />
              <StatItem>
                <SmileIcon size={24} />
                <StatText>
                  <h4>100%</h4>
                  <p>Smiles & Joy</p>
                </StatText>
              </StatItem>
            </StatsCard>
          </LeftColumn>

          {/* Right Column */}
          <RightColumn
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <CollageContainer>
              <ArchOutline
                animate={{ rotate: [0, 0.5, 0, -0.5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />
              <SweepCircleOutline
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
              />
              <DecorativeCircle
                animate={{ scale: [1, 1.06, 1], y: [0, -4, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <AnimatePresence mode="wait">
                <CollageImageWrapper key={currentIndex}>
                  {/* 1. Main Arch image */}
                  <ImageOne
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.6 }}
                  >
                    <img src={slide.archImg} alt="Arch Event Setup" />
                  </ImageOne>

                  {/* 2. Bottom Left Image */}
                  <ImageTwo
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <img src={slide.leftImg} alt="Kids Crafting Activity" />
                  </ImageTwo>

                  {/* 3. Bottom Right Image */}
                  <ImageThree
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <img src={slide.rightImg} alt="Theme Table Decor" />
                  </ImageThree>

                  {/* 4. Center Badge */}
                  <BadgeContainer
                    initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.8, rotate: 15 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    <svg viewBox="0 0 120 120" width="100%" height="100%">
                      <circle cx="60" cy="60" r="55" fill="#fbebe1" stroke="#ecd8c7" strokeWidth="1.5" />
                      <circle cx="60" cy="60" r="49" fill="none" stroke="#ecd8c7" strokeWidth="1" strokeDasharray="3 3" />
                      <path id="badge-curve" d="M 22 60 A 38 38 0 0 1 98 60" fill="none" />
                      <text font-family="'Inter', sans-serif" font-size="6.8" font-weight="700" fill="#9e634e" letter-spacing="1.1">
                        <textPath href="#badge-curve" startOffset="50%" text-anchor="middle">
                          MAKING MEMORIES
                        </textPath>
                      </text>
                      <path d="M 60 52 C 58.5 50.5, 56 50.5, 56 52.5 C 56 54.5, 60 57.5, 60 57.5 C 60 57.5, 64 54.5, 64 52.5 C 64 50.5, 61.5 50.5, 60 52 Z" fill="#9e634e" />
                      <text x="60" y="75" font-family="'Playfair Display', serif" font-size="19" font-weight="800" fill="#9e634e" text-anchor="middle">
                        500+
                      </text>
                      <text x="60" y="87" font-family="'Inter', sans-serif" font-size="5.8" font-weight="700" fill="#9e634e" letter-spacing="0.8" text-anchor="middle">
                        HAPPY EVENTS
                      </text>
                    </svg>
                  </BadgeContainer>
                </CollageImageWrapper>
              </AnimatePresence>
            </CollageContainer>
          </RightColumn>
        </GridWrapper>
        {/* Curvy Bottom SVG Shape */}
        <BottomCurve>
          <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,80 C320,180 640,20 960,110 C1180,170 1340,110 1440,80 L1440,180 L0,180 Z" fill="#fdfcf0" />
          </svg>
        </BottomCurve>
      </HeroContainer>
    </>
  );
};

// --- Styled Components ---

const HeroContainer = styled.div`
  position: relative;
  width: 100%;
  min-height: 105vh;
  overflow: hidden;
  background: #9e634e; /* Terracotta background matching the mockup */
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 9.5rem; /* Increased from 7rem to give space below the header */
  padding-bottom: 9rem;
  isolation: isolate;

  @media (max-width: 1200px) {
    padding-top: 8.5rem; /* Increased from 6rem */
    padding-bottom: 7.5rem;
    min-height: 95vh;
  }
`;

const GlowBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: -1;
  background: 
    radial-gradient(ellipse at 15% 25%, rgba(251, 235, 225, 0.12) 0%, transparent 45%),
    radial-gradient(ellipse at 80% 70%, rgba(251, 235, 225, 0.15) 0%, transparent 50%),
    radial-gradient(circle at 50% 50%, rgba(158, 99, 78, 0.1) 0%, transparent 60%);
`;

const DotGridBackground = styled.div`
  position: absolute;
  top: 10%;
  right: 5%;
  width: 250px;
  height: 250px;
  opacity: 0.18;
  z-index: -1;
  pointer-events: none;
  background-image: radial-gradient(#fdfcf0 1.5px, transparent 1.5px);
  background-size: 18px 18px;

  @media (max-width: 968px) {
    display: none;
  }
`;

// Grid
const GridWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: grid;
  grid-template-columns: 1.1fr 0.9fr;
  gap: 3.5rem;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  align-items: center;
  padding: 0 4.5rem;

  @media (max-width: 1200px) {
    gap: 2.5rem;
  }

  @media (max-width: 1024px) {
    padding: 0 2rem;
  }

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    padding-top: 1.5rem;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 968px) {
    align-items: center;
    text-align: center;
  }
`;

const Tagline = styled(motion.div)`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #fbebe1;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 1.8rem;
  text-shadow: 
    1px 1px 0px #703d2e,
    2px 2px 0px #68392b,
    3px 3px 4px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 4.1rem;
  font-weight: 400;
  color: white;
  line-height: 1.12;
  margin-bottom: 1.8rem;
  letter-spacing: -0.5px;
  text-shadow: 
    1px 1px 0px #703d2e,
    2px 2px 0px #68392b,
    3px 3px 0px #603427,
    4px 4px 0px #583024,
    5px 5px 0px #502b20,
    6px 6px 0px #48271d,
    7px 7px 8px rgba(0, 0, 0, 0.4),
    8px 8px 12px rgba(0, 0, 0, 0.3);
  
  span {
    color: #e8c0ab;
    text-shadow: 
      1px 1px 0px #703d2e,
      2px 2px 0px #68392b,
      3px 3px 0px #603427,
      4px 4px 0px #583024,
      5px 5px 0px #502b20,
      6px 6px 0px #48271d,
      7px 7px 8px rgba(0, 0, 0, 0.4),
      8px 8px 12px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 1200px) {
    font-size: 3.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2.6rem;
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 2.5rem;
  line-height: 1.65;
  max-width: 490px;
  text-shadow: 
    1px 1px 0px #703d2e,
    2px 2px 3px rgba(0, 0, 0, 0.25);

  @media (max-width: 968px) {
    margin-left: auto;
    margin-right: auto;
  }
`;

const ButtonGroup = styled(motion.div)`
  display: flex;
  gap: 1.2rem;
  margin-bottom: 3.5rem;
  
  @media (max-width: 968px) {
    justify-content: center;
  }
  @media (max-width: 480px) {
    flex-direction: column;
    width: 100%;
    max-width: 320px;
  }
`;

const CTAButton = styled.button`
  background: #fbebe1;
  color: #9e634e;
  border: none;
  border-radius: 6px;
  padding: 0.95rem 2.2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  letter-spacing: 0.8px;
  
  &:hover {
    transform: translateY(-2px);
    background: white;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #fbebe1;
  border: 1px solid rgba(251, 235, 225, 0.4);
  border-radius: 6px;
  padding: 0.95rem 2.2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 0.8px;
  
  &:hover {
    background: rgba(251, 235, 225, 0.08);
    transform: translateY(-2px);
    border-color: #fbebe1;
  }
`;

// Stats Card
const StatsCard = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1.5px solid rgba(251, 235, 225, 0.22);
  border-radius: 12px;
  padding: 1.2rem 1.6rem;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(5px);
  max-width: 540px;
  width: 100%;
  
  @media (max-width: 968px) {
    margin: 0 auto;
  }

  @media (max-width: 520px) {
    flex-direction: column;
    gap: 1.2rem;
    padding: 1.5rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  color: #fbebe1;

  svg {
    opacity: 0.95;
    flex-shrink: 0;
  }

  @media (max-width: 520px) {
    width: 100%;
    justify-content: flex-start;
    padding-left: 20%;
  }
`;

const StatText = styled.div`
  display: flex;
  flex-direction: column;
  
  h4 {
    font-family: 'Playfair Display', serif;
    font-size: 1.6rem;
    font-weight: 700;
    color: white;
    margin: 0;
    line-height: 1.1;
    text-shadow: 
      1px 1px 0px #703d2e,
      2px 2px 0px #68392b,
      3px 3px 0px #603427,
      4px 4px 5px rgba(0, 0, 0, 0.35);
  }
  
  p {
    font-family: 'Inter', sans-serif;
    color: rgba(251, 235, 225, 0.8);
    font-size: 0.76rem;
    margin: 3px 0 0 0;
    font-weight: 500;
    letter-spacing: 0.3px;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
  }
`;

const StatDivider = styled.div`
  width: 1.5px;
  height: 38px;
  background: rgba(251, 235, 225, 0.22);
  
  @media (max-width: 520px) {
    width: 60px;
    height: 1.5px;
  }
`;

// Right Collage Column
const RightColumn = styled(motion.div)`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CollageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 480 / 520;
  margin: 0 auto;

  @media (max-width: 968px) {
    max-width: 520px;
    margin-top: 1rem;
  }

  @media (max-width: 480px) {
    max-width: 380px;
  }
`;

const CollageImageWrapper = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const ImageOne = styled(motion.div)`
  position: absolute;
  top: 0;
  right: 8%;
  width: 70%;
  height: 80%;
  overflow: hidden;
  border-radius: 200px 200px 0 0;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    1px 1px 0px #4a2114,
    2px 2px 0px #4a2114,
    3px 3px 0px #4a2114,
    4px 4px 0px #4a2114,
    5px 5px 0px #4a2114,
    6px 6px 0px #4a2114,
    7px 7px 20px rgba(0, 0, 0, 0.45);
  z-index: 1;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageTwo = styled(motion.div)`
  position: absolute;
  bottom: 15%;
  left: 2%;
  width: 50%;
  height: 35%;
  overflow: hidden;
  border-radius: 24px;
  border: 4px solid #fdfcf0; /* Cream border */
  box-shadow: 
    1px 1px 0px #4a2114,
    2px 2px 0px #4a2114,
    3px 3px 0px #4a2114,
    4px 4px 0px #4a2114,
    5px 5px 0px #4a2114,
    6px 6px 0px #4a2114,
    7px 7px 20px rgba(0, 0, 0, 0.45);
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImageThree = styled(motion.div)`
  position: absolute;
  bottom: 15%;
  right: 2%;
  width: 38%;
  height: 50%;
  overflow: hidden;
  border-radius: 24px;
  border: 4px solid #fdfcf0; /* Cream border */
  box-shadow: 
    1px 1px 0px #4a2114,
    2px 2px 0px #4a2114,
    3px 3px 0px #4a2114,
    4px 4px 0px #4a2114,
    5px 5px 0px #4a2114,
    6px 6px 0px #4a2114,
    7px 7px 20px rgba(0, 0, 0, 0.45);
  z-index: 2;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const BadgeContainer = styled(motion.div)`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 28.125%;
  aspect-ratio: 1;
  z-index: 10;
  filter: 
    drop-shadow(1px 1px 0px #4a2114)
    drop-shadow(2px 2px 0px #4a2114)
    drop-shadow(3px 3px 0px #4a2114)
    drop-shadow(4px 4px 15px rgba(0,0,0,0.35));
`;

// Bottom Curvy Wave
const BottomCurve = styled.div`
  position: absolute;
  bottom: -1px;
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

const ArchOutline = styled(motion.div)`
  position: absolute;
  top: -3%;
  right: 5%;
  width: 75%;
  height: 84%;
  border-radius: 200px 200px 0 0;
  border: 1.5px solid rgba(251, 235, 225, 0.35);
  z-index: 0;
  pointer-events: none;
`;

const SweepCircleOutline = styled(motion.div)`
  position: absolute;
  bottom: -11%;
  right: -12%;
  width: 72%;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 1.5px solid rgba(251, 235, 225, 0.22);
  z-index: 0;
  pointer-events: none;
`;

const DecorativeCircle = styled(motion.div)`
  position: absolute;
  left: -8%;
  top: 46%;
  width: 20%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(251, 235, 225, 0.14);
  z-index: 0;
  pointer-events: none;
`;


const HeroFloatingCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  pointer-events: none;
  z-index: 2;
`;
