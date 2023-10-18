import React, { useEffect, useState } from 'react';

const Timer = ({ initialTime, onTimeout }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) {
      onTimeout();
    } else {
      const timer = setTimeout(() => setTime(time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [time, onTimeout]);

  return <div>Time Left: {time} seconds</div>;
};

export default Timer;