import { useEffect, useRef, useCallback, useState } from 'react';

const COLORS = [
  'hsl(0, 80%, 55%)',    // red
  'hsl(25, 95%, 55%)',   // orange
  'hsl(45, 100%, 60%)',  // yellow
  'hsl(140, 70%, 45%)',  // green
  'hsl(210, 90%, 55%)',  // blue
  'hsl(270, 70%, 60%)',  // purple
  'hsl(330, 80%, 65%)',  // pink
];

export const ParticleText = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef();
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => {
      setFontLoaded(true);
    });
  }, []);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !fontLoaded) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, rect.width, rect.height);

    const fontSize = Math.min(rect.width * 0.15, 150);
    ctx.fillStyle = '#000';
    ctx.font = `700 ${fontSize}px "Fredoka", "Comic Sans MS", cursive, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('HAPPYFEET', rect.width / 2, rect.height / 2);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const particles = [];
    const gap = 2;

    for (let y = 0; y < canvas.height; y += gap * dpr) {
      for (let x = 0; x < canvas.width; x += gap * dpr) {
        const index = (y * canvas.width + x) * 4;
        if (imageData.data[index + 3] > 100) {
          particles.push({
            x: x / dpr,
            y: y / dpr,
            originX: x / dpr,
            originY: y / dpr,
            size: Math.random() * 1.5 + 2.5,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            vx: 0,
            vy: 0,
          });
        }
      }
    }

    particlesRef.current = particles;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [fontLoaded]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, rect.width, rect.height);

    const mouse = mouseRef.current;
    const disturbRadius = 60;
    const returnSpeed = 0.12;
    const pushForce = 5;

    particlesRef.current.forEach((particle) => {
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < disturbRadius && distance > 0) {
        const force = (disturbRadius - distance) / disturbRadius;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * pushForce;
        particle.vy -= Math.sin(angle) * force * pushForce;
      }

      particle.vx += (particle.originX - particle.x) * returnSpeed;
      particle.vy += (particle.originY - particle.y) * returnSpeed;

      particle.vx *= 0.85;
      particle.vy *= 0.85;

      particle.x += particle.vx;
      particle.y += particle.vy;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
    });

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (fontLoaded) {
      initParticles();
      animate();
    }

    const handleResize = () => {
      if (fontLoaded) {
        initParticles();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [fontLoaded, initParticles, animate]);

  const handleMouseMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleMouseLeave = () => {
    mouseRef.current = { x: -1000, y: -1000 };
  };

  const handleTouchMove = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const touch = e.touches[0];
    mouseRef.current = {
      x: touch.clientX - rect.left,
      y: touch.clientY - rect.top,
    };
  };

  return (
    <div style={{ 
      position: 'relative', 
      width: '100%', 
      height: '400px', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      boxShadow: 'none',
      overflow: 'visible'
    }}>
      <canvas
        ref={canvasRef}
        style={{ 
          width: '100%', 
          height: '100%', 
          cursor: 'pointer',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          boxShadow: 'none',
          display: 'block',
          margin: '0 auto'
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseLeave}
      />
      <p style={{
        position: 'absolute',
        bottom: '1rem',
        color: '#636e72',
        fontSize: '0.875rem',
        fontWeight: '500',
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }}>
        ✨ Swipe or hover to play with the dots! ✨
      </p>
    </div>
  );
};
