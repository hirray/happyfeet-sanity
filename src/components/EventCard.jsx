import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import { Calendar, MapPin, Users } from "lucide-react";

export const EventCard = ({ title, date, location, attendees, image, category, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <CardWrapper
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <CardInner
        animate={{
          y: isHovered ? -8 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <ImageContainer>
          <CardImage
            src={image}
            alt={title}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.5 }}
          />
          <ImageOverlay $isHovered={isHovered} />
          
          <CategoryBadge
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
          >
            {category}
          </CategoryBadge>

          <ShimmerEffect
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? "100%" : "-100%" }}
            transition={{ duration: 0.6 }}
          />
        </ImageContainer>

        <CardContent>
          <CardTitle
            animate={{ y: isHovered ? -4 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {title}
          </CardTitle>

          <InfoGrid>
            <InfoItem>
              <Calendar size={16} />
              <span>{date}</span>
            </InfoItem>
            <InfoItem>
              <MapPin size={16} />
              <span>{location}</span>
            </InfoItem>
            <InfoItem>
              <Users size={16} />
              <span>{attendees} guests</span>
            </InfoItem>
          </InfoGrid>

          <ViewButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            <ButtonGradient
              animate={{ x: isHovered ? ["-100%", "100%"] : "-100%" }}
              transition={{ duration: 0.6 }}
            />
            <span style={{ position: 'relative', zIndex: 10 }}>View Details</span>
          </ViewButton>
        </CardContent>
      </CardInner>

      <GlowEffect
        animate={{ opacity: isHovered ? 0.3 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </CardWrapper>
  );
};

const CardWrapper = styled(motion.div)`
  position: relative;
  cursor: pointer;
`;

const CardInner = styled(motion.div)`
  position: relative;
  background: white;
  border-radius: 1.5rem;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const CardImage = styled(motion.img)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImageOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.6) 0%,
    rgba(0, 0, 0, 0.3) 50%,
    transparent 100%
  );
  opacity: ${props => props.$isHovered ? 0.8 : 1};
  transition: opacity 0.3s ease;
`;

const CategoryBadge = styled(motion.div)`
  position: absolute;
  top: 1rem;
  right: 1rem;
  padding: 0.4rem 0.85rem;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50px;
  font-size: 0.7rem;
  font-weight: 700;
  color: hsl(10, 90%, 65%);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ShimmerEffect = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.4),
    transparent
  );
`;

const CardContent = styled.div`
  padding: 1.1rem;
`;

const CardTitle = styled(motion.h3)`
  font-size: 1.05rem;
  font-weight: 700;
  color: #2d3436;
  margin-bottom: 0.75rem;
  line-height: 1.3;
`;

const InfoGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #636e72;
  font-size: 0.82rem;

  svg {
    flex-shrink: 0;
    color: hsl(10, 90%, 65%);
  }
`;

const ViewButton = styled(motion.button)`
  position: relative;
  width: 100%;
  padding: 0.65rem;
  border: none;
  border-radius: 50px;
  background: linear-gradient(135deg, hsl(10, 90%, 65%), hsl(340, 80%, 65%));
  color: white;
  font-weight: 600;
  font-size: 0.82rem;
  cursor: pointer;
  overflow: hidden;
`;

const ButtonGradient = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
`;

const GlowEffect = styled(motion.div)`
  position: absolute;
  inset: -20px;
  border-radius: 2rem;
  background: linear-gradient(135deg, hsl(10, 90%, 65%), hsl(340, 80%, 65%));
  filter: blur(30px);
  z-index: -1;
`;
