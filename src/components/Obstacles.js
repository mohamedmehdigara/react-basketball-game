import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const moveObstacle = keyframes`
  0% {
    transform: translateX(100%);
  }
  50% {
    transform: translateX(-200px);
    transform: translateY(40px);
  }
  100% {
    transform: translateX(100%);
  }
`;

const ObstacleContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: red;
  position: absolute;
  bottom: 40px;
  left: 100%;
  border-radius: 50%;
  animation: ${moveObstacle} 3s linear infinite;
`;

const Obstacles = ({ onCollision, onScore }) => {
  const [obstaclePosition, setObstaclePosition] = useState('100%');
  const [isDestroyed, setIsDestroyed] = useState(false);
  const [score, setScore] = useState(0);

  const handleAvoidance = () => {
    setScore(score + 1);
  };

  useEffect(() => {
    const randomPosition = Math.floor(Math.random() * 80 + 10) + '%';
    setObstaclePosition(randomPosition);

    const collisionInterval = setInterval(() => {
      const ball = document.querySelector('.ball-container');
      const obstacle = document.querySelector('.obstacle-container');

      if (ball && obstacle && !isDestroyed) {
        const ballRect = ball.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (
          ballRect.right > obstacleRect.left &&
          ballRect.left < obstacleRect.right &&
          ballRect.bottom > obstacleRect.top &&
          ballRect.top < obstacleRect.bottom
        ) {
          onCollision();
        }
      }
    }, 100);

    // Check for successful avoidance and increase score
    const avoidanceInterval = setInterval(() => {
      handleAvoidance();
    }, 1000); // Score points every second

    return () => {
      clearInterval(collisionInterval);
      clearInterval(avoidanceInterval);
    };
  }, [onCollision, isDestroyed, score]);

  const handleShot = () => {
    if (!isDestroyed) {
      setIsDestroyed(true);
      onScore();
    }
  };

  return (
    <ObstacleContainer
      className={`obstacle-container ${isDestroyed ? 'destroyed' : ''}`}
      style={{ left: obstaclePosition }}
      onClick={handleShot}
    />
  );
};

export default Obstacles;
