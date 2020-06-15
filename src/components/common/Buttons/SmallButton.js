import React from 'react';

const SmallButton = ({ iconClass, children, className = '', disabled, onClick, ...props }) => (
  <span onClick={onClick} className={`small-btn  ${className} ${disabled ? ' btn-disabled' : ''}`}>
    {iconClass && <i className={`fas ${iconClass}`} />}
    {children}
  </span>
);

export default SmallButton;
