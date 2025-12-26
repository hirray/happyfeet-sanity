import React, { useRef } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

const TestimonialsSection = styled.section`
  padding: 6rem 2rem;
  background: #f9f7ff;
  position: relative;
  overflow: hidden;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 4rem;
  
  h2 {
    font-size: 2.8rem;
    color: #2d3436;
    margin-bottom: 1rem;
    display: inline-block;
    position: relative;
    
    &::after {
      content: '❤️';
      position: absolute;
      right: -40px;
      top: 0;
      transform: scale(1.2);
      opacity: 0;
      transition: all 0.3s ease;
    }
    
    &:hover::after {
      opacity: 1;
      transform: scale(1.5) rotate(10deg);
    }
  }
  
  p {
    font-size: 1.2rem;
    color: #636e72;
    max-width: 700px;
    margin: 0 auto;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.03);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(108, 99, 255, 0.1);
  }
`;

const Stars = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
  color: #ffd700;
  font-size: 1.2rem;
`;

const TestimonialText = styled.p`
  font-size: 1rem;
  line-height: 1.7;
  color: #2d3436;
  margin-bottom: 1.5rem;
  position: relative;
  padding-left: 1.5rem;
  
  &::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 3rem;
    font-family: serif;
    color: rgba(108, 99, 255, 0.2);
    line-height: 1;
  }
  
  .highlight {
    background: linear-gradient(120deg, rgba(108, 99, 255, 0.2) 0%, rgba(108, 99, 255, 0) 100%);
    padding: 0.1rem 0.3rem;
    border-radius: 4px;
    transition: all 0.3s ease;
    
    &:hover {
      background: linear-gradient(120deg, rgba(108, 99, 255, 0.3) 0%, rgba(108, 99, 255, 0.1) 100%);
    }
  }
`;

const Author = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #6c63ff, #a29bfe);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
  }
  
  .info {
    h4 {
      margin: 0;
      color: #2d3436;
      font-size: 1.1rem;
    }
    
    p {
      margin: 0.2rem 0 0;
      color: #636e72;
      font-size: 0.9rem;
    }
  }
`;

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const testimonials = [
    {
      id: 1,
      text: "HappyFeet made our child's birthday absolutely magical! The team went above and beyond to create an unforgettable experience.",
      author: "Sarah Johnson",
      role: "Parent",
      rating: 5,
      highlight: "magical"
    },
    {
      id: 2,
      text: "The creativity and attention to detail were outstanding. Our kids are still talking about the amazing activities!",
      author: "Michael Chen",
      role: "School Principal",
      rating: 5,
      highlight: "outstanding"
    },
    {
      id: 3,
      text: "From start to finish, everything was perfect. The team handled all the details, and we could just enjoy the celebration.",
      author: "Emma Williams",
      role: "Event Coordinator",
      rating: 5,
      highlight: "perfect"
    }
  ];

  const highlightText = (text, highlight) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === highlight.toLowerCase() 
        ? <span key={i} className="highlight">{part}</span> 
        : part
    );
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <TestimonialsSection ref={ref}>
      <Container>
        <SectionHeader
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>What Our Customers Say</h2>
          <p>Don't just take our word for it - hear from the families and schools we've worked with</p>
        </SectionHeader>

        <TestimonialsGrid
          variants={container}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {testimonials.map((testimonial) => (
            <TestimonialCard 
              key={testimonial.id}
              variants={item}
              whileHover={{ scale: 1.02 }}
            >
              <Stars>
                {[...Array(5)].map((_, i) => (
                  <span key={i} role="img" aria-label="star">⭐</span>
                ))}
              </Stars>
              <TestimonialText>
                {highlightText(testimonial.text, testimonial.highlight)}
              </TestimonialText>
              <Author>
                <div className="avatar">
                  {testimonial.author.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="info">
                  <h4>{testimonial.author}</h4>
                  <p>{testimonial.role}</p>
                </div>
              </Author>
            </TestimonialCard>
          ))}
        </TestimonialsGrid>
      </Container>
    </TestimonialsSection>
  );
};

export default Testimonials;