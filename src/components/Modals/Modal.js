import React, { useEffect } from 'react';
import { showIntercomIcon } from 'libs';
import { EasyAnimate, SlidingAnimation } from '../common/Animation';
import './style.css';

export default ({
  children,
  onClose,
  className = '',
  closeBtnClassName = '',
  isVisible,
  footer,
  hideCloseBtn,
  affectIntercom = true,
  ...props
}) => {
  useEffect(() => {
    showIntercomIcon(!isVisible);
    return () => {
      showIntercomIcon(isVisible);
    };
  }, [isVisible]);

  return (
    isVisible ? (
      <EasyAnimate className='modal-container'>
        <SlidingAnimation className={`modal-content ${className}`}>
          {
            !hideCloseBtn
            && (
              <span onClick={onClose} className={`modal-close-btn ${closeBtnClassName}`} role='presentation'>
                <i className='fas fa-times' />
              </span>
            )
          }
          {children}
        </SlidingAnimation>
        {footer && footer}
      </EasyAnimate>
    )
      : null
  );
};
