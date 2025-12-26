import { motion, useInView } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import '../styles/InteractiveCanvas.css';

const InteractiveCanvas = () => {
  const colors = [
    '#000000', // Black
    '#FF3B30', // Red
    '#FF9500', // Orange
    '#FFCC00', // Yellow
    '#4CD964', // Green
    '#5AC8FA', // Light Blue
    '#0579FF', // Blue
    '#5856D6', // Purple
    '#FF2D55', // Pink
    '#FF9500', // Orange (duplicate for 10th item)
  ];
  
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [brushSize, setBrushSize] = useState(3);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.fillStyle = 'white';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.strokeStyle = currentColor;
      context.lineWidth = brushSize;
      setCtx(context);
    }
  }, []);

  useEffect(() => {
    if (ctx) {
      ctx.strokeStyle = currentColor;
      ctx.lineWidth = brushSize;
    }
  }, [currentColor, brushSize]);

  const startDrawing = (e) => {
    if (!ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, brushSize/2, 0, Math.PI * 2);
    ctx.fillStyle = currentColor;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!ctx) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="interactive-canvas-container">
      <div className="canvas-wrapper">
        <div className="canvas-header">
          <h2>Draw Your Masterpiece</h2>
          <div className="canvas-actions">
            <button className="clear-button" onClick={clearCanvas}>
              Clear
            </button>
          </div>
        </div>
        
        <div className="canvas-area">
          <canvas
            ref={canvasRef}
            width={600}
            height={400}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          />
          
          <div className="palette-container">
            <div className="color-options">
              {colors.map((color, index) => (
                <button
                  key={index}
                  className={`color-option ${currentColor === color ? 'active' : ''}`}
                  style={{ backgroundColor: color }}
                  onClick={() => setCurrentColor(color)}
                  aria-label={`Color ${index + 1}`}
                />
              ))}
            </div>
            <div className="brush-controls">
              <div className="brush-size-display">
                <div 
                  className="brush-preview"
                  style={{
                    width: brushSize * 2,
                    height: brushSize * 2,
                    backgroundColor: currentColor,
                    borderRadius: '50%',
                    border: '1px solid #ddd'
                  }}
                />
                <span>{brushSize}px</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="brush-slider"
              />
              <div className="size-labels">
                <span>1px</span>
                <span>30px</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCanvas;
