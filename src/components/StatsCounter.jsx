import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';
import { Users, Calendar, Award, Smile } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const stats = [
  {
    icon: Users,
    value: 500,
    suffix: '+',
    label: 'Trusted Clients',
    color: 'coral',
  },
  {
    icon: Calendar,
    value: 1000,
    suffix: '+',
    label: 'Events Organized',
    color: 'teal',
  },
  {
    icon: Award,
    value: 25,
    suffix: '+',
    label: 'Awards Won',
    color: 'gold',
  },
  {
    icon: Smile,
    value: 99,
    suffix: '%',
    label: 'Client Satisfaction',
    color: 'pink',
  },
];

const Section = styled.section`
  padding: 5.5rem 1rem;
  position: relative;
  overflow: hidden;
`;

const Outer = styled(motion.div)`
  max-width: 72rem;
  margin: 0 auto;
`;

const Frame = styled(motion.div)`
  position: relative;
  border-radius: 2rem;
  padding: 3.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 22px 70px rgba(15, 23, 42, 0.12);
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

const OrbitRing = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 999px;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.35);
`;

const OrbitDot = styled(motion.div)`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  filter: blur(0.15px);
`;

const GlowBlob = styled(motion.div)`
  position: absolute;
  border-radius: 999px;
  filter: blur(55px);
  opacity: 0.35;
`;

const Heading = styled(motion.h2)`
  font-size: clamp(2.1rem, 3.4vw, 3rem);
  font-weight: 950;
  color: #0f172a;
  text-align: center;
  margin: 0 0 3rem;
`;

const Sub = styled(motion.p)`
  margin: -2.2rem auto 3rem;
  max-width: 46rem;
  text-align: center;
  color: #64748b;
  font-weight: 650;
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
  transform-style: preserve-3d;
`;

const IconBox = styled(motion.div)`
  width: 4rem;
  height: 4rem;
  margin: 0 auto 1rem;
  border-radius: 1.1rem;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 14px 40px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 2rem;
    height: 2rem;
    color: #0f172a;
  }
`;

const Number = styled(motion.div)`
  font-size: clamp(2.2rem, 3.4vw, 3.2rem);
  font-weight: 950;
  letter-spacing: -0.03em;
  color: #0f172a;
  margin-bottom: 0.4rem;
`;

const Label = styled.p`
  margin: 0;
  color: #64748b;
  font-weight: 700;
`;

const gradientDrift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const sparkleFloat = keyframes`
  0% { transform: translate3d(0, 0, 0) scale(0.9); opacity: 0.0; }
  20% { opacity: 1; }
  60% { transform: translate3d(0, -10px, 0) scale(1.15); opacity: 0.9; }
  100% { transform: translate3d(0, -16px, 0) scale(0.85); opacity: 0.0; }
`;

const HoverGlow = styled(motion.div)`
  position: absolute;
  inset: -12px;
  border-radius: 1.3rem;
  opacity: 0;
  pointer-events: none;
`;

const CardBorder = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  pointer-events: none;
  opacity: 0;
  padding: 1px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.85), rgba(236, 72, 153, 0.85), rgba(34, 193, 195, 0.75), rgba(99, 102, 241, 0.75));
  background-size: 220% 220%;
  animation: ${gradientDrift} 7s linear infinite;

  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
`;

const CardHalo = styled.div`
  position: absolute;
  inset: -8px;
  border-radius: 1.7rem;
  pointer-events: none;
  opacity: 0;
  filter: blur(14px);
  background: radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.40), transparent 55%),
    radial-gradient(circle at 75% 35%, rgba(34, 193, 195, 0.32), transparent 52%),
    radial-gradient(circle at 55% 85%, rgba(249, 115, 22, 0.28), transparent 55%);
`;

const ColorWash = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1.5rem;
  pointer-events: none;
  opacity: 0.18;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.10), rgba(236, 72, 153, 0.08), rgba(34, 193, 195, 0.08));
  background-size: 220% 220%;
  animation: ${gradientDrift} 10s ease-in-out infinite;
`;

const Ripple = styled.div`
  position: absolute;
  inset: -18px;
  border-radius: 1.9rem;
  pointer-events: none;
  opacity: 0;
  transform: scale(0.88);
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0.0) 60%);
`;

const Sparkles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Sparkle = styled.span`
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  opacity: 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow:
    0 0 0 2px rgba(255, 255, 255, 0.20),
    0 0 20px rgba(236, 72, 153, 0.45),
    0 0 26px rgba(34, 193, 195, 0.35);
`;

