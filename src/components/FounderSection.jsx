import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Quote, Sparkles } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: ${({ $paddingY }) => ($paddingY ? `${$paddingY} 1rem` : '6rem 1rem 5rem')};
  background: #fdfcf0;
`;

const DecoBlob = styled(motion.div)`
  position: absolute;
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
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
  margin-bottom: 3.5rem;
`;

const Badge = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.08);
  margin-bottom: 1rem;

  span {
    font-size: 0.82rem;
    font-weight: 600;
    color: #a76b53;
  }

  svg {
    width: 0.95rem;
    height: 0.95rem;
    color: #a76b53;
  }
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.1rem, 3.4vw, 3rem);
  font-weight: 400;
  color: #2c2a29;
  margin: 0;
`;

const Accent = styled.span`
  color: #a76b53;
  font-style: italic;
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
  inset: -8px;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(217, 160, 128, 0.4), rgba(167, 107, 83, 0.6));
  pointer-events: none;
  z-index: 0;
`;

const InnerRing = styled.div`
  position: absolute;
  inset: -5px;
  border-radius: 999px;
  background: #fdfcf0;
  pointer-events: none;
  z-index: 1;
`;

const PhotoCircle = styled(motion.div)`
  position: relative;
  width: ${({ $size }) => ($size === 'sm' ? '12rem' : '18rem')};
  height: ${({ $size }) => ($size === 'sm' ? '12rem' : '18rem')};
  border-radius: 999px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(167, 107, 83, 0.08);
  z-index: 2;
  border: 1px solid rgba(167, 107, 83, 0.2);

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
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.1), transparent 45%);
  pointer-events: none;
`;

const PhotoFallback = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fcfaf6;
`;

const Initials = styled(motion.div)`
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 600;
  color: #a76b53;
`;

const Shine = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: skewX(-18deg);
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
  padding: 0.45rem 1.05rem;
  border-radius: 999px;
  color: #ffffff;
  font-weight: 600;
  font-size: 0.8rem;
  background: #a76b53;
  box-shadow: 0 10px 24px rgba(167, 107, 83, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const RoleDot = styled.span`
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 999px;
  background: #fdfcf0;
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
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background: rgba(167, 107, 83, 0.08);
  box-shadow: 0 8px 24px rgba(167, 107, 83, 0.04);
  margin-bottom: 1.5rem;

  svg {
    width: 1.6rem;
    height: 1.6rem;
    color: #a76b53;
  }
`;

const QuoteText = styled.p`
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.25rem, 2vw, 1.8rem);
  font-style: italic;
  font-weight: 400;
  line-height: 1.5;
  color: #2c2a29;
  margin: 0 0 1.75rem;
`;

const NameBlock = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;

  @media (min-width: 1024px) {
    align-items: flex-start;
  }
`;

const FounderName = styled(motion.h3)`
  margin: 0;
  font-family: 'Playfair Display', serif;
  font-size: clamp(1.65rem, 2.5vw, 2.2rem);
  font-weight: 400;
  color: #2c2a29;
`;

const FounderTitle = styled(motion.p)`
  margin: 0;
  color: #8c8885;
  font-size: 0.88rem;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
`;

const Line = styled.span`
  width: 1.5rem;
  height: 1px;
  background: rgba(167, 107, 83, 0.45);
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
          background: 'rgba(217, 160, 128, 0.15)',
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
          background: 'rgba(232, 196, 176, 0.12)',
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
            <Badge whileHover={{ scale: 1.02 }}>
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
            <Badge whileHover={{ scale: 1.02 }}>
              <Sparkles />
              <span>{badgeText}</span>
              <Sparkles />
            </Badge>
          </Header>
        )}

        <Layout>
          <ImageWrap
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Halo
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(217, 160, 128, 0.2) 0%, transparent 60%)',
              }}
              animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.6, 0.45] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            <Ring />
            <InnerRing />

            <PhotoCircle $size={photoSize} whileHover={{ scale: 1.01 }} transition={{ duration: 0.3 }}>
              {!imgError ? (
                <Photo src={imageSrc} alt={name} onError={() => setImgError(true)} />
              ) : (
                <PhotoFallback>
                  <div style={{ textAlign: 'center' }}>
                    <Initials>
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
            >
              <RoleDot />
              {role}
            </RolePill>
          </ImageWrap>

          {compact ? (
            <NameBlock
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              <FounderName>
                {name}
              </FounderName>

              <FounderTitle>
                <Line />
                {role}
              </FounderTitle>
            </NameBlock>
          ) : (
            <QuoteWrap
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
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
                <FounderName>
                  {name}
                </FounderName>

                <FounderTitle>
                  <Line />
                  {role}
                </FounderTitle>
              </NameBlock>
            </QuoteWrap>
          )}
        </Layout>
      </Container>
    </Section>
  );
};

export default FounderSection;

