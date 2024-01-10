import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const BasketContainer = styled.div`
  width: 150px;
  height: 300px;
  background: transparent;
  position: absolute;
  top: 20px;
  left: calc(50% - 75px);
  cursor: grab;
`;

const Hoop = styled.div`
  width: 100px;
  height: 50px;
  background-color: #fff;
  border-radius: 50px;
  position: relative;
  top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 5px solid #333; /* Added rim to the hoop */
  overflow: hidden;
`;

const Net = styled.div`
  width: 8px;
  height: 120px;
  background-color: #fff;
  position: absolute;
  top: -120px;
`;

const Rim = styled.div`
  width: 120px;
  height: 10px;
  background-color: #333;
  position: absolute;
  top: 34px;
  left: calc(50% - 60px);
  border-radius: 5px;
`;

const Backboard = styled.div`
  width: 120px;
  height: 10px;
  background-color: #fff;
  position: absolute;
  top: 18px;
  left: calc(50% - 60px);
  z-index: 1; /* Place it above the rim */
`;

const Floor = styled.div`
  width: 150px;
  height: 10px;
  background-color: #333;
  position: absolute;
  top: 89px; /* Adjusted to align with the bottom of the hoop */
  left: calc(50% - 75px);
  border-radius: 5px;
  z-index: -1; /* Place it below the hoop */
`;

const Shadow = styled.div`
  width: 120px;
  height: 10px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 90px; /* Adjusted to align with the bottom of the hoop */
  left: calc(50% - 60px);
  border-radius: 50%;
`;

// ... (previous code)

const BackboardTexture = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
`;

const FloorDecoration1 = styled.div`
  width: 30px;
  height: 5px;
  background-color: #fff;
  position: absolute;
  top: 90px;
  left: calc(50% - 15px);
  transform: rotate(-45deg);
`;

const FloorDecoration2 = styled.div`
  width: 30px;
  height: 5px;
  background-color: #fff;
  position: absolute;
  top: 90px;
  left: calc(50% - 15px);
  transform: rotate(45deg);
`;

const Basket = ({ onMove }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [initialX, setInitialX] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setInitialX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const offsetX = e.clientX - initialX;
      onMove((prevPosition) => prevPosition + offsetX);
      setInitialX(e.clientX);
    }
  };

  return (
    <BasketContainer
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      position={0} // You can pass the initial position as needed
    >
      <Hoop>
        <Net />
        <Rim />
        <Backboard>
          <BackboardTexture />
        </Backboard>
        <Floor />
        <Shadow />
        <FloorDecoration1 />
        <FloorDecoration2 />
      </Hoop>
    </BasketContainer>
  );
};

export default Basket;
