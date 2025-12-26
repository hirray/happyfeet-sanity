import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import { Star, Quote, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    review: "Absolutely amazing experience! The team made our wedding unforgettable with their creative decorations.",
    highlight: ["amazing", "unforgettable", "creative"],
    avatar: "https://i.pravatar.cc/150?img=1",
    color: "#FF6B9D",
    gradient: "linear-gradient(135deg, #FF6B9D, #FEC163)",
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 5,
    review: "Outstanding service and incredible attention to detail. Our daughter's birthday party was perfect!",
    highlight: ["Outstanding", "incredible", "perfect"],
    avatar: "https://i.pravatar.cc/150?img=2",
    color: "#667EEA",
    gradient: "linear-gradient(135deg, #667EEA, #764BA2)",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    rating: 5,
    review: "Highly professional team! They transformed our venue into a magical wonderland. Exceeded expectations!",
    highlight: ["professional", "magical", "Exceeded expectations"],
    avatar: "https://i.pravatar.cc/150?img=3",
    color: "#F093FB",
    gradient: "linear-gradient(135deg, #F093FB, #F5576C)",
  },
  {
    id: 4,
    name: "David Thompson",
    rating: 5,
    review: "Fantastic work! The decorations were stunning and everyone loved the theme. Truly exceptional!",
    highlight: ["Fantastic", "stunning", "exceptional"],
    avatar: "https://i.pravatar.cc/150?img=4",
    color: "#4FACFE",
    gradient: "linear-gradient(135deg, #4FACFE, #00F2FE)",
  },
  {
    id: 5,
    name: "Priya Sharma",
    rating: 5,
    review: "Best event planners ever! They brought our vision to life beautifully. Highly recommend!",
    highlight: ["Best", "beautifully", "Highly recommend"],
    avatar: "https://i.pravatar.cc/150?img=5",
    color: "#43E97B",
    gradient: "linear-gradient(135deg, #43E97B, #38F9D7)",
  },
];

