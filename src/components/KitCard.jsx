import { motion } from "framer-motion";
import styled from "styled-components";
import { useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const cardSchemes = [
  {
    glow: "linear-gradient(135deg, rgba(255, 107, 107, 0.65), rgba(255, 159, 67, 0.45), rgba(249, 202, 36, 0.55))",
    border: "rgba(255, 107, 107, 0.35)",
    accent: "hsl(10, 90%, 65%)",
    bg: "linear-gradient(135deg, rgba(255, 107, 107, 0.18), rgba(255, 159, 67, 0.10), rgba(249, 202, 36, 0.18))",
  },
  {
    glow: "linear-gradient(135deg, rgba(34, 184, 207, 0.55), rgba(106, 176, 76, 0.45), rgba(165, 94, 234, 0.55))",
    border: "rgba(34, 184, 207, 0.30)",
    accent: "hsl(175, 70%, 45%)",
    bg: "linear-gradient(135deg, rgba(106, 176, 76, 0.16), rgba(72, 219, 251, 0.10), rgba(165, 94, 234, 0.16))",
  },
  {
    glow: "linear-gradient(135deg, rgba(165, 94, 234, 0.60), rgba(255, 159, 243, 0.45), rgba(255, 107, 107, 0.50))",
    border: "rgba(165, 94, 234, 0.30)",
    accent: "hsl(270, 60%, 70%)",
    bg: "linear-gradient(135deg, rgba(165, 94, 234, 0.16), rgba(255, 159, 243, 0.10), rgba(255, 107, 107, 0.16))",
  },
  {
    glow: "linear-gradient(135deg, rgba(249, 202, 36, 0.65), rgba(255, 159, 67, 0.45), rgba(255, 107, 107, 0.55))",
    border: "rgba(249, 202, 36, 0.30)",
    accent: "hsl(40, 95%, 55%)",
    bg: "linear-gradient(135deg, rgba(249, 202, 36, 0.16), rgba(255, 159, 67, 0.10), rgba(255, 107, 107, 0.16))",
  },
  {
    glow: "linear-gradient(135deg, rgba(72, 219, 251, 0.60), rgba(106, 176, 76, 0.40), rgba(165, 94, 234, 0.55))",
    border: "rgba(72, 219, 251, 0.28)",
    accent: "hsl(200, 80%, 60%)",
    bg: "linear-gradient(135deg, rgba(72, 219, 251, 0.16), rgba(106, 176, 76, 0.10), rgba(165, 94, 234, 0.16))",
  },
  {
    glow: "linear-gradient(135deg, rgba(255, 159, 243, 0.55), rgba(165, 94, 234, 0.45), rgba(106, 176, 76, 0.45))",
    border: "rgba(255, 159, 243, 0.30)",
    accent: "rgba(255, 159, 243, 1)",
    bg: "linear-gradient(135deg, rgba(255, 159, 243, 0.16), rgba(165, 94, 234, 0.10), rgba(106, 176, 76, 0.16))",
  },
];

const KitCard = ({ kit, index, raised = false, onHoverChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [popoutSide, setPopoutSide] = useState("right");
  const rootRef = useRef(null);
  const scheme = cardSchemes[index % cardSchemes.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      onMouseEnter={() => {
        try {
          const el = rootRef.current;
          if (el && typeof window !== "undefined") {
            const rect = el.getBoundingClientRect();
            const cardWidth = rect.width;
            const gap = 16;
            const popW = cardWidth * 0.92;

            const shouldOpenLeft = rect.right + gap + popW > window.innerWidth - 12;
            setPopoutSide(shouldOpenLeft ? "left" : "right");
          }
        } catch {
          setPopoutSide("right");
        }
        setIsHovered(true);
        onHoverChange?.(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        onHoverChange?.(false);
      }}
      style={{ width: "100%", position: "relative", zIndex: raised ? 950 : 1 }}
      ref={rootRef}
    >
      <Perspective>
        <PopoutWrap $side={popoutSide}>
          <motion.img
            src={kit.image}
            alt={kit.name}
            initial={false}
            animate={
              isHovered
                ? { opacity: 1, x: 0, scale: 1 }
                : {
                    opacity: 0,
                    x: popoutSide === "left" ? 20 : -20,
                    scale: 0.96,
                  }
            }
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </PopoutWrap>

        <motion.div
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{
            transformStyle: "preserve-3d",
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <Face style={{ backfaceVisibility: "hidden" }}>
            <Glow style={{ background: scheme.glow }} />
            <CardShell style={{ borderColor: scheme.border }}>
              <CardBg style={{ background: scheme.bg }} />
              <CardOverlay />
              <HoverBlur
                as={motion.div}
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />

              <CardContent>
                <ImageWrap
                  as={motion.div}
                  animate={isHovered ? {} : { scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <motion.div
                    style={{ position: "absolute", inset: 0, background: scheme.accent, opacity: 0.1 }}
                    animate={{ opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <img src={kit.image} alt={kit.name} />
                </ImageWrap>

                <InfoWrap>
                  <Dots>
                    {kit.colors.map((c, i) => (
                      <motion.div
                        key={i}
                        style={{ width: 14, height: 14, borderRadius: 9999, background: c, border: "2px solid white" }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.25 }}
                        transition={{ delay: 0.3 + i * 0.08 }}
                      />
                    ))}
                  </Dots>
                  <Name>{kit.name}</Name>
                  <Price style={{ color: scheme.accent }}>{kit.price}</Price>
                </InfoWrap>

                <Sparkle
                  as={motion.div}
                  style={{ color: scheme.accent }}
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles size={18} />
                </Sparkle>
              </CardContent>
            </CardShell>
          </Face>

          <Face style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
            <Glow style={{ background: scheme.glow }} />
            <CardShell style={{ borderColor: scheme.border }}>
              <CardBg style={{ background: scheme.bg }} />
              <BackOverlay />
              <HoverBlur
                as={motion.div}
                initial={false}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.25 }}
              />
              <BackContent>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isHovered ? 1 : 0 }}
                  transition={{ delay: 0.3 }}
                  style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}
                >
                  <Name style={{ marginBottom: 8 }}>{kit.name}</Name>
                  <Desc>{kit.description}</Desc>

                  <IncludesTitle>Includes:</IncludesTitle>
                  <Features>
                    {kit.features.map((f, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0 }}
                        transition={{ delay: 0.4 + i * 0.08 }}
                        style={{ display: "flex", alignItems: "center", gap: 8 }}
                      >
                        <Bullet style={{ background: scheme.accent }} />
                        <FeatureText>{f}</FeatureText>
                      </motion.div>
                    ))}
                  </Features>
                </motion.div>
              </BackContent>
            </CardShell>
          </Face>
        </motion.div>
      </Perspective>
    </motion.div>
  );
};

