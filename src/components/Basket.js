import React from 'react';
import styled from 'styled-components';

const BasketContainer = styled.div`
  width: 100px;
  height: 10px;
  background-color: #333;
  position: absolute;
  bottom: 20px;
  left: calc(50% - 50px);
  border-radius: 10px 10px 0 0;
`;

const Basket = () => {
  return <BasketContainer />;
};

export default Basket;
