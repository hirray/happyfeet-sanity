// src/components/TestimonialsSection.jsx
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaArrowRight } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Corporate Client",
    rating: 5,
    content: "HappyFeet transformed our annual conference into an unforgettable experience. The attention to detail was remarkable!",
    highlight: "unforgettable experience"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Wedding Client",
    rating: 5,
    content: "Our wedding day was perfect thanks to HappyFeet. Their team handled everything seamlessly.",
    highlight: "perfect thanks to HappyFeet"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Birthday Party Host",
    rating: 4,
    content: "The kids had an amazing time at the party. The activities were engaging and well-organized.",
    highlight: "amazing time"
  },
  {
    id: 4,
    name: "David Kim",
    role: "Corporate HR",
    rating: 5,
    content: "Professional, creative, and reliable. HappyFeet exceeded our expectations for our company retreat.",
    highlight: "exceeded our expectations"
  }
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="testimonials-section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">What Our Clients Say</h2>
          <p className="section-subtitle">Don't just take our word for it - hear from those who've experienced our events</p>
        </motion.div>

        <div className="testimonials-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <FaQuoteLeft className="quote-icon" />
              <p className="testimonial-content">
                {testimonials[activeIndex].content.split(testimonials[activeIndex].highlight).map((part, i, arr) => 
                  i === arr.length - 1 ? (
                    part
                  ) : (
                    <>
                      {part}
                      <span className="highlight">{testimonials[activeIndex].highlight}</span>
                    </>
                  )
                )}
              </p>
              <div className="testimonial-rating">
                {[...Array(5)].map((_, i) => (
                  <FaStar 
                    key={i} 
                    className={i < testimonials[activeIndex].rating ? "star filled" : "star"} 
                  />
                ))}
              </div>
              <div className="testimonial-author">
                <h4>{testimonials[activeIndex].name}</h4>
                <p>{testimonials[activeIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="testimonial-nav">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`nav-dot ${index === activeIndex ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="explore-more">
          <Link to="/testimonials" className="explore-btn">
            Explore More Testimonials <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;