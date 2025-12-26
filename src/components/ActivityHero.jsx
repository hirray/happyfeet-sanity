import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import { Sparkles, Star, Heart, PartyPopper } from 'lucide-react';
import '../styles/ActivityHero.css';

const ActivityHero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const floatingIcons = useMemo(
    () => [
      { Icon: Star, color: 'hsl(45, 93%, 58%)', x: '10%', y: '20%', delay: 0 },
      { Icon: Heart, color: 'hsl(351, 83%, 61%)', x: '85%', y: '30%', delay: 0.2 },
      { Icon: Sparkles, color: 'hsl(270, 60%, 65%)', x: '15%', y: '70%', delay: 0.4 },
      { Icon: PartyPopper, color: 'hsl(174, 62%, 47%)', x: '80%', y: '65%', delay: 0.6 },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { value: '500+', label: 'Happy Events', emoji: '🎉' },
      { value: '10K+', label: 'Smiling Kids', emoji: '😊' },
      { value: '20+', label: 'Fun Activities', emoji: '🎨' },
    ],
    []
  );

  return (
    <section ref={ref} className="activity-hero" aria-label="Activity hero">
      <motion.div style={{ y, opacity }} className="activity-hero__container">
        <div className="activity-hero__inner">
          {floatingIcons.map(({ Icon, color, x: left, y: top, delay }, index) => (
            <motion.div
              key={index}
              className="activity-hero__floating-icon"
              style={{ left, top }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: [0, -15, 0], rotate: [0, 10, -10, 0] }}
              transition={{
                delay,
                y: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                rotate: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
              }}
            >
              <Icon className="activity-hero__floating-icon-svg" style={{ color }} />
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="activity-hero__badge"
          >
            <motion.span
              className="activity-hero__badge-star"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              ⭐
            </motion.span>
            <span className="activity-hero__badge-text">Creating Magical Memories</span>
          </motion.div>

          <motion.h1
            className="activity-hero__title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="activity-hero__title-gradient">Where Kids</span>
            <br />
            <motion.span
              className="activity-hero__title-line2"
              animate={{ rotate: [0, 2, -2, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Create & Play
            </motion.span>
          </motion.h1>

          <motion.p
            className="activity-hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Fun-filled activities, creative workshops, and unforgettable events that bring smiles to every
            little face! 🎨
          </motion.p>

          <motion.div
            className="activity-hero__cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <motion.button
              type="button"
              className="activity-hero__btn activity-hero__btn--primary"
              whileHover={{ scale: 1.05, boxShadow: '0 20px 60px -15px hsl(351 83% 61% / 0.5)' }}
              whileTap={{ scale: 0.95 }}
            >
              <PartyPopper className="activity-hero__btn-icon" />
              Book an Event
            </motion.button>

            <motion.button
              type="button"
              className="activity-hero__btn activity-hero__btn--secondary"
              whileHover={{ scale: 1.05, borderColor: 'hsl(351, 83%, 61%)' }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="activity-hero__btn-icon activity-hero__btn-icon--sunny" />
              Explore Activities
            </motion.button>
          </motion.div>

          <motion.div
            className="activity-hero__stats"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="activity-hero__stat"
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <motion.span
                  className="activity-hero__stat-emoji"
                  animate={{ y: [0, -5, 0], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.emoji}
                </motion.span>
                <p className="activity-hero__stat-value">{stat.value}</p>
                <p className="activity-hero__stat-label">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="activity-hero__scroll"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="activity-hero__scroll-shell"
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="activity-hero__scroll-dot"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ActivityHero;
