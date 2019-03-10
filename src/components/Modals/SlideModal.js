import React from 'react';
import { showIntercomIcon } from 'libs';
import { EasyAnimate, SlidingAnimation } from '../common/Animation';

import './slideModal.css';
export default ({
  children, onClose, className = '', header, footer, isVisible
}) => {
  showIntercomIcon(!isVisible);


  return (isVisible
    ? (
      <EasyAnimate className={`slide-modal-container ${className}`}>
        <div onClick={onClose} className='slide-modal-background' role='presentation' />
        <SlidingAnimation type='horizontal' units={1000} className='slide-modal-content'>
          <div className='slide-modal-header'>
            <span onClick={onClose} className='slide-modal-close-btn' role='presentation'>
              <i className='fas fa-chevron-circle-left' />
            </span>
            {header}
          </div>
          <div className='slide-modal-body'>
            {children}
          </div>
          <div className='slide-modal-footer'>
            {footer}
          </div>
        </SlidingAnimation>
      </EasyAnimate>
    )
    : null);
};
