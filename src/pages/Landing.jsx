import { motion } from "framer-motion";
import styled from "styled-components";
import { HeroSlider } from "../components/HeroSlider";
import { EnvelopeQuote } from "../components/EnvelopeQuote";
import { CategoriesSpread } from "../components/CategoriesSpread";
import { DecorThemes } from "../components/DecorThemes";
import { ClientTestimonials } from "../components/ClientTestimonials";
import { EventTimeline } from "../components/EventTimeline";
import ImageGallery from "../components/ImageGallery";
import { FloatingConfetti } from "../components/FloatingConfetti";
import { useNavigate } from "react-router-dom";
import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <FloatingConfetti />
      <FloatingNavbar />
      
      <HeroSlider />
      
      <EnvelopeQuote />

      <ImageGallery />

      <CategoriesSpread />

      <DecorThemes />

      <ClientTestimonials />

      <EventTimeline />

      <CTASection>
        <CTABackground
          animate={{ scale: [1, 1.05, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <CTAContent
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CTATitle>
            Ready to Create Your <GradientText>Perfect Event?</GradientText>
          </CTATitle>
          <CTADescription>
            Let's bring your vision to life with unforgettable celebrations
          </CTADescription>
          <CTAButtons>
            <PrimaryButton
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/book-event')}
            >
              <ButtonShine
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              />
              <span style={{ position: 'relative', zIndex: 10 }}>Book Your Event</span>
            </PrimaryButton>
            <SecondaryButton
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/gallery')}
            >
              View Gallery
            </SecondaryButton>
          </CTAButtons>
        </CTAContent>

        <FloatingElement1
          animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <FloatingElement2
          animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
        <FloatingElement3
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </CTASection>

      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #fefefe 50%, #ffffff 100%);
  position: relative;
  overflow-x: hidden;
`;

const CTASection = styled.section`
  position: relative;
  padding: 8rem 1rem;
  overflow: hidden;
`;

const CTABackground = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, hsl(10, 90%, 65%), hsl(340, 80%, 65%));
  border-radius: 50%;
  filter: blur(100px);
`;

const CTAContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 900;
  color: #2d3436;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
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

const CTADescription = styled.p`
  font-size: 1.25rem;
  color: #636e72;
  margin-bottom: 3rem;
`;

const CTAButtons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(motion.button)`
  position: relative;
  padding: 1.25rem 3rem;
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

const SecondaryButton = styled(motion.button)`
  padding: 1.25rem 3rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: hsl(10, 90%, 65%);
  background: white;
  border: 2px solid hsl(10, 90%, 65%);
  border-radius: 50px;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
`;

const FloatingElement1 = styled(motion.div)`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: hsl(340, 80%, 65%, 0.3);
`;

const FloatingElement2 = styled(motion.div)`
  position: absolute;
  bottom: 20%;
  right: 15%;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background: hsl(175, 70%, 45%, 0.3);
`;

const FloatingElement3 = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 10%;
  width: 2rem;
  height: 2rem;
  transform: rotate(45deg);
  background: hsl(40, 95%, 55%, 0.3);
`;

export default Landing;