const Perspective = styled.div`
  position: relative;
  width: 100%;
  max-width: 310px;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
  perspective: 1000px;
  overflow: visible;
`;

const PopoutWrap = styled.div`
  position: absolute;
  top: 4%;
  left: ${(p) => (p.$side === "left" ? "auto" : "calc(100% + 16px)")};
  right: ${(p) => (p.$side === "left" ? "calc(100% + 16px)" : "auto")};
  width: 92%;
  height: 92%;
  z-index: 40;
  pointer-events: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 18px;
    box-shadow: 0 26px 80px rgba(27, 31, 59, 0.22);
    border: 2px solid rgba(255, 255, 255, 0.65);
  }

  @media (max-width: 900px) {
    display: none;
  }
`;

const Face = styled.div`
  position: absolute;
  inset: 0;
`;

const Glow = styled.div`
  position: absolute;
  inset: -10px;
  border-radius: 22px;
  filter: blur(14px);
  opacity: 0.55;
  transition: opacity 220ms ease, filter 220ms ease;

  ${Perspective}:hover & {
    opacity: 0.9;
    filter: blur(18px);
  }
`;

const CardShell = styled.div`
  position: absolute;
  inset: 0;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 18px 50px rgba(27, 31, 59, 0.12);
  border: 2px solid rgba(255, 255, 255, 0.45);
  transform: translateZ(0);
`;

const CardBg = styled.div`
  position: absolute;
  inset: 0;
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.62);
`;

const BackOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const HoverBlur = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  pointer-events: none;
`;

const CardContent = styled.div`
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ImageWrap = styled.div`
  height: 65%;
  position: relative;
  overflow: hidden;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const InfoWrap = styled.div`
  flex: 1;
  padding: 14px 14px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
  margin-bottom: 4px;
`;

const Name = styled.h3`
  font-size: 0.95rem;
  font-weight: 800;
  color: #2d3436;
  margin: 0;
  line-height: 1.2;
`;

const Price = styled.div`
  font-weight: 900;
  font-size: 0.9rem;
`;

const Sparkle = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
`;

const BackContent = styled.div`
  position: relative;
  height: 100%;
  padding: 16px;
`;

const Desc = styled.p`
  margin: 0 0 12px;
  font-size: 0.78rem;
  color: rgba(99, 110, 114, 1);
  line-height: 1.35;
`;

const IncludesTitle = styled.p`
  margin: 0 0 8px;
  font-size: 0.78rem;
  font-weight: 800;
  color: #2d3436;
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Bullet = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 9999px;
`;

const FeatureText = styled.span`
  font-size: 0.78rem;
  color: rgba(99, 110, 114, 1);
`;

export default KitCard;
