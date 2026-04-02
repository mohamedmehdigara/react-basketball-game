import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { createGlobalStyle, keyframes } from 'styled-components';
import { create } from 'zustand';

const GlobalStyle = createGlobalStyle`
  body { 
    margin: 0; 
    overflow: hidden; 
    background: #050508; 
    font-family: 'Inter', sans-serif;
    color: white;
  }
`;

const useStore = create((set) => ({
  score: 0,
  highScore: 0,
  gameState: 'START',
  incrementScore: () => set((state) => {
    const newScore = state.score + 1;
    return { score: newScore, highScore: Math.max(newScore, state.highScore) };
  }),
  startGame: () => set({ gameState: 'PLAYING', score: 0 }),
}));

const Stage = styled.div`
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center 80%, #1e272e 0%, #050508 100%);
  position: relative;
`;

// --- HOOP LAYERING ---
const HoopContainer = styled.div`
  position: absolute;
  top: 22%;
  right: 12%;
  width: 110px;
  height: 100px;
`;

const BackRim = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 12px;
  background: #b33939; /* Darker red for the back */
  border-radius: 50%;
  z-index: 4; /* Behind the ball */
`;

const FrontRim = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 12px;
  border: 5px solid #ff4757;
  border-top: none;
  border-radius: 0 0 50px 50px;
  z-index: 11; /* In front of the ball */
`;

const Net = styled.div`
  position: absolute;
  top: 10px;
  left: 15px;
  width: 80px;
  height: 80px;
  background: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px),
              repeating-linear-gradient(-45deg, transparent, transparent 5px, rgba(255,255,255,0.1) 5px, rgba(255,255,255,0.1) 10px);
  border: 1px solid rgba(255,255,255,0.2);
  border-top: none;
  border-radius: 0 0 40px 40px;
  z-index: 11; /* In front of the ball */
  mask-image: linear-gradient(to bottom, black 60%, transparent 100%);
`;

const Ball = styled.div.attrs(props => ({
  style: { 
    transform: `translate(${props.x}px, ${props.y}px) scale(${props.s})`,
    display: props.visible ? 'block' : 'none' 
  }
}))`
  position: absolute;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle at 30% 30%, #ffa502, #e67e22);
  border-radius: 50%;
  box-shadow: 0 10px 20px rgba(0,0,0,0.5);
  z-index: 10; /* Between BackRim and FrontRim/Net */
`;

const UI = styled.div`
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`;

const PowerBar = styled.div`
  width: 300px;
  height: 10px;
  background: rgba(255,255,255,0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const PowerLevel = styled.div.attrs(props => ({
  style: { width: `${props.p}%` }
}))`
  height: 100%;
  background: #ffa502;
`;

const ScoreBoard = styled.div`
  position: absolute;
  top: 40px;
  width: 100%;
  text-align: center;
  h1 { font-size: 5rem; margin: 0; color: #ffa502; }
`;

export default function App() {
  const { score, highScore, gameState, incrementScore, startGame } = useStore();
  const ballData = useRef({ x: 100, y: 0, vx: 0, vy: 0, s: 1, active: false, scored: false });
  const [display, setDisplay] = useState({ x: 0, y: 0, s: 1, visible: false });
  const [angle, setAngle] = useState(-45); 
  const [power, setPower] = useState(0); 
  const [step, setStep] = useState(0);
  
  const resetBall = useCallback(() => {
    ballData.current = { 
      x: 150, 
      y: window.innerHeight - 120, 
      vx: 0, vy: 0, s: 1, active: false, scored: false 
    };
    setStep(0);
    setPower(0);
    setDisplay({ x: 150, y: window.innerHeight - 120, s: 1, visible: true });
  }, []);

  useEffect(() => {
    let frame;
    const run = () => {
      if (step === 0) setAngle(a => a + (Math.sin(Date.now() / 200) * 2));
      if (step === 1) setPower(p => (Math.sin(Date.now() / 150) + 1) * 50);

      const b = ballData.current;
      if (b.active) {
        b.vy += 0.45;
        b.x += b.vx;
        b.y += b.vy;
        b.s = Math.max(0.65, b.s - 0.002);

        const hX = window.innerWidth * 0.88 - 55;
        const hY = window.innerHeight * 0.22;

        // --- Realistic Entrance Logic ---
        // If ball is within the hoop horizontal bounds and crossing the Y plane
        if (!b.scored && b.y > hY && b.y < hY + 20 && b.x > hX && b.x < hX + 80 && b.vy > 0) {
          b.scored = true;
          incrementScore();
          // "Swish" friction: slow horizontal speed and pull to center
          b.vx *= 0.1; 
          b.x = hX + 25; 
        }

        if (b.y > window.innerHeight + 100 || b.x > window.innerWidth + 100) {
          b.active = false;
          resetBall();
        }
      }

      setDisplay(d => ({ ...d, x: b.x, y: b.y, s: b.s }));
      frame = requestAnimationFrame(run);
    };

    if (gameState === 'PLAYING') frame = requestAnimationFrame(run);
    return () => cancelAnimationFrame(frame);
  }, [gameState, step, incrementScore, resetBall]);

  useEffect(() => {
    const handleKeys = (e) => {
      if (e.code !== 'Space' || gameState !== 'PLAYING') return;
      if (step === 0) setStep(1);
      else if (step === 1) {
        setStep(2);
        const b = ballData.current;
        const rad = (angle * Math.PI) / 180;
        const force = 18 + (power * 0.15);
        b.vx = Math.cos(rad) * force;
        b.vy = Math.sin(rad) * force;
        b.active = true;
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [gameState, step, angle, power]);

  useEffect(() => { if (gameState === 'PLAYING') resetBall(); }, [gameState, resetBall]);

  return (
    <Stage>
      <GlobalStyle />
      <ScoreBoard><h1>{score}</h1></ScoreBoard>

      <HoopContainer>
        <BackRim />
        {/* The Ball is rendered at Z-index 10, between these two */}
        <FrontRim />
        <Net />
      </HoopContainer>
      
      <Ball x={display.x} y={display.y} s={display.s} visible={display.visible} />

      {gameState === 'PLAYING' && step < 2 && (
        <UI>
          <div style={{ position: 'relative', width: '100px', height: '100px' }}>
             <div style={{
                position: 'absolute', bottom: 0, left: '50%',
                width: '4px', height: '80px', background: '#ffa502',
                transformOrigin: 'bottom center',
                transform: `translateX(-50%) rotate(${angle + 90}deg)`,
                borderRadius: '10px'
             }} />
          </div>
          <PowerBar><PowerLevel p={power} /></PowerBar>
          <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>SPACE TO LOCK & SHOOT</div>
        </UI>
      )}

      {gameState === 'START' && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 100 }}>
          <h1 style={{ fontSize: '3rem' }}>PRO HOOPS</h1>
          <button style={{ padding: '15px 40px', background: '#ffa502', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }} onClick={startGame}>START</button>
        </div>
      )}
    </Stage>
  );
}