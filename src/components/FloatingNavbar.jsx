import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/FloatingNavbar.css';

const FloatingNavbar = () => {
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

  return (
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
          <NavLink to="/" className="floating-navbar__logoLink">
            <span className="floating-navbar__logoText">Happyfeet</span>
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
  );
};

export default FloatingNavbar;
