import { motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { Phone, Mail, MapPin, Send, Clock, Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';
import { Toaster, toast } from 'sonner';
import emailjs from '@emailjs/browser';
import styled from 'styled-components';
import FloatingNavbar from '../components/FloatingNavbar';
import Footer from '../components/Footer';

const BowSvg = (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M32 32 C 24 16, 8 16, 8 32 C 8 40, 24 40, 32 32 Z" />
    <path d="M32 32 C 40 16, 56 16, 56 32 C 56 40, 40 40, 32 32 Z" />
    <path d="M32 32 Q 25 45 20 56" />
    <path d="M32 32 Q 39 45 44 56" />
    <circle cx="32" cy="32" r="3" fill="currentColor" />
  </svg>
);

const FloralSvg = (
  <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 54 Q 32 32 54 10" />
    <path d="M40 24 Q 45 15 54 10 Q 55 20 45 25 Z" />
    <path d="M30 34 Q 25 25 35 15 Q 40 25 30 34 Z" />
    <path d="M20 44 Q 15 35 25 25 Q 30 35 20 44 Z" />
  </svg>
);

const ArchSvg = (
  <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M 10 100 A 40 40 0 0 1 90 100" />
  </svg>
);

const BookEvent = () => {
  useEffect(() => {
    document.title = 'Book Your Event - Happyfeet Events';
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

  const [sending, setSending] = useState(false);

  const contactInfo = useMemo(
    () => [
      { icon: Phone, label: 'Phone', value: '+91 9173500020', color: '#a76b53' },
      { icon: Mail, label: 'Email', value: 'Happyfeetenterprises@gmail.com', color: '#a76b53' },
      { icon: MapPin, label: 'Location', value: 'Hari Nagar, Vadodara, Gujarat', color: '#a76b53' },
      { icon: Clock, label: 'Hours', value: 'All Days: 9AM - 7PM', color: '#a76b53' },
    ],
    []
  );

  const socialLinks = useMemo(
    () => [
      {
        key: 'instagram',
        label: 'Instagram',
        Icon: Instagram,
        handle: '@happyfeet_activityclub',
        color: '#e1306c',
      },
      {
        key: 'facebook',
        label: 'Facebook',
        Icon: Facebook,
        handle: 'Happyfeet Vadodara',
        color: '#1877f2',
      },
      {
        key: 'youtube',
        label: 'YouTube',
        Icon: Youtube,
        handle: 'Happyfeet Events',
        color: '#ff0000',
      },
      {
        key: 'linkedin',
        label: 'LinkedIn',
        Icon: Linkedin,
        handle: 'Happyfeet Events',
        color: '#0a66c2',
      },
    ],
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      toast.error('Email service is not configured yet.');
      return;
    }

    if (sending) return;
    setSending(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'Happyfeetenterprises@gmail.com',
          from_name: formData.name,
          reply_to: formData.email,
          phone: formData.phone,
          message: formData.message,
          event_type: formData.eventType,
          source: 'BookEvent',
        },
        { publicKey }
      );
      toast.success("Message sent! We'll get back to you soon 🎉");
      setFormData({ name: '', email: '', phone: '', message: '', eventType: 'birthday' });
    } catch (err) {
      toast.error('Failed to send. Please try again.');
    } finally {
      setSending(false);
    }
  };



  return (
    <PageWrapper>
      <Toaster position="top-center" richColors />
      <FloatingNavbar />
      
      {/* Drifting Background Circles */}
      <FloatingCircle
        style={{ top: '15%', left: '8%', width: 14, height: 14 }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <FloatingCircle
        style={{ bottom: '20%', left: '12%', width: 10, height: 10 }}
        animate={{ x: [0, -30, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      <FloatingCircle
        style={{ top: '40%', right: '10%', width: 16, height: 16 }}
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut' }}
      />
      <FloatingCircle
        style={{ bottom: '15%', right: '35%', width: 12, height: 12 }}
        animate={{ x: [0, -20, 20, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Watercolor Background Blobs */}
      <WatercolorBlob1
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 30, 0],
          x: [0, 15, 0],
        }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <WatercolorBlob2
        animate={{
          scale: [1.1, 0.95, 1.1],
          rotate: [0, -45, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
      />
      <WatercolorBlob3
        animate={{
          scale: [0.95, 1.05, 0.95],
          rotate: [0, 60, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />

      <MainContent>
        <Container>
          {/* Header section with 3D shadow serif fonts */}
          <HeroSection
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease: 'easeOut' }}
          >
            <Tagline>✦ LET'S CREATE SOMETHING MAGICAL ✦</Tagline>
            <Title>
              Book Your Perfect <br />
              <span>Event Today.</span>
            </Title>
            <Subtitle>
              Ready to bring your vision to life? Complete our luxury consultation request and let's craft a celebration filled with joy, laughter, and memories that last a lifetime.
            </Subtitle>
          </HeroSection>

          {/* Form & Sidebars Grid Layout */}
          <ContentGrid>
            {/* Column 1: Map & Socials on the Left */}
            <LeftSidebar
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              {/* Elegant Map Card */}
              <MapCard whileHover={{ scale: 1.004 }}>
                <MapInnerBorder>
                  <MapFrame
                    title="Vadodara, Gujarat"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=73.106%2C22.233%2C73.258%2C22.360&layer=mapnik&marker=22.3072%2C73.1812"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                  <MapCaption>
                    <span>📍</span> Vadodara, Gujarat, India
                  </MapCaption>
                </MapInnerBorder>
              </MapCard>

              {/* Social Channels Section */}
              <SocialCard>
                <SocialInner>
                  {/* Top Left Bow */}
                  <DecorativeBow style={{ top: '-4px', left: '-4px', width: '70px', height: '70px', opacity: 0.18, transform: 'rotate(-10deg)' }}>
                    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M50 50 C 35 30, 10 35, 10 50 C 10 65, 35 70, 50 50 Z" />
                      <path d="M50 50 C 65 30, 90 35, 90 50 C 90 65, 65 70, 50 50 Z" />
                      <path d="M50 50 Q 40 70 30 90" />
                      <path d="M50 50 Q 60 70 70 90" />
                      <circle cx="50" cy="50" r="4" fill="currentColor" />
                      <path d="M25 45 C 30 45, 35 48, 40 50" />
                      <path d="M75 45 C 70 45, 65 48, 60 50" />
                    </svg>
                  </DecorativeBow>

                  {/* Top Right Sparkles */}
                  <SparkleDecoration style={{ top: '15px', right: '35px', width: '22px', height: '22px' }} animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" /></svg>
                  </SparkleDecoration>
                  <SparkleDecoration style={{ top: '10px', right: '15px', width: '14px', height: '14px' }} animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L13 9 L22 10 L13 11 L12 20 L11 11 L2 10 L11 9 Z" /></svg>
                  </SparkleDecoration>
                  <SparkleDecoration style={{ top: '35px', right: '18px', width: '18px', height: '18px' }} animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 2.2, repeat: Infinity, delay: 1 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L13 9 L22 10 L13 11 L12 20 L11 11 L2 10 L11 9 Z" /></svg>
                  </SparkleDecoration>

                  {/* Bottom Left Sparkles */}
                  <SparkleDecoration style={{ bottom: '70px', left: '20px', width: '20px', height: '20px' }} animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 2.3, repeat: Infinity, delay: 0.2 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L14 10 L24 12 L14 14 L12 24 L10 14 L0 12 L10 10 Z" /></svg>
                  </SparkleDecoration>
                  <SparkleDecoration style={{ bottom: '95px', left: '28px', width: '12px', height: '12px' }} animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 2.7, repeat: Infinity, delay: 0.8 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L13 9 L22 10 L13 11 L12 20 L11 11 L2 10 L11 9 Z" /></svg>
                  </SparkleDecoration>
                  <SparkleDecoration style={{ bottom: '60px', left: '45px', width: '14px', height: '14px' }} animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.5, 0.15] }} transition={{ duration: 2.1, repeat: Infinity, delay: 1.2 }}>
                    <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0 L13 9 L22 10 L13 11 L12 20 L11 11 L2 10 L11 9 Z" /></svg>
                  </SparkleDecoration>

                  {/* Bottom Right Floral */}
                  <DecorativeFloral style={{ bottom: '15px', right: '35px', width: '60px', height: '80px', opacity: 0.18, transform: 'rotate(5deg)' }}>
                    <svg viewBox="0 0 100 150" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M 50 150 Q 40 100 60 50" />
                      <path d="M 55 70 Q 75 60 85 45 Q 85 70 58 85 Z" />
                      <path d="M 47 100 Q 25 90 15 75 Q 35 70 50 90 Z" />
                      <path d="M 60 50 Q 50 30 70 20 Q 80 35 60 50 Z" />
                    </svg>
                  </DecorativeFloral>

                  <SocialTitle style={{ zIndex: 10, position: 'relative' }}>Connect with Us</SocialTitle>
                  <SocialSubtitle style={{ zIndex: 10, position: 'relative' }}>Follow our happy journey on social media</SocialSubtitle>
                  <SocialRow style={{ zIndex: 10, position: 'relative' }}>
                    {socialLinks.map((s) => (
                      <SocialButton
                        key={s.key}
                        href="#"
                        $hoverColor={s.color}
                        whileHover={{ y: -6, scale: 1.08 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => e.preventDefault()}
                      >
                        <s.Icon size={19} />
                        <Tooltip className="tooltip">
                          <span>{s.label}</span>
                          <strong>{s.handle}</strong>
                        </Tooltip>
                      </SocialButton>
                    ))}
                  </SocialRow>
                </SocialInner>
              </SocialCard>
            </LeftSidebar>

            {/* Column 2: Form in the Middle */}
            <FormCard
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 }}
            >
              <CornerShapeTopLeft>
                <svg viewBox="0 0 60 60" fill="#fdfcf0">
                  <path d="M0,0 L60,0 C45,0 30,5 25,25 C5,30 0,45 0,60 Z" />
                </svg>
              </CornerShapeTopLeft>
              
              <CornerShapeBottomRight>
                <svg viewBox="0 0 60 60" fill="#fdfcf0">
                  <path d="M60,60 L0,60 C15,60 30,55 35,35 C55,30 60,15 60,0 Z" />
                </svg>
              </CornerShapeBottomRight>

              <FormInner>
                {/* Slow Rotating Luxury Circular Brand Stamp */}
                <OrnamentalStamp
                  animate={{ rotate: 360 }}
                  transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                >
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    <path id="stamp-path" d="M 18 50 A 32 32 0 1 1 82 50" fill="none" />
                    <text fontFamily="'Inter', sans-serif" fontSize="7.5" fontWeight="800" fill="#a76b53" letterSpacing="1.2">
                      <textPath href="#stamp-path" startOffset="50%" textAnchor="middle">
                        ✦ HAPPY FEET EVENTS ✦
                      </textPath>
                    </text>
                    <circle cx="50" cy="50" r="26" fill="none" stroke="rgba(167, 107, 83, 0.18)" strokeDasharray="3 3" />
                    <text x="50" y="55" fontFamily="'Playfair Display', serif" fontSize="13" fontWeight="700" fill="#a76b53" textAnchor="middle">
                      HF
                    </text>
                  </svg>
                </OrnamentalStamp>

                <FormTitle>Send us a Message</FormTitle>
                
                <FormFields onSubmit={handleSubmit}>
                  <FieldGroup>
                    <Input
                      type="text"
                      required
                      id="name"
                      placeholder=" "
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <FloatingLabel htmlFor="name">Your Name</FloatingLabel>
                    <FocusUnderline />
                  </FieldGroup>

                  <RowFields>
                    <FieldGroup>
                      <Input
                        type="email"
                        required
                        id="email"
                        placeholder=" "
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                      <FloatingLabel htmlFor="email">Email Address</FloatingLabel>
                      <FocusUnderline />
                    </FieldGroup>
                    
                    <FieldGroup>
                      <Input
                        type="tel"
                        id="phone"
                        placeholder=" "
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                      <FloatingLabel htmlFor="phone">Phone Number</FloatingLabel>
                      <FocusUnderline />
                    </FieldGroup>
                  </RowFields>

                  <FieldGroup>
                    <Select
                      id="eventType"
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    >
                      {eventOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                    <SelectLabel htmlFor="eventType">Select Event Category</SelectLabel>
                    <FocusUnderline />
                  </FieldGroup>

                  <FieldGroup>
                    <TextArea
                      required
                      id="message"
                      placeholder=" "
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                    <FloatingTextAreaLabel htmlFor="message">Your Message / Event Details</FloatingTextAreaLabel>
                    <FocusUnderline />
                  </FieldGroup>

                  <SubmitButton
                    type="submit"
                    whileHover={{ scale: 1.015, y: -2 }}
                    whileTap={{ scale: 0.985 }}
                    disabled={sending}
                  >
                    <Send size={18} style={{ marginRight: '8px' }} />
                    {sending ? 'Sending Request…' : 'Request Consultation'}
                  </SubmitButton>
                </FormFields>
              </FormInner>
            </FormCard>

            {/* Column 3: Contact Info Cards on the Right */}
            <RightSidebar
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
            >
              <InfoGrid>
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <InfoCard
                      key={info.label}
                      whileHover={{ y: -5, scale: 1.015 }}
                      transition={{ duration: 0.3 }}
                    >
                      <InfoInner>
                        {index === 0 && (
                          <>
                            <DecorativeBow style={{ top: '8px', left: '8px', width: '38px', height: '38px' }}>{BowSvg}</DecorativeBow>
                            <DecorativeFloral style={{ top: '15px', right: '35%', transform: 'rotate(60deg)', width: '40px', height: '40px' }}>{FloralSvg}</DecorativeFloral>
                            <DecorativeFloral style={{ bottom: '10px', left: '55%', transform: 'rotate(-30deg)', width: '30px', height: '30px' }}>{FloralSvg}</DecorativeFloral>
                            <CardArchSvg className="card-arch" style={{ right: '-25px', top: '15px', width: '70px', height: '70px', transform: 'rotate(-90deg)' }}>{ArchSvg}</CardArchSvg>
                          </>
                        )}
                        {index === 1 && (
                          <>
                            <DecorativeFloral style={{ top: '25px', left: '10px', transform: 'rotate(-10deg)', width: '25px', height: '65px' }}>{FloralSvg}</DecorativeFloral>
                            <CardArchSvg className="card-arch" style={{ left: '40%', top: '-15px', width: '60px', height: '60px', transform: 'rotate(180deg)' }}>{ArchSvg}</CardArchSvg>
                            <DecorativeBow style={{ top: '15px', right: '15px', width: '36px', height: '36px' }}>{BowSvg}</DecorativeBow>
                            <CardArchSvg className="card-arch" style={{ right: '-15px', bottom: '15px', width: '40px', height: '40px', transform: 'rotate(-90deg)' }}>{ArchSvg}</CardArchSvg>
                          </>
                        )}
                        {index === 2 && (
                          <>
                            <DecorativeFloral style={{ bottom: '10px', left: '15px', transform: 'rotate(-20deg)', width: '30px', height: '40px' }}>{FloralSvg}</DecorativeFloral>
                            <DecorativeFloral style={{ top: '10px', left: '55%', transform: 'rotate(140deg)', width: '25px', height: '25px' }}>{FloralSvg}</DecorativeFloral>
                            <CardArchSvg className="card-arch" style={{ bottom: '-15px', left: '42%', width: '55px', height: '55px' }}>{ArchSvg}</CardArchSvg>
                            <DecorativeFloral style={{ top: '35px', right: '10px', transform: 'rotate(70deg)', width: '45px', height: '45px' }}>{FloralSvg}</DecorativeFloral>
                          </>
                        )}
                        {index === 3 && (
                          <>
                            <DecorativeBow style={{ top: '10px', left: '10px', width: '35px', height: '35px' }}>{BowSvg}</DecorativeBow>
                            <CardArchSvg className="card-arch" style={{ top: '-15px', left: '42%', width: '50px', height: '50px', transform: 'rotate(180deg)' }}>{ArchSvg}</CardArchSvg>
                            <DecorativeFloral style={{ bottom: '-5px', left: '42%', transform: 'rotate(-15deg)', width: '25px', height: '30px' }}>{FloralSvg}</DecorativeFloral>
                            <DecorativeFloral style={{ bottom: '15px', right: '20px', transform: 'rotate(-15deg)', width: '30px', height: '60px' }}>{FloralSvg}</DecorativeFloral>
                            <CardArchSvg className="card-arch" style={{ right: '-15px', bottom: '-15px', width: '45px', height: '45px', transform: 'rotate(-45deg)' }}>{ArchSvg}</CardArchSvg>
                          </>
                        )}

                        <IconWrapper $color={info.color}>
                          <Icon size={20} />
                        </IconWrapper>
                        <InfoText>
                          <InfoLabel>{info.label}</InfoLabel>
                          <InfoValue>{info.value}</InfoValue>
                        </InfoText>
                      </InfoInner>
                    </InfoCard>
                  );
                })}
              </InfoGrid>
            </RightSidebar>
          </ContentGrid>
        </Container>
      </MainContent>

      <Footer />
    </PageWrapper>
  );
};

// --- Styled Components ---

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #fdfcf0; /* Cream background matching the design */
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const FloatingCircle = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(167, 107, 83, 0.08);
  pointer-events: none;
  z-index: 1;
`;

// Organic Watercolor Background Shapes
const WatercolorBlob1 = styled(motion.div)`
  position: absolute;
  top: 10%;
  left: -8%;
  width: 550px;
  height: 550px;
  background: radial-gradient(circle, rgba(167, 107, 83, 0.16) 0%, rgba(234, 227, 216, 0.04) 60%, transparent 100%);
  filter: blur(40px);
  z-index: 1;
  pointer-events: none;
`;

const WatercolorBlob2 = styled(motion.div)`
  position: absolute;
  bottom: 12%;
  right: -8%;
  width: 650px;
  height: 650px;
  background: radial-gradient(circle, rgba(232, 192, 171, 0.24) 0%, rgba(167, 107, 83, 0.04) 75%, transparent 100%);
  filter: blur(50px);
  z-index: 1;
  pointer-events: none;
`;

const WatercolorBlob3 = styled(motion.div)`
  position: absolute;
  top: 45%;
  left: 32%;
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(234, 221, 203, 0.26) 0%, rgba(251, 235, 225, 0.06) 60%, transparent 100%);
  filter: blur(35px);
  z-index: 1;
  pointer-events: none;
`;

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  padding-top: 11.5rem;
  padding-bottom: 7.5rem;
  flex-grow: 1;
`;

const Container = styled.div`
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1.25rem;
  }
`;

// Hero typography with 3D Text Shadow
const HeroSection = styled(motion.div)`
  text-align: center;
  max-width: 800px;
  margin: 0 auto 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Tagline = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: #a76b53;
  letter-spacing: 2px;
  margin-bottom: 1.5rem;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.04);
`;

const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 3.9rem;
  font-weight: 400;
  color: #2f2622;
  line-height: 1.15;
  margin-bottom: 1.5rem;
  letter-spacing: -0.5px;
  text-shadow: 
    1px 1px 0px #e0d8c8,
    2px 2px 0px #e0d8c8,
    3px 3px 0px #e0d8c8,
    4px 4px 0px #e0d8c8,
    5px 5px 0px #e0d8c8,
    6px 6px 0px #e0d8c8,
    7px 7px 8px rgba(0, 0, 0, 0.15),
    8px 8px 12px rgba(0, 0, 0, 0.1);
    
  span {
    color: #a76b53;
    font-style: italic;
    text-shadow: 
      1px 1px 0px #ebd2c8,
      2px 2px 0px #ebd2c8,
      3px 3px 0px #ebd2c8,
      4px 4px 0px #ebd2c8,
      5px 5px 0px #ebd2c8,
      6px 6px 0px #ebd2c8,
      7px 7px 8px rgba(167, 107, 83, 0.2),
      8px 8px 12px rgba(167, 107, 83, 0.15);
  }

  @media (max-width: 768px) {
    font-size: 3.1rem;
  }
  
  @media (max-width: 480px) {
    font-size: 2.4rem;
  }
`;

const Subtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  color: #554a45;
  line-height: 1.65;
  max-width: 640px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.02);
`;

// Layout Grid (3 columns on desktop)
const ContentGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 0.6fr;
  gap: 2.5rem;
  align-items: stretch;
  
  @media (max-width: 1100px) {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 2.5rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

// Left Sidebar (Map & Socials)
const LeftSidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  
  @media (min-width: 1101px) {
    height: 100%;
  }
  
  @media (max-width: 1100px) and (min-width: 769px) {
    grid-column: 2;
    grid-row: 2;
  }

  @media (max-width: 768px) {
    order: 3;
  }
`;

// Right Sidebar (Phone, Email, Location, Hours)
const RightSidebar = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  
  @media (min-width: 1101px) {
    height: 100%;
  }
  
  @media (max-width: 1100px) and (min-width: 769px) {
    grid-column: 2;
    grid-row: 1;
  }

  @media (max-width: 768px) {
    order: 2;
  }
`;

// Form Card - elegant double border design in the center
const FormCard = styled(motion.div)`
  background: linear-gradient(145deg, #a76b53, #945841);
  border-radius: 8px;
  border: 1px solid rgba(251, 235, 225, 0.25);
  padding: 12px; /* For the outer frame spacing */
  box-shadow: 
    0 20px 40px rgba(167, 107, 83, 0.3),
    0 8px 16px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  &:hover {
    transform: scale(1.008) translateY(-4px);
    box-shadow: 
      0 20px 40px rgba(167, 107, 83, 0.18),
      0 8px 20px rgba(0, 0, 0, 0.06);
  }
  
  @media (min-width: 1101px) {
    height: 100%;
  }

  @media (max-width: 1100px) and (min-width: 769px) {
    grid-column: 1;
    grid-row: 1 / 3;
  }

  @media (max-width: 768px) {
    order: 1;
  }
`;

const FormInner = styled.div`
  border: 1.5px solid rgba(251, 235, 225, 0.25);
  border-radius: 6px;
  padding: 2.8rem 2.5rem;
  position: relative;
  
  @media (min-width: 1101px) {
    height: 100%;
  }

  @media (max-width: 640px) {
    padding: 2.2rem 1.8rem;
  }
`;

const CornerShapeTopLeft = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  width: 60px;
  height: 60px;
  z-index: 5;
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.25));
  }
