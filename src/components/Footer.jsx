import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import '../styles/Footer.css';

const IconInstagram = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <path d="M16 11.37a4 4 0 1 1-7.27 2.38 4 4 0 0 1 7.27-2.38" />
    <path d="M17.5 6.5h.01" />
  </svg>
);

const IconFacebook = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
  </svg>
);

const IconYoutube = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 2C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58Z" />
    <path d="m10 15 5-3-5-3v6Z" />
  </svg>
);

const IconLinkedIn = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const IconPhone = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.86.31 1.7.57 2.5a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.58-1.09a2 2 0 0 1 2.11-.45c.8.26 1.64.45 2.5.57A2 2 0 0 1 22 16.92Z" />
  </svg>
);

const IconMail = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m4 4 16 0 0 16-16 0z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const IconMapPin = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const IconHeart = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21s-7-4.44-10-9a6 6 0 0 1 10-6 6 6 0 0 1 10 6c-3 4.56-10 9-10 9Z" />
  </svg>
);

const IconSparkles = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 3l1.5 4.5L15 9l-4.5 1.5L9 15l-1.5-4.5L3 9l4.5-1.5L9 3Z" />
    <path d="M19 11l.9 2.7L23 15l-3.1 1.3L19 19l-.9-2.7L15 15l3.1-1.3L19 11Z" />
  </svg>
);

const socialLinks = [
  { icon: IconInstagram, href: 'https://www.instagram.com/happyfeet_activityclub?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==', color: '#ff4d6d' },
  { icon: IconFacebook, href: 'https://facebook.com/happyfeet', color: '#3b82f6' },
  { icon: IconYoutube, href: 'https://youtube.com/happyfeet', color: '#ff922b' },
  { icon: IconLinkedIn, href: 'https://linkedin.com/company/happyfeet', color: '#22b8cf' },
];

const footerLinks = [
  { name: 'Home', path: '/' },
  { name: 'Book Event', path: '/book-event' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Testimonial', path: '/testimonial' },
  { name: 'Games', path: '/games' },
  { name: 'Activity', path: '/activity' },
  { name: 'Kits', path: '/kits' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact', path: '/about#contact-section' },
];

const Footer = () => {
  return (
    <footer className="animated-footer">
      {/* Background Floating Circles */}
      <motion.div
        className="animated-footer__floating-circle"
        style={{ top: '10%', left: '8%', width: 90, height: 90 }}
        animate={{
          x: [0, 40, 80, 30, -20, 0],
          y: [0, 20, -10, 30, -15, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="animated-footer__floating-circle animated-footer__floating-circle--small"
        style={{ bottom: '15%', right: '12%', width: 60, height: 60 }}
        animate={{
          x: [0, -50, -20, -70, 30, 0],
          y: [0, -20, 15, -30, 20, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="animated-footer__floating-circle animated-footer__floating-circle--large"
        style={{ top: '35%', left: '48%', width: 120, height: 120 }}
        animate={{
          x: [0, 60, -60, 30, -30, 0],
          y: [0, -40, 40, -20, 20, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container animated-footer__container">
        <div className="animated-footer__grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div className="animated-footer__brand" whileHover={{ scale: 1.03 }}>
              <div className="animated-footer__brandIcon">
                <IconSparkles className="animated-footer__icon" />
              </div>
              <div>
                <div className="animated-footer__brandName">HappyFeet</div>
              </div>
            </motion.div>
            <p className="animated-footer__desc">
              Creating magical moments and unforgettable experiences for your special events. Let's make your celebrations extraordinary!
            </p>
            <div className="animated-footer__social">
              {socialLinks.map((s, index) => (
                <motion.a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-footer__socialBtn"
                  whileHover={{ scale: 1.1, backgroundColor: s.color, color: 'white' }}
                  transition={{ duration: 0.3 }}
                >
                  <s.icon className="animated-footer__socialIcon" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="animated-footer__title">Quick Links</div>
            <ul className="animated-footer__list">
              {footerLinks.map((l, index) => (
                <motion.li key={l.name} whileHover={{ x: 10 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <Link to={l.path} className="animated-footer__link">
                    <motion.span
                      className="animated-footer__dot"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1.5, delay: index * 0.1, repeat: Infinity }}
                    />
                    {l.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="animated-footer__title">Get In Touch</div>
            <ul className="animated-footer__contact">
              <motion.li className="animated-footer__contactItem" whileHover={{ x: 10 }}>
                <div className="animated-footer__pill animated-footer__pill--phone">
                  <IconPhone className="animated-footer__miniIcon" />
                </div>
                +91 9173500020
              </motion.li>
              <motion.li
                className="animated-footer__contactItem"
                whileHover={{ x: 10 }}
                onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=Happyfeetenterprises@gmail.com', '_blank', 'noopener,noreferrer')}
                style={{ cursor: 'pointer' }}
              >
                <div className="animated-footer__pill animated-footer__pill--mail">
                  <IconMail className="animated-footer__miniIcon" />
                </div>
                Happyfeetenterprises@gmail.com
              </motion.li>
              <motion.li
                className="animated-footer__contactItem"
                whileHover={{ x: 10 }}
                onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Vadodara%2C%20Gujarat%2C%20India', '_blank', 'noopener,noreferrer')}
                style={{ cursor: 'pointer' }}
              >
                <div className="animated-footer__pill animated-footer__pill--map">
                  <IconMapPin className="animated-footer__miniIcon" />
                </div>
                Vadodara, Gujarat, India
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="animated-footer__bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="animated-footer__copyright">
            © {new Date().getFullYear()} HappyFeet. Made with
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
              <IconHeart className="animated-footer__heart" />
            </motion.span>
            for happy moments
          </div>
          <motion.button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="animated-footer__topBtn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Top ↑
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
