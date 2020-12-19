import React from 'react';

import successIcon from '../../assets/images/icons/success.png';
import errorIcon from '../../assets/images/icons/error.png';
import warningIcon from '../../assets/images/icons/warning.png';
import infoIcon from '../../assets/images/icons/info.png';

import './style.css';


const icons = {
  success: successIcon,
  danger: errorIcon,
  warning: warningIcon,
  info: infoIcon
};

export const BaseSkin = ({
  className,
  message,
  children,
  id
}) => (
  <div id={id} className={`notification-item-container ${className}`}>
    {children || <div className='message'>{message}</div>}
  </div>
);


export const Custom = ({
  title,
  message,
  icon,
  type,
  ...props
}) => {
  const iconSrc = icon && icons[type];

  return (
    <BaseSkin>
      <div className='custom-content' {...props}>
        {(icon && iconSrc) && (
          <img src={iconSrc} className='notification-icon' alt={`notification icon ${type}`} />
        )}
        <div className='actual-content-holder'>
          {title && <span className='title'>{title}</span>}
          <span className='message'>{message}</span>
        </div>
      </div>
    </BaseSkin>
  );
};