`;

const CornerShapeBottomRight = styled.div`
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 60px;
  height: 60px;
  z-index: 5;
  svg {
    width: 100%;
    height: 100%;
    filter: drop-shadow(-2px -2px 5px rgba(0, 0, 0, 0.25));
  }
`;

const OrnamentalStamp = styled(motion.div)`
  position: absolute;
  top: -24px;
  right: -24px;
  width: 90px;
  height: 90px;
  background: #fdfcf0;
  border: 1px solid rgba(167, 107, 83, 0.32);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
  box-shadow: 
    0 4px 10px rgba(0, 0, 0, 0.04),
    1px 1px 0px #eae3d8;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const FormTitle = styled.h2`
  font-family: 'Playfair Display', serif;
  font-size: 1.95rem;
  font-weight: 500;
  color: #fdfcf0;
  margin-bottom: 2.2rem;
  text-align: center;
  position: relative;
  
  &::after {
    content: '';
    display: block;
    width: 45px;
    height: 1.5px;
    background-color: #fbebe1;
    margin: 12px auto 0;
  }
`;

const FormFields = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const RowFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.8rem;
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 2.2rem;
  }
`;

// Input focus animation elements
const FocusUnderline = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background-color: #ffffff;
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateX(-50%);
  z-index: 5;
