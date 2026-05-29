import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Users, Award } from "lucide-react";
import styled from "styled-components";

const infoItems = [
  {
    icon: Calendar,
    label: "Established",
    value: "2011",
    iconBg: "rgba(167, 107, 83, 0.08)",
    iconColor: "#a76b53",
    glow: "radial-gradient(circle at center, rgba(167, 107, 83, 0.15) 0%, transparent 70%)",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Vadodara, Gujarat, India",
    iconBg: "rgba(167, 107, 83, 0.08)",
    iconColor: "#a76b53",
    glow: "radial-gradient(circle at center, rgba(167, 107, 83, 0.15) 0%, transparent 70%)",
  },
  {
    icon: Users,
    label: "Years of Experience",
    value: "14+",
    iconBg: "rgba(167, 107, 83, 0.08)",
    iconColor: "#a76b53",
    glow: "radial-gradient(circle at center, rgba(167, 107, 83, 0.15) 0%, transparent 70%)",
  },
  {
    icon: Award,
    label: "Events Completed",
    value: "500+",
    iconBg: "rgba(167, 107, 83, 0.08)",
    iconColor: "#a76b53",
    glow: "radial-gradient(circle at center, rgba(167, 107, 83, 0.15) 0%, transparent 70%)",
  },
];

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
  gap: 1.75rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled(motion.div)`
  position: relative;
  border-radius: 4px;
  background: #fcfaf6;
  border: 1px solid rgba(167, 107, 83, 0.22);
  padding: 2.2rem 1.8rem;
  text-align: center;
  box-shadow: 0 12px 35px rgba(167, 107, 83, 0.04);
  overflow: hidden;
`;

const CardGlow = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.25;
`;

const IconWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 3.5rem;
  height: 3.5rem;
  margin: 0 auto 1.2rem;
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ValueText = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  color: #2c2a29;
  margin-bottom: 0.4rem;
`;

const LabelText = styled.p`
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a76b53;
`;

const AnimatedBorder = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: #a76b53;
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
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{
                delay: 0.3 + index * 0.1,
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              whileHover={{
                y: -6,
                borderColor: "rgba(167, 107, 83, 0.45)",
                boxShadow: "0 18px 40px rgba(167, 107, 83, 0.08)",
              }}
            >
              <CardGlow
                style={{ background: item.glow }}
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 0.25 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.8 }}
              />

              <IconWrapper
                style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <Icon size={24} />
              </IconWrapper>

              <ValueText>{item.value}</ValueText>
              <LabelText>{item.label}</LabelText>

              <AnimatedBorder
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{
                  delay: 0.7 + index * 0.1,
                  duration: 0.6,
                }}
              />
            </Card>
          );
        })}
      </Grid>
    </ModernSection>
  );
};
