import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, Calendar, Award, Smile } from 'lucide-react';
import styled from 'styled-components';

const stats = [
  {
    icon: Users,
    value: 1000,
    suffix: '+',
    label: 'Trusted Clients',
    color: '#a76b53',
  },
  {
    icon: Calendar,
    value: 500,
    suffix: '+',
    label: 'Events Organized',
    color: '#a76b53',
  },
  {
    icon: Award,
    value: 14,
    suffix: '+',
    label: 'Years of Experience',
    color: '#a76b53',
  },
  {
    icon: Smile,
    value: 99,
    suffix: '%',
    label: 'Client Satisfaction',
    color: '#a76b53',
  },
];

const Section = styled.section`
  padding: 6rem 1rem 5.5rem;
  position: relative;
  overflow: hidden;
  background: #fdfcf0;
`;

const Outer = styled(motion.div)`
  max-width: 72rem;
  margin: 0 auto;
`;

const Frame = styled(motion.div)`
  position: relative;
  border-radius: 4px;
  padding: 3.75rem 1.5rem;
  background: #fcfaf6;
  border: 1px solid rgba(167, 107, 83, 0.22);
  box-shadow: 0 12px 35px rgba(167, 107, 83, 0.04);
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 4.5rem 2.25rem;
  }
`;

const Orbits = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const GlowBlob = styled(motion.div)`
  position: absolute;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  filter: blur(55px);
  opacity: 0.25;
`;

const Heading = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.1rem, 3.4vw, 3rem);
  font-weight: 400;
  color: #2c2a29;
  text-align: center;
  margin: 0 0 3rem;
`;

const Sub = styled(motion.p)`
  margin: -2.2rem auto 3rem;
  max-width: 46rem;
  text-align: center;
  color: #5c5957;
  font-weight: 400;
  line-height: 1.7;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const StatItem = styled(motion.div)`
  position: relative;
  text-align: center;
`;

const IconBox = styled(motion.div)`
  width: 4.2rem;
  height: 4.2rem;
  margin: 0 auto 1.2rem;
  border-radius: 2px;
  background: rgba(167, 107, 83, 0.08);
  box-shadow: 0 8px 24px rgba(167, 107, 83, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    color: #a76b53;
  }
`;

const Number = styled(motion.div)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 3.4vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: #2c2a29;
  margin-bottom: 0.4rem;
`;

const Label = styled.p`
  margin: 0;
  color: #5c5957;
  font-weight: 600;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Card = styled(motion.div)`
  position: relative;
  border-radius: 2px;
  padding: 2.2rem 1rem;
  background: #fdfcf0;
  border: 1px solid rgba(167, 107, 83, 0.22);
  box-shadow: 0 8px 24px rgba(167, 107, 83, 0.02);
  overflow: hidden;

  &:hover {
    border-color: rgba(167, 107, 83, 0.45);
    box-shadow: 0 12px 35px rgba(167, 107, 83, 0.06);
  }
`;

export const StatsCounter = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <Section ref={ref}>
      <Outer
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Frame
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          <Orbits>
            <GlowBlob
              style={{
                width: '320px',
                height: '320px',
                left: '-120px',
                top: '-140px',
                background: 'rgba(217, 160, 128, 0.25)',
              }}
              animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
              transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            />
            <GlowBlob
              style={{
                width: '360px',
                height: '360px',
                right: '-160px',
                bottom: '-180px',
                background: 'rgba(232, 196, 176, 0.22)',
              }}
              animate={{ y: [0, -16, 0], scale: [1.05, 1, 1.05] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
          </Orbits>

          <Heading
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15 }}
          >
            Our Numbers Speak for Themselves
          </Heading>
          <Sub
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            A quick snapshot of what we’ve built — and the smiles we’ve created along the way.
          </Sub>

          <Grid>
            {stats.map((stat, index) => {
              const Icon = stat.icon;

              return (
                <StatItem
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + index * 0.1 }}
                >
                  <Card
                    whileHover={{ y: -6 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <IconBox whileHover={{ scale: 1.05, rotate: 6 }} transition={{ type: 'spring' }}>
                      <Icon />
                    </IconBox>

                    <Number
                      initial={{ scale: 0.92, opacity: 0 }}
                      animate={inView ? { scale: 1, opacity: 1 } : {}}
                      transition={{ delay: 0.55 + index * 0.1, type: 'spring', stiffness: 160 }}
                    >
                      {inView && (
                        <CountUp end={stat.value} duration={2.4} delay={0.35} suffix={stat.suffix} />
                      )}
                    </Number>

                    <Label>{stat.label}</Label>
                  </Card>
                </StatItem>
              );
            })}
          </Grid>
        </Frame>
      </Outer>
    </Section>
  );
};

export default StatsCounter;