const Card = styled(motion.div)`
  position: relative;
  border-radius: 1.5rem;
  padding: 1.5rem 1rem;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.60));
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 55px rgba(15, 23, 42, 0.10);
  backdrop-filter: blur(14px);
  overflow: hidden;
  transform-style: preserve-3d;

  .hf-card-border,
  .hf-card-halo,
  .hf-card-ripple {
    transition: opacity 220ms ease, transform 520ms cubic-bezier(0.2, 0.8, 0.2, 1);
  }

  &:hover {
    border-color: rgba(148, 163, 184, 0.18);
    box-shadow: 0 24px 90px rgba(15, 23, 42, 0.14);
  }

  &:hover .hf-card-border {
    opacity: 1;
  }

  &:hover .hf-card-halo {
    opacity: 1;
  }

  &:hover .hf-card-ripple {
    opacity: 0.75;
    transform: scale(1.14);
  }

  &:hover .hf-sparkle-1 {
    animation: ${sparkleFloat} 680ms ease-out 1;
  }
  &:hover .hf-sparkle-2 {
    animation: ${sparkleFloat} 740ms ease-out 1;
    animation-delay: 30ms;
  }
  &:hover .hf-sparkle-3 {
    animation: ${sparkleFloat} 720ms ease-out 1;
    animation-delay: 50ms;
  }
  &:hover .hf-sparkle-4 {
    animation: ${sparkleFloat} 780ms ease-out 1;
    animation-delay: 70ms;
  }
`;

const CardStripe = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: -40px;
  transform: translateX(-50%) rotate(12deg);
  width: 140px;
  height: 90px;
  border-radius: 999px;
  opacity: 0.35;
  filter: blur(6px);
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
                background: 'linear-gradient(135deg, rgba(34,193,195,0.55), rgba(236,72,153,0.35))',
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
                background: 'linear-gradient(135deg, rgba(249,115,22,0.45), rgba(99,102,241,0.28))',
              }}
              animate={{ y: [0, -16, 0], scale: [1.05, 1, 1.05] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />

            <OrbitRing
              style={{ width: '560px', height: '560px', opacity: 0.5 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />
            <OrbitRing
              style={{ width: '420px', height: '420px', opacity: 0.4 }}
              animate={{ rotate: -360 }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            />
            <OrbitRing
              style={{ width: '300px', height: '300px', opacity: 0.35 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
            />

            <motion.div
              style={{ position: 'absolute', inset: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
            >
              <OrbitDot
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%) translateX(240px)',
                  background: 'rgba(34,193,195,0.9)',
                }}
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <OrbitDot
                style={{
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%) translateX(-210px)',
                  background: 'rgba(249,115,22,0.9)',
                }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }}
              />
            </motion.div>
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
              const stripeBg =
                stat.color === 'teal'
                  ? 'linear-gradient(135deg, rgba(34,193,195,0.55), rgba(34,193,195,0.0))'
                  : stat.color === 'coral'
                    ? 'linear-gradient(135deg, rgba(249,115,22,0.55), rgba(249,115,22,0.0))'
                    : stat.color === 'gold'
                      ? 'linear-gradient(135deg, rgba(245,158,11,0.55), rgba(245,158,11,0.0))'
                      : 'linear-gradient(135deg, rgba(236,72,153,0.55), rgba(236,72,153,0.0))';

              const glowBg =
                stat.color === 'teal'
                  ? 'radial-gradient(circle at 25% 25%, rgba(34,193,195,0.22) 0%, transparent 70%)'
                  : stat.color === 'coral'
                    ? 'radial-gradient(circle at 25% 25%, rgba(249,115,22,0.22) 0%, transparent 70%)'
                    : stat.color === 'gold'
                      ? 'radial-gradient(circle at 25% 25%, rgba(245,158,11,0.22) 0%, transparent 70%)'
                      : 'radial-gradient(circle at 25% 25%, rgba(236,72,153,0.22) 0%, transparent 70%)';

              return (
                <StatItem
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.35 + index * 0.1 }}
                >
                  <Card
                    whileHover={{ y: -10, rotateX: 10, rotateY: -10, scale: 1.03 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    <CardHalo className="hf-card-halo" />
                    <CardBorder className="hf-card-border" />
                    <Ripple className="hf-card-ripple" />
                    <ColorWash />
                    <Sparkles>
                      <Sparkle className="hf-sparkle-1" style={{ left: '14px', top: '16px' }} />
                      <Sparkle className="hf-sparkle-2" style={{ right: '18px', top: '22px' }} />
                      <Sparkle className="hf-sparkle-3" style={{ left: '18px', bottom: '16px' }} />
                      <Sparkle className="hf-sparkle-4" style={{ right: '16px', bottom: '18px' }} />
                    </Sparkles>

                    <CardStripe
                      style={{ background: stripeBg }}
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    />

                    <HoverGlow
                      animate={{ opacity: [0.0, 0.22, 0.0] }}
                      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
                      style={{
                        background: glowBg,
                      }}
                    />

                    <IconBox whileHover={{ scale: 1.08, rotate: 8 }} transition={{ type: 'spring' }}>
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
