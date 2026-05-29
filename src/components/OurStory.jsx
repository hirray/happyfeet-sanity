// src/components/OurStory.jsx
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Lightbulb, Search, Settings, Users, BarChart3, Target, Flag, Play } from "lucide-react";
import styled from "styled-components";

const storyPoints = [
  {
    year: "2011",
    title: "The Inception",
    subtitle: "CONCEPT",
    description: "HappyFeet Activity Club was founded to create joyful, creative experiences for children through workshops.",
    icon: Lightbulb,
    color: "#d9a727", // Logo yellow
  },
  {
    year: "2014",
    title: "Expanding Horizons",
    subtitle: "RESEARCH",
    description: "We researched kids' play behaviors and expanded into school partnerships, gaining deep family trust.",
    icon: Search,
    color: "#5b9a98", // Logo sage teal
  },
  {
    year: "2016",
    title: "Creative Strategy",
    subtitle: "STRATEGY",
    description: "Devised specialized thematic kids parties, introducing custom play zones and interactive storytelling.",
    icon: Settings,
    color: "#e09540", // Logo orange
  },
  {
    year: "2018",
    title: "Team Expansion",
    subtitle: "TEAMWORK",
    description: "Built a passionate crew of coordinators and artists, scaling to offer complete event management.",
    icon: Users,
    color: "#cf6b76", // Logo pink
  },
  {
    year: "2021",
    title: "Seamless Management",
    subtitle: "MANAGEMENT",
    description: "Refined logistics, vendor workflows, and execution, ensuring flawless delivery of large-scale carnivals.",
    icon: BarChart3,
    color: "#a76b53", // Navbar brown
  },
  {
    year: "Today",
    title: "Ultimate Success",
    subtitle: "SUCCESS",
    description: "Proudly standing as a trusted multi-age brand, creating extraordinary moments with a touch of magic.",
    icon: Target,
    color: "#c83b2e", // Logo red
  },
];

const StorySection = styled.section`
  position: relative;
  overflow: hidden;
  padding: 6rem 1.5rem 8rem;
  background: rgba(167, 107, 83, 0.30); /* Low-opacity navbar brown */
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 5rem;
  position: relative;
  z-index: 2;
`;

const SectionBadge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.4rem 1.4rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.08);
  color: #5f3423ff;
  font-weight: 600;
  font-size: 0.78rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  margin-bottom: 1rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.4rem, 5vw, 3.2rem);
  font-weight: 400;
  color: #2c2a29;
  margin: 0;
  text-shadow: 
    1px 1px 0px #eae3d8,
    2px 2px 0px #e2d9cb,
    3px 3px 0px #d9cfbe,
    4px 4px 6px rgba(167, 107, 83, 0.15);
`;

const GradientWord = styled.span`
  color: #713f2cff;
  font-style: italic;
`;

const DesktopTimelineContainer = styled.div`
  display: block;
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  aspect-ratio: 1000 / 1500;
  z-index: 1;

  @media (max-width: 768px) {
    display: none;
  }
`;

const RoadSvg = styled.svg`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const RoadNode = styled.div`
  position: absolute;
  left: ${props => props.$left};
  top: ${props => props.$top};
  transform: translate(-50%, -50%);
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 50%;
  background: #ffcc00;
  border: 4px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  z-index: 2;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  svg {
    width: 2.2rem;
    height: 2.2rem;
    color: #1a1a1a;
    transition: transform 0.4s ease;
  }

  &::after {
    content: '';
    position: absolute;
    inset: -10px;
    border-radius: 50%;
    border: 2px dashed ${props => props.$color};
    opacity: 0;
    transform: scale(0.8);
    transition: all 0.4s ease;
  }

  &:hover {
    transform: translate(-50%, -50%) scale(1.15);
    background: #ffffff;
    border-color: ${props => props.$color};
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);

    svg {
      color: ${props => props.$color};
      transform: scale(1.1) rotate(10deg);
    }

    &::after {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

const TextBlock = styled.div`
  position: absolute;
  left: ${props => props.$left};
  top: ${props => props.$top};
  transform: translateY(-50%);
  width: 33%; /* Increased width for wider and more readable cards */
  text-align: left;
  z-index: 1;
  background: #fdfcf0;
  padding: 1.8rem;
  border-radius: 20px;
  border: 3px solid #1a1a1a;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    transform: translateY(-53%) scale(1.02);
    border-color: ${props => props.$color};
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.05);

    h4 {
      color: ${props => props.$color};
    }
  }
`;

const MilestoneSub = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  color: ${props => props.$color};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.3rem;
`;

const MilestoneTitle = styled.h4`
  font-family: 'Playfair Display', serif;
  font-size: 1.35rem;
  font-weight: 700;
  color: #2c2a29;
  margin: 0 0 0.50rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s ease;
`;

