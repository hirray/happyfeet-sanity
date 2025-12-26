import { FloatingConfetti } from "@/components/FloatingConfetti";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { CategoriesSection } from "@/components/CategoriesSection";
import { SphereSection } from "@/components/SphereSection";
import { PastEventsSection } from "@/components/PastEventsSection";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      {/* Floating confetti background */}
      <FloatingConfetti />
      
      {/* Navigation header */}
      <Header />
      
      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <CategoriesSection />
        <SphereSection />
        <PastEventsSection />
        
        {/* Footer */}
        <motion.footer 
          className="py-12 text-center border-t border-border/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="text-muted-foreground text-sm">
            © 2024 Event Gallery. All celebrations reserved.
          </p>
        </motion.footer>
      </main>
    </div>
  );
};

export default Index;
