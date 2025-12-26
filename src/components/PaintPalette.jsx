import { Paintbrush, Trash2 } from 'lucide-react';
import '../styles/ActivityPaint.css';

const COLORS = [
  '#1a1a1a',
  '#ffffff',
  '#e74c3c',
  '#e67e22',
  '#f1c40f',
  '#2ecc71',
  '#3498db',
  '#9b59b6',
  '#e91e63',
  '#795548',
];

export const PaintPalette = ({
  activeColor,
  onColorChange,
  brushSize,
  onBrushSizeChange,
  onClear,
}) => {
  return (
    <div className="paint-palette">
      <div className="paint-palette__table">
        <div className="paint-palette__tabletop" />
        <div className="paint-palette__legs">
          <div className="paint-palette__leg paint-palette__leg--left" />
          <div className="paint-palette__leg paint-palette__leg--right" />
        </div>

        <div className="paint-palette__palette-wrap">
          <div className="paint-palette__palette">
            <div className="paint-palette__thumb-hole" />
            <div className="paint-palette__colors">
              {COLORS.map((color, index) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => onColorChange(color)}
                  className={`paint-palette__color ${activeColor === color ? 'is-active' : ''}`}
                  style={{
                    backgroundColor: color,
                    border: color === '#ffffff' ? '1px solid #ccc' : 'none',
                  }}
                  title={`Color ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="paint-palette__brush-cup">
          <div className="paint-palette__cup">
            <div className="paint-palette__brush paint-palette__brush--1" />
            <div className="paint-palette__brush paint-palette__brush--2" />
            <div className="paint-palette__brush paint-palette__brush--3" />
          </div>
        </div>
      </div>

      <div className="paint-palette__controls">
        <div className="paint-palette__slider">
          <Paintbrush className="paint-palette__slider-icon" />
          <input
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) => onBrushSizeChange(Number(e.target.value))}
            className="paint-palette__range"
          />
          <span className="paint-palette__size">{brushSize}</span>
        </div>

        <button type="button" onClick={onClear} className="paint-palette__clear">
          <Trash2 className="paint-palette__clear-icon" />
          Clear
        </button>
      </div>
    </div>
  );
};

export default PaintPalette;
