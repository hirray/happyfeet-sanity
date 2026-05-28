import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Sparkles } from 'lucide-react';
import '../styles/ActivityCards.css';
import { fetchActivities } from '../lib/sanity';

const activities = [
  {
    id: 1,
    title: 'Slime Making',
    description: 'Create colorful, stretchy slime with glitter!',
    color: 'hsl(330, 81%, 70%)',
    emoji: '🫧',
    videoUrl: 'https://www.youtube.com/embed/NjaFDWOkNEo',
    ingredients: ['Glue', 'Baking Soda', 'Food coloring', 'Glitter', 'Water'],
    duration: '15-20 min',
  },
  {
    id: 2,
    title: 'Canvas Painting',
    description: 'Express creativity on canvas with acrylics',
    color: 'hsl(174, 62%, 47%)',
    emoji: '🎨',
    videoUrl: 'https://www.youtube.com/embed/ek1UR4ybizE',
    ingredients: ['Canvas', 'Acrylic paints', 'Brushes', 'Palette', 'Water cup'],
    duration: '20-30 min',
  },
  {
    id: 3,
    title: 'Glass Painting',
    description: 'Decorate glass with vibrant designs',
    color: 'hsl(45, 93%, 58%)',
    emoji: '✨',
    videoUrl: 'https://www.youtube.com/embed/fcI_LRoxBew',
    ingredients: ['Glass jar/frame', 'Glass paints', 'Outliner', 'Brushes'],
    duration: '25-35 min',
  },
  {
    id: 4,
    title: 'Paper Origami',
    description: 'Create beautiful paper art through folding',
    color: 'hsl(351, 83%, 61%)',
    emoji: '🪴',
    videoUrl: 'https://www.youtube.com/embed/0-XZfKWRq3E',
    ingredients: ['Origami paper', 'Scissors', 'Ruler', 'Pencil'],
    duration: '20-25 min',
  },
  {
    id: 5,
    title: 'Tie-Dye Magic',
    description: 'Create psychedelic patterns on fabric',
    color: 'hsl(270, 60%, 65%)',
    emoji: '🌈',
    videoUrl: 'https://www.youtube.com/embed/KIHO3R3unAc',
    ingredients: ['White t-shirt', 'Tie-dye kit', 'Rubber bands', 'Gloves'],
    duration: '15-20 min',
  },
  {
    id: 6,
    title: 'Sushi Making',
    description: 'Learn to make delicious sushi rolls at home',
    color: 'hsl(160, 50%, 75%)',
    emoji: '🍣',
    videoUrl: 'https://www.youtube.com/embed/CgSiJeltN0U',
    ingredients: ['Sushi rice', 'Nori sheets', 'Fresh fish/vegetables', 'Rice vinegar'],
    duration: '15-20 min',
  },
  {
    id: 7,
    title: 'Texture Art',
    description: 'Create stunning textured art with various materials',
    color: 'hsl(20, 90%, 75%)',
    emoji: '�',
    videoUrl: 'https://www.youtube.com/embed/cjE252nUYUk',
    ingredients: ['Textured paste', 'Canvas', 'Palette knives', 'Acrylic paints'],
    duration: '10-15 min',
  },
  {
    id: 8,
    title: 'Paper Quilling',
    description: 'Roll paper strips into intricate designs',
    color: 'hsl(260, 60%, 80%)',
    emoji: '📜',
    videoUrl: 'https://www.youtube.com/embed/QDPpq0kr77g',
    ingredients: ['Quilling strips', 'Quilling tool', 'Glue', 'Cardstock'],
    duration: '20-30 min',
  },
  {
    id: 9,
    title: 'Block Printing',
    description: 'Create beautiful patterns with block printing techniques',
    color: 'hsl(351, 83%, 61%)',
    emoji: '🎨',
    videoUrl: 'https://www.youtube.com/embed/mur34ULy678',
    ingredients: ['Carving blocks', 'Linoleum cutters', 'Fabric/paper', 'Ink'],
    duration: '30-40 min',
  },
  {
    id: 10,
    title: 'DIY Dream Catcher',
    description: 'Create beautiful dream catchers with beads and feathers',
    color: 'hsl(174, 62%, 47%)',
    emoji: '🌙',
    videoUrl: 'https://www.youtube.com/embed/U3yRvtEXCbU',
    ingredients: ['Embroidery hoop', 'Yarn/string', 'Beads', 'Feathers', 'Scissors'],
    duration: '20-25 min',
  },
];

