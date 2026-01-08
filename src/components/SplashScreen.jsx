import { motion } from 'framer-motion';
import '../styles/SplashScreen.css';

const SplashScreen = () => {
  const root = {
    initial: {
      opacity: 0,
      scale: 1.04,
      filter: 'blur(10px)',
      clipPath: 'circle(0% at 50% 52%)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      clipPath: 'circle(150% at 50% 52%)',
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      filter: 'blur(12px)',
      clipPath: 'circle(0% at 50% 52%)',
      transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const content = {
    initial: { y: 26, opacity: 0 },
    animate: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
    },
    exit: {
      y: -18,
      opacity: 0,
      transition: { duration: 0.5, ease: 'easeInOut' },
    },
  };

  return (
    <motion.div
      className="splash"
      variants={root}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="splash__back"
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.06, opacity: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      <div className="splash__blobs" aria-hidden="true">
        <motion.div
          className="splash__blob splash__blob--a"
          animate={{
            x: ['-6%', '6%', '-6%'],
            y: ['-4%', '4%', '-4%'],
            rotate: [0, 18, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{ duration: 8.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="splash__blob splash__blob--b"
          animate={{
            x: ['6%', '-8%', '6%'],
            y: ['4%', '-6%', '4%'],
            rotate: [0, -16, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 9.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="splash__blob splash__blob--c"
          animate={{
            x: ['0%', '10%', '0%'],
            y: ['10%', '0%', '10%'],
            rotate: [0, 12, 0],
            scale: [1, 1.06, 1],
          }}
          transition={{ duration: 10.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="splash__sparks" aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <motion.span
            key={i}
            className="splash__spark"
            style={{
              left: `${(i * 7 + 12) % 96}%`,
              top: `${(i * 11 + 8) % 92}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>

      <motion.div
        className="splash__ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        aria-hidden="true"
      />

      <motion.div
        className="splash__content"
        variants={content}
      >
        <motion.div
          className="splash__logoWrap"
          initial={{ scale: 0.86, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0.92, rotate: 6, opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <img className="splash__logo" src="/logo.jpg" alt="Happyfeet" />
          <motion.div
            className="splash__logoGlow"
            animate={{ opacity: [0.35, 0.6, 0.35], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          />
        </motion.div>

        <motion.h1
          className="splash__title"
          initial={{ letterSpacing: '0.12em', opacity: 0 }}
          animate={{ letterSpacing: '0.02em', opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          Happy Feet
        </motion.h1>

        <motion.p
          className="splash__tag"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
        >
          Creating magical moments
        </motion.p>

        <motion.div
          className="splash__loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          aria-label="Loading"
        >
          <span className="splash__dot" />
          <span className="splash__dot splash__dot--d2" />
          <span className="splash__dot splash__dot--d3" />
        </motion.div>
      </motion.div>

      <motion.div
        className="splash__sweep"
        aria-hidden="true"
        animate={{ x: ['-60%', '160%'] }}
        transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.4, ease: 'easeInOut' }}
      />

      <motion.div
        className="splash__wipe"
        aria-hidden="true"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }}
      />
    </motion.div>
  );
};

export default SplashScreen;
