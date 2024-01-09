import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
`;

const BallContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  position: absolute;
  bottom: ${({ isAnimating }) => (isAnimating ? '70px' : '40px')}; // Adjusted initial position
  left: calc(50% - 10px);
  border-radius: 50%;
  cursor: pointer;
  animation: ${({ isAnimating }) => (isAnimating ? bounce : 'none')} 0.6s ease-in-out; // Adjusted animation duration
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

  const handleShot = () => {
    if (!shot) {
      setIsAnimating(true);
      setTimeout(() => {
        setIsAnimating(false);
        setShot(true);
        onClick();
        setTimeout(() => {
          setShot(false);
        }, 1000); // Reset the shot state after 1 second
      }, 600); // Adjust the timing for the ball to reach the basket
    }
  };

  return (
    <div>
      {shot && <SuccessfulShotText>Score!</SuccessfulShotText>}
      <BallContainer isAnimating={isAnimating} onClick={handleShot} />
    </div>
  );
};

export default Ball;
