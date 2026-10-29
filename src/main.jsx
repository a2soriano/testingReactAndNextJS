import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

const CARD_NAME = 'A. Soriano';
const INITIAL_ROTATION = { x: -12, y: -22 };
const clampTilt = (angle) => Math.max(-75, Math.min(75, angle));

function App() {
  const [rotation, setRotation] = useState(INITIAL_ROTATION);
  const drag = useRef(null);

  function startDrag(event) {
    if (event.button !== 0 || !event.isPrimary) return;
    event.currentTarget.focus({ preventScroll: true });
    event.currentTarget.setPointerCapture(event.pointerId);
    drag.current = { x: event.clientX, y: event.clientY, rotation };
  }

  function move(event) {
    if (!drag.current) return;
    const { x, y, rotation: start } = drag.current;
    setRotation({
      x: clampTilt(start.x - (event.clientY - y) * 0.4),
      y: start.y + (event.clientX - x) * 0.5,
    });
  }

  function rotateWithKeys(event) {
    const turns = {
      ArrowLeft: { x: 0, y: -10 },
      ArrowRight: { x: 0, y: 10 },
      ArrowUp: { x: -10, y: 0 },
      ArrowDown: { x: 10, y: 0 },
    };
    const turn = turns[event.key];
    if (turn) {
      event.preventDefault();
      setRotation((current) => ({
        x: clampTilt(current.x + turn.x),
        y: current.y + turn.y,
      }));
    } else if (event.key === 'Home' || event.key === 'Escape') {
      event.preventDefault();
      setRotation(INITIAL_ROTATION);
    }
  }

  return (
    <main className="stage">
      <div
        className="card"
        role="group"
        tabIndex={0}
        aria-label={`3D calling card for ${CARD_NAME}. Drag or use arrow keys to rotate. Double-click, Home, or Escape to reset.`}
        onPointerDown={startDrag}
        onPointerMove={move}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        onLostPointerCapture={() => { drag.current = null; }}
        onDoubleClick={() => setRotation(INITIAL_ROTATION)}
        onKeyDown={rotateWithKeys}
        style={{ transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` }}
      >
        <div className="face front"><span>{CARD_NAME}</span></div>
        <div className="face back" aria-hidden="true"><span>{CARD_NAME}</span></div>
      </div>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
