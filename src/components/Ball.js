import React from 'react';
import styled from 'styled-components';

const BallContainer = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  position: absolute;
  bottom: 40px;
  left: calc(50% - 10px);
  border-radius: 50%;
  cursor: pointer;
`;

const Ball = ({ onClick }) => {
  return <BallContainer onClick={onClick} />;
};

export default Ball;
