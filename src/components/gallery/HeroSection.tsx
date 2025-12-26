import { motion } from "framer-motion";

export const HeroSection = () => {
  const titleWords = ["Celebrate", "Every", "Moment"];
  
  return (
    <section id="home" className="relative min-h-[60vh] flex flex-col items-center justify-center overflow-hidden py-20 pt-32 px-4">
      {/* Background decorations */}
      <motion.div
        className="absolute top-20 left-10 w-72 h-72 rounded-full bg-coral/10 blur-3xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-teal/10 blur-3xl"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber/5 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      />

      {/* Title */}
      <div className="relative z-10 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {titleWords.map((word, i) => (
            <motion.span
              key={word}
              className="font-display text-6xl md:text-8xl lg:text-9xl font-bold"
              style={{
                background: i === 0 
                  ? "linear-gradient(135deg, hsl(10 90% 65%), hsl(340 80% 65%))"
                  : i === 1
                  ? "linear-gradient(135deg, hsl(40 95% 55%), hsl(25 90% 60%))"
                  : "linear-gradient(135deg, hsl(175 70% 45%), hsl(200 80% 60%))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
              initial={{ opacity: 0, y: 50, rotateX: -90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1]
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        <motion.p
          className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Discover our stunning collection of events, from intimate gatherings to grand celebrations
        </motion.p>

        {/* Scroll indicator */}
        <motion.div
          className="mt-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll to explore</span>
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-coral"
              animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-32 right-[15%] w-4 h-4 rounded-full bg-coral"
        animate={{ y: [-20, 20, -20], x: [-10, 10, -10] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-[20%] w-3 h-3 rounded-full bg-teal"
        animate={{ y: [20, -20, 20], x: [10, -10, 10] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/2 right-[10%] w-5 h-5 rotate-45 bg-amber"
        animate={{ rotate: [45, 225, 45], scale: [1, 1.2, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-[30%] w-6 h-6 rounded-full border-2 border-lavender"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
    </section>
  );
};
