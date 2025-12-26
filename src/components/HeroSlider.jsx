import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import styled from "styled-components";
import { ChevronLeft, ChevronRight, Sparkles, Heart, Star } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Create Magical Moments",
    subtitle: "Where Every Celebration Becomes Unforgettable",
    image: "/img1.jpg",
    imagePosition: 'center',
    zoomFrom: 1.16,
    color: "hsl(340, 80%, 65%)",
    icon: Heart,
  },
  {
    id: 2,
    title: "Celebrate in Style",
    subtitle: "Bringing Your Dream Events to Life",
    image: "/img2.jpg",
    imagePosition: 'center',
    color: "hsl(40, 95%, 55%)",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Memories That Last",
    subtitle: "Crafting Experiences You'll Cherish Forever",
    image: "/img3.jpg",
    imagePosition: 'center',
    color: "hsl(175, 70%, 45%)",
    icon: Star,
  },
];

export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(1);

  const sliderRef = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const xImg = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 90, damping: 18 });
  const yImg = useSpring(useTransform(my, [-0.5, 0.5], [-12, 12]), { stiffness: 90, damping: 18 });

  const xAurora = useSpring(useTransform(mx, [-0.5, 0.5], [-28, 28]), { stiffness: 70, damping: 20 });
  const yAurora = useSpring(useTransform(my, [-0.5, 0.5], [-20, 20]), { stiffness: 70, damping: 20 });

  const xOrbs = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), { stiffness: 70, damping: 20 });
  const yOrbs = useSpring(useTransform(my, [-0.5, 0.5], [-16, 16]), { stiffness: 70, damping: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;
  const zoomFrom = slide.zoomFrom ?? 1.16;

  const onMove = (e) => {
    const el = sliderRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  };

  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <SliderContainer ref={sliderRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      <SliderWrapper>
        <AnimatePresence mode="wait" custom={direction}>
          <SlideContent
            key={currentSlide}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 1000 : -1000 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -1000 : 1000 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <ImageContainer>
              <SlideImage
                src={slide.image}
                alt={slide.title}
                $objectPosition={slide.imagePosition}
                initial={{ scale: zoomFrom }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8 }}
                style={{ x: xImg, y: yImg }}
              />
              <ImageOverlay $color={slide.color} />
              <AuroraLayer $color={slide.color} aria-hidden="true" style={{ x: xAurora, y: yAurora }} />

              <Orbs aria-hidden="true" style={{ x: xOrbs, y: yOrbs }}>
                <Orb
                  $color={slide.color}
                  style={{ left: '8%', top: '18%' }}
                  animate={{ y: [-14, 10, -14], x: [0, 8, 0], scale: [1, 1.06, 1] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                />
                <Orb
                  $color={slide.color}
                  $variant="alt"
                  style={{ right: '10%', top: '28%' }}
                  animate={{ y: [10, -16, 10], x: [0, -10, 0], scale: [1, 1.08, 1] }}
                  transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
                />
                <Orb
                  $color={slide.color}
                  $variant="tiny"
                  style={{ left: '22%', bottom: '14%' }}
                  animate={{ y: [0, -18, 0], x: [0, 12, 0], rotate: [0, 12, 0] }}
                  transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </Orbs>

              <GrainOverlay aria-hidden="true" />
              <LightSweep
                aria-hidden="true"
                animate={{ x: ['-60%', '160%'] }}
                transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.6, ease: 'easeInOut' }}
              />
            </ImageContainer>

            <ContentWrapper>
              <FloatingIcon
                $color={slide.color}
                animate={{
                  y: [-10, 10, -10],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Icon size={40} />
              </FloatingIcon>

              <TextContent>
                <SlideTitle
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                >
                  {slide.title.split(" ").map((word, i) => (
                    <TitleWord
                      key={i}
                      $color={slide.color}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    >
                      {word}
                    </TitleWord>
                  ))}
                </SlideTitle>

                <SlideSubtitle
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {slide.subtitle}
                </SlideSubtitle>

                <CTAButton
                  $color={slide.color}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ButtonGlow $color={slide.color} />
                  <span style={{ position: 'relative', zIndex: 10 }}>Explore Events</span>
                </CTAButton>
              </TextContent>
            </ContentWrapper>
          </SlideContent>
        </AnimatePresence>

        <NavButton
          $position="left"
          onClick={prevSlide}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </NavButton>

        <NavButton
          $position="right"
          onClick={nextSlide}
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </NavButton>

        <DotsContainer>
          {slides.map((_, index) => (
            <Dot
              key={index}
              $active={index === currentSlide}
              $color={slides[index].color}
              onClick={() => goToSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </DotsContainer>

        <ProgressBar
          $color={slide.color}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 5, ease: "linear" }}
          key={currentSlide}
        />
      </SliderWrapper>

      <FloatingParticles>
        {[...Array(15)].map((_, i) => (
          <Particle
            key={i}
            $delay={i * 0.3}
            $duration={3 + Math.random() * 2}
            $x={Math.random() * 100}
            $color={slide.color}
          />
        ))}
      </FloatingParticles>
    </SliderContainer>
  );
};

const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 85vh;
  overflow: hidden;
  background: white;
`;

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const SlideContent = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const SlideImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${props => props.$objectPosition || 'center'};
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    ${props => props.$color}dd 0%,
    ${props => props.$color}88 50%,
    transparent 100%
  );
  mix-blend-mode: multiply;
  z-index: 1;
`;

const AuroraLayer = styled(motion.div)`
  position: absolute;
  inset: -20%;
  background:
    radial-gradient(600px 380px at 18% 22%, ${props => props.$color}66, transparent 62%),
    radial-gradient(520px 360px at 82% 30%, rgba(255, 255, 255, 0.22), transparent 60%),
    radial-gradient(560px 420px at 55% 82%, ${props => props.$color}44, transparent 62%),
    radial-gradient(420px 320px at 70% 65%, rgba(34, 184, 207, 0.18), transparent 60%);
  filter: blur(26px) saturate(1.12);
  opacity: 0.75;
  mix-blend-mode: screen;
  animation: auroraShift 10s ease-in-out infinite;
  pointer-events: none;
  z-index: 2;

  @keyframes auroraShift {
    0% {
      transform: translate3d(-2%, -1%, 0) rotate(0deg) scale(1);
    }
    50% {
      transform: translate3d(2%, 1%, 0) rotate(2deg) scale(1.03);
    }
    100% {
      transform: translate3d(-2%, -1%, 0) rotate(0deg) scale(1);
    }
  }
`;

const Orbs = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
`;

const Orb = styled(motion.div)`
  position: absolute;
  width: ${props => (props.$variant === 'tiny' ? '120px' : props.$variant === 'alt' ? '220px' : '260px')};
  height: ${props => (props.$variant === 'tiny' ? '120px' : props.$variant === 'alt' ? '220px' : '260px')};
  border-radius: 999px;
  background:
    radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.10) 55%, rgba(0, 0, 0, 0) 70%),
    radial-gradient(circle at 70% 70%, ${props => props.$color}55, rgba(0, 0, 0, 0) 62%);
  box-shadow:
    0 28px 90px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.24) inset;
  backdrop-filter: blur(6px);
  opacity: ${props => (props.$variant === 'tiny' ? 0.55 : 0.68)};
  mix-blend-mode: screen;
`;

const GrainOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 4;
  pointer-events: none;
  opacity: 0.14;
  background-image:
    repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0px, rgba(255, 255, 255, 0.10) 1px, transparent 1px, transparent 3px),
    repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.10) 0px, rgba(0, 0, 0, 0.10) 1px, transparent 1px, transparent 4px);
  mix-blend-mode: overlay;
  animation: grainMove 6s steps(12) infinite;

  @keyframes grainMove {
    0% {
      transform: translate3d(0, 0, 0);
    }
    20% {
      transform: translate3d(-2%, 1%, 0);
    }
    40% {
      transform: translate3d(2%, -1%, 0);
    }
    60% {
      transform: translate3d(-1%, -2%, 0);
    }
    80% {
      transform: translate3d(1%, 2%, 0);
    }
    100% {
      transform: translate3d(0, 0, 0);
    }
  }
`;

const LightSweep = styled(motion.div)`
  position: absolute;
  top: -20%;
  bottom: -20%;
  left: 0;
  width: 40%;
  z-index: 5;
  pointer-events: none;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.14),
    rgba(255, 255, 255, 0.22),
    rgba(255, 255, 255, 0.10),
    transparent
  );
  transform: skewX(-18deg);
  mix-blend-mode: soft-light;
  opacity: 0.65;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const FloatingIcon = styled(motion.div)`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.$color};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  margin-bottom: 2rem;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SlideTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 900;
  color: white;
  margin-bottom: 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  
  @media (min-width: 768px) {
    font-size: 4.5rem;
  }
  
  @media (min-width: 1024px) {
    font-size: 6rem;
  }
