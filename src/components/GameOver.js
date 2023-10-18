import React from 'react';

const GameOver = ({ score, onRestart }) => (
  <div>
    <h2>Game Over</h2>
    <p>Final Score: {score}</p>
    <button onClick={onRestart}>Play Again</button>
  </div>
);

export default GameOver;