import React from 'react';

const SmallBox = ({
  clickable = false,
  onClick,
  className = '',
  children
}) => (
    <div
      onClick={onClick}
      style={({ cursor: clickable ? 'pointer' : 'inherit' })}
      className={`small-box ${className}`}
    >
      <div className='small-box-container'>
        {children}
      </div>
    </div>
  );


export default SmallBox;
