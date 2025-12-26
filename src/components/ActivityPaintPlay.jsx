import { motion } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import PaintCanvas from './PaintCanvas';
import PaintPalette from './PaintPalette';
import '../styles/ActivityPaint.css';

const SPLAT_COLORS = [
  'hsla(351, 83%, 61%, 0.20)',
  'hsla(174, 62%, 47%, 0.20)',
  'hsla(45, 93%, 58%, 0.18)',
  'hsla(330, 81%, 70%, 0.18)',
  'hsla(270, 60%, 65%, 0.18)',
];

const ActivityPaintPlay = () => {
  const [activeColor, setActiveColor] = useState('#e91e63');
  const [brushSize, setBrushSize] = useState(5);
  const canvasApiRef = useRef(null);

  const splats = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 140 + Math.random() * 220,
        color: SPLAT_COLORS[i % SPLAT_COLORS.length],
        rotate: Math.random() * 360,
        delay: Math.random() * 0.6,
        driftX: Math.random() * 50 - 25,
        driftY: Math.random() * 50 - 25,
      })),
    []
  );

  const onClear = () => {
    canvasApiRef.current?.clear?.();
  };

  return (
    <section className="paint-play" aria-label="Interactive paint play">
      <div className="paint-play__wrap">
        <div className="paint-play__backdrop">
          {splats.map((s) => (
            <motion.div
              key={s.id}
              className="paint-play__splat"
              style={{
                left: s.left,
                top: s.top,
                width: `${s.size}px`,
                height: `${s.size}px`,
                background: s.color,
                transform: `rotate(${s.rotate}deg)`,
              }}
              animate={{
                x: [0, s.driftX, 0],
                y: [0, s.driftY, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 7 + Math.random() * 5,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: s.delay,
              }}
            />
          ))}
        </div>

        <div className="paint-play__header">
          <h2 className="paint-play__title">Paint Something Magical</h2>
          <p className="paint-play__subtitle">
            Pick a color, change brush size, and draw freely. Make it dramatic.
          </p>
        </div>

        <div className="paint-play__grid">
          <div className="paint-play__canvas">
            <PaintCanvas
              ref={canvasApiRef}
              activeColor={activeColor}
              brushSize={brushSize}
              width={400}
              height={250}
            />
          </div>
          <div className="paint-play__palette">
            <PaintPalette
              activeColor={activeColor}
              onColorChange={setActiveColor}
              brushSize={brushSize}
              onBrushSizeChange={setBrushSize}
              onClear={onClear}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivityPaintPlay;
