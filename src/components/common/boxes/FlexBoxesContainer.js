import React from 'react';

const FlexBoxesContainer = ({ children, flex = '', className }) => (
  <div className={`flex-boxes-container ${className || ''} ${flex}`}>
    {children}
  </div>
);

export default FlexBoxesContainer;
