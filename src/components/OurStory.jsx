// src/components/OurStory.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Rocket, Star, Trophy, Heart } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const storyPoints = [
  {
    key: '2011',
    year: '2011',
    title: 'The Beginning',
    description:
      'HappyFeet Activity Club was founded to create joyful, creative experiences for children through activities and workshops.',
    icon: Rocket,
    color: '#a76b53',
  },
  {
    key: '2014',
    year: '2014',
    title: 'Growing Smiles',
    description:
      'HappyFeet expanded into workshops and small events, earning trust from families and schools.',
    icon: Star,
    color: '#a76b53',
  },
  {
    key: '2018',
    year: '2018',
    title: 'Full Service Event Management',
    description:
      'HappyFeet became a complete event company, managing décor, games, activities, and execution.',
    icon: Trophy,
    color: '#a76b53',
  },
  {
    key: 'Today',
    year: 'Today',
    title: 'A Trusted Multi-Age Event Brand',
    description:
      "Today, HappyFeet plans diverse celebrations for all ages, with a strong focus on kids.",
    icon: Heart,
    color: '#a76b53',
  },
];

const StorySection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem 5rem;
  background: #fcfaf6;
`;

const BackgroundLayer = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.6;
  pointer-events: none;
`;

const BackgroundCircle = styled(motion.div)`
  position: absolute;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  filter: blur(60px);
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
  background: rgba(167, 107, 83, 0.08);
  color: #a76b53;
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 5vw, 3.2rem);
  font-weight: 400;
  color: #2c2a29;
  margin: 0;
`;

const GradientWord = styled.span`
  color: #a76b53;
  font-style: italic;
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
  width: 1px;
  background: rgba(167, 107, 83, 0.35);
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
  margin-bottom: 3.5rem;

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
  width: 2.6rem;
  height: 2.6rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 24px rgba(167, 107, 83, 0.15);
  position: relative;
  z-index: 1;
  border: 1px solid rgba(255, 255, 255, 0.9);

  svg {
    width: 1.15rem;
    height: 1.15rem;
    color: #ffffff;
  }
`;

const StoryCardContainer = styled.div`
  margin-left: 5rem;
  width: 100%;

  @media (min-width: 768px) {
    margin-left: 0;
    width: 50%;
    padding-right: ${({ align }) => (align === 'left' ? '3.5rem' : '0')};
    padding-left: ${({ align }) => (align === 'right' ? '3.5rem' : '0')};
  }
`;

const StoryCard = styled(motion.div)`
  position: relative;
  overflow: hidden;
  background: #fdfcf0;
  border-radius: 4px;
  padding: 1.8rem 1.6rem;
  border: 1px solid rgba(167, 107, 83, 0.22);
  box-shadow: 0 10px 30px rgba(167, 107, 83, 0.04);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  z-index: 0;
`;

const YearPill = styled(motion.span)`
  display: inline-block;
  padding: 0.3rem 0.85rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.78rem;
  margin-bottom: 0.85rem;
`;

const StoryTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 400;
  color: #2c2a29;
  margin: 0 0 0.55rem 0;
  transition: color 0.3s ease;
`;

const StoryDescription = styled.p`
  font-size: 0.95rem;
  color: #5c5957;
  line-height: 1.65;
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
            width: '280px',
            height: '280px',
            background: 'rgba(217, 160, 128, 0.18)',
          }}
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <BackgroundCircle
          style={{
            bottom: '-130px',
            right: '-90px',
            width: '320px',
            height: '320px',
            background: 'rgba(232, 196, 176, 0.15)',
          }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
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
              key={point.key}
              align={isLeft ? 'left' : 'right'}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
            >
              <TimelineDotWrapper
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ delay: 0.5 + index * 0.15, type: 'spring' }}
              >
                <TimelineDot
                  whileHover={{ scale: 1.15 }}
                  style={{ backgroundColor: point.color }}
                >
                  <Icon />
                </TimelineDot>
              </TimelineDotWrapper>

              <StoryCardContainer align={isLeft ? 'left' : 'right'}>
                <StoryCard
                  whileHover={{
                    y: -4,
                    borderColor: 'rgba(167, 107, 83, 0.45)',
                    boxShadow: '0 16px 35px rgba(167, 107, 83, 0.06)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <YearPill
                    style={{
                      backgroundColor: `${point.color}12`,
                      color: point.color,
                    }}
                  >
                    {point.year}
                  </YearPill>
                  <StoryTitle>{point.title}</StoryTitle>
                  <StoryDescription>{point.description}</StoryDescription>
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