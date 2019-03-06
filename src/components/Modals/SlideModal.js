import React from 'react';
import { EasyAnimate, SlidingAnimation } from '../common/Animation';
export default ({
  children, onClose, className = '', isVisible
}) => (isVisible
  ? (
    <EasyAnimate className={`slide-modal-container ${className}`}>
      <div className='slide-modal-background' />
      <SlidingAnimation type='horizontal' units={1000} className='slide-modal-content'>
        <div className='slide-modal-header'>
          <span onClick={onClose} className='slide-modal-close-btn'>
            <i className='fas fa-chevron-circle-left' />
          </span>
        </div>
        <div className='slide-modal-body'>
          {children}
        </div>
        <div className='slide-modal-footer' />
      </SlidingAnimation>
    </EasyAnimate>
  )
  : null);
