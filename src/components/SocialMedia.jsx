import { AnimatePresence, motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { useState } from 'react';
import styled from 'styled-components';

const WhatsAppIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const socials = [
  {
    name: 'Instagram',
    Icon: Instagram,
    url: 'https://instagram.com/happyfeet',
    handle: '@happyfeet',
    cta: 'Follow',
    gradient: 'linear-gradient(135deg, #ec4899, #ef4444, #f59e0b)',
    accent: '#ec4899',
  },
  {
    name: 'Facebook',
    Icon: Facebook,
    url: 'https://facebook.com/happyfeet',
    handle: '@happyfeet',
    cta: 'Follow',
    gradient: 'linear-gradient(135deg, #2563eb, #60a5fa)',
    accent: '#3b82f6',
  },
  {
    name: 'WhatsApp',
    Icon: WhatsAppIcon,
    url: 'https://wa.me/919876543210',
    handle: '+91 98765 43210',
    cta: 'Chat',
    gradient: 'linear-gradient(135deg, #22c55e, #4ade80)',
    accent: '#22c55e',
  },
  {
    name: 'LinkedIn',
    Icon: Linkedin,
    url: 'https://linkedin.com/company/happyfeet',
    handle: 'happyfeet',
    cta: 'Follow',
    gradient: 'linear-gradient(135deg, #1d4ed8, #3b82f6)',
    accent: '#2563eb',
  },
  {
    name: 'YouTube',
    Icon: Youtube,
    url: 'https://youtube.com/happyfeet',
    handle: '@happyfeet',
    cta: 'Subscribe',
    gradient: 'linear-gradient(135deg, #dc2626, #ef4444)',
    accent: '#ef4444',
  },
];

const Section = styled.section`
  padding: 5rem 1rem;
  position: relative;
  overflow: hidden;
`;

const Header = styled(motion.div)`
  text-align: center;
  max-width: 52rem;
  margin: 0 auto 3.5rem;
`;

const Badge = styled(motion.span)`
  display: inline-block;
  padding: 0.55rem 1.15rem;
  border-radius: 999px;
  background: rgba(34, 193, 195, 0.12);
  color: #22c1c3;
  font-weight: 800;
  font-size: 0.82rem;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  font-size: clamp(2.2rem, 4vw, 3.1rem);
  font-weight: 950;
  color: #111827;
  margin: 0 0 0.8rem;
`;

const GradientWord = styled.span`
  background: linear-gradient(135deg, #22c1c3, #ec4899);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #64748b;
  font-size: 1.05rem;
  line-height: 1.7;
`;

const Wrap = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.25rem;
`;

const SocialLink = styled(motion.a)`
  position: relative;
  text-decoration: none;
  color: inherit;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;

  &:hover .social-ring {
    opacity: 1;
  }

  &:hover .softFill {
    opacity: 0.12;
  }

  &:hover .social-label {
    color: #111827;
  }
`;

const IconStack = styled.div`
  position: relative;
  width: 5.1rem;
  height: 5.1rem;

  @media (min-width: 768px) {
    width: 5.8rem;
    height: 5.8rem;
  }
`;

const Ring = styled(motion.div)`
  position: absolute;
  inset: -3px;
  border-radius: 999px;
  opacity: 0;
  z-index: 0;

  &::after {
    content: '';
    position: absolute;
    inset: 3px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.95);
  }
