import { useMemo, useRef, useState, useEffect } from 'react';
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import '../styles/PhotoGallery.css';
import { fetchHappyMoments } from '../lib/sanity';

const photos = [
  {
    id: 1,
    url: '/activity1.jpg',
    alt: 'Kids painting',
  },
  {
    id: 2,
    url: '/actvity2.jpg',
    alt: 'Art activity',
  },
  {
    id: 3,
    url: '/activity3.jpg',
    alt: 'Creative workshop',
  },
  {
    id: 4,
    url: '/activity4.jpg',
    alt: 'Painting session',
  },
  {
    id: 5,
    url: '/activity5.jpg',
    alt: 'Kids crafting',
  },
  {
    id: 6,
    url: '/activity6.jpg',
    alt: 'Creative play',
  },
  {
    id: 7,
    url: '/activity7.jpg',
    alt: 'Art class',
  },
  {
    id: 8,
    url: '/activity8.jpeg',
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

  const [currentPhotos, setCurrentPhotos] = useState(photos);

  useEffect(() => {
    let active = true;
    fetchHappyMoments().then(res => {
      if (res && active) setCurrentPhotos(res);
    });
    return () => { active = false; };
  }, []);

  const row1 = useMemo(() => [...currentPhotos, ...currentPhotos], [currentPhotos]);
  const row2 = useMemo(() => [...currentPhotos.slice(4), ...currentPhotos.slice(0, 4), ...currentPhotos], [currentPhotos]);

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
