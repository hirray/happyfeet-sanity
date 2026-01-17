import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import '../styles/FloatingNavbar.css';

const FloatingNavbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const leftItems = [
    { label: 'Home', to: '/' },
    { label: 'Book Event', to: '/book-event' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Testimonial', to: '/testimonial' },
  ];

  const rightItems = [
    { label: 'Games', to: '/games' },
    { label: 'Activity', to: '/activity' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/about#contact-section' },
  ];

  const allItems = useMemo(() => [...leftItems, ...rightItems], [leftItems, rightItems]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        className="floating-navbar"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="floating-navbar__inner"
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="floating-navbar__side">
            {leftItems.map((item) => (
              <motion.div
                key={item.to}
                className="floating-navbar__itemWrap"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'floating-navbar__item floating-navbar__item--active'
                      : 'floating-navbar__item'
                  }
                >
                  <span className="floating-navbar__label">{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </div>

          <div className="floating-navbar__logo">
            <NavLink to="/kits" className="floating-navbar__logoLink">
              <span className="floating-navbar__logoText">Kits</span>
            </NavLink>
          </div>

          <div className="floating-navbar__side">
            {rightItems.map((item) => (
              <motion.div
                key={item.to}
                className="floating-navbar__itemWrap"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    isActive
                      ? 'floating-navbar__item floating-navbar__item--active'
                      : 'floating-navbar__item'
                  }
                >
                  <span className="floating-navbar__label">{item.label}</span>
                </NavLink>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.nav>

      <motion.button
        type="button"
        className="floating-navbarMobile__toggle"
        aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        onClick={() => setMobileOpen((v) => !v)}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.98 }}
      >
        <span className="floating-navbarMobile__toggleGlow" aria-hidden="true" />
        {mobileOpen ? <X /> : <Menu />}
      </motion.button>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="floating-navbarMobile__overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              className="floating-navbarMobile__panel"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="floating-navbarMobile__header">
                <div className="floating-navbarMobile__title">Menu</div>
                <button
                  type="button"
                  className="floating-navbarMobile__close"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                >
                  <X />
                </button>
              </div>

              <div className="floating-navbarMobile__links">
                {allItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? 'floating-navbarMobile__link floating-navbarMobile__link--active'
                        : 'floating-navbarMobile__link'
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </div>

              <NavLink
                to="/kits"
                onClick={() => setMobileOpen(false)}
                className="floating-navbarMobile__kits"
              >
                Kits
              </NavLink>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
};

export default FloatingNavbar;