`;

const Circle = styled.div`
  position: relative;
  width: 5.1rem;
  height: 5.1rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.96);
  border: 2px solid rgba(148, 163, 184, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 16px 45px rgba(15, 23, 42, 0.08);
  overflow: hidden;
  z-index: 1;

  @media (min-width: 768px) {
    width: 5.8rem;
    height: 5.8rem;
  }
`;

const SoftFill = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
`;

const Ripple = styled(motion.div)`
  position: absolute;
  inset: 0;
  border-radius: 999px;
  pointer-events: none;
`;

const IconWrap = styled(motion.div)`
  position: relative;
  z-index: 2;
  color: rgba(100, 116, 139, 0.95);

  svg {
    width: 2rem;
    height: 2rem;
  }

  @media (min-width: 768px) {
    svg {
      width: 2.35rem;
      height: 2.35rem;
    }
  }
`;

const Label = styled(motion.span)`
  font-size: 0.92rem;
  font-weight: 750;
  color: #64748b;
`;

const Tooltip = styled(motion.div)`
  position: relative;
  width: max-content;
  max-width: 15rem;
  padding: 0.55rem 0.75rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(148, 163, 184, 0.35);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.18);
  font-weight: 850;
  letter-spacing: 0.2px;
  z-index: 25;
  backdrop-filter: blur(8px);
`;

const TooltipWrap = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: max-content;
  z-index: 25;
  pointer-events: none;
`;

const TooltipWrapTop = styled(TooltipWrap)`
  bottom: calc(100% + 14px);
`;

const TooltipWrapBottom = styled(TooltipWrap)`
  top: calc(100% + 14px);
`;

const TooltipTop = styled(Tooltip)`
  background: rgba(14, 165, 233, 0.95);
  color: #ffffff;

  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-top: 10px solid rgba(14, 165, 233, 0.95);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
`;

const TooltipBottom = styled(Tooltip)`
  background: rgba(220, 38, 38, 0.95);
  color: #ffffff;

  &::after {
    content: '';
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 10px solid rgba(220, 38, 38, 0.95);
    border-left: 7px solid transparent;
    border-right: 7px solid transparent;
  }
`;

const Deco = styled(motion.div)`
  position: absolute;
  border-radius: 999px;
  pointer-events: none;
  filter: blur(45px);
  opacity: 0.35;
`;

export const SocialMedia = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const [hovered, setHovered] = useState(null);

  return (
    <Section ref={ref}>
      <Deco
        style={{
          width: '260px',
          height: '260px',
          top: '-120px',
          left: '-100px',
          background: 'linear-gradient(135deg, rgba(34,193,195,0.55), rgba(236,72,153,0.35))',
        }}
        animate={{ y: [0, 14, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <Deco
        style={{
          width: '320px',
          height: '320px',
          bottom: '-150px',
          right: '-130px',
          background: 'linear-gradient(135deg, rgba(249,115,22,0.45), rgba(99,102,241,0.35))',
        }}
        animate={{ y: [0, -16, 0], scale: [1.05, 1, 1.05] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Header
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <Badge
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: 'spring' }}
        >
          Stay Connected
        </Badge>
        <Title>
          Follow Us on <GradientWord>Social Media</GradientWord>
        </Title>
        <Subtitle>
          Join our community and stay updated with our latest events, behind-the-scenes, and more!
        </Subtitle>
      </Header>

      <Wrap>
        {socials.map((social, index) => {
          const Icon = social.Icon;
          const isHovered = hovered === social.name;
          const isDimmed = hovered && hovered !== social.name;

          return (
            <SocialLink
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.25 + index * 0.1, type: 'spring', stiffness: 220, damping: 16 }}
              onHoverStart={() => setHovered(social.name)}
              onHoverEnd={() => setHovered(null)}
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.96 }}
              style={
                isDimmed
                  ? { filter: 'blur(2.5px)', transform: 'scale(0.92)', opacity: 0.65 }
                  : undefined
              }
            >
              <IconStack>
                <AnimatePresence>
                  {isHovered && (
                    <>
                      <TooltipWrapTop>
                        <TooltipTop
                          key="top"
                          initial={{ opacity: 0, y: 10, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.96 }}
                          transition={{ duration: 0.18 }}
                        >
                          {social.handle}
                        </TooltipTop>
                      </TooltipWrapTop>
                      <TooltipWrapBottom>
                        <TooltipBottom
                          key="bottom"
                          initial={{ opacity: 0, y: -10, scale: 0.92 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.96 }}
                          transition={{ duration: 0.18, delay: 0.03 }}
                        >
                          {social.cta}
                        </TooltipBottom>
                      </TooltipWrapBottom>
                    </>
                  )}
                </AnimatePresence>

                <Ring
                  className="social-ring"
                  style={{ background: social.gradient }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />

                <Circle>
                  <SoftFill style={{ background: social.gradient }} className="softFill" />

                <Ripple
                  initial={false}
                  whileHover={{
                    boxShadow: [
                      `0 0 0 0px ${social.accent}55`,
                      `0 0 0 24px ${social.accent}00`,
                    ],
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                />

                <IconWrap
                  whileHover={{ rotate: 360, color: social.accent }}
                  transition={{ duration: 0.65 }}
                  animate={{ y: [0, -2, 0] }}
                >
                  <Icon />
                </IconWrap>
                </Circle>
              </IconStack>

              <Label
                className="social-label"
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.55 + index * 0.08 }}
              >
                {social.name}
              </Label>
            </SocialLink>
          );
        })}
      </Wrap>
    </Section>
  );
};

export default SocialMedia;
