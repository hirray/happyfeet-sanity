import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram } from 'react-icons/fa';

const InteractiveMap = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  const handleMouseMove = (e) => {
    if (mapRef.current) {
      const rect = mapRef.current.getBoundingClientRect();
      setCursorPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <MapContainer>
      <MapImage 
        ref={mapRef}
        src="/map-placeholder.svg" 
        alt="HappyFeet Location"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      />
      
      <MapMarker 
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          transition: { 
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          } 
        }}
        whileHover={{ scale: 1.1 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <LocationPin />
      </MapMarker>
      
      <MapContent>
        <LocationCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LocationHeader>
            <FaMapMarkerAlt className="location-icon" />
            <h3>Our Location</h3>
          </LocationHeader>
          <LocationAddress>
            <p>HappyFeet Kids Play Area</p>
            <p>3rd Floor, 1st Cross Road,</p>
            <p>Near Bata Showroom,</p>
            <p>Koramangala 4th Block,</p>
            <p>Bangalore - 560034</p>
          </LocationAddress>
          
          <ContactInfo>
            <ContactItem>
              <FaPhone className="contact-icon" />
              <span>+91 9845012345</span>
            </ContactItem>
            <ContactItem>
              <FaEnvelope className="contact-icon" />
              <span>info@happyfeetkids.com</span>
            </ContactItem>
          </ContactInfo>
          
          <SocialIcons>
            <SocialIcon href="#" target="_blank" aria-label="Facebook">
              <FaFacebookF />
            </SocialIcon>
            <SocialIcon href="#" target="_blank" aria-label="Instagram">
              <FaInstagram />
            </SocialIcon>
          </SocialIcons>
        </LocationCard>
      </MapContent>
      
      <AnimatePresence>
        {showTooltip && (
          <Tooltip 
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: 1, 
              x: cursorPos.x - 100,
              y: cursorPos.y - 120
            }}
            exit={{ opacity: 0, y: 0 }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 300
            }}
          >
            <TooltipContent>
              <h4>HappyFeet Kids Play Area</h4>
              <p>3rd Floor, 1st Cross Road, Koramangala</p>
              <p>Bangalore - 560034</p>
              <ArrowDown />
            </TooltipContent>
          </Tooltip>
        )}
      </AnimatePresence>
      
      <MapOverlay />
    </MapContainer>
  );
};

// Styled Components
const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  margin: 2rem 0;
`;

const MapImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.8s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const MapContent = styled.div`
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 5;
  max-width: 320px;
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    left: 0;
    max-width: 100%;
    padding: 1.5rem;
  }
`;

const LocationCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
`;

const LocationHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  
  .location-icon {
    color: #6c63ff;
    font-size: 1.5rem;
    margin-right: 0.75rem;
  }
  
  h3 {
    margin: 0;
    color: #2d3436;
    font-size: 1.25rem;
  }
`;

const LocationAddress = styled.div`
  p {
    margin: 0.25rem 0;
    color: #2d3436;
    font-size: 0.95rem;
    line-height: 1.5;
  }
`;

const ContactInfo = styled.div`
  margin: 1.25rem 0;
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  margin: 0.75rem 0;
  
  .contact-icon {
    color: #6c63ff;
    margin-right: 0.75rem;
    width: 20px;
    text-align: center;
  }
  
  span {
    color: #2d3436;
    font-size: 0.95rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
`;

const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
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
    transform: translateY(-2px);
  }
`;

const MapOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(108, 99, 255, 0.1) 0%, rgba(76, 0, 255, 0.1) 100%);
  pointer-events: none;
`;

const MapMarker = styled(motion.div)`
  position: absolute;
  top: 60%;
  left: 40%;
  width: 40px;
  height: 40px;
  background: #6c63ff;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  cursor: pointer;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(108, 99, 255, 0.3);
  
  &::after {
    content: '';
    width: 16px;
    height: 16px;
    background: white;
    border-radius: 50%;
    transform: rotate(45deg);
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0% { transform: rotate(45deg) scale(0.8); opacity: 0.7; }
    50% { transform: rotate(45deg) scale(1.2); opacity: 0.9; }
    100% { transform: rotate(45deg) scale(0.8); opacity: 0.7; }
  }
`;

const LocationPin = styled.div`
  position: absolute;
  width: 12px;
  height: 12px;
  background: white;
  border-radius: 50%;
  transform: rotate(45deg);
`;

const Tooltip = styled(motion.div)`
  position: absolute;
  z-index: 10;
  pointer-events: none;
  width: 200px;
`;

const TooltipContent = styled.div`
  background: white;
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  position: relative;
  width: 240px;
  
  h4 {
    margin: 0 0 0.5rem 0;
    color: #2d3436;
    font-size: 1.1rem;
    font-weight: 600;
  }
  
  p {
    margin: 0.25rem 0;
    color: #636e72;
    font-size: 0.9rem;
    line-height: 1.4;
  }
`;

const ArrowDown = styled.div`
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid white;
`;

export default InteractiveMap;
