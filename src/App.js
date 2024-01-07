import React, { useState } from 'react';
import styled from 'styled-components';
import Basket from './components/Basket';
import Ball from './components/Ball';
import Score from './components/Score';
import Timer from './components/Timer';
import GameOver from './components/GameOver';
import Obstacles from './components/Obstacles';
import Instructions from './components/Instructions';


const AppContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

function App() {
  const [score, setScore] = useState(0);
  const [basketPosition, setBasketPosition] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);


  const handleShoot = () => {
    if (!gameOver) {
      // Implement shooting logic here
      // You can check if the ball goes through the hoop
      // and update the score accordingly
      setScore(score + 1);
    }
  };

  const handleTimeout = () => {
    setGameOver(true);
  };

  const handleRestart = () => {
    setScore(0);
    setGameOver(false);
  };

  const handleCollision = () => {
    setGameOver(true);
  };

  const handleStartGame = () => {
    setShowInstructions(false);
    // Additional logic to start the game
  };

  return (
    <AppContainer>
      {showInstructions ? (
        <Instructions onStartGame={handleStartGame} />
      ) : (
        <>
          <Basket onMove={setBasketPosition} onScore={() => setScore(score + 1)} />
          <Ball onClick={handleShoot} />
          <Score score={score} />
          <Timer initialTime={60} onTimeout={handleTimeout} />
          {gameOver && <GameOver score={score} onRestart={handleRestart} />}
        </>
      )}
    </AppContainer>
  );
}

export default App;
