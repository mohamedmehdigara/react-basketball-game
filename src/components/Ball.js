import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  40% {
    transform: translateY(-30px) rotate(360deg);
  }
  60% {
    transform: translateY(-15px) rotate(180deg);
  }
  70% {
    transform: translateY(-10px) rotate(360deg);
  }
  90% {
    transform: translateY(-5px) rotate(180deg);
  }
`;

const cometTrail = keyframes`
  0%, 100% {
    opacity: 0;
  }
  10%, 90% {
    opacity: 0.8;
  }
  20%, 80% {
    opacity: 0.6;
  }
  30%, 70% {
    opacity: 0.4;
  }
  40%, 60% {
    opacity: 0.2;
  }
  50% {
    opacity: 0;
  }
`;

const shadowGrow = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
`;

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px rgba(255, 165, 0, 0.8);
  }
  50% {
    box-shadow: 0 0 20px rgba(255, 165, 0, 0.8);
  }
`;

const colorChange = keyframes`
  0%, 100% {
    background-color: orange;
  }
  50% {
    background-color: red;
  }
`;

const BallContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  position: absolute;
  bottom: ${({ isAnimating }) => (isAnimating ? '70px' : '40px')};
  left: ${({ resetPosition }) => (resetPosition ? `${Math.random() * 80 + 10}%` : 'calc(50% - 10px)')};
  border-radius: 50%;
  cursor: pointer;
  animation: ${({ isAnimating }) => (isAnimating ? bounce : 'none')} 0.8s ease-in-out;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  &:before {
    content: '';
    position: absolute;
    width: 5px;
    height: 5px;
    background-color: rgba(255, 165, 0, 0.6);
    border-radius: 50%;
    top: -5px;
    left: calc(50% - 2.5px);
    animation: ${cometTrail} 0.8s ease-in-out infinite;
  }
  &:after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: rgba(255, 165, 0, 0.2);
    border-radius: 50%;
    top: -2px;
    left: -2px;
    animation: ${({ isAnimating }) => (isAnimating ? glow : 'none')} 0.8s ease-in-out;
  }
  animation: ${({ isAnimating }) => (isAnimating ? colorChange : 'none')} 0.8s ease-in-out infinite;
`;

const SuccessfulShotText = styled.div`
  position: absolute;
  bottom: 60px;
  left: calc(50% - 50px);
  font-size: 18px;
  font-weight: bold;
  color: green;
  opacity: 0;
  animation: ${keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  `} 2s ease-in-out;
`;

const Ball = ({ onClick }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [shot, setShot] = useState(false);
  const [resetPosition, setResetPosition] = useState(false);

  const handleShot = () => {
    if (!shot) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setShot(true);
        onClick();
        setResetPosition(true);
        setTimeout(() => {
          setShot(false);
          setResetPosition(false);
        }, 1000); // Reset the shot state after 1 second
      }, 800); // Adjust the timing for the ball to reach the basket
    }
  };

  return (
    <div>
      {shot && <SuccessfulShotText>Score!</SuccessfulShotText>}
      <BallContainer isAnimating={isAnimating} resetPosition={resetPosition} onClick={handleShot} />
    </div>
  );
};

export default Ball;