export const ClientTestimonials = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [highlightedCards, setHighlightedCards] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setHighlightedCards(testimonials.map((t) => t.id));
      }, 600);
      return () => clearTimeout(timer);
    } else {
      setHighlightedCards([]);
    }
  }, [isInView]);

  const highlightWords = (text, wordsToHighlight, shouldHighlight) => {
    if (!shouldHighlight) return text;

    let highlightedText = text;
    wordsToHighlight.forEach((word) => {
      const regex = new RegExp(`(${word})`, "gi");
      highlightedText = highlightedText.replace(
        regex,
        '<span class="highlight">$1</span>'
      );
    });
    return highlightedText;
  };

  const handleExploreMore = () => {
    navigate("/testimonials");
  };

  return (
    <TestimonialsSection ref={containerRef}>
      <SectionBackground>
        <BackgroundCircle1
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <BackgroundCircle2
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 12, repeat: Infinity }}
        />
      </SectionBackground>

      <ContentWrapper>
        <HeaderSection>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            What Our <GradientText>Clients Say</GradientText>
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real experiences from our happy clients
          </SectionSubtitle>
        </HeaderSection>

        <CardsGrid>
          {testimonials.map((testimonial, index) => {
            const shouldHighlight = highlightedCards.includes(testimonial.id);
            const positions = [
              { rotate: -3, y: 0 },
              { rotate: 2, y: 20 },
              { rotate: -2, y: 10 },
              { rotate: 3, y: -10 },
              { rotate: -1, y: 15 },
            ];

            return (
              <TestimonialCard
                key={testimonial.id}
                $gradient={testimonial.gradient}
                initial={{ opacity: 0, scale: 0.5, rotateX: -90, y: 100 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: 1,
                        rotateX: 0,
                        y: 0,
                      }
                    : { opacity: 0, scale: 0.5, rotateX: -90, y: 100 }
                }
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 80,
                  damping: 12,
                }}
                whileHover={{
                  scale: 1.08,
                  rotateY: 5,
                  y: -20,
                  transition: { duration: 0.4, type: "spring", stiffness: 300 },
                }}
              >
                <CardTopBar $color={testimonial.color} />
                
                <QuoteIcon $color={testimonial.color}>
                  <Quote size={32} strokeWidth={3} />
                </QuoteIcon>

                <CardHeader>
                  <AvatarWrapper
                    animate={
                      shouldHighlight
                        ? { 
                            rotate: [0, -10, 10, -10, 0],
                            scale: [1, 1.15, 1]
                          }
                        : { rotate: 0, scale: 1 }
                    }
                    transition={{ duration: 0.8, delay: 0.3 }}
                  >
                    <Avatar
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      $borderColor={testimonial.color}
                    />
                    <AvatarGlow $color={testimonial.color} />
                  </AvatarWrapper>
                  <ClientInfo>
                    <ClientName>{testimonial.name}</ClientName>
                    <RatingContainer>
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon
                          key={i}
                          $color={testimonial.color}
                          animate={
                            shouldHighlight
                              ? {
                                  scale: [1, 1.5, 1],
                                  rotate: [0, 180, 360],
                                  y: [0, -5, 0],
                                }
                              : { scale: 1, rotate: 0, y: 0 }
                          }
                          transition={{
                            duration: 0.7,
                            delay: 0.5 + i * 0.15,
                          }}
                        >
                          <Star size={16} fill="currentColor" strokeWidth={0} />
                        </StarIcon>
                      ))}
                    </RatingContainer>
                  </ClientInfo>
                </CardHeader>

                <ReviewText
                  dangerouslySetInnerHTML={{
                    __html: highlightWords(
                      testimonial.review,
                      testimonial.highlight,
                      shouldHighlight
                    ),
                  }}
                />

                <CardGlow
                  $gradient={testimonial.gradient}
                  animate={
                    shouldHighlight
                      ? { opacity: 0.6, scale: 1.15 }
                      : { opacity: 0, scale: 1 }
                  }
                  transition={{ duration: 0.5 }}
                />
                
                <FloatingParticle1
                  $color={testimonial.color}
                  animate={{
                    y: [-20, 20, -20],
                    x: [-10, 10, -10],
                    rotate: [0, 360],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
                <FloatingParticle2
                  $color={testimonial.color}
                  animate={{
                    y: [20, -20, 20],
                    x: [10, -10, 10],
                    rotate: [360, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    delay: index * 0.7,
                  }}
                />
                <FloatingParticle3
                  $color={testimonial.color}
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                    opacity: [0.2, 0.6, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                  }}
                />
              </TestimonialCard>
            );
          })}
        </CardsGrid>

        <ExploreButton
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 1 }}
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleExploreMore}
        >
          <ButtonShine
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          />
          <span style={{ position: "relative", zIndex: 10 }}>
            Explore More Reviews
          </span>
          <ArrowRight size={20} style={{ position: "relative", zIndex: 10 }} />
        </ExploreButton>
      </ContentWrapper>
    </TestimonialsSection>
  );
};

const TestimonialsSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 1rem;
  overflow: hidden;
`;

const SectionBackground = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`;

const BackgroundCircle1 = styled(motion.div)`
  position: absolute;
  top: 10%;
  left: 10%;
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  background: hsl(270, 60%, 70%);
  filter: blur(80px);
`;

const BackgroundCircle2 = styled(motion.div)`
  position: absolute;
  bottom: 10%;
  right: 10%;
  width: 35rem;
  height: 35rem;
  border-radius: 50%;
  background: hsl(40, 95%, 55%);
  filter: blur(80px);
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionTitle = styled(motion.h2)`
  font-size: 3rem;
  font-weight: 900;
  color: #2d3436;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 640px) {
    font-size: 2rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(
    135deg,
    hsl(10, 90%, 65%),
    hsl(340, 80%, 65%),
    hsl(270, 60%, 70%)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SectionSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  color: #636e72;

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 260px);
  gap: 1.5rem;
  margin-bottom: 4rem;
  padding: 0 1rem;
  justify-content: center;

  & > *:nth-child(4),
  & > *:nth-child(5) {
    grid-column: span 1;
  }

  & > *:nth-child(4) {
    margin-left: auto;
    margin-right: 0.75rem;
  }

  & > *:nth-child(5) {
    margin-right: auto;
    margin-left: 0.75rem;
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 260px);
    
    & > *:nth-child(4),
    & > *:nth-child(5) {
      margin: 0;
    }
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    max-width: 300px;
    margin-left: auto;
    margin-right: auto;
    
    & > *:nth-child(4),
    & > *:nth-child(5) {
      margin: 0;
    }
  }