`;

const FieldGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  font-family: 'Inter', sans-serif;
  font-size: 0.96rem;
  padding: 1.05rem 1rem 0.58rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.06);
  color: #fdfcf0;
  outline: none;
  transition: all 0.3s ease;
  width: 100%;
  
  &::placeholder {
    color: transparent;
  }
  
  &:focus {
    border-color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.04);
  }
  
  &:focus ~ ${FocusUnderline} {
    width: 100%;
  }
`;

const FloatingLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(253, 252, 240, 0.65);
  transition: all 0.25s ease;
  pointer-events: none;
  background-color: transparent;
  padding: 0 4px;
  
  ${Input}:focus ~ &,
  ${Input}:not(:placeholder-shown) ~ & {
    top: 0px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #fdfcf0;
    text-transform: uppercase;
    background-color: #a76b53;
  }
`;

const Select = styled.select`
  font-family: 'Inter', sans-serif;
  font-size: 0.96rem;
  padding: 1.05rem 1rem 0.58rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.06);
  color: #fdfcf0;
  outline: none;
  transition: all 0.3s ease;
  cursor: pointer;
  width: 100%;
  
  &:focus {
    border-color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.04);
  }
  
  &:focus ~ ${FocusUnderline} {
    width: 100%;
  }

  option {
    background-color: #a76b53;
    color: #fdfcf0;
  }
