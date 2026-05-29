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
    color: '#d9a727', // Logo yellow
    bgColor: '#faf2c8', // Richer pastel yellow
  },
  {
    icon: Clock,
    title: 'Timely Delivery',
    description: "From setup to wrap-up, we ensure every element is executed smoothly and delivered right on time.",
    color: '#5b9a98', // Logo sage teal
    bgColor: '#d4ece8', // Richer pastel teal
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Service',
    description:
      'Every event is unique. We listen, understand, and deliver beyond expectations.',
    color: '#cf6b76', // Logo pink
    bgColor: '#fcdcd8', // Richer pastel pink
  },
  {
    icon: Palette,
    title: 'Attention to Detail',
    description:
      'From tiny props to grand setups, we perfect every detail for a flawless event experience.',
    color: '#e09540', // Logo orange
    bgColor: '#fae3ca', // Richer pastel orange
  },
  {
    icon: Shield,
    title: 'Reliable & Trusted',
    description: '500+ successful events and counting. Our track record speaks for itself. families trust us for worry-free celebrations.',
    color: '#a76b53', // Navbar brown
    bgColor: '#ecdcd0', // Richer pastel brown
  },
  {
    icon: Zap,
    title: 'Innovative Solutions',
    description:
      'We blend creative concepts with fresh ideas to make every event unique and memorable.',
    color: '#c83b2e', // Logo red
    bgColor: '#fad4d0', // Richer pastel red
  },
];

const WhySection = styled.section`
  position: relative;
  padding: 3.5rem 1.5rem 3rem;
  overflow: hidden;
  background: #fdfcf0;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.35rem 1.2rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.08);
  color: #a76b53;
  font-weight: 600;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 0.6rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.8rem, 4vw, 2.5rem);
  font-weight: 400;
  color: #2c2a29;
  margin-bottom: 0.8rem;
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
  font-size: 0.95rem;
  color: #5c5957;
  max-width: 640px;
  margin: 0 auto;
  line-height: 1.5;
`;

const Grid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1.2rem;
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
  grid-column: span 1;

  @media (min-width: 1024px) {
    &:nth-child(1) { grid-column: span 2; }
    &:nth-child(2) { grid-column: span 1; }
    &:nth-child(3) { grid-column: span 1; }
    &:nth-child(4) { grid-column: span 2; }
    &:nth-child(5) { grid-column: span 2; }
    &:nth-child(6) { grid-column: span 1; }
  }
`;

const Card = styled(motion.div)`
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  padding: 1.4rem 1.6rem;
  background: ${props => props.$bgColor || '#fcfaf6'};
  border: 2px solid ${props => props.$borderColor || '#a76b53'};
  box-shadow: 0 10px 28px rgba(167, 107, 83, 0.04);
  transition: box-shadow 0.35s ease, transform 0.35s ease, border-color 0.35s ease, background-color 0.35s ease;
  height: 100%;
`;

const IconBubble = styled(motion.div)`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.9rem;
  color: #ffffff;
  box-shadow: 0 8px 20px rgba(167, 107, 83, 0.15);

  svg {
    width: 1.3rem;
    height: 1.3rem;
  }
`;

const ReasonTitle = styled(motion.h3)`
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #713f2c;
  margin-bottom: 0.4rem;
  transition: color 0.3s ease;
`;

const ReasonText = styled(motion.p)`
  font-size: 0.88rem;
  font-weight: 500;
  color: #2a2827;
  line-height: 1.5;
`;

// Animation variants for rich, unique hover experience
const cardHoverVariants = {
  initial: { y: 0, scale: 1 },
  hover: {
    y: -10,
    scale: 1.03,
    boxShadow: '0 20px 35px rgba(167, 107, 83, 0.12)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const iconVariants = {
  initial: { scale: 1, rotate: 0, y: 0 },
  hover: {
    scale: 1.2,
    rotate: 360,
    y: -4,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 15,
    },
  },
};

const titleVariants = {
  initial: { color: '#713f2c', x: 0 },
  hover: {
    color: '#a76b53',
    x: 6,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

const textVariants = {
  initial: { color: '#3d3b3a', x: 0 },
  hover: {
    color: '#1a1818',
    x: 6,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 20,
    },
  },
};

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
            >
              <Card
                $bgColor={reason.bgColor}
                $borderColor={reason.color}
                variants={cardHoverVariants}
                initial="initial"
                whileHover="hover"
                whileTap={{ scale: 0.98 }}
              >
                <IconBubble
                  style={{ background: reason.color }}
                  variants={iconVariants}
                  initial="initial"
                >
                  <Icon />
                </IconBubble>

                <ReasonTitle variants={titleVariants} initial="initial">{reason.title}</ReasonTitle>
                <ReasonText variants={textVariants} initial="initial">{reason.description}</ReasonText>
              </Card>
            </CardWrapper>
          );
        })}
      </Grid>
    </WhySection>
  );
};

export default WhyChooseUs;