const YearBadge = styled.span`
  background: ${props => `${props.$color}12`};
  color: ${props => props.$color};
  font-size: 1.05rem;
  font-weight: 800;
  padding: 0.4rem 1.1rem;
  border-radius: 99px;
  border: 2px solid ${props => `${props.$color}45`};
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

const MilestoneDesc = styled.p`
  font-size: 0.92rem;
  color: #5c5957;
  line-height: 1.6;
  margin: 0;
`;

const IndicatorText = styled.div`
  position: absolute;
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #2c2a29;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  z-index: 2;
`;

// Mobile Timeline layout
const MobileTimeline = styled.div`
  display: none;
  position: relative;
  padding-left: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileLine = styled.div`
  position: absolute;
  left: 1rem;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #1a1a1a;
  border-radius: 99px;
  z-index: 0;
  box-shadow: inset 0 0 4px rgba(255,255,255,0.2);
`;

const MobileItem = styled.div`
  position: relative;
  margin-bottom: 3.5rem;
  z-index: 1;

  &:last-child {
    margin-bottom: 0;
  }
`;

const MobileDot = styled.div`
  position: absolute;
  left: -2.1rem;
  top: 0.2rem;
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  background: #ffcc00;
  border: 3px solid #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);

  svg {
    width: 1rem;
    height: 1rem;
    color: #1a1a1a;
  }
`;

const MobileCard = styled.div`
  background: #fdfcf0;
  padding: 1.5rem;
  border-radius: 12px;
  border: 3px solid #1a1a1a;
  box-shadow: 0 4px 15px rgba(0,0,0,0.01);
  transition: all 0.3s ease;

  &:active {
    border-color: ${props => props.$color};
  }
`;