`;

const SelectLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 0px;
  transform: translateY(-50%) scale(0.9);
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.8px;
  color: #fdfcf0;
  text-transform: uppercase;
  background-color: #a76b53;
  padding: 0 4px;
  pointer-events: none;
  transition: all 0.25s ease;
`;

const TextArea = styled.textarea`
  font-family: 'Inter', sans-serif;
  font-size: 0.96rem;
  padding: 1.15rem 1rem 0.65rem 1rem;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.06);
  color: #fdfcf0;
  outline: none;
  min-height: 115px;
  resize: none;
  transition: all 0.3s ease;
  width: 100%;
  
  &::placeholder {
    color: transparent;
  }
  
  &:focus {
    border-color: #ffffff;
    background-color: rgba(255, 255, 255, 0.12);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.04);
  }
  
  &:focus ~ ${FocusUnderline} {
    width: 100%;
  }
`;

const FloatingTextAreaLabel = styled.label`
  position: absolute;
  left: 12px;
  top: 22px;
  transform: translateY(-50%);
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 500;
  color: rgba(253, 252, 240, 0.65);
  transition: all 0.25s ease;
  pointer-events: none;
  background-color: transparent;
  padding: 0 4px;
  
  ${TextArea}:focus ~ &,
  ${TextArea}:not(:placeholder-shown) ~ & {
    top: 0px;
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.8px;
    color: #fdfcf0;
    text-transform: uppercase;
    background-color: #a76b53;
  }
`;

