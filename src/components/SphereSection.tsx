import { motion } from "framer-motion";
import { ImageSphere } from "./ImageSphere";

import birthdayImg from "@/assets/events/birthday.jpg";
import fiestaImg from "@/assets/events/fiesta.jpg";
import kittyImg from "@/assets/events/kitty.jpg";
import sippaintImg from "@/assets/events/sippaint.jpg";
import cookingImg from "@/assets/events/cooking.jpg";
import babyshowerImg from "@/assets/events/babyshower.jpg";
import cakepaintingImg from "@/assets/events/cakepainting.jpg";
import corporateImg from "@/assets/events/corporate.jpg";
import workshopImg from "@/assets/events/workshop.jpg";

const sphereImages = [
  { src: birthdayImg, alt: "Birthday Party" },
  { src: fiestaImg, alt: "Fiesta" },
  { src: kittyImg, alt: "Kitty Party" },
  { src: sippaintImg, alt: "Sip & Paint" },
  { src: cookingImg, alt: "Cook Party" },
  { src: babyshowerImg, alt: "Baby Shower" },
  { src: cakepaintingImg, alt: "Cake Painting" },
  { src: corporateImg, alt: "Corporate Event" },
  { src: workshopImg, alt: "Workshop" },
  { src: birthdayImg, alt: "Birthday Party 2" },
  { src: fiestaImg, alt: "Fiesta 2" },
  { src: kittyImg, alt: "Kitty Party 2" },
  { src: sippaintImg, alt: "Sip & Paint 2" },
  { src: cookingImg, alt: "Cook Party 2" },
  { src: babyshowerImg, alt: "Baby Shower 2" },
  { src: cakepaintingImg, alt: "Cake Painting 2" },
  { src: corporateImg, alt: "Corporate Event 2" },
  { src: workshopImg, alt: "Workshop 2" },
  { src: birthdayImg, alt: "Birthday Party 3" },
  { src: fiestaImg, alt: "Fiesta 3" },
  { src: kittyImg, alt: "Kitty Party 3" },
  { src: sippaintImg, alt: "Sip & Paint 3" },
  { src: cookingImg, alt: "Cook Party 3" },
  { src: babyshowerImg, alt: "Baby Shower 3" },
];

export const SphereSection = () => {
  return (
    <section id="gallery" className="py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-gradient-rainbow">Memories</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Hover and drag to explore our universe of celebrations
          </p>
        </motion.div>

        {/* 3D Sphere */}
        <ImageSphere images={sphereImages} />
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute left-10 top-1/3 w-20 h-20 rounded-full border-2 border-coral/20"
        animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ duration: 20, repeat: Infinity }}
      />
      <motion.div
        className="absolute right-10 bottom-1/3 w-16 h-16 rounded-full border-2 border-teal/20"
        animate={{ scale: [1.2, 1, 1.2], rotate: [360, 180, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
      />
    </section>
  );
};