const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

const getQuadraticAt = (p0, c, p1, t) => {
  const u = 1 - t;
  return {
    x: u * u * p0.x + 2 * u * t * c.x + t * t * p1.x,
    y: u * u * p0.y + 2 * u * t * c.y + t * t * p1.y,
  };
};

const getQuadraticTangent = (p0, c, p1, t) => {
  return {
    x: 2 * (1 - t) * (c.x - p0.x) + 2 * t * (p1.x - c.x),
    y: 2 * (1 - t) * (c.y - p0.y) + 2 * t * (p1.y - c.y),
  };
};

const ConnectorLayer = ({ containerRef, points }) => {
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const r = el.getBoundingClientRect();
      setSize({ w: r.width, h: r.height });
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener('resize', update);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
    };
  }, [containerRef]);

  return (
    <svg className="ac-connector-layer" width="100%" height="100%" viewBox={`0 0 ${size.w} ${size.h}`} aria-hidden="true">
      {points.map((seg) => {
        const p0 = seg.from;
        const p1 = seg.to;

        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;

        const bend = clamp(Math.abs(dx) * 0.45 + 70, 90, 180);
        const cx = (p0.x + p1.x) / 2 + (dx >= 0 ? -bend : bend);
        const cy = (p0.y + p1.y) / 2;
        const c = { x: cx, y: cy };

        const dA = `M ${p0.x} ${p0.y} Q ${c.x} ${c.y} ${p1.x} ${p1.y}`;
        const dB = `M ${p0.x} ${p0.y} Q ${c.x} ${c.y + (dx >= 0 ? 18 : -18)} ${p1.x} ${p1.y}`;

        const mid = getQuadraticAt(p0, c, p1, 0.5);
        const tan = getQuadraticTangent(p0, c, p1, 0.5);
        const ang = (Math.atan2(tan.y, tan.x) * 180) / Math.PI;

        return (
          <g key={seg.id}>
            <motion.path
              d={dA}
              stroke={seg.color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray="10 12"
              fill="none"
              animate={{ d: [dA, dB, dA], strokeDashoffset: [0, -40, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
              opacity={0.95}
            />

            <motion.g
              style={{ transformOrigin: `${mid.x}px ${mid.y}px` }}
              animate={{ rotate: [ang - 1, ang + 1, ang - 1], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <g transform={`translate(${mid.x} ${mid.y}) rotate(${ang})`}>
                <path d="M0,-6 L10,0 L0,6 Z" fill={seg.color} opacity="0.95" />
              </g>
            </motion.g>
          </g>
        );
      })}
    </svg>
  );
};

const ActivityCard = ({ activity, index, onClick, bubbleRef }) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      className="ac-row"
      initial={{ opacity: 0, x: isLeft ? -120 : 120, rotate: isLeft ? -2 : 2 }}
      whileInView={{ opacity: 1, x: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 0.75, delay: index * 0.06, type: 'spring', stiffness: 120, damping: 14 }}
    >
      <motion.div className={`ac-line ${isLeft ? 'is-left' : 'is-right'}`} whileHover={{ scale: 1.01 }}>
        <motion.button
          type="button"
          onClick={onClick}
          className="ac-bubble"
          style={{ backgroundColor: activity.color }}
          ref={bubbleRef}
          whileHover={{ rotate: [0, -6, 6, 0] }}
          transition={{ duration: 0.55 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className="ac-emoji"
            animate={{ y: [0, -7, 0], rotate: [0, 6, -6, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {activity.emoji}
          </motion.span>

          <div className="ac-hover">
            <div className="ac-hover__inner">
              <Play className="ac-hover__icon" />
              <div className="ac-hover__text">Click to view</div>
            </div>
          </div>

          <motion.div
            className="ac-spark"
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Sparkles className="ac-spark__icon" />
          </motion.div>

          <div className="ac-glow" aria-hidden="true" />
        </motion.button>

        <div className={`ac-text ${isLeft ? 'is-left' : 'is-right'}`}>
          <motion.h3 className="ac-title" style={{ color: activity.color }} whileHover={{ scale: 1.03 }}>
            {activity.title}
          </motion.h3>
          <div className="ac-desc">{activity.description}</div>
          <div className="ac-duration">⏱️ {activity.duration}</div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ActivityModal = ({ activity, onClose }) => {
  return (
    <motion.div className="ac-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.button
        type="button"
        className="ac-modal__backdrop"
        onClick={onClose}
        aria-label="Close"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="ac-modal__panel"
        initial={{ scale: 0.86, rotate: -6, y: 20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, y: 0, opacity: 1 }}
        exit={{ scale: 0.86, rotate: 6, y: 20, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 18 }}
      >
        <div className="ac-modal__header" style={{ backgroundColor: activity.color }}>
          <button type="button" onClick={onClose} className="ac-modal__close" aria-label="Close modal">
            <X className="ac-modal__close-icon" />
          </button>

          <motion.div
            className="ac-modal__emoji"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {activity.emoji}
          </motion.div>

          <div className="ac-modal__title">{activity.title}</div>
          <div className="ac-modal__subtitle">{activity.description}</div>
        </div>

        <div className="ac-modal__body">
          <div className="ac-video">
            <iframe
              src={activity.videoUrl}
              title={activity.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="ac-section">
            <div className="ac-section__title">
              <span className="ac-section__emoji">🧪</span>
              Ingredients Needed
            </div>
            <div className="ac-chips">
              {activity.ingredients.map((ingredient, index) => (
                <motion.span
                  key={ingredient}
                  className="ac-chip"
                  style={{ backgroundColor: `${activity.color}22`, color: activity.color }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.08 * index }}
                  whileHover={{ scale: 1.08 }}
                >
                  {ingredient}
                </motion.span>
              ))}
            </div>
          </div>

          <div className="ac-duration-row">
            <span className="ac-duration-row__emoji">⏱️</span>
            <span className="ac-duration-row__text">Duration: {activity.duration}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ActivityCards = () => {
  const [currentActivities, setCurrentActivities] = useState(activities);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    let active = true;
    fetchActivities().then(res => {
      if (res && active) setCurrentActivities(res);
    });
    return () => { active = false; };
  }, []);

  const containerRef = useRef(null);
  const bubbleRefs = useRef([]);
  const [connectorPoints, setConnectorPoints] = useState([]);

  const measure = useCallback(() => {
    const containerEl = containerRef.current;
    if (!containerEl) return;
    const cr = containerEl.getBoundingClientRect();

    const centers = bubbleRefs.current
      .map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          x: r.left - cr.left + r.width / 2,
          y: r.top - cr.top + r.height / 2,
        };
      })
      .filter(Boolean);

    const segs = [];
    for (let i = 0; i < centers.length - 1; i++) {
      segs.push({
        id: `c-${i}`,
        from: centers[i],
        to: centers[i + 1],
        color: currentActivities[i]?.color || '#ccc',
      });
    }
    setConnectorPoints(segs);
  }, [currentActivities]);

  useEffect(() => {
    const raf = requestAnimationFrame(measure);

    const onAnyScroll = () => measure();
    window.addEventListener('scroll', onAnyScroll, true);
    window.addEventListener('resize', onAnyScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onAnyScroll, true);
      window.removeEventListener('resize', onAnyScroll);
    };
  }, [measure]);

  return (
    <section className="ac-section-wrap" aria-label="Activities">
      <motion.h2
        className="ac-heading"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Our Amazing Activities 🎉
      </motion.h2>

      <motion.p
        className="ac-subheading"
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
      >
        Click on any activity to learn more and see how it&apos;s done!
      </motion.p>

      <div className="ac-container" ref={containerRef}>
        <div className="ac-bg" aria-hidden="true">
          <motion.div
            className="ac-bg__blob ac-bg__blob--1"
            animate={{ y: [0, -18, 0], x: [0, 12, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="ac-bg__blob ac-bg__blob--2"
            animate={{ y: [0, 16, 0], x: [0, -10, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="ac-bg__blob ac-bg__blob--3"
            animate={{ y: [0, -22, 0], x: [0, -14, 0], scale: [1, 1.06, 1] }}
            transition={{ duration: 9.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        <div className="ac-connectors" aria-hidden="true">
          <ConnectorLayer containerRef={containerRef} points={connectorPoints} />
        </div>

        <div className="ac-stack">
          {currentActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              index={index}
              bubbleRef={(el) => {
                bubbleRefs.current[index] = el;
              }}
              onClick={() => setSelectedActivity(activity)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedActivity && (
          <ActivityModal activity={selectedActivity} onClose={() => setSelectedActivity(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ActivityCards;
