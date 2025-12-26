import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  attendees: number;
  image: string;
  category: string;
  index: number;
}

export const EventCard = ({ title, date, location, attendees, image, category, index }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-3xl bg-card"
      style={{ boxShadow: "var(--shadow-card)" }}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative h-64 overflow-hidden">
        <motion.img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        
        {/* Gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent"
          animate={{ opacity: isHovered ? 0.9 : 0.7 }}
        />

        {/* Category badge */}
        <motion.div
          className="absolute top-4 left-4 px-4 py-1.5 rounded-full bg-gradient-coral text-primary-foreground text-sm font-medium"
          animate={{ y: isHovered ? 0 : -5, opacity: isHovered ? 1 : 0.9 }}
        >
          {category}
        </motion.div>

        {/* Animated border on hover */}
        <motion.div
          className="absolute inset-0 border-4 border-coral/0 rounded-3xl"
          animate={{ borderColor: isHovered ? "hsl(10 90% 65% / 0.5)" : "hsl(10 90% 65% / 0)" }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Content */}
      <div className="p-6">
        <motion.h3
          className="font-display text-xl font-bold text-card-foreground mb-3"
          animate={{ x: isHovered ? 8 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          {title}
        </motion.h3>

        <div className="space-y-2 text-muted-foreground text-sm">
          <motion.div
            className="flex items-center gap-2"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.05 }}
          >
            <Calendar className="w-4 h-4 text-coral" />
            <span>{date}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          >
            <MapPin className="w-4 h-4 text-teal" />
            <span>{location}</span>
          </motion.div>
          <motion.div
            className="flex items-center gap-2"
            animate={{ x: isHovered ? 8 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.15 }}
          >
            <Users className="w-4 h-4 text-amber" />
            <span>{attendees} attended</span>
          </motion.div>
        </div>

        {/* View button */}
        <motion.button
          className="mt-4 w-full py-3 rounded-xl bg-gradient-coral text-primary-foreground font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          View Gallery
        </motion.button>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-coral/10"
        animate={{ 
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0.3 : 0.1 
        }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );
};
