import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, Quote, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const reviews = [
  {
    name: 'Priya Sharma',
    role: 'Corporate Client',
    rating: 5,
    review: 'Absolutely phenomenal experience! The attention to detail was incredible.',
    highlight: 'phenomenal experience',
  },
  {
    name: 'Rahul Patel',
    role: 'Birthday Client',
    rating: 5,
    review: 'They made our wedding day truly magical. Best decision we ever made!',
    highlight: 'truly magical',
  },
  {
    name: 'Ananya Patel',
    role: 'Birthday Party',
    rating: 5,
    review: 'Creative, professional, and so much fun! My kids are still talking about it.',
    highlight: 'so much fun',
  },
  {
    name: 'Vikram Singh',
    role: 'Corporate Event',
    rating: 5,
    review: 'Exceeded all expectations. The team went above and beyond for our annual gala.',
    highlight: 'above and beyond',
  },
  {
    name: 'Neha Kapoor',
    role: 'Festival Event',
    rating: 5,
    review: 'Super smooth planning and a vibrant setup. Guests couldn\'t stop smiling!',
    highlight: 'vibrant setup',
  },
];

const Section = styled.section`
  padding: 5rem 1rem 5.5rem;
  position: relative;
  overflow: hidden;
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`;

const Blob = styled(motion.div)`
  position: absolute;
  width: 420px;
  height: 420px;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.35;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.16), rgba(249, 115, 22, 0.12));
  color: #db2777;
  font-weight: 700;
  font-size: 0.82rem;
  margin-bottom: 1rem;
  border: 1px solid rgba(236, 72, 153, 0.22);
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3.1rem);
  font-weight: 900;
  color: #111827;
  margin: 0 0 0.75rem;
`;

const GradientWord = styled.span`
  background: linear-gradient(135deg, #f97316, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Wrap = styled(motion.div)`
  max-width: 72rem;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const ReviewCard = styled(motion.div)`
  position: relative;
  perspective: 900px;
`;

const CardInner = styled.div`
  position: relative;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(148, 163, 184, 0.35);
  border-radius: 1.25rem;
  padding: 1.35rem 1.2rem;
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  height: 100%;
`;

const CardGlow = styled(motion.div)`
  position: absolute;
  inset: -2px;
  border-radius: 1.3rem;
  pointer-events: none;
  opacity: 0;
  background:
    linear-gradient(135deg, rgba(249, 115, 22, 0.55), rgba(236, 72, 153, 0.55), rgba(34, 193, 195, 0.45));
  filter: blur(10px);
`;

