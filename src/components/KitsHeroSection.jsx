import { motion } from "framer-motion";
import styled from "styled-components";
import { Sparkles, Palette, Heart, Star } from "lucide-react";

const features = [
  { icon: Palette, text: "Choose Your Colors", color: "coral" },
  { icon: Heart, text: "Pick Your Style", color: "mint" },
  { icon: Sparkles, text: "Add Your Touch", color: "lavender" },
  { icon: Star, text: "Make It Yours", color: "sunny" },
];

const KitsHeroSection = () => {
  return (
    <Section>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Center>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          >
            <Pill>
              <PillIcon>
                <Sparkles size={20} color="hsl(10, 90%, 65%)" />
              </PillIcon>
              <PillText>100% Customizable Kits</PillText>
              <PillIcon>
                <Sparkles size={20} color="hsl(270, 60%, 70%)" />
              </PillIcon>
            </Pill>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Title>
              <TitleGradient>Create Your</TitleGradient>
              <br />
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                <TitleSolid>Perfect Kit</TitleSolid>
              </motion.span>
            </Title>
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            <Subtitle>
              Every kit is uniquely crafted just for you. Choose colors, styles, and themes that match your personality!
            </Subtitle>
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.15,
                  delayChildren: 1.2,
                },
              },
            }}
          >
            <FeaturesGrid>
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, y: 30, scale: 0.8 },
                      visible: { opacity: 1, y: 0, scale: 1 },
                    }}
                    whileHover={{
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CardWrap>
                      <CardGlow />
                      <Card>
                        <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.5 }}>
                          <IconWrap $color={feature.color}>
                            <Icon size={28} color="#ffffff" />
                          </IconWrap>
                        </motion.div>
                        <CardText>{feature.text}</CardText>
                      </Card>
                    </CardWrap>
                  </motion.div>
                );
              })}
            </FeaturesGrid>
          </motion.div>
        </Center>
      </motion.div>

      <motion.div
        style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2.5 }, y: { duration: 1.5, repeat: Infinity } }}
      >
        <ScrollMouse>
          <motion.div
            style={{ width: 6, height: 12, background: "hsl(10, 90%, 65%)", borderRadius: 9999 }}
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </ScrollMouse>
      </motion.div>
    </Section>
  );
};

const Section = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 1rem;
  position: relative;
  z-index: 10;
`;

const Center = styled.div`
  text-align: center;
  max-width: 56rem;
  margin: 0 auto;
`;

const Pill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  border-radius: 9999px;
  margin-bottom: 2rem;
  background: linear-gradient(
    90deg,
    rgba(255, 107, 107, 0.2),
    rgba(165, 94, 234, 0.2)
  );
`;

const PillIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: pulse 1.6s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 0.85;
    }
    50% {
      transform: scale(1.08);
      opacity: 1;
    }
  }
`;

const PillText = styled.span`
  color: rgba(25, 25, 25, 0.8);
  font-weight: 600;
`;

const Title = styled.div`
  font-weight: 800;
  line-height: 1.05;
  margin-bottom: 1.5rem;
  font-size: 3rem;

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
`;

const TitleGradient = styled.span`
  background: linear-gradient(90deg, hsl(10, 90%, 65%), hsl(270, 60%, 70%), hsl(175, 70%, 45%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const TitleSolid = styled.span`
  color: #2d3436;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #636e72;
  margin: 0 auto 3rem;
  max-width: 42rem;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  max-width: 48rem;
  margin: 0 auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const CardWrap = styled.div`
  position: relative;
  cursor: pointer;
`;

const CardGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.3));
  filter: blur(6px);
  transition: filter 220ms ease;

  ${CardWrap}:hover & {
    filter: blur(10px);
  }
`;

const Card = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1rem;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 18px 40px rgba(27, 31, 59, 0.12);
  transition: box-shadow 260ms ease;
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${CardWrap}:hover & {
    box-shadow: 0 26px 60px rgba(27, 31, 59, 0.18);
  }
`;

const IconWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.75rem;
  background: ${props =>
    props.$color === "coral"
      ? "hsl(10, 90%, 65%)"
      : props.$color === "mint"
      ? "hsl(175, 70%, 45%)"
      : props.$color === "lavender"
      ? "hsl(270, 60%, 70%)"
      : "hsl(40, 95%, 55%)"};
`;

const CardText = styled.p`
  font-size: 0.9rem;
  font-weight: 700;
  color: #2d3436;
  margin: 0;
`;

const ScrollMouse = styled.div`
  width: 24px;
  height: 40px;
  border: 2px solid rgba(25, 25, 25, 0.3);
  border-radius: 9999px;
  display: flex;
  justify-content: center;
  padding-top: 8px;
`;

export default KitsHeroSection;
