import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { CategoryCard } from "../components/CategoryCard";
import { useIsMobile } from "../hooks/use-mobile";
import { ImageSphere } from "../components/ImageSphere";
import { EventCard } from "../components/EventCard";
import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";
import AnimatedBackground from "../components/AnimatedBackground";
import { pastEvents as fallbackPastEvents } from "../data/pastEvents";
import { galleryCategories as fallbackCategories } from "../data/galleryCategories";
import { fetchCategories, fetchPastEvents } from "../lib/sanity";
import { useState } from "react";

const heroMosaicImages = [
  "/activity9.jpeg",
  "/activity7.jpg",
  "/img3.jpg",
  "/img4.jpg",
  "/activity10.jpeg",
  "/landing2.jpeg",
  "/img5.jpg",
  "/landing7.jpg",
  "/activity11.jpeg",
  "/corporate.jpg",
  "/gallery3.jpg",
  "/workshop.jpg",
  "/sippaint.jpg",
  "/landing1.jpeg",
  "/landing3.jpeg",
  "/gallery2.jpg",
];

const sphereImages = [
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400", alt: "Birthday Party" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400", alt: "Fiesta" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", alt: "Kitty Party" },
  { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", alt: "Sip & Paint" },
  { src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400", alt: "Cook Party" },
  { src: "/disco.jpg", alt: "Baby Shower" },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", alt: "Cake Painting" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400", alt: "Corporate Event" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400", alt: "Workshop" },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400", alt: "Birthday Party 2" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400", alt: "Fiesta 2" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", alt: "Kitty Party 2" },
  { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", alt: "Sip & Paint 2" },
  { src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400", alt: "Cook Party 2" },
  { src: "/workshop.jpg", alt: "Baby Shower 2" },
  { src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400", alt: "Cake Painting 2" },
  { src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400", alt: "Corporate Event 2" },
  { src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400", alt: "Workshop 2" },
  { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400", alt: "Birthday Party 3" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400", alt: "Fiesta 3" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400", alt: "Kitty Party 3" },
  { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400", alt: "Sip & Paint 3" },
  { src: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400", alt: "Cook Party 3" },
  { src: "/kitty.jpg", alt: "Baby Shower 3" },
];

const Gallery = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const isMobile = useIsMobile();
  const [categories, setCategories] = useState(fallbackCategories);
  const [eventsList, setEventsList] = useState(fallbackPastEvents);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      try {
        const [cats, evts] = await Promise.all([
          fetchCategories(),
          fetchPastEvents()
        ]);
        if (active) {
          setCategories(cats);
          setEventsList(evts);
        }
      } catch (err) {
        console.error("Error loading gallery data from Sanity:", err);
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (window.location.hash !== '#past-events') return;
    const el = document.getElementById('past-events');
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, 0]);

  return (
    <PageWrapper>
      <AnimatedBackground />
      <FloatingNavbar />
      
      <HeroSection>
        <HeroMosaic aria-hidden="true">
          <HeroMosaicGlow />
          <HeroMosaicRows>
            <HeroMosaicRow
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              {[...heroMosaicImages.slice(0, 8), ...heroMosaicImages.slice(0, 8)].map((src, idx) => (
                <HeroMosaicTile
                  key={`r1-${src}-${idx}`}
                  $size={idx % 4 === 0 ? 'lg' : idx % 3 === 0 ? 'md' : 'sm'}
                  animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
                  transition={{ duration: 5 + (idx % 4), repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HeroMosaicImg src={src} alt="" loading="lazy" />
                </HeroMosaicTile>
              ))}
            </HeroMosaicRow>

            <HeroMosaicRow
              $reverse
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
            >
              {[...heroMosaicImages.slice(6, 14), ...heroMosaicImages.slice(6, 14)].map((src, idx) => (
                <HeroMosaicTile
                  key={`r2-${src}-${idx}`}
                  $size={idx % 5 === 0 ? 'lg' : idx % 2 === 0 ? 'md' : 'sm'}
                  animate={{ y: [0, 8, 0], rotate: [0, -0.6, 0] }}
                  transition={{ duration: 5.5 + (idx % 4), repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HeroMosaicImg src={src} alt="" loading="lazy" />
                </HeroMosaicTile>
              ))}
            </HeroMosaicRow>

            <HeroMosaicRow
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
            >
              {[...heroMosaicImages.slice(2, 10), ...heroMosaicImages.slice(2, 10)].map((src, idx) => (
                <HeroMosaicTile
                  key={`r3-${src}-${idx}`}
                  $size={idx % 6 === 0 ? 'lg' : idx % 3 === 0 ? 'md' : 'sm'}
                  animate={{ y: [0, -7, 0], rotate: [0, 0.4, 0] }}
                  transition={{ duration: 6 + (idx % 5), repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HeroMosaicImg src={src} alt="" loading="lazy" />
                </HeroMosaicTile>
              ))}
            </HeroMosaicRow>
          </HeroMosaicRows>
        </HeroMosaic>

        <BackgroundDecor1
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <BackgroundDecor2
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <BackgroundDecor3
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        <HeroContent>
          <TitleContainer>
            {["Celebrate", "Every", "Moment"].map((word, i) => (
              <TitleWord
                key={word}
                $gradient={
                  i === 0 
                    ? "linear-gradient(135deg, #a76b53, #b8816c)"
                    : i === 1
                    ? "linear-gradient(135deg, #c79685, #a76b53)"
                    : "linear-gradient(135deg, #b8816c, #945841)"
                }
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2 + i * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
              >
                {word}
              </TitleWord>
            ))}
          </TitleContainer>

          <Subtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Discover our stunning collection of events, from intimate gatherings to grand celebrations
          </Subtitle>

          <ScrollIndicator
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <ScrollText>Scroll to explore</ScrollText>
            <ScrollMouse
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ScrollDot
                animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </ScrollMouse>
          </ScrollIndicator>
        </HeroContent>

        <FloatingDot1
          animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <FloatingDot2
          animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <FloatingSquare
          animate={{ rotate: [45, 225, 45], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <FloatingCircle
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </HeroSection>

      <CategoriesSection ref={containerRef}>
        <SectionHeader>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle>
              Event <LuxurySpan>Categories</LuxurySpan>
            </SectionTitle>
            <SectionDescription>
              Explore our diverse range of celebrations and find your perfect event type
            </SectionDescription>
          </motion.div>
        </SectionHeader>

        <motion.div style={{ x }}>
          <ScrollContainer>
            <CardsWrapper>
              {categories.map((category, index) => (
                <CategoryCard
                  key={category.title}
                  title={category.title}
                  image={category.image}
                  color={category.color}
                  index={index}
                />
              ))}
            </CardsWrapper>
          </ScrollContainer>
        </motion.div>

        <ScrollHint
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}
          >
            <span style={{ color: '#636e72', fontSize: '0.875rem' }}>Scroll to explore</span>
            <span style={{ color: 'hsl(10, 90%, 65%)' }}>→</span>
          </motion.div>
        </ScrollHint>
      </CategoriesSection>

      <SphereSection>
        <SphereBackground />
        <SphereContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <SectionTitle style={{ textAlign: 'center', margin: '0 auto', marginBottom: '1rem' }}>
              Our <LuxurySpan>Memories</LuxurySpan>
            </SectionTitle>
            <SectionDescription style={{ textAlign: 'center', margin: '0 auto', maxWidth: '28rem', marginBottom: '2rem' }}>
              Hover and drag to explore our universe of celebrations
            </SectionDescription>
          </motion.div>

          <ImageSphere images={sphereImages} />
        </SphereContent>

        <BelowSphereMosaic aria-hidden="true">
          <HeroMosaicGlow />
          <HeroMosaicRows>
            <HeroMosaicRow>
              {[...heroMosaicImages.slice(0, 8), ...heroMosaicImages.slice(0, 8)].map((src, idx) => (
                <HeroMosaicTile
                  key={`bs1-${src}-${idx}`}
                  $size={idx % 4 === 0 ? 'lg' : idx % 3 === 0 ? 'md' : 'sm'}
                  animate={{ y: [0, -10, 0], rotate: [0, 0.6, 0] }}
                  transition={{ duration: 5 + (idx % 4), repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HeroMosaicImg src={src} alt="" loading="lazy" />
                </HeroMosaicTile>
              ))}
            </HeroMosaicRow>

            <HeroMosaicRow $reverse>
              {[...heroMosaicImages.slice(6, 14), ...heroMosaicImages.slice(6, 14)].map((src, idx) => (
                <HeroMosaicTile
                  key={`bs2-${src}-${idx}`}
                  $size={idx % 5 === 0 ? 'lg' : idx % 2 === 0 ? 'md' : 'sm'}
                  animate={{ y: [0, 8, 0], rotate: [0, -0.6, 0] }}
                  transition={{ duration: 5.5 + (idx % 4), repeat: Infinity, ease: 'easeInOut' }}
                >
                  <HeroMosaicImg src={src} alt="" loading="lazy" />
                </HeroMosaicTile>
              ))}
            </HeroMosaicRow>
          </HeroMosaicRows>
        </BelowSphereMosaic>

        <SphereDecor1
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity }}
        />
        <SphereDecor2
          animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </SphereSection>

      <PastEventsSection id="past-events">
        <EventsTopGradient />
        <EventsContent>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, type: "spring" }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                background: 'hsl(10, 90%, 65%, 0.1)',
                color: 'hsl(10, 90%, 65%)',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '1rem'
              }}
            >
              <span style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                background: 'hsl(10, 90%, 65%)',
                animation: 'pulse 2s infinite'
              }} />
              Past Celebrations
            </motion.div>
            <SectionTitle>
              Recent <LuxurySpan>Events</LuxurySpan>
            </SectionTitle>
            <SectionDescription style={{ margin: '0 auto' }}>
              Take a look at some of the magical moments we've created
            </SectionDescription>
          </motion.div>

          <EventsGrid>
            {eventsList.map((event, index) => (
              <EventCard
                key={event.title}
                {...event}
                index={index}
                onClick={() => navigate(`/gallery/event/${event.id}`)}
              />
            ))}
          </EventsGrid>

          <motion.div
            style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            <ViewAllButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/gallery/all-media')}
            >
              <ButtonAnimatedGradient
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
              />
              <span style={{ position: 'relative', zIndex: 10 }}>View All Events</span>
            </ViewAllButton>
          </motion.div>
        </EventsContent>

        <EventsDecor1
          animate={{ y: [-20, 20, -20], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <EventsDecor2
          animate={{ rotate: [45, 225, 45], y: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </PastEventsSection>

      <Footer />
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  min-height: 100vh;
  background: #fdfcf0;
  position: relative;
  overflow-x: hidden;
`;

const HeroSection = styled.section`
  position: relative;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 5rem 1rem;
  padding-top: 8rem;
`;

const HeroMosaic = styled.div`
  position: absolute;
  inset: 0;
  top: 0;
  height: min(62vh, 560px);
  pointer-events: none;
  z-index: 1;
  opacity: 0.95;
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%);
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 100%);
`;

const HeroMosaicGlow = styled.div`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(520px 340px at 18% 22%, rgba(255, 77, 109, 0.22), transparent 60%),
    radial-gradient(520px 380px at 82% 28%, rgba(34, 184, 207, 0.18), transparent 62%),
    radial-gradient(560px 420px at 55% 82%, rgba(132, 94, 247, 0.16), transparent 62%);
  filter: blur(26px);
  opacity: 0.85;
  mix-blend-mode: multiply;
`;

const HeroMosaicRows = styled.div`
  position: absolute;
  inset: 0;
  padding-top: 24px;
  display: grid;
  gap: 14px;
  align-content: start;
  transform: translateZ(0);
`;

const BelowSphereMosaic = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  margin-top: 26px;
  overflow: hidden;
  pointer-events: none;
  opacity: 0.95;

  @media (max-width: 768px) {
    height: 320px;
  }
`;

const HeroMosaicRow = styled(motion.div)`
  display: flex;
  gap: 14px;
  align-items: center;
  width: max-content;
  will-change: transform;
  animation: ${props => (props.$reverse ? 'heroMosaicSlideR' : 'heroMosaicSlide')} 22s linear infinite;

  @keyframes heroMosaicSlide {
    0% {
      transform: translate3d(-8%, 0, 0);
    }
    100% {
      transform: translate3d(-52%, 0, 0);
    }
  }

  @keyframes heroMosaicSlideR {
    0% {
      transform: translate3d(-52%, 0, 0);
    }
    100% {
      transform: translate3d(-8%, 0, 0);
    }
  }
`;

const HeroMosaicTile = styled(motion.div)`
  position: relative;
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 22px 70px rgba(0, 0, 0, 0.12);
  transform: translateZ(0);
  width: ${props => (props.$size === 'lg' ? '220px' : props.$size === 'md' ? '190px' : '160px')};
  height: ${props => (props.$size === 'lg' ? '140px' : props.$size === 'md' ? '120px' : '108px')};

  @media (max-width: 768px) {
    width: ${props => (props.$size === 'lg' ? '170px' : props.$size === 'md' ? '150px' : '132px')};
    height: ${props => (props.$size === 'lg' ? '116px' : props.$size === 'md' ? '104px' : '96px')};
    border-radius: 16px;
  }
`;

const HeroMosaicImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.12) contrast(1.04);
`;

const BackgroundDecor1 = styled(motion.div)`
  position: absolute;
  top: 5rem;
  left: 2.5rem;
  width: 18rem;
  height: 18rem;
  border-radius: 50%;
  background: hsl(10, 90%, 65%, 0.1);
  filter: blur(3rem);
`;

const BackgroundDecor2 = styled(motion.div)`
  position: absolute;
  bottom: 5rem;
  right: 2.5rem;
  width: 24rem;
  height: 24rem;
  border-radius: 50%;
  background: hsl(175, 70%, 45%, 0.1);
  filter: blur(3rem);
`;

const BackgroundDecor3 = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 37.5rem;
  height: 37.5rem;
  border-radius: 50%;
  background: hsl(40, 95%, 55%, 0.05);
  filter: blur(3rem);
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  text-align: center;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const TitleWord = styled(motion.span)`
  font-size: 3.75rem;
  font-weight: 900;
  background: ${props => props.$gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (min-width: 768px) {
    font-size: 6rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 8rem;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.125rem;
  color: #636e72;
  max-width: 36rem;
  margin: 0 auto;
  
  @media (min-width: 768px) {
    font-size: 1.25rem;
  }
`;

const ScrollIndicator = styled(motion.div)`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ScrollText = styled.span`
  font-size: 0.875rem;
  color: #636e72;
  margin-bottom: 0.5rem;
`;

const ScrollMouse = styled(motion.div)`
  width: 1.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 2px solid rgba(99, 110, 114, 0.3);
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
`;

const ScrollDot = styled(motion.div)`
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 50%;
  background: hsl(10, 90%, 65%);
`;

const FloatingDot1 = styled(motion.div)`
  position: absolute;
  top: 8rem;
  right: 15%;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: hsl(10, 90%, 65%);
`;

const FloatingDot2 = styled(motion.div)`
  position: absolute;
  bottom: 10rem;
  left: 20%;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  background: hsl(175, 70%, 45%);
`;

const FloatingSquare = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 10%;
  width: 1.25rem;
  height: 1.25rem;
  transform: rotate(45deg);
  background: hsl(40, 95%, 55%);
`;

const FloatingCircle = styled(motion.div)`
  position: absolute;
  bottom: 8rem;
  right: 30%;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  border: 2px solid hsl(270, 60%, 70%);
`;

const CategoriesSection = styled.section`
  padding: 5rem 0;
  overflow: hidden;
`;

const SectionHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  font-weight: 500;
  color: #2f2622;
  margin-bottom: 1rem;
  
  @media (min-width: 768px) {
    font-size: 3.5rem;
  }
`;

const LuxurySpan = styled.span`
  color: #a76b53;
  font-style: italic;
  font-weight: 400;
`;

const SectionDescription = styled.p`
  color: #636e72;
  font-size: 1.125rem;
  max-width: 28rem;
`;

const ScrollContainer = styled.div`
  position: relative;
  display: flex;
  gap: 1.5rem;
  padding: 0 2rem 2rem;
  overflow-x: auto;
  scroll-padding-left: 2rem;
  scrollbar-width: none;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  
  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    padding: 0 1rem 1.25rem;
    scroll-padding-left: 1rem;
  }
`;

const CardsWrapper = styled.div`
  display: flex;
  gap: 1.5rem;
  padding-left: 0;

  @media (max-width: 768px) {
    gap: 1rem;
    padding-right: 1rem;
  }
`;

const ScrollHint = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const SphereSection = styled.section`
  padding: 5rem 0;
  position: relative;
  overflow: hidden;
`;

const SphereBackground = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.02), transparent);
`;

const SphereContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  position: relative;
  z-index: 10;
`;

const SphereDecor1 = styled(motion.div)`
  position: absolute;
  left: 2.5rem;
  top: 33.333%;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid hsl(10, 90%, 65%, 0.2);
`;

const SphereDecor2 = styled(motion.div)`
  position: absolute;
  right: 2.5rem;
  bottom: 33.333%;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 2px solid hsl(175, 70%, 45%, 0.2);
`;

const PastEventsSection = styled.section`
  padding: 5rem 0;
  position: relative;
`;

const EventsTopGradient = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 8rem;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.02), transparent);
`;

const EventsContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const EventsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const ViewAllButton = styled(motion.button)`
  position: relative;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  overflow: hidden;
  border: none;
  cursor: pointer;
  background: #a76b53;
  color: #fdfcf0;
  box-shadow: 0 4px 15px rgba(167, 107, 83, 0.2);
`;

const ButtonAnimatedGradient = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #a76b53, #b8816c, #a76b53);
`;

const EventsDecor1 = styled(motion.div)`
  position: absolute;
  right: 2.5rem;
  top: 10rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background: #a76b53;
  opacity: 0.15;
`;

const EventsDecor2 = styled(motion.div)`
  position: absolute;
  left: 5rem;
  bottom: 10rem;
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(45deg);
  background: #c79685;
  opacity: 0.15;
`;

export default Gallery;
