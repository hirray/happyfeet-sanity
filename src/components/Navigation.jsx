import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css';

const Navigation = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Activities', path: '/activity' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/about#contact-section' },
  ];

  return (
    <nav className="main-nav">
      <motion.div 
        className="logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/">Happyfeet</Link>
      </motion.div>
      <ul className="nav-links">
        {navItems.map((item, index) => (
          <motion.li
            key={item.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to={item.path}>{item.name}</Link>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
