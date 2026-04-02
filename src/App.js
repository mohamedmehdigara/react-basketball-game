import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import { create } from 'zustand';

// --- Global Styles ---
const GlobalStyle = createGlobalStyle`
  body { 
    margin: 0; 
    padding: 0;
    overflow: hidden; 
    background: #020205; 
    font-family: 'Inter', -apple-system, sans-serif;
    color: white;
    user-select: none;
    touch-action: none;
  }
`;

// --- State Management (Zustand) ---
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

// --- Styled Components ---
const Stage = styled.div`
  width: 100vw;
  height: 100vh;
  background: radial-gradient(circle at center 80%, #1e272e 0%, #050508 100%);
  position: relative;
  overflow: hidden;
`;

const HoopSystem = styled.div`
  position: absolute;
  top: 15%;
  right: 10%;
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const Backboard = styled.div`
  width: 160px;
  height: 120px;
  background: rgba(255, 255, 255, 0.1);
  border: 4px solid #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  padding-bottom: 20px;
  backdrop-filter: blur(2px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  position: relative;
  &::before {
    content: '';
    width: 60px;
    height: 45px;
    border: 3px solid rgba(255, 255, 255, 0.5);
    position: absolute;
    bottom: 0;
  }
`;

const RimAssembly = styled.div`
  position: absolute;
  right: 140px; 
  top: 85px;
  width: 100px;
  height: 100px;
`;

const BackRim = styled.div`
  position: absolute;
  width: 100px;
  height: 15px;
  background: #7b1d1d; 
  border-radius: 50%;
  z-index: 4; 
`;

const FrontRim = styled.div`
  position: absolute;
  width: 100px;
  height: 15px;
  border: 6px solid #e53e3e; 
  border-top: none;
  border-radius: 0 0 50px 50px;
  z-index: 12; 
  &::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -6px;
    width: 100px;
    height: 6px;
    background: #e53e3e;
    border-radius: 3px;
  }
`;

const Net = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  width: 80px;
  height: 100px;
  background: 
    linear-gradient(135deg, transparent 45%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.2) 55%, transparent 55%),
    linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.2) 45%, rgba(255,255,255,0.2) 55%, transparent 55%);
  background-size: 15px 20px;
  border-left: 2px solid rgba(255,255,255,0.1);
  border-right: 2px solid rgba(255,255,255,0.1);
  border-radius: 0 0 40px 40px;
  z-index: 11;
  mask-image: linear-gradient(to bottom, black 0%, black 70%, transparent 100%);
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
  background: radial-gradient(circle at 30% 30%, #f68d2e 0%, #d35400 100%);
  border-radius: 50%;
  box-shadow: inset -5px -5px 15px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.5);
  z-index: 10;
  &::after {
    content: '';
    position: absolute;
    width: 100%; height: 2px; background: rgba(0,0,0,0.2); top: 50%;
  }
`;

const ScoreBoard = styled.div`
  position: absolute;
  top: 40px;
  left: 50px;
  h1 { font-size: 4rem; margin: 0; color: #f68d2e; }
  span { opacity: 0.5; font-size: 0.9rem; letter-spacing: 2px; font-weight: bold; }
`;

const ControlCenter = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
`;

const PowerMeter = styled.div`
  width: 300px;
  height: 10px;
  background: #111;
  border-radius: 10px;
  margin-top: 15px;
  overflow: hidden;
  border: 1px solid #333;
