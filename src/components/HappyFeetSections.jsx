import React from 'react';
import styled from 'styled-components';
import WhyChooseHappyFeet from './WhyChooseHappyFeet';
import TrustedNumbers from './TrustedNumbers';
import Testimonials from './Testimonals2';
import AnimatedQuote from './AnimatedQuote';

const SectionsContainer = styled.div`
  overflow: hidden;
`;

const HappyFeetSections = () => {
  return (
    <SectionsContainer>
      <WhyChooseHappyFeet />
      <TrustedNumbers />
      <AnimatedQuote />
      <Testimonials />
    </SectionsContainer>
  );
};

export default HappyFeetSections;
