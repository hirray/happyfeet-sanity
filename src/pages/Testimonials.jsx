import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Camera, Heart, Music, Sparkles, Star as StarIcon } from 'lucide-react';
import '../styles/Testimonials.css';
import AnimatedBackground from '../components/AnimatedBackground';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';

const floatingIcons = [
  { Icon: Heart, tone: 'primary', delay: 0 },
  { Icon: StarIcon, tone: 'accent', delay: 0.5 },
  { Icon: Sparkles, tone: 'secondary', delay: 1 },
  { Icon: Music, tone: 'primary', delay: 1.5 },
  { Icon: Camera, tone: 'accent', delay: 2 },
];

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="testimonialsHero">
      <div className="testimonialsHero__decor" aria-hidden="true">
        {floatingIcons.map(({ Icon, tone, delay }, index) => (
          <div
            key={index}
            className={`testimonialsHero__icon testimonialsHero__icon--${tone}`}
            style={{
              left: `${15 + index * 18}%`,
              top: `${20 + (index % 3) * 25}%`,
              animationDelay: `${delay}s`,
            }}
          >
            <Icon className="testimonialsHero__iconSvg" />
          </div>
        ))}
      </div>

      <div className="testimonialsHero__content">
        <div
          className={
            isVisible
              ? 'testimonialsHero__badge testimonialsHero__fadeIn'
              : 'testimonialsHero__badge testimonialsHero__fadeOut'
          }
        >
          <Sparkles className="testimonialsHero__badgeSpark" />
          <span className="testimonialsHero__badgeText">Trusted by 500+ Happy Clients</span>
          <Sparkles className="testimonialsHero__badgeSpark testimonialsHero__badgeSpark--delay" />
        </div>

        <h1
          className={
            isVisible
              ? 'testimonialsHero__title testimonialsHero__fadeIn testimonialsHero__fadeIn--d1'
              : 'testimonialsHero__title testimonialsHero__fadeOut testimonialsHero__fadeOut--d1'
          }
        >
          <span className="testimonialsHero__titleTop">What Our</span>
          <br />
          <span className="testimonialsHero__titleGradient">Clients Say</span>
        </h1>

        <p
          className={
            isVisible
              ? 'testimonialsHero__subtitle testimonialsHero__fadeIn testimonialsHero__fadeIn--d2'
              : 'testimonialsHero__subtitle testimonialsHero__fadeOut testimonialsHero__fadeOut--d2'
          }
        >
          Real stories from real celebrations. Discover why families and businesses trust Happyfeet to create
          unforgettable moments.
        </p>

        <div
          className={
            isVisible
              ? 'testimonialsHero__stats testimonialsHero__fadeIn testimonialsHero__fadeIn--d3'
              : 'testimonialsHero__stats testimonialsHero__fadeOut testimonialsHero__fadeOut--d3'
          }
        >
          {[
            { value: '500+', label: 'Events Completed' },
            { value: '98%', label: 'Happy Clients' },
            { value: '15+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} className="testimonialsHero__stat">
              <div className="testimonialsHero__statValue">{stat.value}</div>
              <div className="testimonialsHero__statLabel">{stat.label}</div>
            </div>
          ))}
        </div>

        <div
          className={
            isVisible
              ? 'testimonialsHero__scroll testimonialsHero__fadeIn testimonialsHero__fadeIn--d4'
              : 'testimonialsHero__scroll testimonialsHero__fadeOut testimonialsHero__fadeOut--d4'
          }
        >
          <div className="testimonialsHero__scrollTrack">
            <div className="testimonialsHero__scrollDot" />
          </div>
          <p className="testimonialsHero__scrollText">Scroll to explore</p>
        </div>
      </div>
    </section>
  );
};

const escapeRegExp = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightText = (text, highlights) => {
  if (!highlights?.length) return text;
  const pattern = highlights
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegExp)
    .join('|');

  if (!pattern) return text;
  const regex = new RegExp(`(${pattern})`, 'gi');
  const parts = String(text).split(regex);
  let highlightCount = 0;

  return parts.map((part, idx) => {
    const isHit = highlights.some((h) => h.toLowerCase() === part.toLowerCase());
    if (!isHit) return <span key={idx}>{part}</span>;
    const currentHighlightIndex = highlightCount++;
    return (
      <span 
        key={idx} 
        className="testimonials__highlight"
        style={{ '--highlight-index': currentHighlightIndex }}
      >
        {part}
      </span>
    );
  });
};

