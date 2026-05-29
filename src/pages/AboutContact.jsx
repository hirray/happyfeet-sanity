import { motion, useInView, useAnimation, AnimatePresence } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { FaQuoteLeft, FaQuoteRight, FaStar, FaArrowRight, FaUsers, FaCalendarAlt, FaAward, FaMapMarkerAlt, FaEnvelope, FaPhoneAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import InfoCards from '../components/InfoCards';
import WhyChooseUs from '../components/WhyChooseUs';
import HappyFeetIntro from '../components/HappyFeetIntro';
import InteractiveMap from '../components/InteractiveMap';
import { CompanyInfo } from '../components/CompanyInfo';
import OurStory from '../components/OurStory';
import StatsCounter from '../components/StatsCounter';
import ClientReviews from '../components/ClientReviews';
import ScrollingQuote from '../components/ScrollingQuote';
import FounderSection from '../components/FounderSection';
import MapSectionModern from '../components/MapSection';
import SocialMedia from '../components/SocialMedia';
import ContactComicForm from '../components/ContactComicForm';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';
import styled from 'styled-components';



const logo = '/logo.jpg';
import '../styles/AboutContact.css';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

// Floating animation for logo
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 8,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

// Rotating animation for decorative elements
const rotateAnimation = {
  rotate: 360,
  transition: {
    duration: 20,
    ease: 'linear',
    repeat: Infinity,
  },
};

// Company stats data
const stats = [
  { number: 1000, label: 'Happy Clients', suffix: '+' },
  { number: 500, label: 'Events Hosted', suffix: '+' },
  { number: 50, label: 'Team Members', suffix: '+' },
  { number: 10, label: 'Years Experience', suffix: '+' },
];

// Testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Event Organizer',
    rating: 5,
    content: 'HappyFeet transformed our company retreat into an unforgettable experience. Their attention to detail and creative activities were exceptional!',
    highlight: 'unforgettable experience',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'School Principal',
    rating: 5,
    content: 'The energy and professionalism of the HappyFeet team is unmatched. Our students are still talking about the amazing day!',
    highlight: 'unmatched professionalism',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Wedding Planner',
    rating: 5,
    content: 'Working with HappyFeet was a dream. They brought our vision to life and made our wedding day magical.',
    highlight: 'brought our vision to life',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Corporate HR',
    rating: 4,
    content: 'The team-building activities organized by HappyFeet boosted our team morale significantly. Highly recommended!',
    highlight: 'boosted our team morale',
  },
  {
    id: 5,
    name: 'Priya Patel',
    role: 'Community Leader',
    rating: 5,
    content: 'HappyFeet created a vibrant and inclusive atmosphere at our community festival. Everyone had a wonderful time!',
    highlight: 'vibrant and inclusive',
  },
];

// Company story timeline
const storyTimeline = [
  {
    year: '2010',
    title: 'Our Humble Beginnings',
    description: 'Founded by a group of passionate event enthusiasts who wanted to bring more joy to celebrations.'
  },
  {
    year: '2012',
    title: 'First Major Event',
    description: 'Successfully organized our first large-scale corporate event, setting the standard for excellence.'
  },
  {
    year: '2015',
    title: 'Nationwide Expansion',
    description: 'Expanded our services to multiple cities, bringing our unique approach to events across the country.'
  },
  {
    year: '2020',
    title: 'Digital Transformation',
    description: 'Adapted to the new normal by introducing virtual and hybrid event solutions.'
  },
  {
    year: '2023',
    title: 'Industry Recognition',
    description: 'Awarded the prestigious "Event Planners of the Year" for our innovative approach and customer satisfaction.'
  },
];

// Why choose us features
const whyChooseUs = [
  {
    icon: '✨',
    title: 'Unmatched Creativity',
    description: 'Our team of creative minds brings fresh, innovative ideas to every event.'
  },
  {
    icon: '🤝',
    title: 'Personalized Approach',
    description: 'We tailor our services to perfectly match your vision and requirements.'
  },
  {
    icon: '⏱️',
    title: 'Stress-Free Planning',
    description: 'From concept to execution, we handle every detail so you can enjoy the moment.'
  },
  {
    icon: '🌟',
    title: 'Exceptional Quality',
    description: 'We use only the best materials and work with top-notch professionals.'
  }
];

// Animated counter component
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const duration = 2000; // 2 seconds
      const start = 0;
      const startTime = performance.now();
      
      const animate = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const currentCount = Math.floor(progress * target);
        
        setCount(currentCount);
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(target);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, target, hasAnimated]);

  return (
    <span ref={ref} className="counter">
      {count.toLocaleString()}{suffix}
    </span>
  );
};

// Star rating component
const StarRating = ({ rating }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => (
        <FaStar 
          key={i} 
          className={`star ${i < rating ? 'filled' : ''}`}
        />
      ))}
    </div>
  );
};