const CardBorder = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 1.25rem;
  pointer-events: none;
  opacity: 0;
  padding: 1px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.65), rgba(236, 72, 153, 0.65), rgba(99, 102, 241, 0.55));
  -webkit-mask:
    linear-gradient(#000 0 0) content-box,
    linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
`;

const QuoteIcon = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: rgba(236, 72, 153, 0.14);

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Avatar = styled(motion.div)`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: linear-gradient(135deg, #ff6b6b, #ff9f43, #ff6fa5);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 900;
  letter-spacing: 0.06em;
  color: rgba(255, 255, 255, 0.98);
  margin-bottom: 0.85rem;
`;

const getInitials = (name) => {
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  const first = parts[0]?.[0] ?? '';
  const last = (parts.length > 1 ? parts[parts.length - 1]?.[0] : '') ?? '';
  return `${first}${last}`.toUpperCase();
};

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 0.7rem;
`;

const StarIcon = styled(motion.div)`
  color: #f59e0b;

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

const ReviewText = styled.p`
  margin: 0 0 0.9rem;
  color: #4b5563;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const Author = styled.div``;

const Name = styled.p`
  margin: 0;
  font-weight: 800;
  color: #111827;
`;

const Role = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.78rem;
  color: #6b7280;
`;

const HoverGradient = styled(motion.div)`
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  background:
    radial-gradient(circle at 20% 18%, rgba(236, 72, 153, 0.12), transparent 55%),
    radial-gradient(circle at 85% 35%, rgba(34, 193, 195, 0.10), transparent 55%),
    linear-gradient(180deg, rgba(249, 115, 22, 0.06), transparent 60%);
`;

const Highlight = styled(motion.span)`
  color: #f97316;
  font-weight: 800;
  border-radius: 0.35rem;
  padding: 0 0.2rem;
`;

const Footer = styled(motion.div)`
  text-align: center;
  margin-top: 2.75rem;
`;

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: 0;
  cursor: pointer;
  padding: 0.95rem 1.6rem;
  border-radius: 999px;
  color: #ffffff;
  font-weight: 800;
  background: linear-gradient(135deg, #ff6b6b, #ff9f43, #ff6fa5);
  box-shadow: 0 18px 45px rgba(15, 23, 42, 0.18);
`;

const ArrowWrap = styled(motion.span)`
  display: inline-flex;

  svg {
    width: 1.15rem;
    height: 1.15rem;
  }
`;

const highlightText = (text, highlight, inView) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

  return parts.map((part, index) =>
    part.toLowerCase() === highlight.toLowerCase() ? (
      <Highlight
        key={index}
        initial={{ backgroundColor: 'transparent' }}
        animate={inView ? { backgroundColor: 'rgba(249, 115, 22, 0.15)' } : {}}
        transition={{ delay: 1.3, duration: 0.5 }}
      >
        {part}
      </Highlight>
    ) : (
      part
    )
  );
};

export const ClientReviews = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Section ref={ref}>
      <Backdrop>
        <Blob
          style={{ left: '-140px', top: '-160px', background: 'linear-gradient(135deg, rgba(236,72,153,0.55), rgba(249,115,22,0.35))' }}
          animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Blob
          style={{ right: '-160px', bottom: '-180px', background: 'linear-gradient(135deg, rgba(34,193,195,0.45), rgba(99,102,241,0.32))' }}
          animate={{ y: [0, -16, 0], scale: [1.05, 1, 1.05] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </Backdrop>

      <Header
        initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
        animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.8 }}
      >
        <Badge
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          Testimonials
        </Badge>
        <Title>
          What Our <GradientWord>Customers</GradientWord> Say
        </Title>
      </Header>

      <Wrap
        initial={{ opacity: 0, y: 20, scale: 0.98, filter: 'blur(6px)' }}
        animate={inView ? { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' } : {}}
        transition={{ delay: 0.05, duration: 0.8 }}
      >
        <Grid>
          {reviews.map((review, index) => (
            <ReviewCard
              key={review.name}
              initial={{ opacity: 0, y: 50, rotateY: -15 }}
              animate={inView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
              transition={{
                delay: 0.2 + index * 0.12,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                y: -8,
                rotateZ: index % 2 === 0 ? -0.6 : 0.6,
                scale: 1.02,
                transition: { duration: 0.3 },
              }}
            >
              <CardGlow
                whileHover={{ opacity: 0.7 }}
                transition={{ duration: 0.25 }}
              />
              <CardBorder
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
              />
              <CardInner>
                <QuoteIcon
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Quote />
                </QuoteIcon>

                <Avatar whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  {getInitials(review.name)}
                </Avatar>

                <Stars>
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.45 + index * 0.08 + i * 0.05 }}
                    >
                      <Star fill="currentColor" />
                    </StarIcon>
                  ))}
                </Stars>

                <ReviewText>
                  &quot;{highlightText(review.review, review.highlight, inView)}&quot;
                </ReviewText>

                <Author>
                  <Name>{review.name}</Name>
                  <Role>{review.role}</Role>
                </Author>

                <HoverGradient
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </CardInner>
            </ReviewCard>
          ))}
        </Grid>

        <Footer
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9 }}
        >
          <Link to="/testimonials">
            <Button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              Explore More Reviews
              <ArrowWrap
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight />
              </ArrowWrap>
            </Button>
          </Link>
        </Footer>
      </Wrap>
    </Section>
  );
};

export default ClientReviews;
