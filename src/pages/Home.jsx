import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/Home.css';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';
import { fetchHomePage } from '../lib/sanity';

const fallbackData = {
  heroTitle: 'Welcome to Happyfeet',
  heroSubtitle: 'Creating Unforgettable Moments Through Dance',
  features: [
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
  ]
};

const Home = () => {
  const [data, setData] = useState(fallbackData);

  useEffect(() => {
    let active = true;
    const loadData = async () => {
      const sanityData = await fetchHomePage();
      if (active && sanityData) {
        setData({
          heroTitle: sanityData.heroTitle || fallbackData.heroTitle,
          heroSubtitle: sanityData.heroSubtitle || fallbackData.heroSubtitle,
          features: sanityData.features && sanityData.features.length > 0 ? sanityData.features : fallbackData.features
        });
      }
    };
    loadData();
    return () => { active = false; };
  }, []);

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
          {/* Support wrapping "Happyfeet" in a span if found in the text */}
          <h1>
            {data.heroTitle.includes('Happyfeet') ? (
              <>
                {data.heroTitle.split('Happyfeet')[0]}
                <span className="highlight">Happyfeet</span>
                {data.heroTitle.split('Happyfeet')[1]}
              </>
            ) : (
              data.heroTitle
            )}
          </h1>
          <p className="subtitle">{data.heroSubtitle}</p>
          
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
          {data.features.map((feature, index) => (
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
