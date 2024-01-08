import React from 'react';
import styled from 'styled-components';

const PauseMenuContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
`;

const PauseMenuButton = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const PauseMenu = ({ onResume, onRestart, onMainMenu }) => {
  return (
    <PauseMenuContainer>
      <h2>Paused</h2>
      <PauseMenuButton onClick={onResume}>Resume</PauseMenuButton>
      <PauseMenuButton onClick={onRestart}>Restart</PauseMenuButton>
      <PauseMenuButton onClick={onMainMenu}>Main Menu</PauseMenuButton>
    </PauseMenuContainer>
  );
};

export default PauseMenu;
