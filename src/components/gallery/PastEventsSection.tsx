import { motion } from "framer-motion";
import { EventCard } from "./EventCard";

import birthdayImg from "@/assets/events/birthday.jpg";
import fiestaImg from "@/assets/events/fiesta.jpg";
import kittyImg from "@/assets/events/kitty.jpg";
import sippaintImg from "@/assets/events/sippaint.jpg";
import cookingImg from "@/assets/events/cooking.jpg";
import babyshowerImg from "@/assets/events/babyshower.jpg";

const pastEvents = [
  {
    title: "Emma's Rainbow Birthday Bash",
    date: "December 2, 2024",
    location: "The Grand Ballroom, NYC",
    attendees: 120,
    image: birthdayImg,
    category: "Birthday",
  },
  {
    title: "Summer Fiesta Night",
    date: "November 28, 2024",
    location: "Sunset Beach Club",
    attendees: 250,
    image: fiestaImg,
    category: "Fiesta",
  },
  {
    title: "Ladies Afternoon Tea Party",
    date: "November 20, 2024",
    location: "Rose Garden Pavilion",
    attendees: 45,
    image: kittyImg,
    category: "Kitty Party",
  },
  {
    title: "Wine & Canvas Evening",
    date: "November 15, 2024",
    location: "Art Studio Downtown",
    attendees: 30,
    image: sippaintImg,
    category: "Sip & Paint",
  },
  {
    title: "Italian Cooking Masterclass",
    date: "November 10, 2024",
    location: "Chef's Kitchen Studio",
    attendees: 24,
    image: cookingImg,
    category: "Cook Party",
  },
  {
    title: "Welcome Baby Luna",
    date: "November 5, 2024",
    location: "The Blossom Venue",
    attendees: 60,
    image: babyshowerImg,
    category: "Baby Shower",
  },
];

export const PastEventsSection = () => {
  return (
    <section id="events" className="py-20 relative">
      {/* Background decorations */}
      <motion.div
        className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-muted/30 to-transparent"
      />

      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-coral/10 text-coral text-sm font-medium mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
            Past Celebrations
          </motion.div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Recent <span className="text-gradient-rainbow">Events</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-md mx-auto">
            Take a look at some of the magical moments we've created
          </p>
        </motion.div>

        {/* Events grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pastEvents.map((event, index) => (
            <EventCard
              key={event.title}
              {...event}
              index={index}
            />
          ))}
        </div>

        {/* Load more button */}
        <motion.div
          className="flex justify-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="group relative px-8 py-4 rounded-full font-medium overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Animated gradient background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-coral via-amber to-teal"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "mirror" }}
            />
            <span className="relative z-10 text-primary-foreground">
              View All Events
            </span>
          </motion.button>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute right-10 top-40 w-8 h-8 rounded-full bg-gradient-coral opacity-30"
        animate={{ y: [-20, 20, -20], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute left-20 bottom-40 w-6 h-6 rotate-45 bg-gradient-teal opacity-30"
        animate={{ rotate: [45, 225, 45], y: [0, -30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
    </section>
  );
};
