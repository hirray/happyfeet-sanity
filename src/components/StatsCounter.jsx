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
  border-radius: 24px;
  padding: 3.75rem 1.5rem;
  background: rgba(167, 107, 83, 0.15);
  border: 1px solid rgba(167, 107, 83, 0.25);
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

const StatItem = styled.div`
  position: relative;
  text-align: center;
`;

const IconBox = styled(motion.div)`
  width: 4.2rem;
  height: 4.2rem;
  margin: 0 auto 1.2rem;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1.8rem;
    height: 1.8rem;
    color: #ffffff;
  }
`;

const Number = styled(motion.div)`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 3.4vw, 3.2rem);
  font-weight: 400;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 0.4rem;
`;

const Label = styled(motion.p)`
  margin: 0;
  color: #ebd9ce;
  font-weight: 600;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Card = styled(motion.div)`
  position: relative;
  border-radius: 16px;
  padding: 2.2rem 1rem;
  background: #a76b53;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 24px rgba(167, 107, 83, 0.12);
  overflow: hidden;
  cursor: pointer;
`;

// Animation variants for rich, unique hover experience
const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: (index) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.25 + index * 0.08,
      type: 'spring',
      stiffness: 110,
      damping: 18,
    },
  }),
  hover: (index) => ({
    y: -14,
    scale: 1.06,
    rotate: index % 2 === 0 ? 1.5 : -1.5,
    backgroundColor: '#955c45',
    borderColor: 'rgba(255, 255, 255, 0.45)',
    boxShadow: '0 20px 40px rgba(167, 107, 83, 0.25)',
    transition: {
      type: 'spring',
      stiffness: 280,
      damping: 20,
    },
  }),
};

const iconBoxVariants = {
  initial: { scale: 1, rotate: 0, y: 0 },
  hover: {
    scale: 1.15,
    rotate: 15,
    y: -6,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 10,
    },
  },
};

const numberVariants = {
  initial: { scale: 1, y: 0 },
  hover: {
    scale: 1.08,
    y: -2,
    textShadow: '0 4px 14px rgba(255, 255, 255, 0.3)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

const labelVariants = {
  initial: { y: 0 },
  hover: {
    y: -2,
    color: '#ffffff',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 15,
    },
  },
};

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
                <StatItem key={stat.label}>
                  <Card
                    custom={index}
                    variants={cardVariants}
                    initial="initial"
                    animate={inView ? 'animate' : 'initial'}
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                  >
                    <IconBox variants={iconBoxVariants}>
                      <Icon />
                    </IconBox>

                    <Number variants={numberVariants}>
                      {inView && (
                        <CountUp end={stat.value} duration={2.4} delay={0.35} suffix={stat.suffix} />
                      )}
                    </Number>

                    <Label variants={labelVariants}>{stat.label}</Label>
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

