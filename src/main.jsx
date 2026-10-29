import React, {useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './style.css';

function App() {
  const [name, setName] = useState('A. Soriano');
  const [rotation, setRotation] = useState({x: -12, y: -22});
  const [finish, setFinish] = useState('violet');
  const drag = useRef(null);
  const initials = name.trim().split(/\s+/).map(word => word[0]).join('').slice(0, 2) || 'AS';
  // Pointer capture keeps dragging even when your cursor leaves the card.
  function move(event) {
    if (!drag.current) return;
    const {x, y, rotation: start} = drag.current;
    setRotation({x: Math.max(-75, Math.min(75, start.x - (event.clientY-y)*.4)), y: start.y + (event.clientX-x)*.5});
  }
  return <main>
    <header><a className="brand" href="#">S<span>◈</span>R / STUDIO</a><span className="edition">INTERACTIVE EXPERIMENT — 001</span><span className="status">● AVAILABLE FOR COLLABORATION</span></header>
    <section className="intro"><p className="eyebrow">A SMALL INTRODUCTION. ANOTHER DIMENSION.</p><h1>Leave an<br/><em>impression.</em></h1><p>A calling card with a little more character.<br/>Pick it up. Turn it around. Make it yours.</p></section>
    <section className="showcase" aria-label="3D calling card inspector">
      <div className="stage" role="group" aria-label="Drag to rotate the calling card" onPointerDown={e=>{if(e.button!==0)return; e.currentTarget.setPointerCapture(e.pointerId);drag.current={x:e.clientX,y:e.clientY,rotation};}} onPointerMove={move} onPointerUp={()=>drag.current=null} onPointerCancel={()=>drag.current=null} onLostPointerCapture={()=>drag.current=null}>
        <div className={`card ${finish}`} style={{transform:`rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`}}>
          <article className="face front"><div className="card-top"><span>PERSONAL EDITION</span><span>№ 001 ↗</span></div><div className="orb"><span>{initials}</span></div><div className="identity"><p>HELLO, I'M</p><h2>{name || 'Your name'}</h2><div className="identity-bottom"><span>CREATIVE MIND · BUILDER</span><span>✳</span></div></div><div className="foil"/></article>
          <article className="face back"><span className="eyebrow">NICE TO MEET YOU.</span><h2>Let’s make<br/>something<br/><em>memorable.</em></h2><p>{name || 'Your name'} / PERSONAL CALLING CARD</p><span className="back-symbol">✳</span></article>
        </div>
      </div>
      <div className="stage-caption"><span>↔ DRAG TO INSPECT</span><span>360° / TWO SIDES</span></div>
      <div className="controls"><button onClick={()=>setRotation(r=>({...r,y:r.y+180}))}>↻ Flip card</button><button onClick={()=>setRotation({x:-12,y:-22})}>Reset view ↗</button></div>
    </section>
    <aside className="customize"><div><span className="step">01 / MAKE IT YOURS</span><label htmlFor="name">Your name</label><input id="name" maxLength={26} value={name} onChange={e=>setName(e.target.value)}/></div><div><span className="step">02 / CHOOSE A FINISH</span><div className="swatches">{['violet','mint','copper'].map(color=><button key={color} className={`swatch ${color}`} aria-label={`${color} finish`} aria-pressed={finish===color} onClick={()=>setFinish(color)}/>)}</div><span className="finish-label">{finish} / holographic</span></div><p>Good design is in the details.<br/>So is a good first impression.</p></aside>
    <section className="lesson"><p className="eyebrow">UNDER THE SURFACE</p><h3>Three ideas. One extra dimension.</h3><div><p><b>01 — Give it depth.</b><br/><code>perspective</code> on the stage makes the far edge look smaller. <code>preserve-3d</code> keeps the faces in 3D space.</p><p><b>02 — Build both sides.</b><br/>Two faces sit back to back. The reverse rotates 180°. <code>backface-visibility: hidden</code> hides mirrored text.</p><p><b>03 — Follow the gesture.</b><br/>React maps pointer movement to <code>rotateX</code> and <code>rotateY</code>. Flip adds 180°; reset restores the starting angle.</p></div></section>
    <footer><span>BUILT TO BE REMEMBERED.</span><span>REACT + CSS 3D / AN INTERACTIVE STUDY</span></footer>
  </main>;
}
createRoot(document.getElementById('root')).render(<App/>);
