import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface SphereImage {
  src: string;
  alt: string;
}

interface ImageSphereProps {
  images: SphereImage[];
}

export const ImageSphere = ({ images }: ImageSphereProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 30 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-30, 30]), springConfig);
  
  const [autoRotation, setAutoRotation] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setAutoRotation(prev => prev + 0.3);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  // Generate positions on a sphere
  const sphereRadius = 200;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));

  const imagePositions = images.map((_, i) => {
    const y = 1 - (i / (images.length - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = goldenAngle * i;
    
    return {
      x: Math.cos(theta) * radius * sphereRadius,
      y: y * sphereRadius,
      z: Math.sin(theta) * radius * sphereRadius,
      size: 40 + Math.random() * 30,
    };
  });

  return (
    <div className="relative flex items-center justify-center py-20">
      <motion.div
        ref={containerRef}
        className="relative w-[500px] h-[500px] perspective-1000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          mouseX.set(0);
          mouseY.set(0);
        }}
      >
        <motion.div
          className="relative w-full h-full preserve-3d"
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : autoRotation,
          }}
        >
          {images.map((image, i) => {
            const pos = imagePositions[i];
            return (
              <motion.div
                key={i}
                className="absolute rounded-full overflow-hidden border-2 border-border/20 shadow-lg"
                style={{
                  width: pos.size,
                  height: pos.size,
                  left: "50%",
                  top: "50%",
                  x: pos.x - pos.size / 2,
                  y: pos.y - pos.size / 2,
                  z: pos.z,
                }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                whileHover={{ scale: 1.3, zIndex: 100 }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}
          
          {/* Center logo circle */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-foreground/10 flex items-center justify-center"
            style={{ zIndex: 50 }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="text-2xl">✨</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="absolute w-[520px] h-[520px] rounded-full border border-coral/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[560px] h-[560px] rounded-full border border-teal/15"
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
};
