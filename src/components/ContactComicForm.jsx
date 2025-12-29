import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Heart, MessageCircle, Send, Twitter } from 'lucide-react';
import emailjs from '@emailjs/browser';

const floatWiggle = keyframes`
  0% { transform: translateY(0px) rotate(-0.5deg); }
  50% { transform: translateY(-10px) rotate(0.8deg); }
  100% { transform: translateY(0px) rotate(-0.5deg); }
`;

const Section = styled.section`
  padding: 5.5rem 1rem 6.5rem;
  position: relative;
  overflow: hidden;
`;

const Wrap = styled.div`
  max-width: 68rem;
  margin: 0 auto;
  display: grid;
  gap: 2rem;
  align-items: center;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1.05fr;
    gap: 2.75rem;
  }
`;

const Left = styled(motion.div)`
  text-align: center;

  @media (min-width: 992px) {
    text-align: left;
  }
`;

const Badge = styled(motion.span)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.15rem;
  border-radius: 999px;
  background: rgba(34, 193, 195, 0.14);
  color: #0ea5a4;
  font-weight: 900;
  font-size: 0.85rem;
  border: 1px solid rgba(15, 23, 42, 0.10);
`;

const Title = styled.h2`
  margin: 1.1rem 0 0.8rem;
  font-weight: 950;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  letter-spacing: -0.02em;
  color: #0f172a;
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
  max-width: 40rem;

  @media (min-width: 992px) {
    max-width: 34rem;
  }
`;

const Points = styled.div`
  margin-top: 1.35rem;
  display: grid;
  gap: 0.75rem;
  color: #334155;
  font-weight: 650;
`;

const Point = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;

  span {
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 999px;
    background: #f97316;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.18);
  }
`;

const Right = styled(motion.div)`
  display: flex;
  justify-content: center;

  @media (min-width: 992px) {
    justify-content: flex-end;
  }
`;

const CardStack = styled.div`
  position: relative;
  width: min(420px, 100%);
  padding-right: 18px;
  padding-bottom: 18px;
`;

const ShadowCard = styled.div`
  position: absolute;
  inset: 14px 0 0 14px;
  background: #dc2626;
  border-radius: 1.6rem;
`;

const Card = styled(motion.div)`
  position: relative;
  background: #fff8e7;
  border: 3px solid #0f172a;
  border-radius: 1.6rem;
  box-shadow: 0 26px 55px rgba(15, 23, 42, 0.18);
  overflow: hidden;
  transform-origin: center;

  &:hover {
    animation: ${floatWiggle} 5.8s ease-in-out infinite;
  }
`;

const CardInner = styled.div`
  padding: 1.15rem 1.25rem 1.25rem;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const Avatar = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 999px;
  background: #60a5fa;
  border: 3px solid #0f172a;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LogoImg = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const NameStrip = styled(motion.div)`
  display: grid;
  gap: 0.35rem;
`;

const NameBar = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  padding: 0.35rem 0.75rem;
  border-radius: 0.7rem;
  background: #facc15;
  border: 2px solid #0f172a;
  transform: rotate(-2.5deg);
  font-weight: 950;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #0f172a;
`;

const Handle = styled.div`
  font-weight: 900;
  letter-spacing: 0.01em;
  color: #0f172a;
`;

const TextAreaWrap = styled.div`
  border: 3px solid #0f172a;
  border-radius: 1.1rem;
  background: #3b82f6;
  padding: 0.9rem;
  position: relative;
  overflow: hidden;
`;

const DotPattern = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.32;
  background-image: radial-gradient(#0f172a 1px, transparent 1px);
  background-size: 11px 11px;
`;

const Form = styled.form`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 0.8rem;
`;

const Row = styled.div`
  display: grid;
  gap: 0.8rem;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 2px solid rgba(15, 23, 42, 0.65);
  border-radius: 0.85rem;
  padding: 0.85rem 0.9rem;
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
  font-weight: 700;
  outline: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 0 0 6px rgba(250, 204, 21, 0.35);
    transform: translateY(-1px);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 130px;
  border: 2px solid rgba(15, 23, 42, 0.65);
  border-radius: 0.85rem;
  padding: 0.85rem 0.9rem;
  background: rgba(255, 255, 255, 0.96);
  color: #0f172a;
  font-weight: 700;
  outline: none;
  resize: vertical;
  transition: transform 0.15s ease, box-shadow 0.2s ease;

  &:focus {
    box-shadow: 0 0 0 6px rgba(250, 204, 21, 0.35);
    transform: translateY(-1px);
  }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.85rem;
  padding: 1rem 1.1rem 1.1rem;
`;

const IconTray = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const IconButton = styled(motion.button)`
  width: 52px;
  height: 52px;
  border-radius: 1rem;
  border: 3px solid #0f172a;
  background: #facc15;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    width: 22px;
    height: 22px;
    color: #0f172a;
  }
`;

const Submit = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.05rem;
  border-radius: 1rem;
  border: 3px solid #0f172a;
  background: #22c1c3;
  color: #0f172a;
  font-weight: 950;
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Success = styled(motion.div)`
  margin-top: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: 2px solid rgba(15, 23, 42, 0.18);
  background: rgba(34, 197, 94, 0.12);
  color: #166534;
  font-weight: 800;
  width: fit-content;
