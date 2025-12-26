import React from 'react';
import BackgroundAnimation from '../components/BackgroundAnimation';
import ActivityHero from '../components/ActivityHero';
import ActivityPaintPlay from '../components/ActivityPaintPlay';
import PhotoGallery from '../components/PhotoGallery';
import ActivityCards from '../components/ActivityCards';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';

const Activity = () => {
  return (
    <div className="activity-container">
      <BackgroundAnimation />
      <FloatingNavbar />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <main className="activity-main">
          <ActivityHero />
          <ActivityPaintPlay />
          <PhotoGallery />
          <ActivityCards />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Activity;
