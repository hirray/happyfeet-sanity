import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import { Heart, MessageCircle, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Section = styled.section`
  padding: 6rem 1rem 5.5rem;
  position: relative;
  overflow: hidden;
  background: #fdfcf0;
`;

const Wrap = styled.div`
  max-width: 68rem;
  margin: 0 auto;
  display: grid;
  gap: 2.5rem;
  align-items: center;

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1.05fr;
    gap: 3.5rem;
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
  padding: 0.4rem 1.2rem;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.08);
  color: #a76b53;
  font-weight: 600;
  font-size: 0.82rem;
`;

const Title = styled.h2`
  margin: 1.1rem 0 0.8rem;
  font-family: 'Playfair Display', serif;
  font-weight: 400;
  font-size: clamp(2.2rem, 4vw, 3.2rem);
  letter-spacing: -0.02em;
  color: #2c2a29;
`;

const GradientWord = styled.span`
  color: #a76b53;
  font-style: italic;
`;

const Subtitle = styled.p`
  margin: 0;
  color: #5c5957;
  font-size: 1.05rem;
  line-height: 1.7;
  max-width: 40rem;

  @media (min-width: 992px) {
    max-width: 34rem;
  }
`;

const Points = styled.div`
  margin-top: 1.5rem;
  display: grid;
  gap: 0.85rem;
  color: #5c5957;
  font-weight: 600;
`;

const Point = styled(motion.div)`
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;

  span {
    display: inline-block;
    width: 0.45rem;
    height: 0.45rem;
    border-radius: 999px;
    background: #a76b53;
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
  width: min(450px, 100%);
`;

const Card = styled(motion.div)`
  position: relative;
  background: #fbf9f4;
  border: 1px solid rgba(167, 107, 83, 0.22);
  border-radius: 4px;
  box-shadow: 0 16px 40px rgba(167, 107, 83, 0.04);
  overflow: hidden;
  transform-origin: center;
`;

const CardInner = styled.div`
  padding: 1.8rem 1.6rem;
`;

const TopRow = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const Avatar = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 999px;
  background: rgba(167, 107, 83, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border: 1px solid rgba(167, 107, 83, 0.22);
`;

const LogoImg = styled.img`
  width: 70%;
  height: 70%;
  object-fit: contain;
`;

const NameStrip = styled(motion.div)`
  display: grid;
  gap: 0.2rem;
`;

const NameBar = styled(motion.div)`
  font-family: 'Playfair Display', serif;
  font-size: 1.1rem;
  font-weight: 400;
  text-transform: uppercase;
  color: #2c2a29;
`;

const Handle = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #a76b53;
`;

const TextAreaWrap = styled.div`
  border-radius: 2px;
  position: relative;
  overflow: hidden;
`;

const Form = styled.form`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 1rem;
`;

const Row = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: 520px) {
    grid-template-columns: 1fr 1fr;
  }
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid rgba(167, 107, 83, 0.25);
  border-radius: 2px;
  padding: 0.85rem 1rem;
  background: #fdfcf0;
  color: #2c2a29;
  font-weight: 600;
  outline: none;
  font-size: 0.92rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #a76b53;
    background: #ffffff;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 130px;
  border: 1px solid rgba(167, 107, 83, 0.25);
  border-radius: 2px;
  padding: 0.85rem 1rem;
  background: #fdfcf0;
  color: #2c2a29;
  font-weight: 600;
  outline: none;
  resize: vertical;
  font-size: 0.92rem;
  transition: all 0.3s ease;

  &:focus {
    border-color: #a76b53;
    background: #ffffff;
  }
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const IconTray = styled.div`
  display: flex;
  gap: 0.75rem;
`;

const IconButton = styled(motion.button)`
  width: 44px;
  height: 44px;
  border-radius: 999px;
  border: 1px solid rgba(167, 107, 83, 0.22);
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #a76b53;
  transition: all 0.3s ease;

  &:hover {
    background: #a76b53;
    color: white;
  }

  svg {
    width: 18px;
    height: 18px;
  }
`;

const Submit = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.85rem 1.6rem;
  border-radius: 4px;
  border: 1px solid #a76b53;
  background: #a76b53;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 0.92rem;

  svg {
    width: 16px;
    height: 16px;
  }
`;

const Success = styled(motion.div)`
  margin-top: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 2px;
  border: 1px solid rgba(34, 197, 94, 0.22);
  background: rgba(34, 197, 94, 0.08);
  color: #166534;
  font-weight: 600;
  width: fit-content;
  font-size: 0.88rem;
`;

const ErrorMsg = styled(motion.div)`
  margin-top: 0.9rem;
  padding: 0.75rem 1rem;
  border-radius: 2px;
  border: 1px solid rgba(220, 38, 38, 0.22);
  background: rgba(220, 38, 38, 0.08);
  color: #991b1b;
  font-weight: 600;
  width: fit-content;
  font-size: 0.88rem;
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
          to_email: 'Happyfeetenterprises@gmail.com',
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
            <Card
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16 }}
              whileHover={{ y: -6 }}
            >
              <CardInner>
                <TopRow>
                  <Avatar
                    whileHover={{ scale: 1.04 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 14 }}
                  >
                    <LogoImg src="/logo.jpg" alt="Happyfeet" />
                  </Avatar>

                  <NameStrip>
                    <NameBar>
                      HAPPYFEET CREW
                    </NameBar>
                    <Handle>@happyfeet</Handle>
                  </NameStrip>
                </TopRow>

                <TextAreaWrap>
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

                    <BottomRow>
                      <IconTray>
                        <IconButton
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Heart />
                        </IconButton>
                        <IconButton
                          type="button"
                          whileHover={{ y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <MessageCircle />
                        </IconButton>
                      </IconTray>

                      <Submit
                        type="submit"
                        disabled={sending}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        style={{ opacity: sending ? 0.75 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}
                      >
                        {sending ? 'Sending…' : 'Send'}
                        <Send />
                      </Submit>
                    </BottomRow>
                  </Form>
                </TextAreaWrap>
              </CardInner>
            </Card>
          </CardStack>
        </Right>
      </Wrap>
    </Section>
  );
};

export default ContactComicForm;
