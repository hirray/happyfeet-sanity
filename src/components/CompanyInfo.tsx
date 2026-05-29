import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import styled, { keyframes } from "styled-components";

const infoItems = [
  {
    icon: Calendar,
    label: "Established",
    value: "2011",
    bg: "#f4e4be", // Richer pastel mustard
    hoverBg: "#ebd5a3",
    color: "#a47913",
    textColor: "#4e3b07",
    iconBg: "rgba(164, 121, 19, 0.1)",
    floatDelay: 0,
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Vadodara, Gujarat, India",
    bg: "#d2e7e5", // Richer pastel sage
    hoverBg: "#bcdbda",
    color: "#3f7371",
    textColor: "#1d3635",
    iconBg: "rgba(63, 115, 113, 0.1)",
    floatDelay: 1.2,
  },
  {
    icon: Users,
    label: "Years of Experience",
    value: "14+",
    bg: "#f7d5db", // Richer pastel pink
    hoverBg: "#efaeb9",
    color: "#ae4f5a",
    textColor: "#571d24",
    iconBg: "rgba(174, 79, 90, 0.1)",
    floatDelay: 0.6,
  },
  {
    icon: Award,
    label: "Events Completed",
    value: "500+",
    bg: "#f7dac2", // Richer pastel orange
    hoverBg: "#efa877",
    color: "#bc611c",
    textColor: "#5b2c07",
    iconBg: "rgba(188, 97, 28, 0.1)",
    floatDelay: 1.8,
  },
];

// Slow float animation for card inner content
const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

// Subtle breath animation for the background glows
const glowBreath = keyframes`
  0% { transform: scale(1); opacity: 0.15; }
  50% { transform: scale(1.15); opacity: 0.35; }
  100% { transform: scale(1); opacity: 0.15; }
`;

const ModernSection = styled.section`
  position: relative;
  padding: 6rem 1.5rem 5rem;
  overflow: hidden;
  background: #fdfcf0;
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.08);
  color: #a76b53;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-bottom: 1.2rem;
`;

const BadgeDot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: #a76b53;
`;

const SectionHeader = styled(motion.div)`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 760px;
  margin: 0 auto 3.5rem;
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

const Accent = styled.span`
  color: #a76b53;
  font-style: italic;
`;

const Subtitle = styled.p`
  max-width: 42rem;
  margin: 0 auto;
  font-size: 1.05rem;
  color: #5c5957;
  line-height: 1.7;
`;

const Grid = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

// Child elements declared first so they can be referenced in Card's hover selector
const IconWrapper = styled.div<{ $bg: string; $color: string }>`
  width: 3.8rem;
  height: 3.8rem;
  margin-bottom: 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.$bg};
  color: ${props => props.$color};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.02);
`;

const ValueText = styled.h3<{ $color: string }>`
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  font-weight: 400;
  color: ${props => props.$color};
  margin-bottom: 0.5rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const LabelText = styled.p<{ $color: string }>`
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  color: ${props => props.$color};
  letter-spacing: 0.08em;
  opacity: 0.85;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const AnimatedBorder = styled.div<{ $color: string }>`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 3px;
  background: ${props => props.$color};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
`;

const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  animation: ${glowBreath} 8s ease-in-out infinite;
  z-index: 0;
`;

const CardInner = styled.div<{ $delay: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  animation: ${floatAnimation} 6s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const Card = styled(motion.div)<{ $bg: string; $hoverBg: string; $borderColor: string }>`
  position: relative;
  border-radius: 16px;
  background: ${props => props.$bg};
  border: 1px solid rgba(0, 0, 0, 0.04);
  padding: 2.8rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.015);
  overflow: hidden;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  /* Hover states */
  &:hover {
    transform: translateY(-8px);
    background: ${props => props.$hoverBg};
    border-color: ${props => props.$borderColor};
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.04);

    ${IconWrapper} {
      transform: scale(1.1) rotate(15deg);
      background: ${props => props.$borderColor};
      color: #fdfcf0;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
    }

    ${ValueText} {
      transform: scale(1.03);
    }

    ${LabelText} {
      letter-spacing: 0.14em;
      opacity: 1;
    }

    ${AnimatedBorder} {
      width: 80%;
      height: 4px;
    }
  }
`;

export const CompanyInfo = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <ModernSection ref={ref}>
      <SectionHeader
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Badge
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
        >
          <BadgeDot />
          Who We Are
        </Badge>

        <Title>
          About <Accent>Happyfeet</Accent>
        </Title>

        <Subtitle>
          We are a passionate team dedicated to creating extraordinary events that leave
          lasting impressions. From beautiful Parties to amazing fiestas, we bring your
          vision to life with creativity, care, and a touch of magic.
        </Subtitle>
      </SectionHeader>

      <Grid>
        {infoItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.label}
              $bg={item.bg}
              $hoverBg={item.hoverBg}
              $borderColor={item.color}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                delay: 0.3 + index * 0.1, 
                type: "spring", 
                stiffness: 120, 
                damping: 18 
              }}
            >
              <CardGlow style={{ background: `radial-gradient(circle at center, ${item.iconBg} 0%, transparent 70%)` }} />

              <CardInner $delay={item.floatDelay}>
                <IconWrapper $bg={item.iconBg} $color={item.color}>
                  <Icon size={24} />
                </IconWrapper>

                <ValueText $color={item.textColor}>{item.value}</ValueText>
                <LabelText $color={item.color}>{item.label}</LabelText>
              </CardInner>
              <AnimatedBorder $color={item.color} />
            </Card>
          );
        })}
      </Grid>
    </ModernSection>
  );
};
