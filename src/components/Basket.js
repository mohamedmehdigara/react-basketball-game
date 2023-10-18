import React, { useState } from 'react';
import styled from 'styled-components';

const BasketContainer = styled.div`
  width: 200px;
  height: 100px;
  background-color: #333;
  position: absolute;
  top: 20px; /* Position at the top middle */
  left: calc(50% - 100px);
  cursor: grab;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border: 2px solid #fff;
  border-bottom: none;
  overflow: hidden;
`;

const Hoop = styled.div`
  width: 120px;
  height: 40px;
  background-color: transparent;
  border: 2px solid #fff;
  border-bottom: none;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  position: absolute;
  top: 30px;
`;

const Backboard = styled.div`
  width: 20px;
  height: 110px;
  background-color: #333;
  position: absolute;
  top: 0;
  left: 90px;
`;

const Net = styled.div`
  width: 8px;
  height: 45px;
  background-color: #fff;
  position: absolute;
  top: 30px;
  left: 70px;
  border-radius: 4px;
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
      <Hoop />
      <Backboard />
      <Net />
    </BasketContainer>
  );
};

export default Basket;
