import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import { ParticleText } from '../components/ParticleText';
import { GamesSection } from '../components/GamesSection';
import GameShowcase from '../components/GameShowcase';
import TrainAnimation from '../components/TrainAnimation';
import InteractivePlayground from '../components/InteractivePlayground';

const Games = () => {
  return (
    <GamesContainer>
      <AnimatedBackground />
      <FloatingNavbar />
      <MainContent>
        <HeroSection>
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{ width: '100%', marginBottom: '2rem' }}
          >
            <ParticleText />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Subtitle>Interactive Games & Activities</Subtitle>
            <SubtitleDescription>
              Scroll to explore our amazing collection of fun and educational games!
            </SubtitleDescription>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ marginTop: '3rem' }}
          >
            <ScrollIndicator>↓</ScrollIndicator>
          </motion.div>
        </HeroSection>

        <GamesSection />
        
        
        <TrainAnimation />
        <InteractivePlayground />
      </MainContent>
      <Footer />
    </GamesContainer>
  );
};

const GamesContainer = styled.div`
  min-height: 100vh;
  background: transparent;
  color: #2d3436;
  position: relative;
`;

const MainContent = styled.main`
  padding-top: 80px;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
`;

const HeroSection = styled.section`
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 0;
  position: relative;
`;

const Subtitle = styled.h2`
  font-size: 2.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-top: 1rem;
  font-weight: 800;
  
  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const SubtitleDescription = styled.p`
  font-size: 1.2rem;
  color: #636e72;
  margin-top: 1rem;
  font-weight: 500;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ScrollIndicator = styled.div`
  font-size: 3rem;
  color: #667eea;
  opacity: 0.6;
`;

export default Games;
