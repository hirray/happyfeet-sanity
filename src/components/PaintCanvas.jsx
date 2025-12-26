import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import '../styles/ActivityPaint.css';

const PaintCanvas = forwardRef(function PaintCanvas(
  { activeColor, brushSize, width = 520, height = 420 },
  ref
) {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });
  const [dpr, setDpr] = useState(1);

  const getPoint = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches?.[0]?.clientX ?? e.clientX;
    const clientY = e.touches?.[0]?.clientY ?? e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const clear = () => {
    const ctx = ctxRef.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas) return;
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.restore();

    ctx.fillStyle = '#f8f5f0';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(0,0,0,0.06)';
    ctx.lineWidth = 1;
    for (let i = 32; i < canvas.width; i += 64) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let j = 32; j < canvas.height; j += 64) {
      ctx.beginPath();
      ctx.moveTo(0, j);
      ctx.lineTo(canvas.width, j);
      ctx.stroke();
    }
  };

  useImperativeHandle(ref, () => ({ clear }));

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const nextDpr = window.devicePixelRatio || 1;
    setDpr(nextDpr);

    canvas.width = Math.floor(width * nextDpr);
    canvas.height = Math.floor(height * nextDpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext('2d');
    ctxRef.current = ctx;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.setTransform(nextDpr, 0, 0, nextDpr, 0, 0);

    clear();

    return () => {
      ctxRef.current = null;
    };
  }, [width, height]);

  useEffect(() => {
    const ctx = ctxRef.current;
    if (!ctx) return;
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = brushSize;
  }, [activeColor, brushSize, dpr]);

  const start = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    drawingRef.current = true;
    const p = getPoint(e);
    lastPointRef.current = p;
  };

  const end = () => {
    drawingRef.current = false;
  };

  const move = (e) => {
    if (!drawingRef.current) return;
    const ctx = ctxRef.current;
    if (!ctx) return;

    e.preventDefault();
    const p = getPoint(e);
    const last = lastPointRef.current;

    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();

    lastPointRef.current = p;
  };

  return (
    <div className="paint-canvas">
      <div className="paint-canvas__easel">
        <div className="paint-canvas__frame">
          <canvas
            ref={canvasRef}
            className="paint-canvas__canvas"
            onPointerDown={start}
            onPointerUp={end}
            onPointerLeave={end}
            onPointerMove={move}
            onTouchStart={start}
            onTouchEnd={end}
            onTouchCancel={end}
            onTouchMove={move}
          />
        </div>
      </div>
    </div>
  );
});

export default PaintCanvas;
