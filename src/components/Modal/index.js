import React from 'react';

import './style.css';
export default ({
  children, onClose, isVisable, ...props
}) => (
  isVisable ? (
    <div style={{ display: 'flex' }} className='modal-container'>
      <div className='modal-content'>
        <span onClick={onClose} className='modal-close-btn'>
          <i className='fas fa-times' />
        </span>
        {children}
      </div>
    </div>
  )
    : null
);
