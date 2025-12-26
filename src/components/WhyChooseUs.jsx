// src/components/WhyChooseUs.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Clock, HeartHandshake, Palette, Shield, Zap } from 'lucide-react';
import styled, { keyframes } from 'styled-components';

const reasons = [
  {
    icon: Sparkles,
    title: 'Creative Excellence',
    description:
      'Our team of creative wizards transforms ordinary spaces into extraordinary experiences.',
    from: '#ff7a7a',
    to: '#ff6fa5',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: "We respect deadlines like they're sacred. Your event, on time, every time.",
    from: '#22c1c3',
    to: '#42e695',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Service',
    description:
      'Every event is unique. We listen, understand, and deliver beyond expectations.',
    from: '#f6d365',
    to: '#fda085',
  },
  {
    icon: Palette,
    title: 'Attention to Detail',
    description:
      'From the grandest stage to the smallest decoration, perfection is in our DNA.',
    from: '#a855f7',
    to: '#ec4899',
  },
  {
    icon: Shield,
    title: 'Reliable & Trusted',
    description: '500+ successful events and counting. Our track record speaks for itself.',
    from: '#38bdf8',
    to: '#22c55e',
  },
  {
    icon: Zap,
    title: 'Innovative Solutions',
    description:
      'We blend traditional charm with modern technology for unforgettable moments.',
    from: '#ff9f43',
    to: '#ff6b6b',
  },
];

const floatSoft = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

const sparkDrift = keyframes`
  0% {
    transform: translate3d(0, 0, 0) scale(0.7);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  60% {
    transform: translate3d(12px, -14px, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate3d(22px, -20px, 0) scale(0.7);
    opacity: 0;
  }
`;

const WhySection = styled.section`
  position: relative;
  padding: 5rem 1.5rem 4rem;
  overflow: hidden;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3.5rem;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1.4rem;
  border-radius: 999px;
  background: rgba(250, 204, 21, 0.15);
  color: #f59e0b;
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.4rem, 4vw, 3rem);
  font-weight: 800;
  color: #111827;
  margin-bottom: 1.2rem;
`;

const GradientWord = styled.span`
  background: linear-gradient(135deg, #f97316, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: #6b7280;
  max-width: 640px;
  margin: 0 auto;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.8rem;
  max-width: 1120px;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const CardWrapper = styled(motion.div)`
  position: relative;
`;

const Card = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 1.5rem;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.4);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  backdrop-filter: blur(14px);
  transition: box-shadow 0.35s ease, transform 0.35s ease;

  &::before {
    content: '';
    position: absolute;
    inset: -50%;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.9) 40%,
      rgba(255, 255, 255, 0) 80%
    );
    transform: translate3d(-130%, 0, 0) rotate(18deg);
    opacity: 0;
    pointer-events: none;
    transition: transform 0.75s ease, opacity 0.75s ease;
  }

  &:hover::before {
    transform: translate3d(130%, 0, 0) rotate(18deg);
    opacity: 1;
  }

  .spark-orbit {
    opacity: 0;
  }

  &:hover .spark-orbit {
    opacity: 1;
  }

  &:hover .card-gradient-overlay {
    opacity: 0.06;
  }

  &:hover .reason-title {
    color: #f97316;
  }
`;

const CardGradientOverlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.45s ease;
  pointer-events: none;
  z-index: 0;
`;

const IconBubble = styled(motion.div)`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.25);
  animation: ${floatSoft} 7s ease-in-out infinite;

  svg {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

const ReasonTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 0.6rem;
  transition: color 0.3s ease;
`;

const ReasonText = styled.p`
  font-size: 0.98rem;
  color: #4b5563;
  line-height: 1.7;
`;

const CornerOrb = styled(motion.div)`
  position: absolute;
  width: 6rem;
  height: 6rem;
  border-radius: 999px;
  bottom: -2.5rem;
  right: -2.5rem;
  opacity: 0;
`;

const SparkOrbit = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
`;

const SparkDot = styled.span`
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background: #ffffff;
  box-shadow: 0 0 12px rgba(248, 250, 252, 0.9);
  animation: ${sparkDrift} 3.5s ease-in-out infinite;
`;

const WhyChooseUs = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, rotateX: -12 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 110,
        damping: 18,
      },
    },
  };

  return (
    <WhySection ref={ref}>
      <Header
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Badge
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }}
        >
          Why Choose Us
        </Badge>
        <Title>
          What Makes <GradientWord>Happyfeet</GradientWord> Special?
        </Title>
        <Subtitle>
          We don't just organize events; we craft memories that last a lifetime. Here's why clients come
          back to Happyfeet again and again.
        </Subtitle>
      </Header>

      <Grid
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {reasons.map((reason) => {
          const Icon = reason.icon;

          const gradient = `linear-gradient(135deg, ${reason.from}, ${reason.to})`;

          return (
            <CardWrapper
              key={reason.title}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
                rotateX: 2,
                rotateY: -2,
              }}
              transition={{ duration: 0.35 }}
            >
              <Card>
                <CardGradientOverlay
                  className="card-gradient-overlay"
                  style={{ background: gradient }}
                />

                <IconBubble
                  style={{ background: gradient }}
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon />
                </IconBubble>

                <ReasonTitle className="reason-title">{reason.title}</ReasonTitle>
                <ReasonText>{reason.description}</ReasonText>

                <CornerOrb
                  style={{ background: gradient }}
                  whileHover={{ opacity: 0.16, scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                />

                <SparkOrbit className="spark-orbit">
                  <SparkDot
                    style={{
                      top: '14%',
                      right: '18%',
                      background: reason.to,
                      animationDelay: '0s',
                    }}
                  />
                  <SparkDot
                    style={{
                      bottom: '18%',
                      left: '12%',
                      background: reason.from,
                      animationDelay: '0.7s',
                    }}
                  />
                  <SparkDot
                    style={{
                      top: '50%',
                      left: '50%',
                      background: '#ffffff',
                      opacity: 0.9,
                      animationDelay: '1.4s',
                    }}
                  />
                </SparkOrbit>
              </Card>
            </CardWrapper>
          );
        })}
      </Grid>
    </WhySection>
  );
};

export default WhyChooseUs;