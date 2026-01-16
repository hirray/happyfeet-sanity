import { motion } from "framer-motion";
import styled from "styled-components";
import { useState } from "react";
import { Phone, MessageCircle, Mail, Instagram, MapPin, Send } from "lucide-react";

const contactMethods = [
  {
    icon: Phone,
    label: "Call Us",
    value: "+91 91735 00020",
    gradient: "linear-gradient(135deg, rgba(255, 107, 107, 1), rgba(255, 159, 67, 1))",
    tint: "linear-gradient(135deg, rgba(255, 107, 107, 0.16), rgba(255, 159, 67, 0.12))",
    shadow: "rgba(255, 107, 107, 0.30)",
    link: "tel:+91 9173500020",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 91735 00020",
    gradient: "linear-gradient(135deg, rgba(106, 176, 76, 1), rgba(72, 219, 251, 1))",
    tint: "linear-gradient(135deg, rgba(106, 176, 76, 0.14), rgba(72, 219, 251, 0.12))",
    shadow: "rgba(106, 176, 76, 0.26)",
    link: "https://wa.me/919173500020",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "happyfeet.website12@gmail.com",
    gradient: "linear-gradient(135deg, rgba(165, 94, 234, 1), rgba(255, 159, 243, 1))",
    tint: "linear-gradient(135deg, rgba(165, 94, 234, 0.14), rgba(255, 159, 243, 0.12))",
    shadow: "rgba(165, 94, 234, 0.26)",
    link: "mailto:happyfeet.website12@gmail.com",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@happyfeet_activityclub",
    gradient: "linear-gradient(135deg, rgba(255, 159, 67, 1), rgba(255, 107, 107, 1))",
    tint: "linear-gradient(135deg, rgba(255, 159, 67, 0.14), rgba(255, 107, 107, 0.12))",
    shadow: "rgba(255, 159, 67, 0.26)",
    link: "https://instagram.com/happyfeet_activityclub",
  },
];

const ContactSection = () => {
  const [isCollageHovered, setIsCollageHovered] = useState(false);

  return (
    <Section>
      <Inner>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <Header>
            <motion.div
              style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12 }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                💌
              </motion.div>
              <Eyebrow>Get In Touch</Eyebrow>
              <motion.div animate={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                💌
              </motion.div>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Title>
                Let's <TitleGradient>Connect</TitleGradient>
              </Title>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Sub>Have questions about customizing your kit? We'd love to hear from you!</Sub>
            </motion.p>
          </Header>
        </motion.div>

        <CardsGrid>
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={index}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30, rotateX: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.98 }}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <MethodCard $shadow={method.shadow} $gradient={method.gradient}>
                  <CardTint style={{ background: method.tint }} />

                  <motion.div whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
                    <IconPill style={{ background: method.gradient }}>
                      <Icon size={30} color="#ffffff" />
                    </IconPill>
                  </motion.div>

                  <MethodTitle>{method.label}</MethodTitle>
                  <MethodValue>{method.value}</MethodValue>

                  <SendIconWrap>
                    <Send size={16} color="rgba(99, 110, 114, 0.8)" />
                  </SendIconWrap>
                </MethodCard>
              </motion.a>
            );
          })}
        </CardsGrid>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <CalloutWrap>
            <CalloutGlow />
            <Callout>
              <CalloutGrid>
                <div>
                  <motion.h3
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <CalloutTitle>
                      <CalloutTitleGradient>Custom Orders</CalloutTitleGradient> Welcome! 🎨
                    </CalloutTitle>
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <CalloutText>
                      Want something special? We create completely custom kits for birthdays, events, and gifts. Let us know
                      your ideas!
                    </CalloutText>
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(99, 110, 114, 1)" }}
                  >
                    <MapPin size={18} color="hsl(10, 90%, 65%)" />
                    <span>Vadodara, Gujarat, India</span>
                  </motion.div>
                </div>

                <motion.div
                  className="flex flex-wrap gap-3 justify-center md:justify-end"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <Collage
                    as={motion.div}
                    onHoverStart={() => setIsCollageHovered(true)}
                    onHoverEnd={() => setIsCollageHovered(false)}
                  >
                    <CollageItem
                      as={motion.img}
                      src="/canvaskit2.jpg"
                      alt="Kit"
                      $pos="a"
                      animate={{
                        x: isCollageHovered ? -44 : 0,
                        y: isCollageHovered ? [-30, -36, -30] : [0, -6, 0],
                        scale: isCollageHovered ? 1.12 : 1,
                        rotate: isCollageHovered ? -16 : -6,
                      }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                    />
                    <CollageItem
                      as={motion.img}
                      src="/slimekit.jpg"
                      alt="Kit"
                      $pos="b"
                      animate={{
                        x: isCollageHovered ? 44 : 0,
                        y: isCollageHovered ? [-28, -34, -28] : [0, -5, 0],
                        scale: isCollageHovered ? 1.12 : 1,
                        rotate: isCollageHovered ? 16 : 7,
                      }}
                      transition={{ duration: 0.28, ease: "easeOut", delay: 0.02 }}
                    />
                    <CollageItem
                      as={motion.img}
                      src="/labelkit.jpg"
                      alt="Kit"
                      $pos="c"
                      animate={{
                        x: isCollageHovered ? -40 : 0,
                        y: isCollageHovered ? [34, 28, 34] : [0, -4, 0],
                        scale: isCollageHovered ? 1.12 : 1,
                        rotate: isCollageHovered ? 14 : 5,
                      }}
                      transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
                    />
                    <CollageItem
                      as={motion.img}
                      src="/candlekit.jpg"
                      alt="Kit"
                      $pos="d"
                      animate={{
                        x: isCollageHovered ? 40 : 0,
                        y: isCollageHovered ? [40, 34, 40] : [0, -6, 0],
                        scale: isCollageHovered ? 1.12 : 1,
                        rotate: isCollageHovered ? -14 : -5,
                      }}
                      transition={{ duration: 0.28, ease: "easeOut", delay: 0.06 }}
                    />
                  </Collage>
                </motion.div>
              </CalloutGrid>
            </Callout>
          </CalloutWrap>
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          style={{ textAlign: "center", marginTop: 64, paddingTop: 32, borderTop: "1px solid rgba(0,0,0,0.06)" }}
        >
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{ color: "rgba(99, 110, 114, 1)", margin: 0 }}
          >
            Made with 💖 by Happy Feet
          </motion.p>
        </motion.footer>
      </Inner>
    </Section>
  );
};

