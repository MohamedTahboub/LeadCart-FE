import React from 'react';

import './style.css';
export default ({
  children, onClose, className, isVisible, ...props
}) => (
  isVisible ? (
    <div style={{ display: 'flex' }} className="modal-container">
      <div className={`modal-content ${className || ''}`}>
        <span onClick={onClose} className='modal-close-btn'>
          <i className='fas fa-times' />
        </span>
        {children}
      </div>
    </div>
  )
    : null
);
