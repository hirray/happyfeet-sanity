// src/components/AnimatedBackground.jsx
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import '../styles/AnimatedBackground.css';

// Match the FloatingParticles color palette
const colors = [
  'hsl(16, 100%, 60%)', // coral
  'hsl(174, 72%, 45%)', // teal
  'hsl(45, 100%, 55%)', // gold
  'hsl(340, 80%, 65%)', // pink
  'hsl(280, 70%, 60%)', // purple
];

const AnimatedBackground = () => {
  const [shapes, setShapes] = useState([]);

  // Same shape set as the provided design
  const types = useMemo(() => ['circle', 'square', 'triangle', 'star'], []);

  useEffect(() => {
    const newShapes = [];
    for (let i = 0; i < 25; i++) {
      newShapes.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10, // 10–30px, like FloatingParticles
        color: colors[Math.floor(Math.random() * colors.length)],
        type: types[Math.floor(Math.random() * types.length)],
        delay: Math.random() * 5,
        duration: Math.random() * 15 + 10, // 10–25s
        drift: Math.random() * 50 - 25,
      });
    }
    setShapes(newShapes);
  }, [types]);

  const renderShape = (shape) => {
    const baseStyle = {
      width: shape.size,
      height: shape.size,
      backgroundColor: shape.type !== 'star' ? shape.color : 'transparent',
    };

    switch (shape.type) {
      case 'circle':
        return <div className="ab-shape ab-shape--solid" style={{ ...baseStyle, borderRadius: '50%' }} />;
      case 'square':
        return (
          <div
            className="ab-shape ab-shape--solid"
            style={{
              ...baseStyle,
              borderRadius: '8px',
              transform: 'rotate(45deg)',
            }}
          />
        );
      case 'triangle':
        return (
          <div
            className="ab-shape"
            style={{
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
          />
        );
      case 'star':
        return (
          <svg
            className="ab-shape"
            width={shape.size}
            height={shape.size}
            viewBox="0 0 24 24"
            fill={shape.color}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animated-background-v2" aria-hidden="true">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="ab-item"
          style={{ left: `${shape.x}%`, top: `${shape.y}%` }}
          animate={{
            y: [0, -100, 0],
            x: [0, shape.drift, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          {renderShape(shape)}
        </motion.div>
      ))}
    </div>
  );
};

export default AnimatedBackground;