const Section = styled.section`
  padding: 6rem 1rem;
  position: relative;
  z-index: 10;
`;

const Inner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3.75rem;
`;

const Eyebrow = styled.span`
  color: hsl(10, 90%, 65%);
  font-weight: 800;
`;

const Title = styled.div`
  font-size: 2.25rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
  color: #2d3436;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const TitleGradient = styled.span`
  background: linear-gradient(90deg, hsl(175, 70%, 45%), hsl(200, 80%, 60%), hsl(270, 60%, 70%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Sub = styled.p`
  margin: 0 auto;
  max-width: 40rem;
  font-size: 1.05rem;
  color: rgba(99, 110, 114, 1);
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 18px;
  margin-bottom: 4rem;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 18px;
  }
`;

const MethodCard = styled.div`
  position: relative;
  background: white;
  border-radius: 22px;
  padding: 22px;
  box-shadow: 0 18px 60px rgba(27, 31, 59, 0.12);
  transition: box-shadow 220ms ease, transform 220ms ease;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: -2px;
    border-radius: 24px;
    background: ${(props) => props.$gradient};
    filter: blur(16px);
    opacity: 0;
    transition: opacity 240ms ease;
    pointer-events: none;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 22px;
    box-shadow: inset 0 0 0 2px rgba(255, 255, 255, 0.7);
    opacity: 0;
    transition: opacity 240ms ease;
    pointer-events: none;
  }

  &:hover {
    box-shadow: 0 26px 80px rgba(27, 31, 59, 0.16), 0 18px 60px ${props => props.$shadow};
  }

  &:hover::before {
    opacity: 0.25;
  }

  &:hover::after {
    opacity: 1;
  }
`;

const CardTint = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 240ms ease;

  ${MethodCard}:hover & {
    opacity: 0.10;
  }
`;

const IconPill = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 14px;
  box-shadow: 0 16px 50px rgba(27, 31, 59, 0.18);
  position: relative;
  z-index: 1;
`;

const MethodTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 1rem;
  font-weight: 900;
  color: #2d3436;
  position: relative;
  z-index: 1;
`;

const MethodValue = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: rgba(99, 110, 114, 1);
  position: relative;
  z-index: 1;
`;

const SendIconWrap = styled.div`
  position: absolute;
  top: 14px;
  right: 14px;
  opacity: 0;
  transition: opacity 220ms ease;
  z-index: 1;

  ${MethodCard}:hover & {
    opacity: 1;
  }
`;

const CalloutWrap = styled.div`
  position: relative;
`;

const CalloutGlow = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 26px;
  background: linear-gradient(
    90deg,
    rgba(255, 107, 107, 0.18),
    rgba(165, 94, 234, 0.18),
    rgba(106, 176, 76, 0.18)
  );
  filter: blur(18px);
`;

const Callout = styled.div`
  position: relative;
  border-radius: 26px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 22px 80px rgba(27, 31, 59, 0.12);

  @media (min-width: 768px) {
    padding: 44px;
  }
`;

const CalloutGrid = styled.div`
  display: grid;
  gap: 28px;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1.2fr 0.8fr;
  }
`;

const Collage = styled.div`
  width: 220px;
  height: 170px;
  position: relative;
  margin-left: auto;
  overflow: visible;
`;

const CollageItem = styled.img`
  position: absolute;
  width: 112px;
  height: 112px;
  object-fit: cover;
  border-radius: 18px;
  border: 2px solid rgba(255, 255, 255, 0.75);
  box-shadow: 0 22px 60px rgba(27, 31, 59, 0.18);

  ${(p) =>
    p.$pos === "a"
      ? "top: 0; left: 0;"
      : p.$pos === "b"
      ? "top: 16px; right: 0;"
      : p.$pos === "c"
      ? "bottom: 0; left: 16px;"
      : "bottom: 8px; right: 10px;"}

  @media (max-width: 420px) {
    width: 200px;
    height: 160px;
  }
`;

const CalloutTitle = styled.div`
  font-size: 1.6rem;
  font-weight: 900;
  color: #2d3436;
  margin-bottom: 12px;

  @media (min-width: 768px) {
    font-size: 2rem;
  }
`;

const CalloutTitleGradient = styled.span`
  background: linear-gradient(90deg, hsl(10, 90%, 65%), hsl(270, 60%, 70%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const CalloutText = styled.p`
  margin: 0 0 18px;
  color: rgba(99, 110, 114, 1);
  line-height: 1.5;
`;

export default ContactSection;
