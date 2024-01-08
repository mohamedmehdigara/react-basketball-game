import React from 'react';
import styled from 'styled-components';

const InstructionsContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  text-align: left;
`;

const InstructionsTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const InstructionsText = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
`;

const InstructionsList = styled.ul`
  list-style-type: square;
  margin-left: 20px;
`;

const InstructionsListItem = styled.li`
  font-size: 14px;
  margin-bottom: 8px;
`;

const StartGameButton = styled.button`
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const Instructions = ({ onStartGame }) => {
  return (
    <InstructionsContainer>
      <InstructionsTitle>How to Play</InstructionsTitle>
      <InstructionsText>
        Welcome to the Basketball Game! Follow these instructions to enjoy the game to the fullest:
      </InstructionsText>

      <InstructionsList>
        <InstructionsListItem>Control the basketball by clicking on it.</InstructionsListItem>
        <InstructionsListItem>Move the basket horizontally to catch the basketball.</InstructionsListItem>
        <InstructionsListItem>
          Score points by successfully shooting the basketball through the basket.
        </InstructionsListItem>
        <InstructionsListItem>Avoid collisions with obstacles to stay in the game.</InstructionsListItem>
        <InstructionsListItem>Watch out for power-ups that can enhance your gameplay.</InstructionsListItem>
        <InstructionsListItem>Complete levels and aim for the highest score!</InstructionsListItem>
      </InstructionsList>

      <StartGameButton onClick={onStartGame}>Start Game</StartGameButton>
    </InstructionsContainer>
  );
};

export default Instructions;
