import React from 'react';
import { showIntercomIcon } from 'libs';
import { EasyAnimate, SlidingAnimation } from '../common/Animation';
import './style.css';


export default ({
  children,
  onClose,
  className = '',
  closeBtnClassName = '',
  isVisible,
  affectIntercom = true,
  ...props
}) => {
  if (affectIntercom) showIntercomIcon(!isVisible);

  return (
    isVisible ? (
      <EasyAnimate className='modal-container'>
        <SlidingAnimation className={`modal-content ${className}`}>
          <span onClick={onClose} className={`modal-close-btn ${closeBtnClassName}`} role='presentation'>
            <i className='fas fa-times' />
          </span>
          {children}
        </SlidingAnimation>
      </EasyAnimate>
    )
      : null
  );
};
