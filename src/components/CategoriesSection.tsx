import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CategoryCard } from "./CategoryCard";

import birthdayImg from "@/assets/events/birthday.jpg";
import fiestaImg from "@/assets/events/fiesta.jpg";
import kittyImg from "@/assets/events/kitty.jpg";
import sippaintImg from "@/assets/events/sippaint.jpg";
import cookingImg from "@/assets/events/cooking.jpg";
import babyshowerImg from "@/assets/events/babyshower.jpg";
import cakepaintingImg from "@/assets/events/cakepainting.jpg";
import corporateImg from "@/assets/events/corporate.jpg";
import workshopImg from "@/assets/events/workshop.jpg";

const categories = [
  { title: "Birthday Parties", image: birthdayImg, color: "hsl(340 80% 65%)" },
  { title: "Fiestas & Fairs", image: fiestaImg, color: "hsl(25 90% 60%)" },
  { title: "Kitty Parties", image: kittyImg, color: "hsl(270 60% 70%)" },
  { title: "Sip & Paint", image: sippaintImg, color: "hsl(10 90% 65%)" },
  { title: "Cook Party", image: cookingImg, color: "hsl(40 95% 55%)" },
  { title: "Baby Shower", image: babyshowerImg, color: "hsl(330 70% 70%)" },
  { title: "Cake Painting", image: cakepaintingImg, color: "hsl(350 80% 60%)" },
  { title: "Corporate Events", image: corporateImg, color: "hsl(200 70% 50%)" },
  { title: "Workshops", image: workshopImg, color: "hsl(175 70% 45%)" },
];

export const CategoriesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <section id="categories" ref={containerRef} className="py-20 overflow-hidden">
      {/* Section header */}
      <div className="container mx-auto px-4 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Event <span className="text-gradient-rainbow">Categories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md">
            Explore our diverse range of celebrations and find your perfect event type
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <motion.div style={{ x }} className="relative">
        <div className="flex gap-6 px-4 pb-8 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 pl-4">
            {categories.map((category, index) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                image={category.image}
                color={category.color}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div 
        className="flex items-center justify-center gap-2 mt-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex gap-1"
          animate={{ x: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <span className="text-muted-foreground text-sm">Scroll to explore</span>
          <span className="text-coral">→</span>
        </motion.div>
      </motion.div>
    </section>
  );
};
