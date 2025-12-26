import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ArrowLeft, Film, Images, Sparkles } from "lucide-react";
import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import { getCategoryBySlug } from "../data/galleryCategories";
import { pastEvents } from "../data/pastEvents";

const pageVariants = {
  initial: { opacity: 0, filter: "blur(14px)", y: 18 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, filter: "blur(10px)", y: 10, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.12,
    },
  },
};

const itemVariants = {
  initial: { opacity: 0, y: 18, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

const tileVariants = {
  rest: { y: 0, scale: 1, rotateZ: 0 },
  hover: {
    y: -14,
    scale: 1.02,
    rotateZ: 0.75,
    transition: { type: "spring", stiffness: 260, damping: 18 },
  },
};

const tileImageVariants = {
  rest: { scale: 1, filter: "saturate(1.08) contrast(1.04)" },
  hover: {
    scale: 1.08,
    filter: "saturate(1.28) contrast(1.08)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const tileShadeVariants = {
  rest: { opacity: 0.86 },
  hover: { opacity: 0.68, transition: { duration: 0.35 } },
};

const tileAuraVariants = {
  rest: { opacity: 0.12, scale: 1 },
  hover: { opacity: 0.26, scale: 1.08, transition: { duration: 0.35 } },
};

const tileBorderVariants = {
  rest: { opacity: 0.85 },
  hover: { opacity: 1, transition: { duration: 0.25 } },
};

const CategoryMedia = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const category = useMemo(() => getCategoryBySlug(slug), [slug]);

  const media = useMemo(() => {
    if (!category) return { images: [], videos: [] };

    const events = pastEvents.filter((e) => e.category === category.eventCategory);

    const images = events.flatMap((e) => [e.image, ...(e.images ?? [])]).filter(Boolean);
    const videos = events.flatMap((e) => e.videos ?? []).filter(Boolean);

    // De-dupe while preserving order
    const seenImages = new Set();
    const uniqueImages = images.filter((src) => {
      if (seenImages.has(src)) return false;
      seenImages.add(src);
      return true;
    });

    const seenVideos = new Set();
    const uniqueVideos = videos.filter((v) => {
      const key = v?.src ?? "";
      if (!key || seenVideos.has(key)) return false;
      seenVideos.add(key);
      return true;
    });

    return { images: uniqueImages, videos: uniqueVideos };
  }, [category]);

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

            {category ? (
              <TopBadge
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.15, type: "spring", stiffness: 240, damping: 18 }}
              >
                <Sparkles size={16} />
                {category.title}
              </TopBadge>
            ) : null}
          </TopBar>

          {!category ? (
            <EmptyState
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>Category not found</h2>
              <p>Please go back and choose a category from the Gallery page.</p>
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
            <Content variants={containerVariants} initial="initial" animate="animate">
              <Hero variants={itemVariants}>
                <HeroCard>
                  <HeroGlow
                    $color={category.color}
                    animate={{ opacity: [0.18, 0.35, 0.18], scale: [1, 1.06, 1] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <HeroSheen
                    animate={{ x: ["-120%", "120%"] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut" }}
                  />

                  <HeroTitle>{category.title}</HeroTitle>
                  <HeroSubtitle>
                    Explore moments from this category — with a split for images and videos.
                  </HeroSubtitle>

                  <HeroPills>
                    <HeroPill>
                      <Images size={16} />
                      {media.images.length} Images
                    </HeroPill>
                    <HeroPill>
                      <Film size={16} />
                      {media.videos.length} Videos
                    </HeroPill>
                  </HeroPills>
                </HeroCard>
              </Hero>

              <Section variants={itemVariants}>
                <SectionHeader>
                  <SectionIconWrap>
                    <Images size={18} />
                  </SectionIconWrap>
                  <div>
                    <SectionTitle>Images</SectionTitle>
                    <SectionSubtitle>Hover for glow + tilt. Tap to enjoy the detail.</SectionSubtitle>
                  </div>
                </SectionHeader>

                {media.images.length === 0 ? (
                  <SectionEmpty>No images added for this category yet.</SectionEmpty>
                ) : (
                  <MediaGrid>
                    {media.images.map((src, idx) => (
                      <MediaTile
                        key={`${category.slug}-img-${idx}-${src}`}
                        whileTap={{ scale: 0.99 }}
                        variants={tileVariants}
                        initial="rest"
                        animate="rest"
                        whileHover="hover"
                        style={{ transformPerspective: 1200 }}
                      >
                        <MediaBorder variants={tileBorderVariants}>
                          <MediaBorderAnim
                            $color={category.color}
                            animate={{ backgroundPositionX: ["0%", "180%"] }}
                            transition={{ duration: 6.2, repeat: Infinity, ease: "linear" }}
                          />
                        </MediaBorder>
                        <MediaTileGlow
                          $color={category.color}
                          animate={{ opacity: [0.14, 0.26, 0.14] }}
                          transition={{ duration: 3.2 + (idx % 3), repeat: Infinity, ease: "easeInOut" }}
                        />
                        <MediaAura
                          $color={category.color}
                          variants={tileAuraVariants}
                        />
                        <MediaSheen
                          animate={{ x: ["-140%", "140%"] }}
                          transition={{ duration: 4 + (idx % 2), repeat: Infinity, ease: "easeInOut" }}
                        />
                        <MediaImg
                          src={src}
                          alt={`${category.title} image ${idx + 1}`}
                          loading="lazy"
                          variants={tileImageVariants}
                        />
                        <MediaShade variants={tileShadeVariants} />
                        <MediaIndex
                          $color={category.color}
                          initial={{ opacity: 0, scale: 0.6 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.12 + (idx % 6) * 0.02, type: "spring", stiffness: 260, damping: 18 }}
                        >
                          {String(idx + 1).padStart(2, "0")}
                        </MediaIndex>
                      </MediaTile>
                    ))}
                  </MediaGrid>
                )}
              </Section>

              <Section variants={itemVariants}>
                <SectionHeader>
                  <SectionIconWrap>
                    <Film size={18} />
                  </SectionIconWrap>
                  <div>
                    <SectionTitle>Videos</SectionTitle>
                    <SectionSubtitle>Neon border + hover lift. Add mp4 files to show real clips.</SectionSubtitle>
                  </div>
                </SectionHeader>

                {media.videos.length === 0 ? (
                  <SectionEmpty>
                    No videos found for this category.
                    <br />
                    Add mp4 files in <code>public/</code> and reference them in <code>pastEvents.js</code>.
                  </SectionEmpty>
                ) : (
                  <VideoGrid>
                    {media.videos.map((v, idx) => (
                      <VideoCard
                        key={`${category.slug}-vid-${idx}-${v.src}`}
                        whileHover={{ y: -10, scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <VideoBorder
                          $color={category.color}
                          animate={{ backgroundPositionX: ["0%", "180%"] }}
                          transition={{ duration: 6.5, repeat: Infinity, ease: "linear" }}
                        />
                        <VideoLabel>{v.title ?? `Video ${idx + 1}`}</VideoLabel>
                        <VideoWrap>
                          <video
                            src={v.src}
                            controls
                            preload="metadata"
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </VideoWrap>
                      </VideoCard>
                    ))}
                  </VideoGrid>
                )}
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
  font-weight: 800;
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

const Hero = styled(motion.section)``;

const HeroCard = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 28px;
  padding: 1.25rem;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(14px);
  box-shadow: 0 26px 90px rgba(0, 0, 0, 0.16);
`;

const HeroGlow = styled(motion.div)`
  position: absolute;
  inset: -25%;
  background: ${props => `radial-gradient(520px 320px at 25% 25%, ${props.$color}55, transparent 62%), radial-gradient(520px 360px at 75% 70%, ${props.$color}33, transparent 65%)`};
  filter: blur(26px);
  opacity: 0.25;
  pointer-events: none;
`;

const HeroSheen = styled(motion.div)`
  position: absolute;
  top: -45%;
  bottom: -45%;
  width: 45%;
  left: 0;
  background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0));
  transform: skewX(-18deg);
  opacity: 0.7;
  pointer-events: none;
`;

const HeroTitle = styled.h1`
  position: relative;
  margin: 0;
  font-size: 2rem;
  font-weight: 900;
`;

const HeroSubtitle = styled.p`
  position: relative;
  margin: 0.55rem 0 0;
  color: #636e72;
  font-weight: 650;
  line-height: 1.6;
`;

const HeroPills = styled.div`
  position: relative;
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.9rem;
`;

const HeroPill = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 0.75rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(14px);
  font-weight: 800;
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

const SectionEmpty = styled.div`
  padding: 1rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #636e72;
  font-weight: 650;
  line-height: 1.6;

  code {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
    font-size: 0.85em;
  }
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
  height: 170px;
  grid-column: span 4;
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.18);
  transform-style: preserve-3d;

  &:nth-child(6n + 1),
  &:nth-child(6n + 4) {
    grid-column: span 6;
    height: 220px;
  }

  @media (max-width: 1024px) {
    grid-column: span 3;

    &:nth-child(6n + 1),
    &:nth-child(6n + 4) {
      grid-column: span 6;
      height: 210px;
    }
  }

  @media (max-width: 640px) {
    grid-column: span 1;
    height: 155px;

    &:nth-child(6n + 1),
    &:nth-child(6n + 4) {
      grid-column: span 2;
      height: 180px;
    }
  }
`;

const MediaBorder = styled(motion.div)`
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 22px;
  opacity: 0.95;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  pointer-events: none;
`;

const MediaBorderAnim = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 22px;
  background: ${props => `linear-gradient(90deg, ${props.$color}00, ${props.$color}aa, rgba(132,94,247,0.55), ${props.$color}00)`};
  background-size: 180% 100%;
`;

const MediaTileGlow = styled(motion.div)`
  position: absolute;
  inset: -20%;
  background: ${props => `radial-gradient(360px 260px at 20% 20%, ${props.$color}44, transparent 62%), radial-gradient(420px 320px at 70% 70%, ${props.$color}22, transparent 65%)`};
  filter: blur(24px);
  opacity: 0.18;
  pointer-events: none;
`;

const MediaSheen = styled(motion.div)`
  position: absolute;
  top: -45%;
  bottom: -45%;
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

const MediaImg = styled(motion.img)`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.12) contrast(1.05);
  transform: translateZ(0);
`;

const MediaShade = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.04));
  opacity: 0.85;
`;

const MediaAura = styled(motion.div)`
  position: absolute;
  inset: -25%;
  background: ${props => `radial-gradient(420px 320px at 25% 25%, ${props.$color}55, transparent 62%), radial-gradient(520px 420px at 70% 75%, rgba(132,94,247,0.22), transparent 65%)`};
  filter: blur(26px);
  opacity: 0.16;
  pointer-events: none;
`;

const MediaIndex = styled(motion.div)`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 0.35rem 0.55rem;
  border-radius: 999px;
  font-weight: 900;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.92);
  background: ${props => `linear-gradient(135deg, ${props.$color}aa, rgba(34,184,207,0.5))`};
  border: 1px solid rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(14px);
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.18);
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
  position: relative;
  border-radius: 22px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(14px);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.16);
`;

const VideoBorder = styled(motion.div)`
  position: absolute;
  inset: 0;
  padding: 1px;
  border-radius: 22px;
  background: ${props => `linear-gradient(90deg, ${props.$color}00, ${props.$color}aa, rgba(34,184,207,0.55), ${props.$color}00)`};
  background-size: 180% 100%;
  opacity: 0.95;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
  -webkit-mask-composite: xor;
  pointer-events: none;
`;

const VideoLabel = styled.div`
  position: relative;
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

export default CategoryMedia;
