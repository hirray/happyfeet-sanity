import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Sparkles } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ $paddingY }) => ($paddingY ? `${$paddingY} 1rem` : '5rem 1rem')};
`;

const DecoBlob = styled(motion.div)`
  position: absolute;
  border-radius: 999px;
  filter: blur(64px);
  pointer-events: none;
`;

const Container = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.1rem;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(255, 107, 107, 0.12),
    rgba(236, 72, 153, 0.12)
  );
  margin-bottom: 1rem;

  span {
    font-size: 0.85rem;
    font-weight: 700;
    color: #ff6b6b;
  }

  svg {
    width: 1rem;
    height: 1rem;
    color: #ff6b6b;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.2vw, 2.6rem);
  font-weight: 900;
  color: #111827;
  margin: 0;
`;

const Accent = styled.span`
  color: #ff6b6b;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
    gap: 4rem;
  }
`;

const ImageWrap = styled(motion.div)`
  position: relative;
  flex-shrink: 0;
`;

const Halo = styled(motion.div)`
  position: absolute;
  inset: -18px;
  border-radius: 999px;
  filter: blur(22px);
  opacity: 0.55;
  pointer-events: none;
`;

const Ring = styled(motion.div)`
  position: absolute;
  inset: -10px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.9));
  pointer-events: none;
  z-index: 0;
`;

const InnerRing = styled.div`
  position: absolute;
  inset: -6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  pointer-events: none;
  z-index: 1;
`;

const PhotoCircle = styled(motion.div)`
  position: relative;
  width: ${({ $size }) => ($size === 'sm' ? '12rem' : '18rem')};
  height: ${({ $size }) => ($size === 'sm' ? '12rem' : '18rem')};
  border-radius: 999px;
  overflow: hidden;
  box-shadow:
    0 28px 80px -28px rgba(15, 23, 42, 0.55),
    0 10px 30px rgba(168, 85, 247, 0.18);
  z-index: 2;

  @media (min-width: 768px) {
    width: ${({ $size }) => ($size === 'sm' ? '14rem' : '20rem')};
    height: ${({ $size }) => ($size === 'sm' ? '14rem' : '20rem')};
  }
`;

const Photo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

const PhotoOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.14), transparent 45%);
  pointer-events: none;
`;

const PhotoFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(255, 107, 107, 0.25),
    rgba(236, 72, 153, 0.18),
    rgba(168, 85, 247, 0.22)
  );
`;

const Initials = styled(motion.div)`
  width: 7rem;
  height: 7rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6b6b, #ec4899);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.2rem;
  font-weight: 950;
  color: #ffffff;
`;

const Shine = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.28) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-18deg);
  pointer-events: none;
`;

const FloatingBadge = styled(motion.div)`
  position: absolute;
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.25);
  pointer-events: none;

  svg {
    width: 1.4rem;
    height: 1.4rem;
    color: #ffffff;
  }
`;

const FloatingDot = styled(motion.div)`
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 999px;
  box-shadow: 0 16px 35px rgba(15, 23, 42, 0.22);
  pointer-events: none;
`;

const RolePill = styled(motion.div)`
  position: absolute;
  left: 50%;
  bottom: -0.9rem;
  transform: translateX(-50%);
  z-index: 5;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 1.05rem;
  border-radius: 999px;
  color: #ffffff;
  font-weight: 800;
  font-size: 0.85rem;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.95), rgba(168, 85, 247, 0.95));
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
`;

const RoleDot = styled.span`
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: #f59e0b;
  box-shadow: 0 0 0 5px rgba(245, 158, 11, 0.18);
`;

const QuoteWrap = styled(motion.div)`
  flex: 1;
  text-align: center;

  @media (min-width: 1024px) {
    text-align: left;
  }
`;

const QuoteIconWrap = styled(motion.div)`
  display: inline-flex;
  width: 4rem;
  height: 4rem;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff6b6b, #ec4899);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.2);
  margin-bottom: 1.5rem;

  svg {
    width: 2rem;
    height: 2rem;
    color: #ffffff;
  }
`;

const QuoteText = styled.p`
  font-size: clamp(1.25rem, 2vw, 2rem);
  font-weight: 750;
  line-height: 1.45;
  color: #111827;
  margin: 0 0 1.75rem;
`;

const Emph = styled(motion.span)`
  position: relative;
  display: inline-block;
  font-weight: 900;
`;

const Underline = styled(motion.span)`
  position: absolute;
  left: 0;
  bottom: -0.35rem;
  width: 100%;
  height: 0.3rem;
  border-radius: 999px;
  transform-origin: left;
`;

const NameBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  @media (min-width: 1024px) {
    align-items: flex-start;
  }
`;

const FounderName = styled(motion.h3)`
  margin: 0;
  font-size: clamp(1.65rem, 2.5vw, 2.2rem);
  font-weight: 950;
  background: linear-gradient(90deg, #ff6b6b, #ec4899, #a855f7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
`;

const FounderTitle = styled(motion.p)`
  margin: 0;
  color: #6b7280;
  font-weight: 700;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
`;

const Line = styled.span`
  width: 2rem;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff6b6b, #ec4899);
`;

const Dots = styled(motion.div)`
  margin-top: 0.7rem;
  display: inline-flex;
  gap: 0.45rem;
`;

