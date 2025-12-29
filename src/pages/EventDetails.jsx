import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ArrowLeft, Calendar, MapPin, Users, Sparkles, Film, Images } from "lucide-react";
import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import { getEventById } from "../data/pastEvents";

const pageVariants = {
  initial: { opacity: 0, filter: "blur(14px)", y: 18 },
  animate: { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, filter: "blur(10px)", y: 10, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const item = {
  initial: { opacity: 0, y: 18, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const EventDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const event = useMemo(() => getEventById(id), [id]);
  const media = useMemo(() => {
    if (!event) return [];
    const videoSrcs = (event.videos ?? [])
      .map((v) => v?.src)
      .filter(Boolean);
    return [...(event.images ?? []), ...videoSrcs];
  }, [event]);

  return (
    <PageRoot>
      <AnimatedBackground />
      <FloatingNavbar />

      <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
        <Main>
          <TopBar>
            <BackButton
              type="button"
              onClick={() => navigate("/gallery")}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft size={18} />
              Back to Gallery
            </BackButton>

            <TopBadge
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 18 }}
            >
              <Sparkles size={16} />
              Past Event Spotlight
            </TopBadge>
          </TopBar>

          {!event ? (
            <EmptyState
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Event not found</h2>
              <p>That event link doesn’t exist. Please go back and choose another event.</p>
              <BackButton
                type="button"
                onClick={() => navigate("/gallery")}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                style={{ marginTop: "1.25rem" }}
              >
                <ArrowLeft size={18} />
                Back to Gallery
              </BackButton>
            </EmptyState>
          ) : (
            <Content variants={stagger} initial="initial" animate="animate">
              <Hero variants={item}>
                <HeroMedia>
                  <HeroImage src={event.image} alt={event.title} />
                  <HeroGlow />
                  <HeroOverlay />
                  <HeroTitleWrap>
                    <CategoryPill
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {event.category}
                    </CategoryPill>
                    <HeroTitle>{event.title}</HeroTitle>
                    <HeroSub>
                      <MetaRow>
                        <MetaItem>
                          <Calendar size={16} />
                          {event.date}
                        </MetaItem>
                        <MetaItem>
                          <MapPin size={16} />
                          {event.location}
                        </MetaItem>
                        <MetaItem>
                          <Users size={16} />
                          {event.attendees} guests
                        </MetaItem>
                      </MetaRow>
                    </HeroSub>
                  </HeroTitleWrap>
                </HeroMedia>

                <HeroStats>
                  <StatCard
                    whileHover={{ y: -8, scale: 1.015, rotate: -0.35 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <StatBorder
                      animate={{ backgroundPositionX: ["0%", "180%"] }}
                      transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
                    />
                    <StatSheen
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <StatGlow
                      animate={{ opacity: [0.22, 0.4, 0.22], scale: [1, 1.08, 1] }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <StatLabel>Theme</StatLabel>
                    <StatValue>{event.details?.theme ?? "—"}</StatValue>
                  </StatCard>
                  <StatCard
                    whileHover={{ y: -8, scale: 1.015, rotate: 0.35 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <StatBorder
                      $variant="teal"
                      animate={{ backgroundPositionX: ["0%", "180%"] }}
                      transition={{ duration: 5.8, repeat: Infinity, ease: "linear" }}
                    />
                    <StatSheen
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{ duration: 3.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
                    />
                    <StatGlow
                      $variant="teal"
                      animate={{ opacity: [0.22, 0.4, 0.22], scale: [1, 1.08, 1] }}
                      transition={{ duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <StatLabel>Duration</StatLabel>
                    <StatValue>{event.details?.duration ?? "—"}</StatValue>
                  </StatCard>
                  <StatCard
                    whileHover={{ y: -8, scale: 1.015, rotate: -0.25 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ type: "spring", stiffness: 260, damping: 18 }}
                  >
                    <StatBorder
                      $variant="amber"
                      animate={{ backgroundPositionX: ["0%", "180%"] }}
                      transition={{ duration: 6.1, repeat: Infinity, ease: "linear" }}
                    />
                    <StatSheen
                      animate={{ x: ["-120%", "120%"] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }}
                    />
                    <StatGlow
                      $variant="amber"
                      animate={{ opacity: [0.2, 0.38, 0.2], scale: [1, 1.08, 1] }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <StatLabel>Highlight</StatLabel>
                    <StatValue>{event.details?.highlight ?? "—"}</StatValue>
                  </StatCard>
                </HeroStats>
              </Hero>

              <Section variants={item}>
                <SectionHeader>
                  <SectionIconWrap>
                    <Sparkles size={18} />
                  </SectionIconWrap>
                  <div>
                    <SectionTitle>Planning</SectionTitle>
                    <SectionSubtitle>A short story of how we crafted the magic</SectionSubtitle>
                  </div>
                </SectionHeader>

                <PlanningCard
                  as={motion.div}
                  whileHover={{ y: -8, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 240, damping: 18 }}
                >
                  <PlanningBorder
                    animate={{ backgroundPositionX: ["0%", "180%"] }}
                    transition={{ duration: 6.2, repeat: Infinity, ease: "linear" }}
                  />
                  <PlanningSheen
                    animate={{ x: ["-140%", "140%"] }}
                    transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <PlanningGlow
                    animate={{ opacity: [0.22, 0.5, 0.22], scale: [1, 1.08, 1] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <PlanningText>{event.planning}</PlanningText>
                </PlanningCard>
              </Section>

              <Section variants={item}>
                <SectionHeader>
                  <SectionIconWrap>
                    <Images size={18} />
                  </SectionIconWrap>
                  <div>
                    <SectionTitle>Gallery</SectionTitle>
                    <SectionSubtitle>All moments together — photos & videos</SectionSubtitle>
                  </div>
                </SectionHeader>

                <MediaGrid>
                  {media.map((src, idx) => {
                    const lower = String(src).toLowerCase();
                    const isVideo = lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.webm') || lower.endsWith('.ogg');

                    return (
                      <MediaTile
                        key={`${event.id}-media-${idx}`}
                        whileHover={{ y: -10, rotate: idx % 2 === 0 ? 0.6 : -0.6, scale: 1.02 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 240, damping: 18 }}
                      >
                        <MediaTileGlow
                          animate={{ opacity: [0.1, 0.22, 0.1] }}
                          transition={{ duration: 3.2 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
                        />
                        {isVideo ? (
                          <MediaVideoWrap>
                            <video
                              src={src}
                              controls
                              preload="metadata"
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                            />
                          </MediaVideoWrap>
                        ) : (
                          <MediaImg src={src} alt={`${event.title} media ${idx + 1}`} loading="lazy" />
                        )}
                        <MediaShade />
                      </MediaTile>
                    );
                  })}
                </MediaGrid>
              </Section>
            </Content>
          )}
        </Main>
      </motion.div>

      <Footer />
    </PageRoot>
  );
};

const PageRoot = styled.div`
  min-height: 100vh;
  background: transparent;
  color: #2d3436;
  position: relative;
`;

const Main = styled.main`
  padding-top: 96px;
  max-width: 1200px;
  margin: 0 auto;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  position: relative;
  z-index: 1;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.85rem 1.1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(14px);
  color: #2d3436;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.12);
`;

const TopBadge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.18), rgba(118, 75, 162, 0.18));
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  font-weight: 700;
`;

const EmptyState = styled(motion.div)`
  margin: 5rem auto 8rem;
  max-width: 520px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  border-radius: 24px;
  padding: 2.25rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);

  h2 {
    margin: 0;
    font-size: 1.8rem;
    font-weight: 900;
  }

  p {
    margin: 0.75rem 0 0;
    color: #636e72;
    font-weight: 600;
  }
`;

const Content = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  padding-bottom: 5rem;
`;

const Hero = styled(motion.section)`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 1.25rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const HeroMedia = styled.div`
  position: relative;
  border-radius: 28px;
  overflow: hidden;
  height: 320px;
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.25);

  @media (max-width: 768px) {
    height: 280px;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.15) contrast(1.05);
  transform: scale(1.02);
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(540px 340px at 18% 22%, rgba(255, 107, 107, 0.28), transparent 62%),
    radial-gradient(520px 380px at 82% 28%, rgba(34, 184, 207, 0.22), transparent 62%),
    radial-gradient(560px 420px at 55% 82%, rgba(132, 94, 247, 0.22), transparent 62%);
  filter: blur(30px);
  opacity: 0.9;
  mix-blend-mode: screen;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.78), rgba(0, 0, 0, 0.12), rgba(0, 0, 0, 0.05));
`;

const HeroTitleWrap = styled.div`
  position: absolute;
  left: 1.25rem;
  right: 1.25rem;
  bottom: 1.25rem;
  color: white;
`;

const CategoryPill = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  padding: 0.45rem 0.85rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(14px);
  font-weight: 800;
  letter-spacing: 0.02em;
`;

const HeroTitle = styled.h1`
  margin: 0.85rem 0 0.6rem;
  font-size: 2rem;
  font-weight: 900;
  line-height: 1.06;

  @media (max-width: 768px) {
    font-size: 1.7rem;
  }
`;

const HeroSub = styled.div`
  opacity: 0.95;
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem 1rem;
`;

const MetaItem = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.92);
`;

const HeroStats = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(14px);
  border-radius: 22px;
  padding: 0.95rem;
  box-shadow: 0 18px 60px rgba(0, 0, 0, 0.18);
  position: relative;
  overflow: hidden;
`;

const StatBorder = styled(motion.div)`
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 22px;
  background: ${props =>
    props.$variant === "teal"
      ? "linear-gradient(90deg, rgba(34,184,207,0.0), rgba(34,184,207,0.6), rgba(132,94,247,0.55), rgba(34,184,207,0.0))"
      : props.$variant === "amber"
      ? "linear-gradient(90deg, rgba(249,202,36,0.0), rgba(249,202,36,0.7), rgba(255,107,107,0.55), rgba(249,202,36,0.0))"
      : "linear-gradient(90deg, rgba(255,107,107,0.0), rgba(255,107,107,0.7), rgba(132,94,247,0.55), rgba(255,107,107,0.0))"};
  background-size: 180% 100%;
  opacity: 0.9;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  pointer-events: none;
`;

const StatGlow = styled(motion.div)`
  position: absolute;
  inset: -25%;
  background: ${props =>
    props.$variant === "teal"
      ? "radial-gradient(520px 320px at 30% 25%, rgba(34,184,207,0.28), transparent 60%), radial-gradient(520px 360px at 75% 70%, rgba(132,94,247,0.22), transparent 62%)"
      : props.$variant === "amber"
      ? "radial-gradient(520px 320px at 25% 25%, rgba(249,202,36,0.25), transparent 60%), radial-gradient(520px 360px at 75% 70%, rgba(255,107,107,0.2), transparent 62%)"
      : "radial-gradient(520px 320px at 25% 25%, rgba(255,107,107,0.24), transparent 60%), radial-gradient(520px 360px at 75% 70%, rgba(132,94,247,0.2), transparent 62%)"};
  filter: blur(26px);
  opacity: 0.3;
  pointer-events: none;
`;

const StatSheen = styled(motion.div)`
  position: absolute;
  top: -40%;
  bottom: -40%;
  width: 55%;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0)
  );
  transform: skewX(-18deg);
  opacity: 0.65;
  pointer-events: none;
`;

const StatLabel = styled.div`
  font-size: 0.8rem;
  font-weight: 800;
  color: #636e72;
  margin-bottom: 0.35rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const StatValue = styled.div`
  font-weight: 900;
  font-size: 1.05rem;
  color: #2d3436;
`;

const Section = styled(motion.section)`
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(14px);
  border-radius: 28px;
  padding: 1.05rem;
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.16);
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.85rem;
  margin-bottom: 1.1rem;
`;

const SectionIconWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 107, 107, 0.22), rgba(34, 184, 207, 0.18));
  border: 1px solid rgba(255, 255, 255, 0.22);
`;

const SectionTitle = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 900;
`;

const SectionSubtitle = styled.p`
  margin: 0.25rem 0 0;
  color: #636e72;
  font-weight: 600;
`;

const PlanningCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  padding: 1rem 1rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.22);
`;

const PlanningBorder = styled(motion.div)`
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 22px;
  background: linear-gradient(
    90deg,
    rgba(255, 107, 107, 0),
    rgba(255, 107, 107, 0.7),
    rgba(34, 184, 207, 0.65),
    rgba(249, 202, 36, 0.65),
    rgba(132, 94, 247, 0.6),
    rgba(255, 107, 107, 0)
  );
  background-size: 180% 100%;
  opacity: 0.95;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  pointer-events: none;
`;

const PlanningSheen = styled(motion.div)`
  position: absolute;
  top: -45%;
  bottom: -45%;
  width: 50%;
  left: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0)
  );
  transform: skewX(-18deg);
  opacity: 0.65;
  pointer-events: none;
`;

const PlanningGlow = styled(motion.div)`
  position: absolute;
  inset: -25%;
  background:
    radial-gradient(420px 320px at 20% 20%, rgba(102, 126, 234, 0.28), transparent 62%),
    radial-gradient(460px 340px at 80% 30%, rgba(255, 107, 107, 0.22), transparent 62%),
    radial-gradient(520px 380px at 55% 80%, rgba(34, 184, 207, 0.18), transparent 62%);
  filter: blur(26px);
  opacity: 0.35;
`;

const PlanningText = styled.p`
  position: relative;
  margin: 0;
  color: #2d3436;
  font-weight: 650;
  line-height: 1.75;
`;

const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.9rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const MediaTile = styled(motion.div)`
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  grid-column: span 3;
  aspect-ratio: 3 / 4;
  min-height: 240px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(15, 23, 42, 0.12);
  box-shadow: 0 16px 44px rgba(0, 0, 0, 0.12);

  @media (max-width: 1024px) {
    grid-column: span 6;
    aspect-ratio: 4 / 5;
    min-height: 220px;
  }

  @media (max-width: 640px) {
    grid-column: span 2;
    aspect-ratio: 9 / 16;
    min-height: 210px;
  }
`;

const MediaTileGlow = styled(motion.div)`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(360px 260px at 20% 20%, rgba(255, 107, 107, 0.25), transparent 62%),
    radial-gradient(380px 280px at 80% 30%, rgba(34, 184, 207, 0.2), transparent 62%),
    radial-gradient(420px 320px at 55% 80%, rgba(132, 94, 247, 0.18), transparent 62%);
  filter: blur(24px);
  opacity: 0.18;
`;

const MediaImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  z-index: 1;
  filter: saturate(1.12) contrast(1.05);
  transform: translateZ(0);
`;

const MediaVideoWrap = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background: rgba(15, 23, 42, 0.9);

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const MediaShade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  opacity: 0;
`;

const VideoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const VideoCard = styled(motion.div)`
  border-radius: 22px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(14px);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.16);
`;

const VideoLabel = styled.div`
  padding: 0.95rem 1.05rem;
  font-weight: 900;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const VideoWrap = styled.div`
  width: 100%;
  aspect-ratio: 16 / 9;
  background: rgba(0, 0, 0, 0.35);
`;

export default EventDetails;
