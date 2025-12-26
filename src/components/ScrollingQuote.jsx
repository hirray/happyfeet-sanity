import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styled from 'styled-components';

const Section = styled.section`
  position: relative;
  padding: 8rem 0;
  overflow: hidden;
`;

const Background = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(249, 115, 22, 0.08) 0%,
    rgba(255, 255, 255, 0) 35%,
    rgba(236, 72, 153, 0.08) 100%
  );
  pointer-events: none;
`;

const Row = styled(motion.div)`
  display: flex;
  white-space: nowrap;
  align-items: center;
`;

const BigText = styled.span`
  display: inline-block;
  font-size: clamp(3.2rem, 5.4vw, 6.6rem);
  font-weight: 950;
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0 1rem;
  background: linear-gradient(90deg, #f97316, #ec4899, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const SmallText = styled.span`
  display: inline-block;
  font-size: clamp(2rem, 3.6vw, 4rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 1rem;
  color: rgba(17, 24, 39, 0.22);
`;

const Spark = styled(motion.span)`
  display: inline-block;
  font-size: clamp(1.9rem, 3vw, 3.2rem);
  margin-left: 0.5rem;
  margin-right: 0.5rem;
`;

const Item = styled.div`
  display: inline-flex;
  align-items: center;
`;

export const ScrollingQuote = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['100%', '-100%']);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  const x2 = useTransform(scrollYProgress, [0, 1], ['-50%', '50%']);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  const quote =
    'Creating moments that last forever • Turning dreams into reality • Every event is a masterpiece •';

  return (
    <Section ref={containerRef}>
      <Background />

      <Row style={{ x, rotate }}>
        {[...Array(3)].map((_, index) => (
          <Item key={index}>
            <BigText>{quote}</BigText>
            <Spark
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            >
              ✨
            </Spark>
          </Item>
        ))}
      </Row>

      <Row style={{ x: x2, rotate: rotate2 }}>
        {[...Array(3)].map((_, index) => (
          <Item key={index}>
            <SmallText>
              Making every celebration special • Your vision, our expertise • Where magic happens •
            </SmallText>
            <Spark
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              🎉
            </Spark>
          </Item>
        ))}
      </Row>
    </Section>
  );
};

export default ScrollingQuote;
