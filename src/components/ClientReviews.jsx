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
  padding: 6rem 1rem 5.5rem;
  position: relative;
  overflow: hidden;
  background: #fdfcf0;
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
  border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
  filter: blur(70px);
  opacity: 0.25;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 3.5rem;
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 0.4rem 1.4rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.08);
  color: #a76b53;
  font-weight: 600;
  font-size: 0.82rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  font-weight: 400;
  color: #2c2a29;
  margin: 0 0 0.75rem;
`;

const GradientWord = styled.span`
  color: #a76b53;
  font-style: italic;
`;

const Wrap = styled(motion.div)`
  max-width: 72rem;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }
`;

const ReviewCard = styled(motion.div)`
  position: relative;
`;

const CardInner = styled.div`
  position: relative;
  background: #fcfaf6;
  border: 1px solid rgba(167, 107, 83, 0.22);
  border-radius: 4px;
  padding: 1.8rem 1.4rem;
  box-shadow: 0 10px 30px rgba(167, 107, 83, 0.04);
  overflow: hidden;
  height: 100%;
`;

const QuoteIcon = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  color: rgba(167, 107, 83, 0.08);

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const Avatar = styled(motion.div)`
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #a76b53;
  margin-bottom: 1rem;
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
  margin-bottom: 0.85rem;
`;

const StarIcon = styled(motion.div)`
  color: #a76b53;

  svg {
    width: 0.95rem;
    height: 0.95rem;
  }
`;

const ReviewText = styled.p`
  margin: 0 0 1rem;
  color: #5c5957;
  font-size: 0.9rem;
  line-height: 1.65;
`;

const Author = styled.div``;

const Name = styled.p`
  margin: 0;
  font-weight: 700;
  color: #2c2a29;
`;

const Role = styled.p`
  margin: 0.15rem 0 0;
  font-size: 0.78rem;
  color: #8c8885;
`;

const Highlight = styled(motion.span)`
  color: #a76b53;
  font-weight: 700;
  border-radius: 2px;
  padding: 0 0.2rem;
`;

const Footer = styled(motion.div)`
  text-align: center;
  margin-top: 3.5rem;
`;

const Button = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  border: 1px solid rgba(167, 107, 83, 0.35);
  cursor: pointer;
  padding: 0.95rem 2.2rem;
  border-radius: 4px;
  color: #a76b53;
  font-weight: 600;
  background: transparent;
  transition: all 0.3s ease;

  &:hover {
    background: #a76b53;
    color: white;
  }
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
        animate={inView ? { backgroundColor: 'rgba(167, 107, 83, 0.08)' } : {}}
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
          style={{ left: '-140px', top: '-160px', background: 'rgba(217, 160, 128, 0.2)' }}
          animate={{ y: [0, 18, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <Blob
          style={{ right: '-160px', bottom: '-180px', background: 'rgba(232, 196, 176, 0.18)' }}
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
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.2 + index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{
                y: -6,
              }}
            >
              <CardInner>
                <QuoteIcon>
                  <Quote />
                </QuoteIcon>

                <Avatar>
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
            <Button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              Explore More Reviews
              <ArrowWrap
                animate={{ x: [0, 4, 0] }}
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

