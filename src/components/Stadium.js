import React from 'react';

const Stadium = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {/* Outer Stadium Shape */}
      <rect width="100%" height="100%" fill="#2e3d49" />

      {/* Field */}
      <rect x="10%" y="20%" width="80%" height="60%" fill="#4CAF50" />

      {/* Stands */}
      <rect x="10%" y="0" width="80%" height="20%" fill="#8c8c8c" />
      <rect x="10%" y="80%" width="80%" height="20%" fill="#8c8c8c" />

      {/* Oval-shaped Roof */}
      <ellipse cx="50%" cy="0" rx="50%" ry="10%" fill="#8c8c8c" />

      {/* Goal Posts */}
      <rect x="45%" y="5%" width="1%" height="15%" fill="#fff" />
      <rect x="54%" y="5%" width="1%" height="15%" fill="#fff" />
    </svg>
  );
};

export default Stadium;