`;

const ErrorMsg = styled(motion.div)`
  margin-top: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 1rem;
  border: 2px solid rgba(15, 23, 42, 0.18);
  background: rgba(220, 38, 38, 0.12);
  color: #991b1b;
  font-weight: 800;
  width: fit-content;
`;

const Spark = styled(motion.div)`
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: rgba(250, 204, 21, 0.9);
  filter: blur(0.2px);
  pointer-events: none;
`;

export const ContactComicForm = () => {
  const [values, setValues] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const onChange = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }));
    if (sent) setSent(false);
    if (error) setError('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setError('Email service is not configured yet. Please try again later.');
      return;
    }

    if (sending) return;
    setSending(true);

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: 'happyfeet.website12@gmail.com',
          from_name: values.name,
          reply_to: values.email,
          phone: values.phone,
          message: values.message,
          source: 'AboutContact',
        },
        { publicKey }
      );
      setSent(true);
      setValues({ name: '', email: '', phone: '', message: '' });
    } catch (err) {
      setError('Failed to send. Please try again in a moment.');
    } finally {
      setSending(false);
    }
  };

  return (
    <Section>
      <Wrap>
        <Left
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
        >
          <Badge
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.05 }}
          >
            Let’s Talk
          </Badge>
          <Title>
            Contact <GradientWord>Happyfeet</GradientWord>
          </Title>
          <Subtitle>
            Tell us about your event, your vibe, your theme — we’ll turn it into a magical experience.
          </Subtitle>

          <Points>
            <Point
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.15, duration: 0.5 }}
            >
              <span /> Fast replies + friendly support
            </Point>
            <Point
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.25, duration: 0.5 }}
            >
              <span /> Custom themes, games & activities
            </Point>
            <Point
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ delay: 0.35, duration: 0.5 }}
            >
              <span /> Transparent pricing & planning
            </Point>
          </Points>

          <AnimatePresence>
            {sent && (
              <Success
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                Message sent! We’ll reach out soon.
              </Success>
            )}
            {!!error && (
              <ErrorMsg
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.98 }}
                transition={{ duration: 0.25 }}
              >
                {error}
              </ErrorMsg>
            )}
          </AnimatePresence>
        </Left>

        <Right
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
        >
          <CardStack>
            <ShadowCard />
            <Card
              initial={{ opacity: 0, y: 24, rotate: 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              whileHover={{ rotate: -0.8, y: -6 }}
            >
              <Spark
                style={{ top: 18, right: 28 }}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
              <Spark
                style={{ top: 80, right: 20, background: 'rgba(34,193,195,0.95)' }}
                animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
              />

              <CardInner>
                <TopRow>
                  <Avatar
                    whileHover={{ rotate: 6, scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  >
                    <LogoImg src="/logo.jpg" alt="Happyfeet" />
                  </Avatar>

                  <NameStrip>
                    <NameBar
                      initial={{ x: 10, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ delay: 0.1, duration: 0.45 }}
                    >
                      HAPPYFEET CREW
                    </NameBar>
                    <Handle>@happyfeet</Handle>
                  </NameStrip>
                </TopRow>

                <TextAreaWrap>
                  <DotPattern />
                  <Form onSubmit={onSubmit}>
                    <Row>
                      <Input
                        value={values.name}
                        onChange={onChange('name')}
                        placeholder="Your Name"
                        required
                      />
                      <Input
                        value={values.email}
                        onChange={onChange('email')}
                        placeholder="Email"
                        type="email"
                        required
                      />
                    </Row>

                    <Input
                      value={values.phone}
                      onChange={onChange('phone')}
                      placeholder="Phone (optional)"
                      inputMode="tel"
                    />

                    <Textarea
                      value={values.message}
                      onChange={onChange('message')}
                      placeholder="Your message…"
                      required
                    />

                    <Submit
                      type="submit"
                      disabled={sending}
                      whileHover={{ scale: 1.04, rotate: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 240, damping: 14 }}
                      style={{ opacity: sending ? 0.75 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}
                    >
                      {sending ? 'Sending…' : 'Send'}
                      <Send />
                    </Submit>
                  </Form>
                </TextAreaWrap>
              </CardInner>

              <BottomRow>
                <IconTray>
                  <IconButton
                    type="button"
                    whileHover={{ y: -3, rotate: -6, boxShadow: '0 16px 30px rgba(15,23,42,0.18)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart />
                  </IconButton>
                  <IconButton
                    type="button"
                    whileHover={{ y: -3, rotate: 6, boxShadow: '0 16px 30px rgba(15,23,42,0.18)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MessageCircle />
                  </IconButton>
                  <IconButton
                    type="button"
                    whileHover={{ y: -3, rotate: -4, boxShadow: '0 16px 30px rgba(15,23,42,0.18)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Twitter />
                  </IconButton>
                </IconTray>
              </BottomRow>
            </Card>
          </CardStack>
        </Right>
      </Wrap>
    </Section>
  );
};

export default ContactComicForm;