`;

const PowerLevel = styled.div.attrs(props => ({
  style: { width: `${props.p}%` }
}))`
  height: 100%;
  background: linear-gradient(90deg, #f68d2e, #ff4757);
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  h1 { font-size: 4rem; color: #f68d2e; margin-bottom: 20px; }
`;

const StartButton = styled.button`
  padding: 15px 60px;
  background: #f68d2e;
  color: #000;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.2rem;
  transition: transform 0.2s;
  &:hover { transform: scale(1.05); }
`;

// --- Logic ---
export default function App() {
  const { score, highScore, gameState, incrementScore, startGame } = useStore();
  const ballData = useRef({ x: 150, y: 0, vx: 0, vy: 0, s: 1, active: false, scored: false });
  const [display, setDisplay] = useState({ x: 0, y: 0, s: 1, visible: false });
  const [angle, setAngle] = useState(-45); 
  const [power, setPower] = useState(0); 
  const [step, setStep] = useState(0); // 0: Angle, 1: Power, 2: Flight

  const resetBall = useCallback(() => {
    ballData.current = { 
      x: 150, 
      y: window.innerHeight - 150, 
      vx: 0, vy: 0, s: 1, active: false, scored: false 
    };
    setStep(0);
    setPower(0);
    setDisplay({ x: 150, y: window.innerHeight - 150, s: 1, visible: true });
  }, []);

  useEffect(() => {
    let frame;
    const run = () => {
      // Meter Oscillations
      if (step === 0) setAngle(-45 + Math.sin(Date.now() / 300) * 35);
      if (step === 1) setPower((Math.sin(Date.now() / 200) + 1) * 50);

      const b = ballData.current;
      if (b.active) {
        b.vy += 0.45; // Gravity
        b.x += b.vx;
        b.y += b.vy;
        b.s = Math.max(0.6, b.s - 0.002);

        // --- Refined Realistic Collision ---
        const hX = window.innerWidth * 0.9 - 240; 
        const hY = window.innerHeight * 0.15 + 85;

        if (!b.scored && b.vy > 0 && b.y > hY && b.y < hY + 25 && b.x > hX && b.x < hX + 90) {
          b.scored = true;
          incrementScore();
          // Visual "Net" effect
          b.vx *= 0.1; 
          b.x = hX + 15; 
        }

        // Reset if ball falls out of screen
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
    const handleKey = (e) => {
      if (e.code !== 'Space' || gameState !== 'PLAYING') return;
      if (step === 0) setStep(1);
      else if (step === 1) {
        setStep(2);
        const b = ballData.current;
        const rad = (angle * Math.PI) / 180;
        // Adjusted Force for realism
        const force = 21 + (power * 0.15);
        b.vx = Math.cos(rad) * force;
        b.vy = Math.sin(rad) * force;
        b.active = true;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [gameState, step, angle, power]);

  useEffect(() => {
    if (gameState === 'PLAYING') resetBall();
  }, [gameState, resetBall]);

  return (
    <Stage>
      <GlobalStyle />
      <ScoreBoard>
        <span>SCORE</span>
        <h1>{score}</h1>
        <div style={{ opacity: 0.3, marginTop: '10px' }}>BEST: {highScore}</div>
      </ScoreBoard>

      <HoopSystem>
        <RimAssembly>
          <BackRim />
          <FrontRim />
          <Net />
        </RimAssembly>
        <Backboard />
      </HoopSystem>
      
      <Ball x={display.x} y={display.y} s={display.s} visible={display.visible} />

      {gameState === 'PLAYING' && step < 2 && (
        <ControlCenter>
          <div style={{ 
            height: '80px', 
            width: '4px', 
            background: '#f68d2e', 
            margin: '0 auto',
            transformOrigin: 'bottom', 
            transform: `rotate(${angle + 90}deg)`,
            borderRadius: '4px',
            boxShadow: '0 0 10px #f68d2e'
          }} />
          <PowerMeter><PowerLevel p={power} /></PowerMeter>
          <p style={{ fontSize: '0.9rem', marginTop: '15px', fontWeight: 'bold', color: '#f68d2e' }}>
            {step === 0 ? "SPACE: LOCK ANGLE" : "SPACE: RELEASE SHOT"}
          </p>
        </ControlCenter>
      )}

      {gameState === 'START' && (
        <Overlay>
          <h1>ELITE HOOPS</h1>
          <StartButton onClick={startGame}>START SESSION</StartButton>
          <p style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.5 }}>USE SPACEBAR TO PLAY</p>
        </Overlay>
      )}
    </Stage>
  );
}