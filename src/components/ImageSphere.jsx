import { useRef, useState, useMemo, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import styled from "styled-components";

export const ImageSphere = ({ images }) => {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const autoRotate = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-30, 30]), springConfig);

  useEffect(() => {
    if (isHovered) return;

    let rafId;
    let lastTs;

    const loop = (ts) => {
      if (lastTs == null) lastTs = ts;
      const dt = ts - lastTs;
      lastTs = ts;

      const speedDegPerSec = 14;
      autoRotate.set(autoRotate.get() + (dt / 1000) * speedDegPerSec);
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isHovered, autoRotate]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const sphereRadius = 200;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const imagePositions = useMemo(
    () =>
      images.map((_, i) => {
        const y = 1 - (i / (images.length - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = goldenAngle * i;
        const baseSize = 48 + Math.random() * 24;
        const idleScale = 1 + Math.random() * 0.15;
        const idleDelay = Math.random() * 2 + i * 0.03;
        const idleDuration = 2.5 + Math.random() * 1.5;

        return {
          x: Math.cos(theta) * radius * sphereRadius,
          y: y * sphereRadius,
          z: Math.sin(theta) * radius * sphereRadius,
          size: baseSize,
          idleScale,
          idleDelay,
          idleDuration,
        };
      }),
    [images]
  );

  return (
    <SphereContainer>
      <SphereWrapper
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <SphereInner
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : autoRotate,
          }}
        >
          {images.map((image, i) => {
            const pos = imagePositions[i];
            return (
              <ImageItem
                key={i}
                $size={pos.size}
                style={{
                  x: pos.x - pos.size / 2,
                  y: pos.y - pos.size / 2,
                  z: pos.z,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isHovered
                    ? {
                        opacity: 1,
                        scale: 1,
                        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
                      }
                    : {
                        opacity: [0.9, 1, 0.9],
                        scale: [1, pos.idleScale, 1],
                        boxShadow: [
                          "0 4px 15px rgba(0, 0, 0, 0.2)",
                          "0 0 0 3px rgba(255, 124, 2, 0.7), 0 4px 18px rgba(0, 0, 0, 0.25)",
                          "0 4px 15px rgba(0, 0, 0, 0.2)",
                        ],
                      }
                }
                transition={
                  isHovered
                    ? { delay: i * 0.05, duration: 0.5 }
                    : {
                        delay: pos.idleDelay,
                        duration: pos.idleDuration,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                      }
                }
                whileHover={{
                  scale: 1.3,
                  zIndex: 100,
                  boxShadow:
                    "0 0 0 6px rgba(255, 159, 67, 0.9), 0 6px 22px rgba(0, 0, 0, 0.3)",
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </ImageItem>
            );
          })}
          
          <CenterLogo
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span style={{ fontSize: '2rem' }}>✨</span>
          </CenterLogo>
        </SphereInner>
      </SphereWrapper>

      <DecorativeRings>
        <Ring1
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <Ring2
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </DecorativeRings>
    </SphereContainer>
  );
};

const SphereContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`;

const SphereWrapper = styled(motion.div)`
  position: relative;
  width: 500px;
  height: 500px;
  perspective: 1000px;
  
  @media (max-width: 768px) {
    width: 350px;
    height: 350px;
  }
`;

const SphereInner = styled(motion.div)`
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
`;

const ImageItem = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border-radius: 50%;
  overflow: hidden;
  border: 2px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const CenterLogo = styled(motion.div)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  background: white;
`;

const DecorativeRings = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const Ring1 = styled(motion.div)`
  position: absolute;
  width: 520px;
  height: 520px;
  border-radius: 50%;
  border: 1px solid hsl(10, 90%, 65%, 0.2);
  
  @media (max-width: 768px) {
    width: 370px;
    height: 370px;
  }
`;

const Ring2 = styled(motion.div)`
  position: absolute;
  width: 560px;
  height: 560px;
  border-radius: 50%;
  border: 1px solid hsl(175, 70%, 45%, 0.15);
  
  @media (max-width: 768px) {
    width: 410px;
    height: 410px;
  }
`;
