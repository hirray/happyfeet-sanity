// src/components/WhyChooseUs.jsx
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Clock, HeartHandshake, Palette, Shield, Zap } from 'lucide-react';
import styled from 'styled-components';

const reasons = [
  {
    icon: Sparkles,
    title: 'Creative Excellence',
    description:
      'We create vibrant experiences through décor, games, and joyful activities that spark',
    color: '#a76b53',
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: "From setup to wrap-up, we ensure every element is executed smoothly and delivered right on time.",
    color: '#a76b53',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Service',
    description:
      'Every event is unique. We listen, understand, and deliver beyond expectations.',
    color: '#a76b53',
  },
  {
    icon: Palette,
    title: 'Attention to Detail',
    description:
      'From tiny props to grand setups, we perfect every detail for a flawless event experience.',
    color: '#a76b53',
  },
  {
    icon: Shield,
    title: 'Reliable & Trusted',
    description: '500+ successful events and counting. Our track record speaks for itself. families trust us for worry-free celebrations.',
    color: '#a76b53',
  },
  {
    icon: Zap,
    title: 'Innovative Solutions',
    description:
      'We blend creative concepts with fresh ideas to make every event unique and memorable.',
    color: '#a76b53',
  },
];

const WhySection = styled.section`
  position: relative;
  padding: 6rem 1.5rem 5rem;
  overflow: hidden;
  background: #fdfcf0;
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
  background: rgba(167, 107, 83, 0.08);
  color: #a76b53;
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 5vw, 3.2rem);
  font-weight: 400;
  color: #2c2a29;
  margin-bottom: 1.2rem;
  text-shadow: 
    1px 1px 0px #eae3d8,
    2px 2px 0px #e2d9cb,
    3px 3px 0px #d9cfbe,
    4px 4px 6px rgba(167, 107, 83, 0.15);
`;

const GradientWord = styled.span`
  color: #a76b53;
  font-style: italic;
`;

const Subtitle = styled.p`
  font-size: 1.05rem;
  color: #5c5957;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.7;
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
  border-radius: 4px;
  padding: 2.2rem 2rem;
  background: #fcfaf6;
  border: 1px solid rgba(167, 107, 83, 0.22);
  box-shadow: 0 12px 35px rgba(167, 107, 83, 0.04);
  transition: box-shadow 0.35s ease, transform 0.35s ease;
`;

const IconBubble = styled(motion.div)`
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(167, 107, 83, 0.15);

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const ReasonTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 400;
  color: #2c2a29;
  margin-bottom: 0.60rem;
  transition: color 0.3s ease;
`;

const ReasonText = styled.p`
  font-size: 0.95rem;
  color: #5c5957;
  line-height: 1.65;
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
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
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

          return (
            <CardWrapper
              key={reason.title}
              variants={cardVariants}
              whileHover={{
                y: -6,
              }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <IconBubble
                  style={{ background: reason.color }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <Icon />
                </IconBubble>

                <ReasonTitle>{reason.title}</ReasonTitle>
                <ReasonText>{reason.description}</ReasonText>
              </Card>
            </CardWrapper>
          );
        })}
      </Grid>
    </WhySection>
  );
};

export default WhyChooseUs;