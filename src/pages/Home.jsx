import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <FloatingNavbar />
      <div className="home-container">
        <motion.div 
          className="hero"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Welcome to <span className="highlight">Happyfeet</span></h1>
          <p className="subtitle">Creating Unforgettable Moments Through Dance</p>
          
          <motion.div 
            className="cta-buttons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="primary-btn"
            >
              Our Events
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="secondary-btn"
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="features">
          {[
            {
              icon: '🎭',
              title: 'Dance Workshops',
              description: 'Learn from the best in the industry'
            },
            {
              icon: '🎵',
              title: 'Music Production',
              description: 'Create your own beats and tracks'
            },
            {
              icon: '🌟',
              title: 'Performance',
              description: 'Showcase your talent on stage'
            }
          ].map((feature, index) => (
            <motion.div 
              key={feature.title}
              className="feature-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
