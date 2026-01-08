import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Building, Clock, Phone } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  padding: 5rem 1rem;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: rgba(34, 193, 195, 0.12);
  color: #22c1c3;
  font-weight: 800;
  font-size: 0.82rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3.1rem);
  font-weight: 950;
  color: #111827;
  margin: 0;
`;

const GradientWord = styled.span`
  background: linear-gradient(135deg, #22c1c3, #ff6b6b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Outer = styled.div`
  max-width: 64rem;
  margin: 0 auto;
`;

const Card = styled(motion.div)`
  position: relative;
  border-radius: 1.75rem;
  overflow: hidden;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 55px rgba(15, 23, 42, 0.10);
  background: rgba(255, 255, 255, 0.92);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 1.75rem;
    pointer-events: none;
    padding: 1px;
    background: linear-gradient(
      135deg,
      rgba(34, 193, 195, 0.55),
      rgba(249, 115, 22, 0.48),
      rgba(236, 72, 153, 0.52)
    );
    opacity: 0.75;
    -webkit-mask:
      linear-gradient(#000 0 0) content-box,
      linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
  }
`;

const MapArea = styled.div`
  position: relative;
  height: 420px;

  @media (min-width: 768px) {
    height: 520px;
  }
`;

const MapBg = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(34, 193, 195, 0.10), rgba(255, 255, 255, 0) 45%, rgba(255, 107, 107, 0.10));
`;

const GridSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.16;
  color: rgba(100, 116, 139, 0.9);
`;

const RoadsSvg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.45;
`;

const PinWrap = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
`;

const PulseRing = styled(motion.div)`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const PulseCircle = styled.div`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 999px;
  background: rgba(255, 107, 107, 0.18);
`;

const PulseCircle2 = styled.div`
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 999px;
  background: rgba(34, 193, 195, 0.14);
`;

const Pin = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

const PinHead = styled(motion.div)`
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6b6b, #ff9f43, #22c1c3);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);

  svg {
    width: 1.9rem;
    height: 1.9rem;
    color: #ffffff;
  }
`;

const PinTail = styled.div`
  position: absolute;
  left: 50%;
  bottom: -0.55rem;
  transform: translateX(-50%) rotate(45deg);
  width: 0.95rem;
  height: 0.95rem;
  background: #ff6b6b;
  z-index: 1;
`;

const Popup = styled(motion.div)`
  position: absolute;
  left: 50%;
  bottom: calc(100% + 1rem);
  transform: translateX(-50%);
  width: 19rem;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 1.25rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 26px 70px -30px rgba(15, 23, 42, 0.55);
  padding: 1.1rem;
  z-index: 10;
`;

const PopupArrow = styled.div`
  position: absolute;
  left: 50%;
  bottom: -0.55rem;
  transform: translateX(-50%) rotate(45deg);
  width: 0.95rem;
  height: 0.95rem;
  background: rgba(255, 255, 255, 0.96);
  border-right: 1px solid rgba(148, 163, 184, 0.35);
  border-bottom: 1px solid rgba(148, 163, 184, 0.35);
`;

const PopupHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  margin-bottom: 0.85rem;
`;

const PopupIcon = styled.img`
  width: 4.2rem;
  height: 4.2rem;
  object-fit: contain;
  border-radius: 0;
  border: 2px solid rgba(249, 115, 22, 0.35);
  background: rgba(255, 255, 255, 0.92);
  padding: 6px;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.12);
`;

const PopupTitle = styled.h3`
  margin: 0;
  font-size: 0.95rem;
  font-weight: 950;
  color: #111827;
`;

const PopupSub = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 650;
`;

const InfoList = styled.div`
  display: grid;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #64748b;
`;

const InfoRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.55rem;

  svg {
    width: 1.05rem;
    height: 1.05rem;
    flex: 0 0 auto;
  }
`;

const Dot = styled(motion.div)`
  position: absolute;
  border-radius: 999px;
`;

const BottomBar = styled(motion.div)`
  background: rgba(255, 255, 255, 0.92);
  padding: 1rem 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem 2rem;
`;

const BarItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  color: #64748b;
  font-weight: 650;
  font-size: 0.9rem;

  svg {
    width: 1.05rem;
    height: 1.05rem;
  }
`;

