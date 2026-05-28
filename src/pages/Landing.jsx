import { motion } from "framer-motion";
import styled from "styled-components";
import { HeroSlider } from "../components/HeroSlider";
import { EnvelopeQuote } from "../components/EnvelopeQuote";
import { CategoriesSpread } from "../components/CategoriesSpread";
import { DecorThemes } from "../components/DecorThemes";
import { ClientTestimonials } from "../components/ClientTestimonials";
import { EventTimeline } from "../components/EventTimeline";
import ImageGallery from "../components/ImageGallery";
import { useNavigate } from "react-router-dom";
import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <FloatingNavbar />
      
      <HeroSlider />
      
      <EnvelopeQuote />

      <ImageGallery />

      <CategoriesSpread />

      <DecorThemes />

      <ClientTestimonials />

      <EventTimeline />

      <CTASection>
        <TopCurve>
          <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,80 C320,180 640,20 960,110 C1180,170 1340,110 1440,80 L1440,180 L0,180 Z" fill="#a76b53" />
          </svg>
        </TopCurve>
        <CTAContent
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <CTATitle>
            Ready to Create Your Perfect Event?
          </CTATitle>
          <CTADescription>
            Let's bring your vision to life with unforgettable celebrations
          </CTADescription>
          <CTAButtons>
            <PrimaryButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/book-event')}
            >
              <span style={{ position: 'relative', zIndex: 10 }}>Book Your Event</span>
            </PrimaryButton>
            <SecondaryButton
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/gallery')}
            >
              View Gallery
            </SecondaryButton>
          </CTAButtons>
        </CTAContent>
      </CTASection>

      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fdfcf0;
  position: relative;
  overflow-x: hidden;
`;

const CTASection = styled.section`
  position: relative;
  padding: 8rem 1rem;
  background: #a76b53;
  color: white;
`;

const TopCurve = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 12vw;
  min-height: 90px;
  max-height: 180px;
  transform: translateY(-99%);
  z-index: 5;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const CTAContent = styled(motion.div)`
  position: relative;
  z-index: 10;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const CTATitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: white;
  margin-bottom: 1.5rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const CTADescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
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
  padding: 1rem 3rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: #a76b53;
  background: white;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SecondaryButton = styled(motion.button)`
  padding: 1rem 3rem;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  background: transparent;
  border: 1px solid white;
  border-radius: 4px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export default Landing;
