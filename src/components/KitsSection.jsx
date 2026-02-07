import { motion } from "framer-motion";
import styled from "styled-components";
import KitCard from "./KitCard";
import { useCallback, useState } from "react";

const kits = [
  {
    id: 1,
    name: "Painting Kits",
    description:
      "From canvas to candles, pots, blocks, glass and tote-bags — pick a painting style and create your own masterpiece.",
    price: "Starts from ₹499",
    colors: ["#EC6F87", "#7DD3C0", "#C9A0DC", "#F5C842"],
    image: "/candlekit.jpg",
    images: ["/candlekit.jpg", "/labelkit.jpg", "/potpaint.jpg"],
    features: ["Canvas Painting kit", "Candle Decorating kit", "Pot painting kit", "Block Painting kit","Glass Painting kit","Tote-Bag Painting kit"],
  },
  {
    id: 2,
    name: "DIY kits ",
    description:
      "Fun DIY projects you can finish at home — block painting, comb decor, string art, tie-dye, soap and slime making.",
    price: "Starts from ₹649",
    colors: ["#7DD3C0", "#F5C842", "#EC6F87", "#87CEEB"],
    image: "/blockpaint.jpg",
    images: ["/blockpaint.jpg", "/combdiy.jpg", "/stringdiy.jpg","/soapdiy.jpg"],
    features: ["DIY Block Painting kit", "DIY Comb Decoration kit", "DIY String Art kit", "Tie-Dye kit","Soap Making kit","Slime Making kit"],
  },
  {
    id: 3,
    name: "DIY Beading Kits",
    description:
      "Create your own accessories with beads — make keychains, bracelets, bands, jewellery and cute bag charms.",
    price: "Starts from ₹399",
    colors: ["#C9A0DC", "#EC6F87", "#F5C842", "#7DD3C0"],
    image: "/Beadkeychain.jpg",
    images: ["/Beadkeychain.jpg", "/beadbracelet.jpg", "/beadband.jpg"],
    features: ["DIY keychain kit", "DIY Bracelet kit", "DIY beading jwellery kit", "DIY Bagcharm Making kit"],
  },
  {
    id: 4,
    name: "DIY Crafting Kits",
    description: "Quick craft activities for creative hands — knoting, mirror decorating, shell scraping and pen stand making.",
    price: "Starts from ₹799",
    colors: ["#F5C842", "#FFDAB9", "#EC6F87", "#C9A0DC"],
    image: "/craftknoting.jpg",
    images: ["/craftknoting.jpg", "/craftmirror.jpg", "/craftshell.jpg"],
    features: ["DIY knoting kit", "DIY Mirror Decorating kit", "DIY ShellScraping kit", "DIY Pen Stand kit"],
  },
  {
    id: 5,
    name: "Texture Art Kits",
    description: "Explore texture art with different finishes — tissue, shell, paste and sand textures for a 3D look.",
    price: "Starts from ₹899",
    colors: ["#87CEEB", "#EC6F87", "#F5C842", "#7DD3C0"],
    image: "/texture1.jpg",
    images: ["/texture1.jpg", "/texture2.jpg", "/texture3.jpg","/texture4.jpg"],
    features: ["Tissue Texture Art kit", "Shell Texture Art kit", "Paste Texture Art kit ", "Sand Texture Art kit"],
  },
  {
    id: 6,
    name: "Resin Art kit",
    description:
      "Create glossy resin art pieces — molds, frames, bookmarks, jewellery and more with fun add-ons like flowers and shells.",
    price: "Starts from ₹999",
    colors: ["#C9A0DC", "#7DD3C0", "#87CEEB", "#EC6F87"],
    image: "/resinkit.jpg",
    images: ["/resinkeychain.jpg", "/resinframe.jpg", "/resincase.jpg"],
    features: ["Resin Mold Art kit", "Resin Frame Art kit", "Resin Bookmark kit", "Resin Jwellery Making kit","Flower Resin Art kit","Beads/Shell Resin Art kit"],
  },
];

const KitsSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleActiveChange = useCallback((index, active) => {
    setActiveIndex(active ? index : null);
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
              <Sub>Click any kit to discover what's inside and start customizing!</Sub>
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
              flipped={activeIndex === index}
              onActiveChange={(active) => handleActiveChange(index, active)}
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