`;

const TestimonialCard = styled(motion.div)`
  position: relative;
  background: ${props => props.$gradient};
  border-radius: 20px;
  padding: 1.75rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  overflow: hidden;
  transform-style: preserve-3d;
  perspective: 1000px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  max-width: 260px;
  width: 100%;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    z-index: 1;
  }

  @media (max-width: 640px) {
    padding: 1.5rem;
  }
`;

const CardTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: ${props => props.$color};
  border-radius: 20px 20px 0 0;
  z-index: 10;
`;

const QuoteIcon = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: ${props => props.$color};
  opacity: 0.15;
  transform: rotate(180deg);
  z-index: 2;
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const CardHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.25rem;
  margin-top: 0.75rem;
  z-index: 2;
`;

const AvatarWrapper = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${props => props.$borderColor};
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 2;
`;

const AvatarGlow = styled.div`
  position: absolute;
  inset: -8px;
  background: ${props => props.$color};
  border-radius: 50%;
  filter: blur(15px);
  opacity: 0.4;
  z-index: 1;
`;

const ClientInfo = styled.div`
  flex: 1;
`;

const ClientName = styled.h4`
  font-size: 1rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.25rem;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const StarIcon = styled(motion.div)`
  color: ${props => props.$color};
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  
  svg {
    width: 14px;
    height: 14px;
  }
`;

const ReviewText = styled.p`
  position: relative;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #2d3436;
  z-index: 2;
  font-weight: 500;

  .highlight {
    color: hsl(340, 80%, 65%);
    font-weight: 800;
    background: linear-gradient(
      135deg,
      hsl(340, 80%, 65%, 0.15),
      hsl(10, 90%, 65%, 0.15)
    );
    padding: 0.15rem 0.4rem;
    border-radius: 6px;
    animation: highlightPulse 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
    display: inline-block;
    position: relative;
  }

  @keyframes highlightPulse {
    0% {
      background: transparent;
      transform: scale(1) translateY(0);
    }
    50% {
      background: linear-gradient(
        135deg,
        hsl(340, 80%, 65%, 0.35),
        hsl(10, 90%, 65%, 0.35)
      );
      transform: scale(1.08) translateY(-2px);
    }
    100% {
      background: linear-gradient(
        135deg,
        hsl(340, 80%, 65%, 0.15),
        hsl(10, 90%, 65%, 0.15)
      );
      transform: scale(1) translateY(0);
    }
  }
`;

const CardGlow = styled(motion.div)`
  position: absolute;
  inset: -4px;
  background: ${props => props.$gradient};
  border-radius: 24px;
  filter: blur(25px);
  z-index: 0;
`;

const FloatingParticle1 = styled(motion.div)`
  position: absolute;
  top: 15%;
  right: 15%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${props => props.$color};
  z-index: 2;
  filter: blur(1px);
`;

const FloatingParticle2 = styled(motion.div)`
  position: absolute;
  bottom: 20%;
  left: 10%;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.$color};
  z-index: 2;
  filter: blur(1px);
`;

const FloatingParticle3 = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 20%;
  width: 6px;
  height: 6px;
  transform: rotate(45deg);
  background: ${props => props.$color};
  z-index: 2;
  filter: blur(1px);
`;

const ExploreButton = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin: 0 auto;
  padding: 1.25rem 3rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, hsl(10, 90%, 65%), hsl(340, 80%, 65%));
  border: none;
  border-radius: 50px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 640px) {
    padding: 1rem 2.5rem;
    font-size: 1rem;
  }
`;

const ButtonShine = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
`;