export const MapSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [isHovered, setIsHovered] = useState(false);

  return (
    <Section ref={ref} id="contact-section">
      <Header
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Badge
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          Find Us
        </Badge>
        <Title>
          Visit <GradientWord>Happyfeet</GradientWord>
        </Title>
      </Header>

      <Outer>
        <Card
          initial={{ opacity: 0, scale: 0.92 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.25, duration: 0.65 }}
        >
          <MapArea>
            <MapBg />

            <GridSvg xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="hf-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#hf-grid)" />
            </GridSvg>

            <RoadsSvg xmlns="http://www.w3.org/2000/svg">
              <path
                d="M 0 220 Q 220 195 420 270 T 900 220"
                fill="none"
                stroke="rgba(100, 116, 139, 0.55)"
                strokeWidth="3"
              />
              <path
                d="M 110 0 Q 170 160 115 320 T 220 520"
                fill="none"
                stroke="rgba(100, 116, 139, 0.35)"
                strokeWidth="2"
              />
            </RoadsSvg>

            <PinWrap
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              initial={{ y: -90, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.45, type: 'spring', stiffness: 120, damping: 16 }}
            >
              <PulseRing
                animate={{ scale: [1, 2.1, 1], opacity: [0.55, 0, 0.55] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut' }}
              >
                <PulseCircle />
              </PulseRing>
              <PulseRing
                animate={{ scale: [1, 1.55, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.1, repeat: Infinity, delay: 0.55, ease: 'easeInOut' }}
              >
                <PulseCircle2 />
              </PulseRing>

              <Pin animate={isHovered ? { scale: 1.2, y: -10 } : { scale: 1, y: 0 }}>
                <PinHead
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <MapPin />
                </PinHead>
                <PinTail />
              </Pin>

              <Popup
                initial={{ opacity: 0, y: 12, scale: 0.92 }}
                animate={
                  isHovered
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 12, scale: 0.92 }
                }
                transition={{ duration: 0.25 }}
                style={{ pointerEvents: isHovered ? 'auto' : 'none' }}
              >
                <PopupHeader>
                  <PopupIcon src="/logo.jpg" alt="Happyfeet" />
                  <div>
                    <PopupTitle>Happyfeet Activity Club</PopupTitle>
                    <PopupSub>We craft magical celebrations with creativity + care.</PopupSub>
                  </div>
                </PopupHeader>

                <InfoList>
                  <InfoRow>
                    <Building style={{ color: '#ff6b6b' }} />
                    <span>Hari Nagar Cross Road, Vadodara, Gujarat, India</span>
                  </InfoRow>
                  <InfoRow>
                    <Clock style={{ color: '#22c1c3' }} />
                    <span>All Days: 9AM - 7PM</span>
                  </InfoRow>
                  <InfoRow>
                    <Phone style={{ color: '#f59e0b' }} />
                    <span>+91 9173500020</span>
                  </InfoRow>
                </InfoList>

                <PopupArrow />
              </Popup>
            </PinWrap>

            <Dot
              style={{ top: '2.5rem', left: '2.5rem', width: '2.1rem', height: '2.1rem', background: 'rgba(34,193,195,0.26)' }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Dot
              style={{ bottom: '5.3rem', right: '5.3rem', width: '1.6rem', height: '1.6rem', background: 'rgba(245,158,11,0.22)' }}
              animate={{ scale: [1, 1.35, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
            <Dot
              style={{ top: '34%', right: '26%', width: '1.1rem', height: '1.1rem', background: 'rgba(236,72,153,0.22)' }}
              animate={{ scale: [1, 1.55, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            />
          </MapArea>

          <BottomBar
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
          >
            <BarItem>
              <MapPin style={{ color: '#ff6b6b' }} />
              Vadodara, Gujarat.
            </BarItem>
            <BarItem>
              <Clock style={{ color: '#22c1c3' }} />
              Open All Days 
            </BarItem>
            <BarItem>
              <Phone style={{ color: '#f59e0b' }} />
              Call for appointments
            </BarItem>
          </BottomBar>
        </Card>
      </Outer>
    </Section>
  );
};

export default MapSection;
