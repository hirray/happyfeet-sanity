import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styled from "styled-components";
import { Calendar, MapPin, Users, Sparkles } from "lucide-react";

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
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["15%", "-55%"]);

  return (
    <TimelineSection ref={containerRef}>
      <SectionHeader
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <SectionTitle>
          Timeline <GradientText>Business</GradientText>
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
            {/* Road base - dark asphalt - Curvy slanting downwards */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#2d3436"
              strokeWidth="80"
              strokeLinecap="round"
            />

            {/* Road surface - lighter asphalt */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#636e72"
              strokeWidth="75"
              strokeLinecap="round"
            />

            {/* Center dashed line - white */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#ffffff"
              strokeWidth="4"
              strokeDasharray="40 30"
              strokeLinecap="round"
            />

            {/* Road edge lines - yellow */}
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#ffd700"
              strokeWidth="3"
              strokeDasharray="0"
              strokeLinecap="round"
              style={{ transform: "translateY(-36px)" }}
            />
            <path
              d="M 0 150 Q 150 120, 300 180 Q 450 240, 600 280 Q 800 250, 1000 350 Q 1150 450, 1300 500 Q 1500 480, 1700 580 Q 1850 650, 2000 700 Q 2200 720, 2400 800 Q 2550 870, 2700 900 Q 2900 880, 3100 950 Q 3250 1000, 3400 1020 Q 3600 1050, 3800 1080 Q 3900 1090, 4000 1100"
              fill="none"
              stroke="#ffd700"
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
  background: linear-gradient(to bottom, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 3rem;
  font-weight: 900;
  color: #2d3436;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(
    135deg,
    hsl(10, 90%, 65%),
    hsl(340, 80%, 65%),
    hsl(270, 60%, 70%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled.p`
  font-size: 1.25rem;
  color: #636e72;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
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
  background: linear-gradient(135deg, #ff6b9d, #fec163);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  border: 4px solid white;
  position: relative;
  z-index: 2;
`;

const MarkerNumber = styled.span`
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const MarkerLine = styled.div`
  width: 4px;
  height: 40px;
  background: linear-gradient(to bottom, #ff6b9d, transparent);
  margin-top: -4px;
`;

const ContentCard = styled(motion.div)`
  position: absolute;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  width: 220px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  text-align: center;
  border: 2px solid #f8f9fa;
  left: 50%;
  transform: translateX(-50%);
`;

const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea, #764ba2);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.875rem;
  color: #636e72;
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
