import { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import RegisterPopup from './components/RegisterPopup';
import { isRegistered as isRegisterPopupRegistered } from './utils/registerStorage';
import './styles/App.css';

// Lazy load pages for code splitting
const Landing = lazy(() => import("./pages/Landing"));
const Home = lazy(() => import("./pages/Home"));
const BookEvent = lazy(() => import("./pages/BookEvent"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Games = lazy(() => import("./pages/Games"));
const Activity = lazy(() => import("./pages/Activity"));
const AboutContact = lazy(() => import('./pages/AboutContact'));
const EventDetails = lazy(() => import("./pages/EventDetails"));
const CategoryMedia = lazy(() => import("./pages/CategoryMedia"));
const AllMedia = lazy(() => import("./pages/AllMedia"));
const DecorThemeDetails = lazy(() => import('./pages/DecorThemeDetails'));
const Kits = lazy(() => import("./pages/Kits"));

const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'radial-gradient(circle at center, #ffffff 0%, #f7f9fc 100%)',
    flexDirection: 'column',
    gap: '1rem',
  }}>
    <div style={{
      width: '42px',
      height: '42px',
      borderRadius: '50%',
      border: '3px solid rgba(255, 107, 107, 0.2)',
      borderTopColor: 'hsl(10, 90%, 65%)',
      animation: 'appSpin 1s linear infinite'
    }} />
    <style>{`
      @keyframes appSpin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [registered, setRegistered] = useState(() => isRegisterPopupRegistered());

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (showSplash) return;
    if (registered) return;

    const tick = () => {
      if (!registered) setRegisterOpen(true);
    };

    tick();
    const intervalId = setInterval(tick, 10000);
    return () => clearInterval(intervalId);
  }, [registered, showSplash]);

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <main className="app__main">
          <RegisterPopup
            open={registerOpen}
            onClose={() => setRegisterOpen(false)}
            onRegistered={() => {
              setRegistered(true);
              setRegisterOpen(false);
            }}
          />
          <AnimatePresence mode="wait">
            {showSplash ? (
              <SplashScreen />
            ) : (
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/home" element={<Home />} />
                  <Route path="/kits" element={<Kits />} />
                  <Route path="/book-event" element={<BookEvent />} />
                  <Route path="/gallery" element={<Gallery />} />
                  <Route path="/decor-themes/:slug" element={<DecorThemeDetails />} />
                  <Route path="/gallery/event/:id" element={<EventDetails />} />
                  <Route path="/gallery/category/:slug" element={<CategoryMedia />} />
                  <Route path="/gallery/all-media" element={<AllMedia />} />
                  <Route path="/testimonial" element={<Testimonials />} />
                  <Route path="/games" element={<Games />} />
                  <Route path="/testimonials" element={<Testimonials />} />
                  <Route path="/activity" element={<Activity />} />
                  <Route path="/about" element={<AboutContact />} />
                  <Route path="/contact" element={<AboutContact />} />
                </Routes>
              </Suspense>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
 }

export default App;