import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import { ArrowLeft, Images } from "lucide-react";
import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import { publicMedia } from "../data/publicMedia";

const AllMedia = () => {
  const navigate = useNavigate();

  const media = useMemo(() => {
    const deduped = Array.from(new Set(publicMedia));
    return deduped;
  }, []);

  return (
    <PageRoot>
      <AnimatedBackground />
      <FloatingNavbar />

      <Main>
        <TopBar>
          <BackButton type="button" onClick={() => navigate("/gallery")}
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
            <Images size={16} />
            All Media
          </TopBadge>
        </TopBar>

        <Header
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <Title>All Photos & Videos</Title>
          <Subtitle>Everything from the public folder — in one place</Subtitle>
        </Header>

        <Grid>
          {media.map((src, idx) => {
            const lower = String(src).toLowerCase();
            const isVideo = lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".webm") || lower.endsWith(".ogg");

            return (
              <Tile
                key={`${src}-${idx}`}
                whileHover={{ y: -8, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 240, damping: 18 }}
              >
                {isVideo ? (
                  <VideoWrap>
                    <video
                      src={src}
                      controls
                      muted
                      loop
                      playsInline
                      preload="none"
                    />
                  </VideoWrap>
                ) : (
                  <Img src={src} alt="" loading="lazy" />
                )}
              </Tile>
            );
          })}
        </Grid>
      </Main>

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
  padding-bottom: 5rem;
`;

const TopBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 1.25rem;
  margin-bottom: 1.5rem;

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

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 1.6rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2.2rem;
  font-weight: 900;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  margin: 0.6rem auto 0;
  max-width: 46rem;
  color: #636e72;
  font-weight: 650;
  line-height: 1.65;
`;

const Grid = styled.div`
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

const Tile = styled(motion.div)`
  position: relative;
  border-radius: 18px;
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

const Img = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const VideoWrap = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.9);

  video {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export default AllMedia;
