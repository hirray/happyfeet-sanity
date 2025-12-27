import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, MapPin, Users, Award } from "lucide-react";

const infoItems = [
  {
    icon: Calendar,
    label: "Established",
    value: "2010",
    iconBg: "rgba(255, 107, 107, 0.1)",
    iconColor: "hsl(10, 90%, 65%)",
    glow:
      "radial-gradient(circle at center, hsla(10, 90%, 65%, 0.22) 0%, transparent 70%)",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Vadodara, Gujarat, India",
    iconBg: "rgba(46, 204, 113, 0.08)",
    iconColor: "hsl(174, 72%, 45%)",
    glow:
      "radial-gradient(circle at center, hsla(174, 72%, 45%, 0.2) 0%, transparent 70%)",
  },
  {
    icon: Users,
    label: "Years of Experience",
    value: "15+",
    iconBg: "rgba(255, 193, 7, 0.1)",
    iconColor: "hsl(40, 95%, 55%)",
    glow:
      "radial-gradient(circle at center, hsla(40, 95%, 55%, 0.22) 0%, transparent 70%)",
  },
  {
    icon: Award,
    label: "Events Completed",
    value: "500+",
    iconBg: "rgba(155, 89, 182, 0.1)",
    iconColor: "hsl(270, 60%, 70%)",
    glow:
      "radial-gradient(circle at center, hsla(270, 60%, 70%, 0.22) 0%, transparent 70%)",
  },
];

export const CompanyInfo = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="company-info-modern-section">
      {/* Floating background decorations */}
      <motion.div
        className="company-info-bg-circle company-info-bg-circle-coral"
        animate={{ y: [0, 10, 0], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="company-info-bg-circle company-info-bg-circle-teal"
        animate={{ y: [0, -12, 0], opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="company-info-bg-strip"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="company-info-header"
      >
        <motion.span
          className="company-info-badge"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 18 }}
        >
          <span className="company-info-badge-dot" />
          Who We Are
        </motion.span>

        <motion.h2
          className="company-info-title"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          About <span className="text-gradient-primary">Happyfeet</span>
        </motion.h2>

        <motion.p
          className="company-info-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.7 }}
        >
          We are a passionate team dedicated to creating extraordinary events that leave
          lasting impressions. From beautiful Parties to amazing fiestas, we bring your
          vision to life with creativity, care, and a touch of magic.
        </motion.p>
      </motion.div>

      {/* Info cards */}
      <div className="company-info-grid">
        {infoItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 50, scale: 0.85 }}
              animate={
                isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.85 }
              }
              transition={{
                delay: 0.3 + index * 0.15,
                type: "spring",
                stiffness: 120,
                damping: 18,
              }}
              whileHover={{
                y: -10,
                rotateX: 3,
                rotateY: -3,
                boxShadow: "0 22px 45px -18px rgba(255, 107, 74, 0.3)",
              }}
              className="company-info-card"
            >
              <div className="company-info-card-inner">
                {/* Background decoration */}
                <motion.div
                  className="company-info-card-glow"
                  style={{ background: item.glow }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={
                    isInView
                      ? {
                          opacity: 0.35,
                          scale: 1,
                        }
                      : { opacity: 0, scale: 0.9 }
                  }
                  transition={{
                    delay: 0.4 + index * 0.1,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="company-info-icon"
                  style={{ backgroundColor: item.iconBg, color: item.iconColor }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                >
                  <Icon className="company-info-icon-symbol" />
                </motion.div>

                {/* Content */}
                <motion.h3
                  className="company-info-value"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                >
                  {item.value}
                </motion.h3>
                <p className="company-info-label">
                  {item.label}
                </p>

                {/* Animated border */}
                <motion.div
                  className="company-info-card-border"
                  initial={{ width: 0, x: "-100%" }}
                  animate={isInView ? { width: "100%", x: 0 } : {}}
                  transition={{
                    delay: 0.9 + index * 0.1,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
