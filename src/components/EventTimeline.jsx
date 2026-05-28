import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";
import { useIsMobile } from "../hooks/use-mobile";

const milestones = [
  {
    id: 5,
    number: "04",
    title: "Happy Today",
    description: "Today, HappyFeet plans diverse celebrations for all ages, with a strong focus on kids.",
    icon: Users,
  },
  {
    id: 4,
    number: "03",
    title: "Big Adventures",
    description: "HappyFeet became a complete event company, managing décor, games, activities, and execution.",
    icon: Calendar,
  },
  {
    id: 3,
    number: "02",
    title: "Fun Grows",
    description: "HappyFeet expanded into workshops and small events, earning trust from families and schools.",
    icon: Sparkles,
  },
  {
    id: 2,
    number: "01",
    title: "First Steps",
    description: "HappyFeet Activity Club was founded to create joyful, creative experiences for children through activities and workshops.",
    icon: Calendar,
  },
  {
    id: 1,
    number: "00",
    title: "Consultation",
    description: "Initial meeting to discuss your vision and requirements",
    icon: Users,
  },
];

export const EventTimeline = () => {
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["15%", "-55%"]);

  if (isMobile) {
    return (
      <TimelineSection ref={containerRef}>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionTitle>
            Timeline Business
          </SectionTitle>
          <SectionSubtitle>The Journey to Your Perfect Event</SectionSubtitle>
        </SectionHeader>

        <MobileTimeline>
          <MobileLine aria-hidden="true" />
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <MobileItem
                key={milestone.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <MobileMarker>
                  <MobileMarkerCircle>
                    <MobileMarkerNumber>{milestone.number}</MobileMarkerNumber>
                  </MobileMarkerCircle>
                </MobileMarker>

                <MobileCard
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.25 }}
                >
                  <IconWrapper>
                    <Icon size={22} />
                  </IconWrapper>
                  <CardTitle>{milestone.title}</CardTitle>
                  <CardDescription>{milestone.description}</CardDescription>
                </MobileCard>
              </MobileItem>
            );
          })}
        </MobileTimeline>
      </TimelineSection>
    );
  }

  return (
    <TimelineSection ref={containerRef}>
      <SectionHeader
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>
          Timeline Business
        </SectionTitle>
        <SectionSubtitle>The Journey to Your Perfect Event</SectionSubtitle>
      </SectionHeader>

      <RoadWrapper>
        <RoadContainer style={{ x }}>
          <RoadSVG
            viewBox="0 0 4000 1200"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Road base - sandy dirt path */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#ead1c4"
              strokeWidth="80"
              strokeLinecap="round"
            />

            {/* Road surface - lighter sand */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#f5e8df"
              strokeWidth="75"
              strokeLinecap="round"
            />

            {/* Center dashed line */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#d09074"
              strokeWidth="4"
              strokeDasharray="40 30"
              strokeLinecap="round"
            />

            {/* Road edge lines */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#d09074"
              strokeWidth="3"
              strokeDasharray="0"
              strokeLinecap="round"
              style={{ transform: "translateY(-36px)" }}
            />
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#d09074"
              strokeWidth="3"
              strokeDasharray="0"
              strokeLinecap="round"
              style={{ transform: "translateY(36px)" }}
            />
          </RoadSVG>

          {/* Milestones */}
          {milestones.map((milestone, index) => {
            const positions = [
              { x: 450, y: 210, rotation: 15, cardOffset: -180 },
              { x: 950, y: 350, rotation: 20, cardOffset: -180 },
              { x: 1550, y: 550, rotation: -10, cardOffset: -180 },
              { x: 2250, y: 760, rotation: 25, cardOffset: -180 },
              { x: 3050, y: 960, rotation: 20, cardOffset: -180 },
            ];

            const Icon = milestone.icon;

            return (
              <MilestoneWrapper
                key={milestone.id}
                style={{
                  left: `${positions[index].x}px`,
                  top: `${positions[index].y}px`,
                }}
                initial={{ opacity: 0, scale: 0, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100,
                }}
              >
                {/* Car/Vehicle Icon */}
                <VehicleIcon
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                  style={{ rotate: `${positions[index].rotation}deg` }}
                >
                  🚗
                </VehicleIcon>

                {/* Milestone Marker */}
                <MilestoneMarker
                  whileHover={{ scale: 1.1, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <MarkerCircle>
                    <MarkerNumber>{milestone.number}</MarkerNumber>
                  </MarkerCircle>
                  <MarkerLine />
                </MilestoneMarker>

                {/* Content Card */}
                <ContentCard
                  style={{ top: `${positions[index].cardOffset}px` }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  }}
                >
                  <IconWrapper>
                    <Icon size={24} />
                  </IconWrapper>
                  <CardTitle>{milestone.title}</CardTitle>
                  <CardDescription>{milestone.description}</CardDescription>
                </ContentCard>
              </MilestoneWrapper>
            );
          })}

          {/* Decorative Elements */}
          <TreeIcon style={{ left: "100px", top: "50px" }}>🌳</TreeIcon>
          <TreeIcon style={{ left: "600px", top: "150px" }}>🌲</TreeIcon>
          <TreeIcon style={{ left: "1100px", top: "300px" }}>🌳</TreeIcon>
          <TreeIcon style={{ left: "1500px", top: "450px" }}>🌲</TreeIcon>
          <TreeIcon style={{ left: "2000px", top: "600px" }}>🌳</TreeIcon>
          <TreeIcon style={{ left: "2500px", top: "750px" }}>🌲</TreeIcon>
          <TreeIcon style={{ left: "3000px", top: "850px" }}>🌳</TreeIcon>
          <TreeIcon style={{ left: "3500px", top: "950px" }}>🌲</TreeIcon>
          
          <CloudIcon
            style={{ left: "300px", top: "30px" }}
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            ☁️
          </CloudIcon>
          <CloudIcon
            style={{ left: "900px", top: "200px" }}
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
          >
            ☁️
          </CloudIcon>
          <CloudIcon
            style={{ left: "1800px", top: "450px" }}
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 9, repeat: Infinity }}
          >
            ☁️
          </CloudIcon>
          <CloudIcon
            style={{ left: "2600px", top: "650px" }}
            animate={{ x: [0, -15, 0] }}
            transition={{ duration: 11, repeat: Infinity }}
          >
            ☁️
          </CloudIcon>
          <CloudIcon
            style={{ left: "3300px", top: "850px" }}
            animate={{ x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            ☁️
          </CloudIcon>
        </RoadContainer>
      </RoadWrapper>
    </TimelineSection>
  );
};

const TimelineSection = styled.section`
  position: relative;
  min-height: 200vh;
  padding: 6rem 0;
  background: transparent;
  overflow: hidden;

  @media (max-width: 768px) {
    min-height: auto;
    padding: 5rem 0 4rem;
  }
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 3rem;
  font-weight: 400;
  color: #2f2622;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #6a605a;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const MobileTimeline = styled.div`
  position: relative;
  width: min(720px, calc(100% - 32px));
  margin: 0 auto;
  padding: 10px 0 0;
`;

const MobileLine = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 18px;
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(180deg, rgba(167, 107, 83, 0.85), rgba(208, 144, 116, 0.75), rgba(234, 221, 203, 0.75));
  box-shadow: 0 4px 15px rgba(167, 107, 83, 0.12);
`;

const MobileItem = styled(motion.div)`
  position: relative;
  display: grid;
  grid-template-columns: 52px minmax(0, 1fr);
  gap: 14px;
  align-items: start;
  padding: 18px 0;
`;

const MobileMarker = styled.div`
  position: relative;
  display: grid;
  place-items: start center;
`;

const MobileMarkerCircle = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: #a76b53;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 3px solid rgba(255, 255, 255, 0.95);
  z-index: 2;
`;

const MobileMarkerNumber = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 500;
  color: white;
`;

const MobileCard = styled(motion.div)`
  background: #fdfcf0;
  border: 1px solid rgba(167, 107, 83, 0.15);
  border-radius: 4px;
  padding: 16px 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const RoadWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 1200px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 1000px;
  }
`;

const RoadContainer = styled(motion.div)`
  position: relative;
  width: 4000px;
  height: 100%;
  will-change: transform;
`;

const RoadSVG = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MilestoneWrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  z-index: 10;
`;

const VehicleIcon = styled(motion.div)`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
  transform-origin: center;
`;

const MilestoneMarker = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
`;

const MarkerCircle = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #a76b53;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border: 4px solid white;
  position: relative;
  z-index: 2;
`;

const MarkerNumber = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
`;

const MarkerLine = styled.div`
  width: 4px;
  height: 40px;
  background: linear-gradient(to bottom, #a76b53, transparent);
  margin-top: -4px;
`;

const ContentCard = styled(motion.div)`
  position: absolute;
  background: #fdfcf0;
  border-radius: 4px;
  padding: 1.5rem;
  width: 220px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  text-align: center;
  border: 1px solid rgba(167, 107, 83, 0.15);
  left: 50%;
  transform: translateX(-50%);
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: #a76b53;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #2f2622;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.875rem;
  color: #4a423e;
  line-height: 1.5;
`;

const TreeIcon = styled.div`
  position: absolute;
  font-size: 2rem;
  opacity: 0.6;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
`;

const CloudIcon = styled(motion.div)`
  position: absolute;
  font-size: 3rem;
  opacity: 0.4;
`;