export const OurStory = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });

  return (
    <StorySection ref={containerRef}>
      <SectionHeader
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <SectionBadge
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
        >
          Our Journey
        </SectionBadge>
        <SectionTitle>
          The <GradientWord>Story</GradientWord> Behind Happyfeet
        </SectionTitle>
      </SectionHeader>

      {/* DESKTOP TIMELINE ROAD */}
      <DesktopTimelineContainer>
        <RoadSvg viewBox="0 0 1000 1500" fill="none">
          {/* Main Asphalt Road Shadow */}
          <path
            d="M 150 100 L 500 100 C 640 100, 640 320, 500 320 C 360 320, 360 540, 500 540 C 640 540, 640 760, 500 760 C 360 760, 360 980, 500 980 C 640 980, 640 1200, 500 1200 C 360 1200, 360 1420, 500 1420 L 850 1420"
            stroke="rgba(0, 0, 0, 0.05)"
            strokeWidth="56"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Main Asphalt Road */}
          <path
            d="M 150 100 L 500 100 C 640 100, 640 320, 500 320 C 360 320, 360 540, 500 540 C 640 540, 640 760, 500 760 C 360 760, 360 980, 500 980 C 640 980, 640 1200, 500 1200 C 360 1200, 360 1420, 500 1420 L 850 1420"
            stroke="#1a1a1a"
            strokeWidth="48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* White Lane Markings */}
          <path
            d="M 150 100 L 500 100 C 640 100, 640 320, 500 320 C 360 320, 360 540, 500 540 C 640 540, 640 760, 500 760 C 360 760, 360 980, 500 980 C 640 980, 640 1200, 500 1200 C 360 1200, 360 1420, 500 1420 L 850 1420"
            stroke="#ffffff"
            strokeWidth="3"
            strokeDasharray="12,12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </RoadSvg>

        {/* Start Label & Icon */}
        <IndicatorText style={{ left: "15%", top: "4.5%" }}>
          <Play size={18} fill="#1a1a1a" /> START
        </IndicatorText>

        {/* Goal Label & Flag */}
        <IndicatorText style={{ right: "15%", top: "92.5%" }}>
          <Flag size={20} fill="#1a1a1a" /> GOAL
        </IndicatorText>

        {/* Milestones nodes & descriptions along the road */}
        {/* Node 1: Concept (Right Apex circle at 60.5%, card at 65% to 98% => completely to the right of circle) */}
        <RoadNode $left="60.5%" $top="14%" $color={storyPoints[0].color}>
          <Lightbulb />
        </RoadNode>
        <TextBlock $left="65%" $top="14%" $color={storyPoints[0].color}>
          <MilestoneSub $color={storyPoints[0].color}>{storyPoints[0].subtitle}</MilestoneSub>
          <MilestoneTitle>
            <YearBadge $color={storyPoints[0].color}>{storyPoints[0].year}</YearBadge>
            {storyPoints[0].title}
          </MilestoneTitle>
          <MilestoneDesc>{storyPoints[0].description}</MilestoneDesc>
        </TextBlock>

        {/* Node 2: Research (Left Apex circle at 39.5%, card at 2% to 35% => completely to the left of circle) */}
        <RoadNode $left="39.5%" $top="28.6%" $color={storyPoints[1].color}>
          <Search />
        </RoadNode>
        <TextBlock $left="2%" $top="28.6%" $color={storyPoints[1].color}>
          <MilestoneSub $color={storyPoints[1].color}>{storyPoints[1].subtitle}</MilestoneSub>
          <MilestoneTitle>
            <YearBadge $color={storyPoints[1].color}>{storyPoints[1].year}</YearBadge>
            {storyPoints[1].title}
          </MilestoneTitle>
          <MilestoneDesc>{storyPoints[1].description}</MilestoneDesc>
        </TextBlock>

        {/* Node 3: Strategy (Right Apex circle at 60.5%, card at 65% => completely to the right of circle) */}
        <RoadNode $left="60.5%" $top="43.3%" $color={storyPoints[2].color}>
          <Settings />
        </RoadNode>
        <TextBlock $left="65%" $top="43.3%" $color={storyPoints[2].color}>
          <MilestoneSub $color={storyPoints[2].color}>{storyPoints[2].subtitle}</MilestoneSub>
          <MilestoneTitle>
            <YearBadge $color={storyPoints[2].color}>{storyPoints[2].year}</YearBadge>
            {storyPoints[2].title}
          </MilestoneTitle>
          <MilestoneDesc>{storyPoints[2].description}</MilestoneDesc>
        </TextBlock>

        {/* Node 4: Teamwork (Left Apex circle at 39.5%, card at 2% => completely to the left of circle) */}
        <RoadNode $left="39.5%" $top="58%" $color={storyPoints[3].color}>
          <Users />
        </RoadNode>
        <TextBlock $left="2%" $top="58%" $color={storyPoints[3].color}>
          <MilestoneSub $color={storyPoints[3].color}>{storyPoints[3].subtitle}</MilestoneSub>
          <MilestoneTitle>
            <YearBadge $color={storyPoints[3].color}>{storyPoints[3].year}</YearBadge>
            {storyPoints[3].title}
          </MilestoneTitle>
          <MilestoneDesc>{storyPoints[3].description}</MilestoneDesc>
        </TextBlock>

        {/* Node 5: Management (Right Apex circle at 60.5%, card at 65% => completely to the right of circle) */}
        <RoadNode $left="60.5%" $top="72.6%" $color={storyPoints[4].color}>
          <BarChart3 />
        </RoadNode>
        <TextBlock $left="65%" $top="72.6%" $color={storyPoints[4].color}>
          <MilestoneSub $color={storyPoints[4].color}>{storyPoints[4].subtitle}</MilestoneSub>
          <MilestoneTitle>
            <YearBadge $color={storyPoints[4].color}>{storyPoints[4].year}</YearBadge>
            {storyPoints[4].title}
          </MilestoneTitle>
          <MilestoneDesc>{storyPoints[4].description}</MilestoneDesc>
        </TextBlock>

        {/* Node 6: Success (Left Apex circle at 39.5%, card at 2% => completely to the left of circle) */}
        <RoadNode $left="39.5%" $top="87.3%" $color={storyPoints[5].color}>
          <Target />
        </RoadNode>
        <TextBlock $left="2%" $top="87.3%" $color={storyPoints[5].color}>
          <MilestoneSub $color={storyPoints[5].color}>{storyPoints[5].subtitle}</MilestoneSub>
          <MilestoneTitle>
            <YearBadge $color={storyPoints[5].color}>{storyPoints[5].year}</YearBadge>
            {storyPoints[5].title}
          </MilestoneTitle>
          <MilestoneDesc>{storyPoints[5].description}</MilestoneDesc>
        </TextBlock>
      </DesktopTimelineContainer>

      {/* MOBILE TIMELINE LAYOUT */}
      <MobileTimeline>
        <MobileLine />
        {storyPoints.map((point) => {
          const Icon = point.icon;
          return (
            <MobileItem key={point.year}>
              <MobileDot $color={point.color}>
                <Icon />
              </MobileDot>
              <MobileCard $color={point.color}>
                <MilestoneSub $color={point.color}>{point.subtitle}</MilestoneSub>
                <MilestoneTitle style={{ fontSize: "1.2rem" }}>
                  {point.title}
                  <YearBadge $color={point.color}>{point.year}</YearBadge>
                </MilestoneTitle>
                <MilestoneDesc>{point.description}</MilestoneDesc>
              </MobileCard>
            </MobileItem>
          );
        })}
      </MobileTimeline>
    </StorySection>
  );
};

export default OurStory;