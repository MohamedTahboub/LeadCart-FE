import React from 'react';
import { EasyAnimate } from '../common/Animation';

import './style.css';
export default ({
  children, onClose, className, isVisible, ...props
}) => (
  isVisible ? (
    <EasyAnimate className='modal-container'>
      <div className={`modal-content ${className || ''}`}>
        <span onClick={onClose} className='modal-close-btn'>
          <i className='fas fa-times' />
        </span>
        {children}
      </div>
    </EasyAnimate>
  )
    : null
);