`;

const TitleWord = styled(motion.span)`
  display: inline-block;
  background: linear-gradient(135deg, white 0%, ${props => props.$color} 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SlideSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: white;
  margin-bottom: 2rem;
  max-width: 36rem;
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.3));
  
  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

const CTAButton = styled(motion.button)`
  position: relative;
  padding: 1rem 2.5rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  background: ${props => props.$color};
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ButtonGlow = styled.div`
  position: absolute;
  inset: -2px;
  background: ${props => props.$color};
  filter: blur(10px);
  opacity: 0.5;
  z-index: 0;
`;

const NavButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  ${props => props.$position}: 2rem;
  transform: translateY(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 20;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  
  &:hover {
    background: white;
  }
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.75rem;
  z-index: 20;
`;

const Dot = styled(motion.button)`
  width: ${props => props.$active ? '2.5rem' : '0.75rem'};
  height: 0.75rem;
  border-radius: 50px;
  background: ${props => props.$active ? props.$color : 'rgba(255, 255, 255, 0.5)'};
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.$active ? `0 0 20px ${props.$color}` : 'none'};
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 4px;
  background: ${props => props.$color};
  transform-origin: left;
  z-index: 20;
`;

const FloatingParticles = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
`;

const Particle = styled.div`
  position: absolute;
  left: ${props => props.$x}%;
  bottom: -10%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
  opacity: 0.6;
  animation: float ${props => props.$duration}s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0) scale(1);
      opacity: 0;
    }
    50% {
      transform: translateY(-100vh) scale(1.5);
      opacity: 0.6;
    }
  }
`;
