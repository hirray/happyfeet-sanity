import React, { useRef } from "react";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, Star, Sparkles, LayoutGrid } from "lucide-react";

export const CategoriesSpread = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <Section id="categories" ref={ref}>
      {/* Floating Terracotta Background Circles */}
      <FloatingCircle
        style={{ top: '12%', left: '5%', width: 100, height: 100 }}
        animate={{
          x: [0, 50, 90, 40, -20, 0],
          y: [0, 25, -15, 35, -10, 0],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingCircle
        style={{ bottom: '10%', right: '8%', width: 70, height: 70 }}
        animate={{
          x: [0, -40, -10, -60, 25, 0],
          y: [0, -25, 20, -30, 15, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <FloatingCircle
        style={{ top: '45%', left: '50%', width: 120, height: 120 }}
        animate={{
          x: [0, 55, -50, 30, -25, 0],
          y: [0, -35, 35, -20, 25, 0],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <Container
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Left Content Column */}
        <ContentColumn>
          <motion.div variants={itemVariants}>
            <Title>
              Crafting magical<br />
              memories & celebrations
            </Title>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Subtitle>
              From wildly creative workshops to unforgettable parties—step into a world where every celebration is designed with joy, laughter, and a touch of Happy Feet magic.
            </Subtitle>
          </motion.div>

          <motion.div variants={itemVariants}>
            <ButtonGroup>
              <PrimaryButton onClick={() => navigate('/gallery')}>
                Explore Gallery
              </PrimaryButton>
              <SecondaryButton onClick={() => navigate('/#contact')}>
                Contact Us
              </SecondaryButton>
            </ButtonGroup>
          </motion.div>

          <motion.div variants={itemVariants}>
            <StatsRow>
              <StatItem>
                <StatValue>50+</StatValue>
                <StatLabel>Event Themes</StatLabel>
              </StatItem>
              <Divider />
              <StatItem>
                <StatValue>5K+</StatValue>
                <StatLabel>Happy Kids</StatLabel>
              </StatItem>
              <Divider />
              <StatItem>
                <StatIconWrapper>
                  <LayoutGrid size={24} />
                </StatIconWrapper>
                <StatLabel>Categories</StatLabel>
              </StatItem>
            </StatsRow>
          </motion.div>
        </ContentColumn>

        {/* Right Image Grid Column */}
        <ImageColumn variants={itemVariants}>
          <Grid>
            {/* Row 1 */}
            <ImageCard className="img-1" $bg="/landing1.jpeg">
              <CategoryOverlay>Parties</CategoryOverlay>
            </ImageCard>

            <ImageCard className="img-2" $bg="/landing7.jpg">
              <CategoryOverlay>Baby Showers</CategoryOverlay>
            </ImageCard>

            {/* Right Tall Image */}
            <ImageCard className="img-3" $bg="/landing5.jpeg">
              <CategoryOverlay>Workshops</CategoryOverlay>
            </ImageCard>

            {/* Row 2 */}
            <ImageCard className="img-4" $bg="/landing2.jpeg">
              <CategoryOverlay>Fiesta & Fair</CategoryOverlay>
            </ImageCard>

            <ImageCard className="img-5" $bg="/landing4.jpeg">
              <CategoryOverlay>Others</CategoryOverlay>
            </ImageCard>
          </Grid>
        </ImageColumn>
      </Container>
    </Section>
  );
};

// --- Styled Components ---

const Section = styled.section`
  position: relative;
  padding: 6rem 2rem;
  background-color: transparent;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const Container = styled(motion.div)`
  max-width: 1200px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 10;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

// --- Left Column ---

const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  padding-left: 2rem;
  
  @media (max-width: 968px) {
    max-width: 100%;
    padding-left: 0;
    align-items: center;
    text-align: center;
  }
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  line-height: 1.15;
  color: #2f2622;
  letter-spacing: -0.01em;
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  line-height: 1.6;
  color: #4a423e;
  margin-top: 0.25rem;
  margin-bottom: 1.5rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 968px) {
    justify-content: center;
  }
`;

const PrimaryButton = styled.button`
  background-color: #a76b53;
  color: white;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #905a45;
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(167, 107, 83, 0.2);
  }
`;

const SecondaryButton = styled.button`
  background-color: transparent;
  color: #a76b53;
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  border: 1px solid #a76b53;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(167, 107, 83, 0.05);
    transform: translateY(-2px);
  }
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 480px) {
    gap: 1rem;
  }
`;

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
`;

const StatValue = styled.div`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 400;
  color: #2f2622;
`;

const StatIconWrapper = styled.div`
  font-size: 1.25rem;
  color: #2f2622;
  display: flex;
  align-items: center;
  height: 30px;
  
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StatLabel = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #6a605a;
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Divider = styled.div`
  width: 1px;
  height: 40px;
  background-color: #e2e8f0;
`;

// --- Right Column ---

const ImageColumn = styled(motion.div)`
  position: relative;
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  grid-template-rows: 180px 180px;
  gap: 1.25rem;
  position: relative;
  
  .img-1 { grid-column: 1; grid-row: 1; }
  .img-2 { grid-column: 1; grid-row: 2; }
  
  .img-3 { 
    grid-column: 2; 
    grid-row: 1 / 3; 
    transform: translateY(-20px);
    height: calc(100% + 40px);
    background-color: #fdfcf0; 
    z-index: 2;
    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
  }
  
  .img-4 { grid-column: 3; grid-row: 1; }
  .img-5 { grid-column: 3; grid-row: 2; }

  @media (max-width: 968px) {
    grid-template-rows: 160px 160px;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto auto;
    
    .img-1 { grid-column: 1; grid-row: 1; height: 160px; }
    .img-4 { grid-column: 2; grid-row: 1; height: 160px; }
    .img-2 { grid-column: 1; grid-row: 2; height: 160px; }
    .img-5 { grid-column: 2; grid-row: 2; height: 160px; }
    .img-3 { 
      grid-column: 1 / 3; 
      grid-row: 3; 
      height: 200px; 
      transform: none;
    }
  }
`;

const ImageCard = styled.div`
  position: relative;
  border-radius: 4px;
  background-image: url(${props => props.$bg});
  background-size: cover;
  background-position: center;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  border: 1px solid rgba(167, 107, 83, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease, outline-color 0.3s ease;
  outline: 3.5px solid transparent;
  outline-offset: 5px;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 30px rgba(0,0,0,0.1);
    outline-color: #b07d6a;
  }
`;

const CategoryOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 1rem 1rem;
  background: linear-gradient(to top, rgba(47,38,34,0.8) 0%, transparent 100%);
  color: white;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: 1.25rem;
  letter-spacing: 0.5px;

  @media (max-width: 640px) {
    font-size: 1.1rem;
  }
`;

const FloatingCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(176, 125, 106, 0.22);
  pointer-events: none;
  z-index: 1;
`;
