import { motion } from "framer-motion";
import styled from "styled-components";
import KitCard from "./KitCard";
import { useCallback, useState } from "react";

const kits = [
  {
    id: 1,
    name: "Custom Canvas Paint Kit",
    description:
      "A cute paint-and-color set with a pre-printed art sheet, paint pots, and brush — perfect for quick creative fun.",
    price: "₹799",
    colors: ["#EC6F87", "#7DD3C0", "#C9A0DC", "#F5C842"],
    image: "/canvaskit2.jpg",
    features: ["1 Pre-Printed Art Sheet", "5 Mini Paint Pots", "1 Detail Brush", "Easy Step Guide"],
  },
  {
    id: 2,
    name: "Custom Slime Kit",
    description:
      "Everything you need to mix, stretch, and squish — with fun add-ins for crunchy and colorful slime textures.",
    price: "₹499",
    colors: ["#7DD3C0", "#F5C842", "#EC6F87", "#87CEEB"],
    image: "/slimekit.jpg",
    features: ["Clear Glue", "Activator (Borax)", "Foam Beads & Sprinkles", "Mixing Bowl & Stick"],
  },
  {
    id: 3,
    name: "DIY Jewelry Making Kit",
    description:
      "A trendy bling kit to create cute accessories and personalize items with colorful gems and pearl beads.",
    price: "₹649",
    colors: ["#C9A0DC", "#EC6F87", "#F5C842", "#7DD3C0"],
    image: "/jewllerykit3.jpg",
    features: ["Rhinestone Sticker Sheets", "Pearl & Color Beads", "Mini Storage Box", "Design Inspiration Card"],
  },
  {
    id: 4,
    name: "Candle Decorating Kit",
    description: "Decorate and personalize candles with bright colors and simple steps — great for gifting and events.",
    price: "₹899",
    colors: ["#F5C842", "#FFDAB9", "#EC6F87", "#C9A0DC"],
    image: "/candlekit.jpg",
    features: ["Assorted Candles", "Mini Paint Pots", "1 Paint Brush", "Decoration Steps Card"],
  },
  {
    id: 5,
    name: "Wooden Art Kit",
    description: "Paint and decorate adorable wooden cut-outs with colors and gem stickers for a super cute craft set.",
    price: "₹599",
    colors: ["#87CEEB", "#EC6F87", "#F5C842", "#7DD3C0"],
    image: "/labelkit.jpg",
    features: ["Wooden Cut-Out Shapes", "Gem Sticker Sheet", "Mini Paint Pots", "Brush Set"],
  },
  {
    id: 6,
    name: "woolen crafting kit",
    description:
      "Make a beautiful dreamcatcher-style craft using threads, beads, and feather cut-outs — fun and easy to assemble.",
    price: "₹999",
    colors: ["#C9A0DC", "#7DD3C0", "#87CEEB", "#EC6F87"],
    image: "/wollenkit.jpg",
    features: ["Wooden Hoop & Feather Pieces", "Color Threads", "Beads & Charms", "Assembly Guide"],
  },
];

const KitsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleHoverChange = useCallback((index, hovering) => {
    setActiveIndex(hovering ? index : null);
  }, []);

  return (
    <Section>
      {activeIndex !== null ? <PageBlurOverlay /> : null}
      <Inner>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Header>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <Eyebrow>✨ Our Collection ✨</Eyebrow>
            </motion.span>

            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Title>
                <TitleGradient>Pick Your</TitleGradient> Creative Kit
              </Title>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Sub>Hover over any kit to discover what's inside and start customizing!</Sub>
            </motion.p>
          </Header>
        </motion.div>

        <Grid>
          {kits.map((kit, index) => (
            <KitCard
              key={kit.id}
              kit={kit}
              index={index}
              raised={activeIndex === index}
              onHoverChange={(hovering) => handleHoverChange(index, hovering)}
            />
          ))}
        </Grid>
      </Inner>
    </Section>
  );
};

const Section = styled.section`
  padding: 6rem 1rem;
  position: relative;
  z-index: 10;
`;

const PageBlurOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 900;
  background: rgba(255, 255, 255, 0.10);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  pointer-events: none;
`;

const Inner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 4.25rem;
`;

const Eyebrow = styled.span`
  display: inline-block;
  font-weight: 800;
  margin-bottom: 1rem;
  color: hsl(10, 90%, 65%);
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
  background: linear-gradient(90deg, hsl(10, 90%, 65%), hsl(270, 60%, 70%), hsl(175, 70%, 45%));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
`;

const Sub = styled.p`
  margin: 0 auto;
  max-width: 40rem;
  font-size: 1.05rem;
  color: #636e72;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 34px;
  justify-items: center;

  @media (min-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

export default KitsSection;
