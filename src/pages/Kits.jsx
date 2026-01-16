import FloatingNavbar from "../components/FloatingNavbar";
import Footer from "../components/Footer";
import FloatingShapes from "../components/FloatingShapes";
import KitsHeroSection from "../components/KitsHeroSection";
import KitsSection from "../components/KitsSection";
import ContactSection from "../components/ContactSection";

const Kits = () => {
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflowX: "hidden" }}>
      <FloatingShapes />
      <FloatingNavbar />

      <div style={{ position: "relative", zIndex: 1 }}>
        <KitsHeroSection />
        <KitsSection />
        <ContactSection />
      </div>

      <Footer />
    </div>
  );
};

export default Kits;
