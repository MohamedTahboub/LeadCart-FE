import React, { useEffect, useState } from 'react';
import { showIntercomIcon } from 'libs';
import { EasyAnimate, SlidingAnimation } from '../common/Animation';

import './slideModal.css';
export default ({
  children,
  onClose,
  className = '',
  contentClassName = '',
  bodyClassName = '',
  header,
  footer,
  isVisible
}) => {
  
  showIntercomIcon(!isVisible);
  return (isVisible
    ? (
      <EasyAnimate className={`slide-modal-container ${className}`}>
        <div onClick={onClose} className='slide-modal-background' role='presentation' />
        <SlidingAnimation type='horizontal' units={1000} className={`slide-modal-content ${contentClassName}`}>
          {header && (<div className='slide-modal-header'>
            <span onClick={onClose} className='slide-modal-close-btn' role='presentation'>
              <i className='fas fa-chevron-circle-left' />
            </span>
            {header}
          </div>
          )}
          <div className={`slide-modal-body ${bodyClassName}`}>
            {children}
          </div>
          {footer && (<div className='slide-modal-footer'>
            {footer}
          </div>
          )}
        </SlidingAnimation>
      </EasyAnimate>
    )
    : null);
};
