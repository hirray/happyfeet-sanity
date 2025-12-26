import { useMemo, useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import '../styles/PhotoGallery.css';

const photos = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&h=800&fit=crop',
    alt: 'Kids painting',
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800&h=800&fit=crop',
    alt: 'Art activity',
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1560421683-6856ea585c78?w=800&h=800&fit=crop',
    alt: 'Creative workshop',
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&h=800&fit=crop',
    alt: 'Painting session',
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1499892477393-f675706cbe6e?w=800&h=800&fit=crop',
    alt: 'Kids crafting',
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?w=800&h=800&fit=crop',
    alt: 'Creative play',
  },
  {
    id: 7,
    url: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=800&fit=crop',
    alt: 'Art class',
  },
  {
    id: 8,
    url: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=800&h=800&fit=crop',
    alt: 'Fun activities',
  },
];

const stickerForRow = (row) => (row === 1 ? '⭐' : '❤');

const PhotoCard = ({ photo, row, hoveredId, setHoveredId, uniqueId }) => {
  const ref = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const rX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const rY = useTransform(mx, [-0.5, 0.5], [-12, 12]);

  const springRX = useSpring(rX, { stiffness: 180, damping: 20 });
  const springRY = useSpring(rY, { stiffness: 180, damping: 20 });

  const onMove = (e) => {
    const el = ref.current;
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
    setHoveredId(null);
  };

  const isActive = hoveredId === uniqueId;

  return (
    <motion.div
      ref={ref}
      className="pg-card"
      onMouseMove={onMove}
      onMouseEnter={() => setHoveredId(uniqueId)}
      onMouseLeave={onLeave}
      style={{ rotateX: springRX, rotateY: springRY }}
      whileHover={{ scale: 1.06, rotateZ: row === 1 ? 1.5 : -1.5 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <img src={photo.url} alt={photo.alt} className="pg-img" loading="lazy" />

      <motion.div
        className="pg-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.25 }}
      >
        <p className="pg-caption">{photo.alt}</p>
      </motion.div>

      <motion.div
        className={`pg-badge ${row === 1 ? 'pg-badge--sunny' : 'pg-badge--coral'}`}
        animate={
          isActive
            ? { scale: [1, 1.15, 1], rotate: row === 1 ? 360 : -360 }
            : { scale: 1, rotate: 0 }
        }
        transition={{ duration: 0.55 }}
      >
        <span className="pg-badge__emoji">{stickerForRow(row)}</span>
      </motion.div>

      <div className="pg-glow" aria-hidden="true" />
      <div className="pg-sparkles" aria-hidden="true" />
    </motion.div>
  );
};

const PhotoGallery = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const row1X = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const row2X = useTransform(scrollYProgress, [0, 1], [-260, 0]);

  const springX1 = useSpring(row1X, { stiffness: 110, damping: 28 });
  const springX2 = useSpring(row2X, { stiffness: 110, damping: 28 });

  const row1 = useMemo(() => [...photos, ...photos], []);
  const row2 = useMemo(() => [...photos.slice(4), ...photos.slice(0, 4), ...photos], []);

  const [hoveredId, setHoveredId] = useState(null);

  return (
    <section ref={containerRef} className="pg-section" aria-label="Happy moments gallery">
      <motion.h2
        className="pg-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Happy Moments ✨
      </motion.h2>

      <div className="pg-rows">
        <motion.div style={{ x: springX1 }} className="pg-row">
          {row1.map((photo, index) => (
            <PhotoCard
              key={`row1-${photo.id}-${index}`}
              photo={photo}
              row={1}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              uniqueId={`r1-${photo.id}-${index}`}
            />
          ))}
        </motion.div>

        <motion.div style={{ x: springX2 }} className="pg-row">
          {row2.map((photo, index) => (
            <PhotoCard
              key={`row2-${photo.id}-${index}`}
              photo={photo}
              row={2}
              hoveredId={hoveredId}
              setHoveredId={setHoveredId}
              uniqueId={`r2-${photo.id}-${index}`}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PhotoGallery;
