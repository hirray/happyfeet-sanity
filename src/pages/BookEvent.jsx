import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { Toaster } from 'sonner';
import { toast } from 'sonner';
import '../styles/ContactBooking.css';
import BackgroundAnimation from '../components/BackgroundAnimation';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';

const BookEvent = () => {
  useEffect(() => {
    document.title = 'Contact Us - Happyfeet Events';
  }, []);

  const eventOptions = useMemo(
    () => [
      { value: 'birthday', label: 'Birthday Party' },
      { value: 'school', label: 'School Event' },
      { value: 'corporate', label: 'Corporate Event' },
      { value: 'community', label: 'Community Gathering' },
      { value: 'other', label: 'Other' },
    ],
    []
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    eventType: 'birthday',
  });

  const contactInfo = useMemo(
    () => [
      { icon: Phone, label: 'Phone', value: '+91 98765 43210', color: 'hsl(174, 62%, 47%)' },
      { icon: Mail, label: 'Email', value: 'hello@happyfeet.com', color: 'hsl(351, 83%, 61%)' },
      { icon: MapPin, label: 'Location', value: '123 Creative Lane, Fun City', color: 'hsl(45, 93%, 58%)' },
      { icon: Clock, label: 'Hours', value: 'Mon-Sat: 9AM - 7PM', color: 'hsl(270, 60%, 65%)' },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      {
        key: 'instagram',
        label: 'Instagram',
        Icon: Instagram,
        handle: '@happyfeet.vadodara',
        color: 'hsl(330 90% 62%)',
      },
      {
        key: 'facebook',
        label: 'Facebook',
        Icon: Facebook,
        handle: 'Happyfeet Vadodara',
        color: 'hsl(214 89% 58%)',
      },
      {
        key: 'youtube',
        label: 'YouTube',
        Icon: Youtube,
        handle: 'Happyfeet Events',
        color: 'hsl(0 90% 60%)',
      },
      {
        key: 'linkedin',
        label: 'LinkedIn',
        Icon: Linkedin,
        handle: 'Happyfeet Events',
        color: 'hsl(201 88% 45%)',
      },
    ],
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent! We'll get back to you soon 🎉");
    setFormData({ name: '', email: '', phone: '', message: '', eventType: 'birthday' });
  };

  return (
    <>
      <Toaster position="top-center" richColors />
      <FloatingNavbar />
      <div className="contact-booking">
        <BackgroundAnimation />

        <main className="contact-booking__main">
          <div className="contact-booking__container">
            <motion.div
              className="contact-booking__hero"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.span
                className="contact-booking__hero-emoji"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                📬
              </motion.span>
              <h1 className="contact-booking__title">Let's Connect!</h1>
              <p className="contact-booking__subtitle">
                Have a question or ready to book your event? We'd love to hear from you!
              </p>
            </motion.div>

            <motion.div
              className="contact-booking__map contact-booking__map--top"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.005 }}
            >
              <iframe
                className="contact-booking__map-iframe"
                title="Vadodara, Gujarat"
                src="https://www.openstreetmap.org/export/embed.html?bbox=73.106%2C22.233%2C73.258%2C22.360&layer=mapnik&marker=22.3072%2C73.1812"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="contact-booking__map-caption">
                <span className="contact-booking__map-caption-emoji">📍</span>
                Vadodara, Gujarat
              </div>
            </motion.div>

            <div className="contact-booking__grid">
              <motion.div
                className="contact-booking__card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="contact-booking__form">
                  <h2 className="contact-booking__form-title">Send us a Message ✉️</h2>
                  <form onSubmit={handleSubmit} className="contact-booking__fields">
                    <div>
                      <label className="contact-booking__label">Your Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="contact-booking__input"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div className="contact-booking__two">
                      <div>
                        <label className="contact-booking__label">Email</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="contact-booking__input"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="contact-booking__label">Phone</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="contact-booking__input"
                          placeholder="+91 98765 43210"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="contact-booking__label">Event Type</label>
                      <select
                        value={formData.eventType}
                        onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                        className="contact-booking__select"
                      >
                        {eventOptions.map((o) => (
                          <option key={o.value} value={o.value}>
                            {o.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="contact-booking__label">Message</label>
                      <textarea
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="contact-booking__textarea"
                        placeholder="Tell us about your event..."
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="contact-booking__submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </motion.button>
                  </form>
                </div>
              </motion.div>

              <motion.div
                className="contact-booking__right"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="contact-booking__info-grid">
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.label}
                      className="contact-booking__info"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -10, rotate: index % 2 === 0 ? -0.6 : 0.6, scale: 1.02 }}
                    >
                      <motion.div
                        className="contact-booking__icon"
                        style={{ backgroundColor: `${info.color}20` }}
                        whileHover={{ rotate: 12, scale: 1.08 }}
                      >
                        <info.icon style={{ color: info.color, width: 22, height: 22 }} />
                      </motion.div>
                      <p className="contact-booking__info-label">{info.label}</p>
                      <p className="contact-booking__info-value">{info.value}</p>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  className="contact-booking__social"
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className="contact-booking__socialGlow" aria-hidden="true" />
                  <div className="contact-booking__socialHeader">
                    <h2 className="contact-booking__socialTitle">Social Media Connect</h2>
                    <p className="contact-booking__socialText">Hover any icon to see our Happyfeet ID ✨</p>
                  </div>

                  <div className="contact-booking__socialRow">
                    {socialLinks.map((s, idx) => (
                      <motion.a
                        key={s.key}
                        href="#"
                        onClick={(e) => e.preventDefault()}
                        className="contact-booking__socialBtn"
                        style={{ '--cb-social': s.color }}
                        aria-label={s.label}
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        whileInView={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.06, ease: 'easeOut' }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, rotate: idx % 2 === 0 ? -2 : 2, scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                      >
                        <span className="contact-booking__socialRing" aria-hidden="true" />
                        <span className="contact-booking__socialIcon" aria-hidden="true">
                          <s.Icon style={{ width: 22, height: 22 }} />
                        </span>
                        <span className="contact-booking__socialTooltip" role="tooltip">
                          <span className="contact-booking__socialTooltipTitle">{s.label}</span>
                          <span className="contact-booking__socialTooltipValue">{s.handle}</span>
                        </span>
                      </motion.a>
                    ))}
                  </div>

                  <motion.div
                    className="contact-booking__socialSpark"
                    aria-hidden="true"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default BookEvent;
