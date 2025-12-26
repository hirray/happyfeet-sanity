import { motion } from "framer-motion";
import { useState } from "react";

interface CategoryCardProps {
  title: string;
  image: string;
  color: string;
  index: number;
}

export const CategoryCard = ({ title, image, color, index }: CategoryCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 w-64 h-80 cursor-pointer group"
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-3xl opacity-0 blur-xl"
        style={{ background: color }}
        animate={{ opacity: isHovered ? 0.4 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Card */}
      <motion.div
        className="relative h-full rounded-3xl overflow-hidden"
        style={{ boxShadow: "var(--shadow-card)" }}
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Image */}
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Overlay gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${color}ee 0%, ${color}88 30%, transparent 60%)`,
          }}
        />

        {/* Shimmer effect on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: isHovered ? "100%" : "-100%" }}
          transition={{ duration: 0.6 }}
        />

        {/* Title */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <motion.h3
            className="font-display text-xl font-bold text-primary-foreground drop-shadow-lg"
            animate={{ y: isHovered ? -8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {title}
          </motion.h3>
          <motion.div
            className="h-0.5 bg-primary-foreground/80 rounded-full mt-2"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? "60%" : "30%" }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Decorative corner */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 border-primary-foreground/30"
          animate={{ 
            scale: isHovered ? [1, 1.2, 1] : 1,
            rotate: isHovered ? 180 : 0 
          }}
          transition={{ duration: 0.5 }}
        />
      </motion.div>
    </motion.div>
  );
};
