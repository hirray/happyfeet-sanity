import { useMemo } from 'react';
import { motion } from 'framer-motion';
import '../styles/BackgroundAnimation.css';

const DOT_COLORS = [
  'hsl(351, 83%, 61%)',
  'hsl(174, 62%, 47%)',
  'hsl(45, 93%, 58%)',
  'hsl(330, 81%, 70%)',
  'hsl(270, 60%, 65%)',
];

const BackgroundAnimation = () => {
  const dots = useMemo(
    () =>
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        color: DOT_COLORS[i % DOT_COLORS.length],
        xDrift: Math.random() * 20 - 10,
        duration: 4 + Math.random() * 4,
        delay: Math.random() * 2,
      })),
    []
  );

  return (
    <div className="bg-animation" aria-hidden="true">
      <motion.div
        className="bg-blob bg-blob--coral bg-blob--1"
        animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="bg-blob bg-blob--turquoise bg-blob--2"
        animate={{ x: [0, -80, 0], y: [0, 100, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="bg-blob bg-blob--sunny bg-blob--3"
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="bg-blob bg-blob--pink bg-blob--4"
        animate={{ x: [0, 40, 0], y: [0, -60, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="bg-blob bg-blob--purple bg-blob--5"
        animate={{ x: [0, -50, 0], y: [0, 30, 0], scale: [1, 0.85, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="bg-dot"
          style={{ left: dot.left, top: dot.top, backgroundColor: dot.color }}
          animate={{ y: [0, -30, 0], x: [0, dot.xDrift, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="bg-dots" />
    </div>
  );
};

export default BackgroundAnimation;
