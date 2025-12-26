import { motion } from 'framer-motion';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';

const Contact = () => {
  return (
    <>
      <FloatingNavbar />
      <div className="container" style={{ paddingTop: '36px', paddingBottom: '36px' }}>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          Contact Us
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }}>
          Reach us to plan your next celebration.
        </motion.p>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
