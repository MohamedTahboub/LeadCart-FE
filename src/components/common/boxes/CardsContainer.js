import React from 'react';

const CardsContainer = ({ className = '', children }) => (
  <div className={`cards-container-element ${className}`}>
    {children}
  </div>
);

export default CardsContainer;