const Dot = styled(motion.div)`
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: linear-gradient(90deg, #ff6b6b, #ec4899);
`;

export const FounderSection = ({
  imageSrc = '/twinkle-gokani.jpg',
  name = 'Twinkle Popat',
  role = 'Founder & CEO, HappyFeet',
  badgeText = 'Meet Our Visionary',
  headingPrefix = 'The Heart Behind',
  headingAccent = 'HappyFeet',
  quote =
    "At HappyFeet, we don't just organize events – we create memories that last a lifetime. Every smile, every laugh, every moment of joy is what drives us to make your celebrations extraordinary.",
  initials,
  compact = false,
  photoSize = 'lg',
  showHeader = true,
  paddingY,
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [imgError, setImgError] = useState(false);

  const computedInitials = (initials ?? name)
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('');

  return (
    <Section ref={ref} $paddingY={paddingY}>
      <DecoBlob
        style={{
          top: '2.5rem',
          left: '2.5rem',
          width: '10rem',
          height: '10rem',
          background: 'linear-gradient(135deg, rgba(255,107,107,0.22), rgba(236,72,153,0.22))',
        }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <DecoBlob
        style={{
          bottom: '2.5rem',
          right: '2.5rem',
          width: '12rem',
          height: '12rem',
          background: 'linear-gradient(135deg, rgba(34,197,197,0.18), rgba(168,85,247,0.18))',
        }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 5, repeat: Infinity }}
      />

      <Container>
        {showHeader ? (
          <Header
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <Badge whileHover={{ scale: 1.05 }}>
              <Sparkles />
              <span>{badgeText}</span>
              <Sparkles />
            </Badge>
            <Title>
              {headingPrefix} <Accent>{headingAccent}</Accent>
            </Title>
          </Header>
        ) : (
          <Header
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '1.5rem' }}
          >
            <Badge whileHover={{ scale: 1.05 }}>
              <Sparkles />
              <span>{badgeText}</span>
              <Sparkles />
            </Badge>
          </Header>
        )}

        <Layout>
          <ImageWrap
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            animate={inView ? { opacity: 1, x: 0, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Halo
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(168,85,247,0.35), rgba(236,72,153,0.22), transparent 60%)',
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.6, 0.45] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <Ring
              animate={{ rotate: [0, 2, 0, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <InnerRing />

            <PhotoCircle $size={photoSize} whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              {!imgError ? (
                <Photo src={imageSrc} alt={name} onError={() => setImgError(true)} />
              ) : (
                <PhotoFallback>
                  <div style={{ textAlign: 'center' }}>
                    <Initials
                      animate={{
                        boxShadow: [
                          '0 0 20px rgba(255, 111, 97, 0.3)',
                          '0 0 40px rgba(255, 111, 97, 0.5)',
                          '0 0 20px rgba(255, 111, 97, 0.3)',
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {computedInitials}
                    </Initials>
                  </div>
                </PhotoFallback>
              )}

              <PhotoOverlay />

              <Shine
                initial={{ x: '-120%' }}
                animate={inView ? { x: '220%' } : {}}
                transition={{ duration: 1.5, delay: 0.5 }}
              />
            </PhotoCircle>

            <RolePill
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ delay: 0.65, type: 'spring', stiffness: 160, damping: 18 }}
              whileHover={{ scale: 1.03 }}
            >
              <RoleDot />
              {role}
            </RolePill>

            <FloatingBadge
              style={{
                top: '-1rem',
                right: '-1rem',
                background: 'linear-gradient(135deg, #f59e0b, #ff6b6b)',
              }}
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Sparkles />
            </FloatingBadge>

            <FloatingDot
              style={{
                bottom: '-0.75rem',
                left: '-0.75rem',
                background: 'linear-gradient(135deg, rgba(34,197,197,0.9), rgba(168,85,247,0.9))',
              }}
              animate={{ y: [0, 10, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </ImageWrap>

          {compact ? (
            <NameBlock
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <FounderName
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ fontSize: 'clamp(1.35rem, 2vw, 1.75rem)' }}
              >
                {name}
              </FounderName>

              <FounderTitle whileHover={{ x: 5 }}>
                <Line />
                {role}
              </FounderTitle>
            </NameBlock>
          ) : (
            <QuoteWrap
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={inView ? { scale: 1, rotate: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.6, type: 'spring' }}
              >
                <QuoteIconWrap>
                  <Quote />
                </QuoteIconWrap>
              </motion.div>

              <motion.blockquote
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <QuoteText>
                  &quot;{quote}&quot;
                </QuoteText>
              </motion.blockquote>

              <NameBlock
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.9 }}
              >
                <FounderName
                  animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  {name}
                </FounderName>

                <FounderTitle whileHover={{ x: 5 }}>
                  <Line />
                  {role}
                </FounderTitle>

                <Dots initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 1.1 }}>
                  {[...Array(5)].map((_, i) => (
                    <Dot
                      key={i}
                      animate={{ scale: [1, 1.3, 1], opacity: [0.55, 1, 0.55] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                    />
                  ))}
                </Dots>
              </NameBlock>
            </QuoteWrap>
          )}
        </Layout>
      </Container>
    </Section>
  );
};

export default FounderSection;
