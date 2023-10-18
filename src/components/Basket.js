import React, { useState } from 'react';
import styled from 'styled-components';

const BasketContainer = styled.div`
  width: 100px;
  height: 10px;
  background-color: #333;
  position: absolute;
  bottom: 20px;
  left: ${(props) => props.position}px;
  border-radius: 10px 10px 0 0;
  cursor: grab;
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
    />
  );
};

export default Basket;