const SubmitButton = styled(motion.button)`
  background-color: #fdfcf0;
  color: #a76b53;
  border: none;
  border-radius: 4px;
  padding: 1.05rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(167, 107, 83, 0.15), transparent);
    transition: all 0.6s ease;
  }
  
  &:hover {
    background-color: #ffffff;
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.18);
    
    &::before {
      left: 100%;
    }

    svg {
      transform: translateX(4px) translateY(-2px) rotate(-15deg);
    }
  }
  
  &:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  svg {
    transition: transform 0.3s ease;
  }
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
  
  @media (min-width: 1101px) {
    grid-template-rows: repeat(4, 1fr);
    height: 100%;
  }
`;

const CardArchSvg = styled.div`
  position: absolute;
  right: 16px;
  bottom: 0;
  width: 44px;
  height: 60px;
  opacity: 0.05;
  color: #a76b53;
  pointer-events: none;
  transition: all 0.35s ease;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const DecorativeBow = styled.div`
  position: absolute;
  top: 6px;
  left: 8px;
  width: 32px;
  height: 32px;
  opacity: 0.12;
  color: #a76b53;
  pointer-events: none;
  z-index: 1;
  transition: all 0.3s ease;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const DecorativeFloral = styled.div`
  position: absolute;
  bottom: 6px;
  right: 8px;
  width: 38px;
  height: 38px;
  opacity: 0.12;
  color: #a76b53;
  pointer-events: none;
  z-index: 1;
  transition: all 0.3s ease;
  
  svg {
    width: 100%;
    height: 100%;
  }
`;

