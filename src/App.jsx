// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import BookEvent from "./pages/BookEvent";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";
import Games from "./pages/Games";
import Activity from "./pages/Activity";
import AboutContact from './pages/AboutContact';
import EventDetails from "./pages/EventDetails";
import CategoryMedia from "./pages/CategoryMedia";
import SplashScreen from './components/SplashScreen';
import RegisterPopup from './components/RegisterPopup';
import { isRegistered as isRegisterPopupRegistered } from './utils/registerStorage';
import './styles/App.css';

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
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/book-event" element={<BookEvent />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/gallery/event/:id" element={<EventDetails />} />
                <Route path="/gallery/category/:slug" element={<CategoryMedia />} />
                <Route path="/testimonial" element={<Testimonials />} />
                <Route path="/games" element={<Games />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/activity" element={<Activity />} />
                <Route path="/about" element={<AboutContact />} />
                <Route path="/contact" element={<AboutContact />} />
              </Routes>
            )}
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
 }

export default App;