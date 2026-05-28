import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const FloatingNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLandingPage = useMemo(() => {
    return location.pathname === '/' || location.pathname === '/home';
  }, [location.pathname]);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!isLandingPage) {
      setIsScrolled(true);
      return;
    }

    setIsScrolled(window.scrollY > 20);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  // Handle body scroll locking when mobile menu is open
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Book Event', to: '/book-event' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Kits', to: '/kits' },
    { label: 'Games', to: '/games' },
    { label: 'Activity', to: '/activity' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/about#contact-section' },
  ];

  const handleLinkClick = (to) => {
    setMobileOpen(false);
    if (to.includes('#')) {
      const [path, hash] = to.split('#');
      navigate(path);
      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      navigate(to);
    }
  };

  return (
    <>
      <HeaderContainer $scrolled={isScrolled}>
        <HeaderLogo onClick={() => navigate('/')}>
          <LogoImage src="/logo-white.png" alt="Happy Feet Logo" $scrolled={isScrolled} />
        </HeaderLogo>

        <HeaderMenu>
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.to ||
              (link.to === '/' && location.pathname === '/home');
            return (
              <HeaderLink
                key={link.label}
                onClick={() => handleLinkClick(link.to)}
                $active={isActive}
              >
                {link.label}
              </HeaderLink>
            );
          })}
        </HeaderMenu>

        <HeaderAction onClick={() => navigate('/book-event')} $scrolled={isScrolled}>
          BOOK YOUR EVENT <ArrowRight size={14} style={{ marginLeft: '6px' }} />
        </HeaderAction>

        {/* Mobile Toggle Button */}
        <MobileToggle
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          $scrolled={isScrolled}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </MobileToggle>

        <NavbarCurve $scrolled={isScrolled}>
          <svg viewBox="0 0 1440 38" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path d="M0,0 L1440,0 L1440,10 C1250,38 1050,4 850,25 C650,42 450,8 250,30 C120,40 0,22 0,10 Z" fill="rgba(158, 99, 78, 0.95)" />
          </svg>
        </NavbarCurve>
      </HeaderContainer>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <MobileOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <MobileDrawer
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <DrawerHeader>
                <DrawerLogo onClick={() => { setMobileOpen(false); navigate('/'); }}>
                  <DrawerLogoImage src="/logo-white.png" alt="Happy Feet Logo" />
                </DrawerLogo>
                <CloseButton onClick={() => setMobileOpen(false)} aria-label="Close menu">
                  <X size={26} />
                </CloseButton>
              </DrawerHeader>

              <DrawerLinks>
                {navLinks.map((link, index) => {
                  const isActive =
                    location.pathname === link.to ||
                    (link.to === '/' && location.pathname === '/home');
                  return (
                    <DrawerLinkWrapper
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <DrawerLink
                        onClick={() => handleLinkClick(link.to)}
                        $active={isActive}
                      >
                        {link.label}
                      </DrawerLink>
                    </DrawerLinkWrapper>
                  );
                })}
              </DrawerLinks>

              <DrawerFooter
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <DrawerAction onClick={() => { setMobileOpen(false); navigate('/book-event'); }}>
                  BOOK YOUR EVENT <ArrowRight size={16} style={{ marginLeft: '8px' }} />
                </DrawerAction>
              </DrawerFooter>
            </MobileDrawer>
          </MobileOverlay>
        )}
      </AnimatePresence>
    </>
  );
};

// --- Styled Components ---

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.$scrolled ? '0.9rem 4.5rem 0.2rem 4.5rem' : '1.5rem 4.5rem 1.1rem 4.5rem'};
  background: ${props => props.$scrolled ? 'rgba(158, 99, 78, 0.95)' : 'transparent'};
  backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  -webkit-backdrop-filter: ${props => props.$scrolled ? 'blur(10px)' : 'none'};
  box-shadow: ${props => props.$scrolled ? '0 4px 20px rgba(0, 0, 0, 0.12)' : 'none'};
  border-bottom: ${props => props.$scrolled ? '1px solid rgba(251, 235, 225, 0.12)' : '1px solid transparent'};
  z-index: 99999 !important;
  transition: all 0.4s ease;

  @media (max-width: 1024px) {
    padding: ${props => props.$scrolled ? '0.7rem 2rem 0.15rem 2rem' : '1.3rem 2rem 0.9rem 2rem'};
  }

  @media (max-width: 968px) {
    padding: ${props => props.$scrolled ? '0.6rem 1.5rem 0.12rem 1.5rem' : '1.0rem 1.5rem 0.7rem 1.5rem'};
  }
`;

const HeaderLogo = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
  z-index: 10;
`;

const LogoImage = styled.img`
  height: ${props => props.$scrolled ? '54px' : '68px'};
  width: auto;
  display: block;
  object-fit: contain;
  transition: height 0.4s ease;

  @media (max-width: 968px) {
    height: ${props => props.$scrolled ? '48px' : '58px'};
  }

  @media (max-width: 480px) {
    height: ${props => props.$scrolled ? '38px' : '46px'};
  }
`;

const HeaderMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 2.2rem;

  @media (max-width: 968px) {
    display: none;
  }
`;

const HeaderLink = styled.button`
  background: transparent;
  border: none;
  font-family: 'Inter', sans-serif;
  font-size: 1.02rem;
  font-weight: 600;
  color: #fbebe1;
  cursor: pointer;
  padding: 4px 0;
  position: relative;
  transition: opacity 0.2s ease;
  opacity: ${props => props.$active ? 1 : 0.8};
  text-shadow: 
    1px 1px 0px #4a2114,
    2px 2px 0px #4a2114,
    3px 3px 0px #4a2114,
    4px 4px 5px rgba(0, 0, 0, 0.65);

  &:hover {
    opacity: 1;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: ${props => props.$active ? '100%' : '0'};
    height: 1.5px;
    background-color: #fbebe1;
    transition: width 0.25s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const HeaderAction = styled.button`
  background: transparent;
  color: #fbebe1;
  border: 1px solid rgba(251, 235, 225, 0.4);
  border-radius: 30px;
  padding: ${props => props.$scrolled ? '0.48rem 1.15rem' : '0.62rem 1.4rem'};
  font-family: 'Inter', sans-serif;
  font-size: ${props => props.$scrolled ? '0.84rem' : '0.88rem'};
  font-weight: 700;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.4s ease;
  letter-spacing: 0.8px;
  text-shadow: 
    1px 1px 0px #4a2114,
    2px 2px 0px #4a2114,
    3px 3px 0px #4a2114,
    4px 4px 5px rgba(0, 0, 0, 0.65);

  &:hover {
    background: #fbebe1;
    color: #9e634e;
    border-color: #fbebe1;
    transform: translateY(-1px);
    text-shadow: none;
  }

  @media (max-width: 968px) {
    display: none;
  }
`;

const MobileToggle = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: #fbebe1;
  cursor: pointer;
  padding: 8px;
  z-index: 10;
  transition: transform 0.2s ease;
  text-shadow: 
    1px 1px 0px #4a2114,
    2px 2px 0px #4a2114,
    3px 3px 4px rgba(0, 0, 0, 0.5);

  &:active {
    transform: scale(0.9);
  }

  @media (max-width: 968px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const NavbarCurve = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 38px;
  pointer-events: none;
  z-index: 99999;
  opacity: ${props => props.$scrolled ? 1 : 0};
  transition: opacity 0.4s ease;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

// --- Mobile Drawer Styled Components ---

const MobileOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(47, 38, 34, 0.45);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 999999;
  display: flex;
  justify-content: flex-end;
`;

const MobileDrawer = styled(motion.div)`
  width: 100%;
  max-width: 380px;
  height: 100%;
  background-color: #9e634e; /* Luxury terracotta brand color */
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  padding: 2rem 2.5rem;
  overflow-y: auto;
  border-left: 1px solid rgba(251, 235, 225, 0.15);
  
  @media (max-width: 480px) {
    max-width: 100%;
    padding: 1.5rem 1.8rem;
  }
`;

const DrawerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3.5rem;
`;

const DrawerLogo = styled.div`
  cursor: pointer;
`;

const DrawerLogoImage = styled.img`
  height: 52px;
  width: auto;
  object-fit: contain;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  color: #fbebe1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: rgba(251, 235, 225, 0.1);
  }
`;

const DrawerLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
`;

const DrawerLinkWrapper = styled(motion.div)``;

const DrawerLink = styled.button`
  background: transparent;
  border: none;
  font-family: 'Playfair Display', serif;
  font-size: 1.6rem;
  font-weight: 500;
  color: #fbebe1;
  cursor: pointer;
  text-align: left;
  padding: 6px 0;
  position: relative;
  opacity: ${props => props.$active ? 1 : 0.85};
  text-shadow: 
    1px 1px 0px #4a2114,
    2px 2px 0px #4a2114,
    3px 3px 8px rgba(0, 0, 0, 0.4);
  transition: opacity 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$active ? '40px' : '0'};
    height: 2px;
    background-color: #fbebe1;
    transition: width 0.25s ease;
  }

  &:hover {
    opacity: 1;
    &::after {
      width: 40px;
    }
  }
`;

const DrawerFooter = styled(motion.div)`
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(251, 235, 225, 0.15);
`;

const DrawerAction = styled.button`
  width: 100%;
  background: #fbebe1;
  color: #9e634e;
  border: none;
  border-radius: 30px;
  padding: 1.1rem;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 750;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  letter-spacing: 0.8px;

  &:hover {
    background: white;
    transform: translateY(-2px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.22);
  }
`;

export default FloatingNavbar;