const SparkleDecoration = styled(motion.div)`
  position: absolute;
  color: #a76b53;
  pointer-events: none;
  z-index: 5;
`;

const IconWrapper = styled.div`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background-color: ${props => `${props.$color}12`};
  color: ${props => props.$color};
  transition: all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const InfoCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(167, 107, 83, 0.2);
  padding: 8px;
  box-shadow: 
    0 10px 30px rgba(167, 107, 83, 0.05),
    0 4px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
    
  @media (min-width: 1101px) {
    height: 100%;
  }
    
  &:hover {
    border-color: rgba(167, 107, 83, 0.6);
    box-shadow: 
      0 0 25px rgba(167, 107, 83, 0.25),
      0 15px 35px rgba(167, 107, 83, 0.15),
      0 6px 15px rgba(0, 0, 0, 0.06);
      
    .card-arch {
      opacity: 0.12;
      transform: translateY(-3px) scale(1.05);
    }
    
    ${DecorativeBow}, ${DecorativeFloral} {
      opacity: 0.25;
    }
    
    ${IconWrapper} {
      background-color: #a76b53;
      color: #fdfcf0;
      transform: scale(1.1) rotate(8deg);
      box-shadow: 0 4px 12px rgba(167, 107, 83, 0.25);
    }
  }
`;

