// src/components/OurStory.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Star, Trophy, Heart } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const storyPoints = [
  {
    year: '2011',
    title: 'The Beginning',
    description:
      'HappyFeet Activity Club was founded to create joyful, creative experiences for children through activities and workshops.',
    icon: Rocket,
    color: '#ff7a7a',
  },
  {
    year: '2014',
    title: 'Growing Smiles',
    description:
      'HappyFeet expanded into workshops and small events, earning trust from families and schools.',
    icon: Star,
    color: '#1abc9c',
  },
  {
    year: '2018',
    title: 'Full Service Event Management',
    description:
      'HappyFeet became a complete event company, managing décor, games, activities, and execution.',
    icon: Trophy,
    color: '#f39c12',
  },
  {
    year: 'Today',
    title: 'A Trusted Multi-Age Event Brand',
    description:
      "Today, HappyFeet plans diverse celebrations for all ages, with a strong focus on kids.",
    icon: Heart,
    color: '#ff6fa5',
  },
];

const floatSparkle = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(0.7);
    opacity: 0;
  }
  20% {
    opacity: 0.9;
  }
  60% {
    transform: translate3d(10px, -12px, 0) scale(1);
    opacity: 0.9;
  }
  100% {
    transform: translate3d(18px, -20px, 0) scale(0.7);
    opacity: 0;
  }
`;

const StorySection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 5rem 1.5rem 4rem;
  background: transparent;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.7;
  pointer-events: none;
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 999px;
  filter: blur(45px);
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3.5rem;
  position: relative;
  z-index: 1;
`;

const SectionBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1.4rem;
  border-radius: 999px;
  background: rgba(108, 99, 255, 0.08);
  color: #ff6b6b;
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.4rem, 4vw, 3rem);
  font-weight: 800;
  color: #111827;
  margin: 0;
`;

const GradientWord = styled.span`
  background: linear-gradient(135deg, #f97316, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const TimelineWrapper = styled.div`
  max-width: 960px;
  margin: 0 auto;
  position: relative;
  padding-left: 0.5rem;
  z-index: 1;
`;

const TimelineLine = styled(motion.div)`
  position: absolute;
  left: 24px;
  top: 0;
  bottom: 0;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(to bottom, #ff6b6b, #ff9f43, #ffd166);
  transform-origin: top;
  z-index: 0;

  @media (min-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StoryItemRow = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 3rem;

  @media (min-width: 768px) {
    flex-direction: ${({ align }) => (align === 'left' ? 'row' : 'row-reverse')};
  }
`;

const TimelineDotWrapper = styled(motion.div)`
  position: absolute;
  left: 24px;
  transform: translateX(-50%);
  z-index: 2;

  @media (min-width: 768px) {
    left: 50%;
  }
`;

const TimelineDot = styled(motion.div)`
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.35);
  position: relative;
  z-index: 1;

  svg {
    width: 1.5rem;
    height: 1.5rem;
    color: #ffffff;
  }
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  z-index: 0;
`;

const SparkleDot = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  pointer-events: none;
  filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.7));
  animation: ${floatSparkle} 3.2s ease-in-out infinite;
  transition: opacity 0.3s ease;
  z-index: 0;
`;

const StoryCardContainer = styled.div`
  margin-left: 5rem;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 0;
    width: 50%;
    padding-right: ${({ align }) => (align === 'left' ? '4rem' : '0')};
    padding-left: ${({ align }) => (align === 'right' ? '4rem' : '0')};
  }
`;

const StoryCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 1.25rem;
  padding: 1.7rem 1.6rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(16px);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  z-index: 0;

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: radial-gradient(circle at top, rgba(255, 255, 255, 0.8), transparent 60%);
    opacity: 0;
    transform: translate3d(0, 30%, 0);
    transition: opacity 0.45s ease, transform 0.45s ease;
    pointer-events: none;
    z-index: -1;
  }

  &:hover::before {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &:hover .story-title {
    color: #f97316;
  }
`;

const YearPill = styled(motion.span)`
  display: inline-block;
  padding: 0.35rem 0.9rem;
  border-radius: 999px;
  font-weight: 700;
  font-size: 0.8rem;
  margin-bottom: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
`;

const StoryTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 800;
  color: #111827;
  margin: 0 0 0.45rem 0;
  position: relative;
  z-index: 1;
  transition: color 0.3s ease;
`;

const StoryDescription = styled.p`
  font-size: 0.98rem;
  color: #4b5563;
  line-height: 1.7;
  margin: 0;
`;

const OurStory = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <StorySection ref={ref}>
      <BackgroundLayer>
        <BackgroundCircle
          style={{
            top: '-90px',
            left: '-70px',
            width: '260px',
            height: '260px',
            background: 'rgba(255, 135, 90, 0.9)',
          }}
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <BackgroundCircle
          style={{
            bottom: '-130px',
            right: '-90px',
            width: '340px',
            height: '340px',
            background: 'rgba(96, 165, 250, 0.9)',
          }}
          animate={{ y: [0, -22, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </BackgroundLayer>

      <SectionHeader
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <SectionBadge
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        >
          Our Journey
        </SectionBadge>
        <SectionTitle>
          The <GradientWord>Story</GradientWord> Behind Happyfeet
        </SectionTitle>
      </SectionHeader>

      <TimelineWrapper>
        <TimelineLine
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
        />

        {storyPoints.map((point, index) => {
          const isLeft = index % 2 === 0;
          const Icon = point.icon;

          return (
            <StoryItemRow
              key={point.year}
              align={isLeft ? 'left' : 'right'}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            >
              <TimelineDotWrapper
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.2, type: 'spring' }}
              >
                <TimelineDot
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                  style={{ backgroundColor: point.color }}
                >
                  <Icon />
                </TimelineDot>
                <PulseRing
                  style={{ backgroundColor: point.color }}
                  animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                />
              </TimelineDotWrapper>

              <StoryCardContainer align={isLeft ? 'left' : 'right'}>
                <StoryCard
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    rotateX: 2,
                    rotateY: -2,
                    boxShadow: '0 28px 70px -18px rgba(15, 23, 42, 0.45)',
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <YearPill
                    whileHover={{ y: -2, scale: 1.04 }}
                    style={{
                      backgroundColor: `${point.color}1a`,
                      color: point.color,
                    }}
                  >
                    {point.year}
                  </YearPill>
                  <StoryTitle className="story-title">{point.title}</StoryTitle>
                  <StoryDescription>{point.description}</StoryDescription>

                  <SparkleDot
                    className="sparkle-dot"
                    style={{
                      top: '12%',
                      right: '10%',
                      backgroundColor: point.color,
                      animationDelay: '0s',
                    }}
                  />
                  <SparkleDot
                    className="sparkle-dot"
                    style={{
                      bottom: '16%',
                      left: '12%',
                      backgroundColor: point.color,
                      animationDelay: '1s',
                    }}
                  />
                </StoryCard>
              </StoryCardContainer>
            </StoryItemRow>
          );
        })}
      </TimelineWrapper>
    </StorySection>
  );
};

export default OurStory;