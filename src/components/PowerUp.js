import React from 'react';
import styled from 'styled-components';

const PowerUpContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
`;

const PowerUpText = styled.p`
  font-size: 14px;
  margin: 0;
`;

const PowerUp = ({ type, duration }) => {
  return (
    <PowerUpContainer>
      <PowerUpText>Active Power-Up:</PowerUpText>
      <PowerUpText>Type: {type}</PowerUpText>
      <PowerUpText>Duration: {duration} seconds</PowerUpText>
    </PowerUpContainer>
  );
};

export default PowerUp;