const InfoInner = styled.div`
  border: 1px solid rgba(167, 107, 83, 0.45);
  border-radius: 4px;
  padding: 1.2rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  
  @media (min-width: 1101px) {
    height: 100%;
  }

  ${InfoCard}:hover & {
    border-color: #a76b53;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  z-index: 5;
`;

const InfoLabel = styled.span`
  font-family: 'Inter', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: #a76b53;
`;

const InfoValue = styled.span`
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 500;
  color: #2f2622;
`;

// Map card styling
const MapCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(167, 107, 83, 0.2);
  padding: 8px;
  box-shadow: 
    0 10px 30px rgba(167, 107, 83, 0.05),
    0 4px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    
  @media (min-width: 1101px) {
    flex-grow: 1;
    height: 100%;
  }
  
  @media (max-width: 1100px) {
    height: 260px;
  }

  &:hover {
    border-color: rgba(167, 107, 83, 0.6);
    box-shadow: 
      0 0 25px rgba(167, 107, 83, 0.25),
      0 15px 35px rgba(167, 107, 83, 0.15),
      0 6px 15px rgba(0, 0, 0, 0.06);
    
    iframe {
      filter: sepia(0) contrast(1.02) brightness(1);
    }
  }
`;

const MapInnerBorder = styled.div`
  border: 1px solid rgba(167, 107, 83, 0.45);
  border-radius: 4px;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${MapCard}:hover & {
    border-color: #a76b53;
  }
