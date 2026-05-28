import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styled from "styled-components";
import { Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Aarohi Iyer",
    handle: "Wedding Client",
    rating: 5,
    title: "Absolutely amazing!",
    review: "The team made our wedding unforgettable with their creative decorations. Every detail was planned to perfection and the execution was flawless.",
    tail: "none",
  },
  {
    id: 2,
    name: "Rohan Gupta",
    handle: "Happy Parent",
    rating: 5,
    title: "I really appreciate!!",
    review: "Outstanding service and incredible attention to detail. Our daughter's birthday party was transformed into a magical wonderland.",
    tail: "bottom-right",
  },
  {
    id: 3,
    name: "Meera Menon",
    handle: "Corporate Event",
    rating: 5,
    title: "Good Job!",
    review: "Highly professional team! They handled everything smoothly and exceeded our expectations. Truly exceptional work from start to finish.",
    tail: "none",
  },
  {
    id: 4,
    name: "Kabir Malhotra",
    handle: "Party Host",
    rating: 5,
    title: "I was very impressed!",
    review: "Fantastic work! The decorations were stunning and everyone loved the theme. We didn't have to worry about a single thing.",
    tail: "bottom-left",
  },
  {
    id: 5,
    name: "Priya Sharma",
    handle: "Anniversary Event",
    rating: 5,
    title: "Highly recommend!",
    review: "Best event planners ever! They brought our vision to life beautifully. Our 10th anniversary was a dream come true because of Happy Feet.",
    tail: "none",
  },
];

export const ClientTestimonials = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.1 });
  const navigate = useNavigate();

  const handleExploreMore = () => {
    navigate("/testimonials");
  };

  return (
    <TestimonialsSection ref={containerRef}>
      <ContentWrapper>
        <HeaderSection>
          <SectionTitle
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            What Our Clients Say
          </SectionTitle>
          <SectionSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Real experiences from the magical events we create.
          </SectionSubtitle>
        </HeaderSection>

        <GridContainer>
          {/* Decorative floating quotes */}
          <FloatingQuote className="quote-top-left">“</FloatingQuote>
          <FloatingQuote className="quote-middle">“</FloatingQuote>
          <FloatingQuote className="quote-bottom-right">”</FloatingQuote>

          {testimonials.map((t, index) => (
            <GridItem
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
              transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <Card>
                {t.tail !== "none" && (
                  <BubbleTail className={t.tail} />
                )}
                
                <CardInner>
                  {/* Title */}
                  {t.title && <CardTitle>{t.title}</CardTitle>}

                  {/* Stars */}
                  <RatingContainer>
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#FACC15" color="#FACC15" />
                    ))}
                  </RatingContainer>

                  {/* Review Text */}
                  <ReviewText>{t.review}</ReviewText>

                  {/* Client Info (No Image) */}
                  <ClientInfo>
                    <ClientName>{t.name}</ClientName>
                    <ClientHandle>{t.handle}</ClientHandle>
                  </ClientInfo>
                </CardInner>
              </Card>
            </GridItem>
          ))}
        </GridContainer>

        <ExploreButton
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
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

// --- Styled Components ---

const TestimonialsSection = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  padding: 6rem 1rem;
  background-color: #a76b53;
  overflow: hidden;
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
  margin-bottom: 2rem;
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  font-weight: 400;
  color: white;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionSubtitle = styled(motion.p)`
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const GridContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  max-width: 1050px;
  margin: 0 auto 3rem auto;
  align-items: stretch;
`;

const GridItem = styled(motion.div)`
  position: relative;
  z-index: 2;
  display: flex;
  width: calc(33.333% - 1rem);
  min-width: 300px;

  @media (max-width: 950px) {
    width: calc(50% - 0.75rem);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const FloatingQuote = styled.div`
  position: absolute;
  font-family: 'Playfair Display', serif;
  font-size: 8rem;
  font-weight: 400;
  line-height: 1;
  color: #fdfcf0;
  opacity: 0.15;
  z-index: 1;
  pointer-events: none;

  &.quote-top-left {
    top: -40px;
    left: -45px;
  }

  &.quote-middle {
    top: 48%;
    left: 32%;
    transform: translateY(-50%);
  }

  &.quote-bottom-right {
    bottom: -10px;
    right: -20px;
  }
`;

const Card = styled.div`
  position: relative;
  background: #fdfcf0;
  border-radius: 4px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  width: 100%;
`;

const CardInner = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CardTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 500;
  color: #2f2622;
  margin: 0;
`;

const RatingContainer = styled.div`
  display: flex;
  gap: 0.15rem;
  
  svg {
    width: 12px;
    height: 12px;
  }
`;

const ReviewText = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #4a423e;
  margin: 0;
`;

const ClientInfo = styled.div`
  margin-top: 0.15rem;
  border-top: 1px solid #f0f0f0;
  padding-top: 0.5rem;
  display: flex;
  flex-direction: column;
`;

const ClientName = styled.span`
  font-family: 'Playfair Display', serif;
  font-weight: 500;
  font-size: 1.1rem;
  color: #2f2622;
`;

const ClientHandle = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  color: #a76b53;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

/* The little arrow/tail to make it look like a chat bubble */
const BubbleTail = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: #fdfcf0;
  z-index: 1;

  &.bottom-left {
    bottom: -6px;
    left: 20px;
    transform: rotate(45deg);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.02);
  }

  &.bottom-right {
    bottom: -6px;
    right: 20px;
    transform: rotate(45deg);
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.02);
  }
`;

const ExploreButton = styled(motion.button)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin: 0 auto;
  padding: 0.8rem 2rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #a76b53;
  background: #fdfcf0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const ButtonShine = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
`;
