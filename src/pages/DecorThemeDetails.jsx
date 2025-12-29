import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ArrowLeft, Sparkles } from 'lucide-react';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

const THEMES = {
  birthday: {
    name: 'Birthday',
    accent: 'hsl(340, 80%, 65%)',
    images: ['/birthday1.jpg', '/birthday2.jpg', '/birthday3.jpg', '/birthday4.jpg', '/birthday5.jpg'],
  },
  fiesta: {
    name: 'Fiesta',
    accent: 'hsl(40, 95%, 55%)',
    images: ['/fiesta1.jpg', '/fiesta2.jpg', '/fiesta4.jpg', '/fiesta5.jpg', '/fiesta6.jpg'],
  },
  corporate: {
    name: 'Corporate',
    accent: 'hsl(200, 80%, 60%)',
    images: ['/corporate1.jpg', '/corporate2.jpg', '/corporate3.jpg', '/corporate4.jpg', '/corporate5.jpg'],
  },
  kitty: {
    name: 'Kitty Party',
    accent: 'hsl(10, 90%, 65%)',
    images: ['/kitty1.jpg', '/kitty2.jpg', '/kitty3.jpg', '/kitty4.jpg', '/kitty5.jpg'],
  },
  workshop: {
    name: 'Workshop',
    accent: 'hsl(270, 60%, 70%)',
    images: ['/workshop1.jpg', '/workshop2.jpg', '/workshop3.jpg', '/workshop4.jpg', '/workshop5.jpg'],
  },
  sippaint: {
    name: 'Sip & Paint',
    accent: 'hsl(175, 70%, 45%)',
    images: ['/sipnpaint1.jpg', '/sipnpaint2.jpg', '/sipnpaint3.jpg', '/sipnpaint4.jpg', '/sipnpaint5.jpg'],
  },
  babyshower: {
    name: 'Baby Shower',
    accent: 'hsl(200, 80%, 55%)',
    images: ['/babyshower1.jpg', '/babyshower2.jpg', '/babyshower3.jpg', '/babyshower4.jpg', '/babyshower5.jpg'],
  },
  cooking: {
    name: 'Cooking Party',
    accent: 'hsl(25, 90%, 60%)',
    images: ['/cooking1.jpg', '/cooking2.jpg', '/cooking3.jpg', '/cooking4.jpg', '/cooking5.jpg'],
  },
  cakepainting: {
    name: 'Cake Painting',
    accent: 'hsl(150, 60%, 50%)',
    images: ['/cakepaint1.jpg', '/cakepaint2.jpg', '/cakepaint3.jpg', '/cakepaint4.jpg', '/cakepaint5.jpg'],
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 140, damping: 18 },
  },
};

