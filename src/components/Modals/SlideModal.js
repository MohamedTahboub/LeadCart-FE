import React, { useEffect } from 'react';
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
  onContentClick,
  isVisible,
  type = 'horizontal'
}) => {
  useEffect(() => {
    showIntercomIcon(!isVisible);
    return () => {
      showIntercomIcon(isVisible);
    };
  }, [isVisible]);

  return isVisible ? (
    <EasyAnimate className={`slide-modal-container ${className}`}>
      <div onClick={onClose} className='slide-modal-background' role='presentation' />
      <SlidingAnimation open={isVisible} type={type} units={300} className={`slide-modal-content ${contentClassName}`}>
        {header && (
          <div className='slide-modal-header'>
            <span onClick={onClose} className='slide-modal-close-btn' role='presentation'>
              <i className='fas fa-times-circle' />
            </span>
            {header}
          </div>
        )}
        <div onClick={onContentClick} className={`slide-modal-body ${bodyClassName}`}>
          {children}
        </div>
        {footer && (
          <div className='slide-modal-footer'>
            {footer}
          </div>
        )}
      </SlidingAnimation>
    </EasyAnimate>
  ) : null;
};
