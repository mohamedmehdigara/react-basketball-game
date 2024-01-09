import React, { useState } from 'react';
import styled from 'styled-components';

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
      </Hoop>
    </BasketContainer>
  );
};

export default Basket;