const DecorThemeDetails = () => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const theme = useMemo(() => {
    if (!slug) return null;
    return THEMES[slug] ?? null;
  }, [slug]);

  const title = theme?.name ?? 'Decor Theme';
  const accent = theme?.accent ?? 'hsl(340, 80%, 65%)';
  const images = theme?.images ?? ['/img1.jpg', '/img2.jpg', '/img3.jpg', '/img4.jpg', '/img6.jpg'];

  return (
    <Page>
      <AnimatedBackground />
      <FloatingNavbar />

      <Hero>
        <HeroGlow $accent={accent} aria-hidden="true" />

        <HeroInner
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <TopRow>
            <BackButton
              type="button"
              whileHover={{ scale: 1.04, x: -3 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/#decor-themes')}
            >
              <ArrowLeft size={18} />
              Back to Decor Themes
            </BackButton>

            <Badge whileHover={{ scale: 1.04 }}>
              <Sparkles size={16} />
              <span>Customizable Decor Themes</span>
              <Sparkles size={16} />
            </Badge>
          </TopRow>

          <Title>
            {title} <Accent $accent={accent}>Gallery</Accent>
          </Title>
          <Subtitle>
            All decor themes are <strong>fully customizable</strong> — colors, props, balloons, backdrops and more.
          </Subtitle>
        </HeroInner>
      </Hero>

      <GallerySection>
        <Grid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {images.slice(0, 5).map((src, idx) => (
            <Tile
              key={`${src}-${idx}`}
              variants={itemVariants}
              whileHover={{ y: -10, rotate: idx % 2 === 0 ? -0.6 : 0.6, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              $accent={accent}
            >
              <TileGlow $accent={accent} aria-hidden="true" />
              <TileImg src={src} alt={`${title} decor ${idx + 1}`} loading="lazy" />
              <TileOverlay aria-hidden="true" />
            </Tile>
          ))}
        </Grid>
      </GallerySection>

      <Footer />
    </Page>
  );
};

const Page = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

const Hero = styled.section`
  position: relative;
  padding: 7rem 1rem 3.5rem;
  overflow: hidden;
`;

const HeroGlow = styled.div`
  position: absolute;
  inset: -30%;
  background:
    radial-gradient(520px 320px at 20% 20%, ${({ $accent }) => $accent}33, transparent 60%),
    radial-gradient(520px 360px at 80% 30%, rgba(168, 85, 247, 0.18), transparent 62%),
    radial-gradient(620px 420px at 55% 80%, rgba(34, 184, 207, 0.16), transparent 62%);
  filter: blur(30px);
  opacity: 0.9;
`;

const HeroInner = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
`;

const BackButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  padding: 0.7rem 1rem;
  border-radius: 999px;
  font-weight: 800;
  color: #111827;
  cursor: pointer;
  box-shadow: 0 18px 40px rgba(15, 23, 42, 0.08);
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.05rem;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 107, 107, 0.12), rgba(236, 72, 153, 0.12));
  border: 1px solid rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(10px);

  span {
    font-size: 0.85rem;
    font-weight: 800;
    color: #ff6b6b;
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: clamp(2rem, 3.4vw, 3.1rem);
  font-weight: 950;
  color: #0f172a;
  letter-spacing: -0.02em;
`;

const Accent = styled.span`
  background: linear-gradient(135deg, ${({ $accent }) => $accent}, rgba(168, 85, 247, 0.95));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  margin: 0.8rem 0 0;
  max-width: 60ch;
  color: rgba(15, 23, 42, 0.72);
  font-weight: 600;
  line-height: 1.6;

  strong {
    color: rgba(15, 23, 42, 0.92);
  }
`;

const GallerySection = styled.section`
  padding: 0.5rem 1rem 4.5rem;
`;

const Grid = styled(motion.div)`
  max-width: 980px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(12, 1fr);

  @media (max-width: 900px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const Tile = styled(motion.div)`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.1);

  &:nth-child(1) {
    grid-column: span 6;
    aspect-ratio: 16/11;
  }
  &:nth-child(2) {
    grid-column: span 6;
    aspect-ratio: 16/11;
  }
  &:nth-child(3) {
    grid-column: span 4;
    aspect-ratio: 4/3;
  }
  &:nth-child(4) {
    grid-column: span 4;
    aspect-ratio: 4/3;
  }
  &:nth-child(5) {
    grid-column: span 4;
    aspect-ratio: 4/3;
  }

  @media (max-width: 900px) {
    &:nth-child(1) {
      grid-column: span 6;
      aspect-ratio: 16/10;
    }
    &:nth-child(2) {
      grid-column: span 6;
      aspect-ratio: 16/10;
    }
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      grid-column: span 6;
      aspect-ratio: 16/10;
    }
  }

  @media (max-width: 600px) {
    &:nth-child(1),
    &:nth-child(2),
    &:nth-child(3),
    &:nth-child(4),
    &:nth-child(5) {
      grid-column: span 1;
      aspect-ratio: 16/11;
    }
  }
`;

const TileGlow = styled.div`
  position: absolute;
  inset: -20%;
  background: radial-gradient(500px 300px at 20% 20%, ${({ $accent }) => $accent}33, transparent 60%);
  filter: blur(18px);
  opacity: 0.9;
  pointer-events: none;
`;

const TileImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.02);
  transition: transform 400ms ease;

  ${Tile}:hover & {
    transform: scale(1.08);
  }
`;

const TileOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.25));
  opacity: 0.85;
  pointer-events: none;
`;

export default DecorThemeDetails;