const Star = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const QuoteMark = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M10 11H6a4 4 0 0 1 4-4V5a6 6 0 0 0-6 6v6h6v-6Zm10 0h-4a4 4 0 0 1 4-4V5a6 6 0 0 0-6 6v6h6v-6Z"
      fill="currentColor"
      opacity="0.95"
    />
  </svg>
);

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Birthday Party',
    rating: 5,
    text: 'The most amazing birthday party for my daughter! They made everything so magical and stress-free. Truly the best team.',
    highlights: ['amazing', 'magical', 'stress-free', 'best'],
  },
  {
    name: 'Raj Patel',
    role: 'Family Celebration',
    rating: 5,
    text: 'Incredible team! The decorations were stunning and the kids had a blast. Smooth coordination and super friendly staff.',
    highlights: ['Incredible', 'stunning', 'blast', 'Smooth', 'friendly'],
  },
  {
    name: 'Emily Chen',
    role: 'Workshop',
    rating: 5,
    text: 'Perfect workshop organization. My guests are still talking about it! Great vibe, great music, and beautiful setup.',
    highlights: ['Perfect', 'Great vibe', 'beautiful'],
  },
  {
    name: 'Aditi Sharma',
    role: 'Baby Shower',
    rating: 5,
    text: 'Happyfeet turned our baby shower into a dreamy celebration. The theme was elegant, the games were fun, and everything felt premium.',
    highlights: ['dreamy', 'elegant', 'fun', 'premium'],
  },
  {
    name: 'Vikram Singh',
    role: 'Corporate Event',
    rating: 5,
    text: 'Professional, punctual, and creative. The entire event was flawlessly managed with impressive attention to detail.',
    highlights: ['Professional', 'punctual', 'creative', 'flawlessly', 'attention to detail'],
  },
  {
    name: 'Neha Kapoor',
    role: 'Kitty Party',
    rating: 5,
    text: 'Such a lovely experience! The decor was gorgeous and the activities were engaging. Everyone left smiling.',
    highlights: ['lovely', 'gorgeous', 'engaging', 'smiling'],
  },
  {
    name: 'Arjun Mehta',
    role: 'College Fest',
    rating: 5,
    text: 'Absolutely phenomenal execution. The crowd loved the energy and the setup looked unreal. Best experience we have had.',
    highlights: ['phenomenal', 'unreal', 'Best'],
  },
  {
    name: 'Priya Nair',
    role: 'House Party',
    rating: 5,
    text: 'They handled everything—from planning to cleanup. The night was unforgettable and the vibe was next-level.',
    highlights: ['unforgettable', 'next-level'],
  },
  {
    name: 'Karan Verma',
    role: 'Fair',
    rating: 5,
    text: 'The team brought so many unique ideas. The experience felt vibrant, joyful, and super well-organized.',
    highlights: ['unique', 'vibrant', 'joyful', 'well-organized'],
  },
  {
    name: 'Maya Rodriguez',
    role: 'Sip and Paint',
    rating: 5,
    text: 'A beautiful evening with classy decor and amazing hosts. Everything was thoughtfully curated and looked spectacular.',
    highlights: ['beautiful', 'classy', 'amazing', 'thoughtfully', 'spectacular'],
  },
];

const cardPalette = [
  { bg: '#FFE9EE', accent: '#FF4D6D' },
  { bg: '#E8FBFF', accent: '#22B8CF' },
  { bg: '#FFF7D6', accent: '#FFB020' },
  { bg: '#EAFBF1', accent: '#51CF66' },
  { bg: '#F2EEFF', accent: '#845EF7' },
  { bg: '#FFEEDD', accent: '#FF922B' },
  { bg: '#FFE9FA', accent: '#F06595' },
  { bg: '#EAF2FF', accent: '#339AF0' },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <AnimatedBackground />
      <FloatingNavbar />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <HeroSection />
        <div className="container">
          <div className="testimonials__timeline">
            <div className="testimonials__line" aria-hidden="true" />

            {testimonials.map((t, i) => {
              const side = i % 2 === 0 ? 'left' : 'right';
              const palette = cardPalette[i % cardPalette.length];
              const initials = String(t.name || '?')
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((w) => w[0])
                .join('')
                .toUpperCase();

              return (
                <div
                  key={`${t.name}-${i}`}
                  className={
                    side === 'left'
                      ? 'testimonials__item testimonials__item--left'
                      : 'testimonials__item testimonials__item--right'
                  }
                >
                  <div className="testimonials__node" aria-hidden="true">
                    <div className="testimonials__nodeDot" />
                  </div>

                  <motion.div
                    className="testimonials__card"
                    initial={{ opacity: 0, y: 18, rotate: side === 'left' ? -1.2 : 1.2 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, amount: 0.32 }}
                    transition={{ duration: 0.65, ease: 'easeOut' }}
                    style={{
                      '--card-bg': palette.bg,
                      '--card-accent': palette.accent,
                    }}
                  >
                    <div className="testimonials__cardGlow" aria-hidden="true" />

                    <div className="testimonials__cardTop">
                      <div className="testimonials__rating" aria-label={`${t.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, idx) => (
                          <span
                            key={idx}
                            className={idx < t.rating ? 'testimonials__star testimonials__star--on' : 'testimonials__star'}
                          >
                            <Star filled={idx < t.rating} />
                          </span>
                        ))}
                      </div>
                      <div className="testimonials__quote" aria-hidden="true">
                        <QuoteMark />
                      </div>
                    </div>

                    <div className="testimonials__text">{highlightText(t.text, t.highlights)}</div>

                    <div className="testimonials__footer">
                      <div className="testimonials__avatar" aria-hidden="true">
                        <span>{initials}</span>
                      </div>
                      <div className="testimonials__meta">
                        <div className="testimonials__name">{t.name}</div>
                        <div className="testimonials__role">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Testimonials;
