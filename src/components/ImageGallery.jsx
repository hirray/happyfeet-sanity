import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
import '../styles/ImageGallery.css';

const galleryTiles = [
  { id: 1, span: 'ig-tile--xl', gradient: 'ig-grad--a', src: '/img1.jpg' },
  { id: 2, span: 'ig-tile--sm', gradient: 'ig-grad--b', src: '/img2.jpg' },
  { id: 3, span: 'ig-tile--sm', gradient: 'ig-grad--c', src: '/img3.jpg' },
  { id: 4, span: 'ig-tile--tall', gradient: 'ig-grad--d', src: '/img4.jpg' },
  { id: 5, span: 'ig-tile--wide', gradient: 'ig-grad--e', src: '/img5.jpg' },
];

const ImageGallery = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const tiles = useMemo(() => galleryTiles, []);

  return (
    <section id="landing-gallery" ref={ref} className="ig" aria-label="Captured moments gallery">
      <div className="ig__container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="ig__heading"
        >
          <h2 className="ig__title">
            <span className="ig__titleGradient">Captured</span> Moments
          </h2>
          <p className="ig__subtitle">Every event tells a story. Here's a glimpse of the magic we create.</p>
        </motion.div>

        <div className="ig__grid">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, scale: 0.86, rotateY: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
              whileHover={{ scale: 1.03 }}
              className={`ig-tile ${tile.span} ${tile.gradient}`}
            >
              <motion.img
                src={tile.src}
                alt={`Event ${tile.id}`}
                className="ig-tile__img"
                loading="lazy"
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              />

              <div className="ig-tile__pattern" aria-hidden="true" />

              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="ig-tile__overlay"
              >
                <div className="ig-tile__overlayText">
                  <p className="ig-tile__overlayTitle">Event #{tile.id}</p>
                  <p className="ig-tile__overlaySub">Hover to explore</p>
                </div>
              </motion.div>

              <div className="ig-tile__corner" aria-hidden="true">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="ig-tile__cornerRing"
                />
              </div>

              <div className="ig-tile__shine" aria-hidden="true" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;
