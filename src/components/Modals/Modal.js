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
  affectIntercom = true,
  ...props
}) => {
  if (affectIntercom) showIntercomIcon(!isVisible);

  // const onClose = (e) => {
  //   if (e.key === 'Escape') props.onClose();


  //   if (!e.key) props.onClose();
  // };

  // useEffect(() => {
  //   window.addEventListener('keydown', onClose, false);

  //   return () => {
  //     window.removeEventListener('keydown', onClose, false);
  //   };
  // }, []);

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
