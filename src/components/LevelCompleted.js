import React from 'react';
import styled from 'styled-components';

const LevelCompletedContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  padding: 20px;
  text-align: center;
`;

const LevelCompletedTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`;

const SummaryText = styled.p`
  font-size: 16px;
  margin-bottom: 12px;
`;

const LevelCompletedButtons = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const LevelCompletedButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 4px;
`;

const LevelCompleted = ({ score, onNextLevel, onMainMenu }) => {
  return (
    <LevelCompletedContainer>
      <LevelCompletedTitle>Level Completed!</LevelCompletedTitle>
      <SummaryText>Your Score: {score}</SummaryText>

      <LevelCompletedButtons>
        <LevelCompletedButton onClick={onNextLevel}>Next Level</LevelCompletedButton>
        <LevelCompletedButton onClick={onMainMenu}>Main Menu</LevelCompletedButton>
      </LevelCompletedButtons>
    </LevelCompletedContainer>
  );
};

export default LevelCompleted;