const HeroLogo = () => {
  const letters = 'HAPPYFEET'.split('');

  return (
    <div className="logo-hero hero-logo-wrapper">
      <motion.div
        className="hero-logo-bg"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.25, 0.35, 0.25],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="hero-logo-main"
        initial={{ scale: 0, rotate: -180, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 15,
          delay: 0.2,
        }}
      >
        <motion.div
          className="hero-logo-icon"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.img
            src={logo}
            alt="HappyFeet logo"
            className="hero-logo-image"
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="hero-logo-letters">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{
                delay: 0.5 + index * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
              whileHover={{
                scale: 1.2,
                y: -8,
                color: '#e8c0ab',
                transition: { duration: 0.2 },
              }}
              className="hero-letter"
              style={{
                color: '#ffffff',
                textShadow: '1px 1px 0px #8f5842, 2px 2px 0px #7c4c38, 3px 3px 0px #69402f, 4px 4px 0px #573426, 5px 5px 0px #44291e, 6px 6px 8px rgba(0, 0, 0, 0.3)',
              }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="hero-tagline"
        >
          <span className="hero-tagline-script">Creating </span>
          Unforgettable Moments
        </motion.p>

        <motion.div
          className="hero-logo-decor hero-logo-decor-gold"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="hero-logo-decor hero-logo-decor-teal"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </motion.div>
    </div>
  );
};

const AboutContact = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const controls = useAnimation();
  const location = useLocation();
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const isInView = useInView(aboutRef, { once: true, amount: 0.1 });

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % Math.min(4, testimonials.length));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!location?.hash) return;
    const id = location.hash.replace('#', '');
    if (!id) return;

    const el = document.getElementById(id);
    if (!el) return;

    const offset = 96;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }, [location?.hash]);

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="about-page" ref={aboutRef}>
      <AnimatedBackground />
      <FloatingNavbar />
      {/* Hero Section with Animated Logo */}
      <section className="hero-section">
        <div className="hero-bg">
          <motion.div 
            className="decorative-circle circle-1"
            animate={rotateAnimation}
          />
          <motion.div 
            className="decorative-circle circle-2"
            animate={{ ...rotateAnimation, rotate: -360 }}
          />
        </div>
        
        <HeroLogo />
        
        <motion.div 
          className="scroll-indicator"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: 1, 
            y: 0,
            transition: { 
              delay: 1.5,
              y: { 
                repeat: Infinity, 
                duration: 1.5, 
                repeatType: 'reverse',
                ease: 'easeInOut'
              } 
            } 
          }}
        >
          <span>Scroll Down</span>
          <motion.div 
            className="arrow-down"
            animate={{ 
              y: [0, 10, 0],
              transition: { 
                duration: 1.5, 
                repeat: Infinity,
                ease: 'easeInOut'
              } 
            }}
          >
            ↓
          </motion.div>
        </motion.div>
        <BottomCurve>
          <svg viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,80 C320,180 640,20 960,110 C1180,170 1340,110 1440,80 L1440,180 L0,180 Z" fill="#fdfcf0" />
          </svg>
        </BottomCurve>
      </section>

      <CompanyInfo />
      <OurStory />
      <WhyChooseUs />
      <StatsCounter />
      <ClientReviews />
      <ScrollingQuote />
      <FounderSection />
      <FounderSection
        name="Vrihha Popat"
        role="Co-Founder, HappyFeet"
        imageSrc="/cofounder.jpg"
        badgeText="Meet Our Co-Founder"
        showHeader={false}
        compact
        photoSize="sm"
        paddingY="1.5rem"
        paddingX="3.5rem"
      />
      <MapSectionModern />
      <SocialMedia />
      <ContactComicForm />
      <Footer />
    </div>
  );
};

// Styled Components
// Map Section
const MapSection = styled.section`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 500px;
  margin: 4rem 0;
  overflow: hidden;
`;

// Contact Section
const ContactSection = styled.section`
  padding: 6rem 0;
  background: #f9f9ff;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: #2d3436;
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, #6c63ff, #a29bfe);
    border-radius: 2px;
  }
`;

const SectionSubtitle = styled.p`
  color: #636e72;
  font-size: 1.1rem;
  max-width: 600px;
  margin: 0 auto;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 3rem;
  
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const ContactForm = styled(motion.form)`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  resize: vertical;
  min-height: 150px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #6c63ff;
    box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
  }
`;

const SubmitButton = styled(motion.button)`
  background: #6c63ff;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  transition: all 0.3s ease;
  
  .arrow-icon {
    transition: transform 0.3s ease;
  }
  
  &:hover .arrow-icon {
    transform: translateX(5px);
  }
`;

const ContactInfo = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  height: 100%;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  
  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
  
  h3 {
    margin: 0 0 0.25rem 0;
    color: #2d3436;
    font-size: 1.1rem;
  }
  
  p {
    margin: 0;
    color: #636e72;
    font-size: 0.95rem;
  }
`;

const InfoIcon = styled.div`
  width: 40px;
  height: 40px;
  background: rgba(108, 99, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  color: #6c63ff;
  font-size: 1rem;
  flex-shrink: 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
`;

const SocialLink = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f8f9fa;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c63ff;
  transition: all 0.3s ease;
  
  &:hover {
    background: #6c63ff;
    color: white;
    transform: translateY(-3px);
  }
`;

const AboutContentWrapper = styled.div`
  display: flex;
  gap: 3rem;
  width: 100%;
  align-items: flex-start;
  
  @media (max-width: 992px) {
    flex-direction: column;
    gap: 2rem;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
`;

const RightColumn = styled.div`
  flex: 1;
  min-width: 0; /* Prevents flex item from overflowing */
  display: flex;
  justify-content: center;
`;

const CompanyStats = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const StatItem = styled.div`
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
  }
`;

const StatIcon = styled.div`
  font-size: 1.75rem;
  color: #6c63ff;
  margin-bottom: 0.75rem;
`;

const StatNumber = styled.div`
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  color: #636e72;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2rem 0 0;
  
  li {
    padding: 0.75rem 0;
    color: #2d3436;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    
    span {
      color: #6c63ff;
      font-weight: bold;
      margin-right: 0.75rem;
      font-size: 1.2rem;
    }
    
    &:not(:last-child) {
      border-bottom: 1px solid #f1f3f5;
    }
  }
`;

const BottomCurve = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 12vw;
  min-height: 90px;
  max-height: 180px;
  z-index: 15;
  pointer-events: none;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

export default AboutContact;
