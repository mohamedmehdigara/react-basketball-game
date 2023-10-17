import React from 'react';
import styled from 'styled-components';

const ScoreContainer = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Score = ({ score }) => {
  return <ScoreContainer>Score: {score}</ScoreContainer>;
};

export default Score;