`;

const MapFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  filter: sepia(0.18) contrast(1.05) brightness(0.97);
  border-radius: 2px;
  transition: filter 0.5s ease;
`;

const MapCaption = styled.div`
  position: absolute;
  left: 14px;
  bottom: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  background: #fdfcf0;
  border: 1px solid rgba(167, 107, 83, 0.22);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 0.8rem;
  color: #2f2622;
  display: flex;
  align-items: center;
  gap: 6px;
  z-index: 10;
`;

// Social section styling
const SocialCard = styled.div`
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  border-radius: 8px;
  border: 1px solid rgba(167, 107, 83, 0.2);
  padding: 8px;
  box-shadow: 
    0 10px 30px rgba(167, 107, 83, 0.05),
    0 4px 10px rgba(0, 0, 0, 0.02);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    border-color: rgba(167, 107, 83, 0.6);
    box-shadow: 
      0 0 25px rgba(167, 107, 83, 0.25),
      0 15px 35px rgba(167, 107, 83, 0.15),
      0 6px 15px rgba(0, 0, 0, 0.06);
  }
`;

const SocialInner = styled.div`
  border: 1px solid rgba(167, 107, 83, 0.25);
  border-radius: 6px;
  padding: 2.2rem 1.7rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  ${SocialCard}:hover & {
    border-color: #a76b53;
  }
`;

const SocialTitle = styled.h3`
  font-family: 'Playfair Display', serif;
  font-size: 1.4rem;
  font-weight: 500;
  color: #2f2622;
  margin-bottom: 6px;
`;

const SocialSubtitle = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #6a605a;
  margin-bottom: 1.8rem;
`;

const SocialRow = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: center;
`;

const SocialButton = styled(motion.a)`
  position: relative;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #fdfcf0;
  color: #a76b53;
  border: 1px solid rgba(167, 107, 83, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.$hoverColor};
    color: white;
    border-color: ${props => props.$hoverColor};
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
    
    .tooltip {
      opacity: 1;
      transform: translate(-50%, -115%) scale(1);
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translate(-50%, -100%) scale(0.95);
  transform-origin: bottom center;
  background: white;
  border: 1px solid rgba(167, 107, 83, 0.15);
  padding: 8px 12px;
  border-radius: 6px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  color: #2f2622;
  font-family: 'Inter', sans-serif;
  font-size: 0.78rem;
  opacity: 0;
  pointer-events: none;
  transition: all 0.2s ease;
  width: max-content;
  z-index: 100;
  
  span {
    display: block;
    font-weight: 500;
    color: #6a605a;
    font-size: 0.7rem;
    text-transform: uppercase;
  }
  
  strong {
    display: block;
    font-weight: 700;
    margin-top: 2px;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: white;
  }
`;

export default BookEvent;
