import React from 'react';

import './style.css';


export const MainTitle = ({
  handle, className, style, children, bottomLine, props
}) => (
  <div style={{ ...style }} className={`main-title-container ${className || ''} ${bottomLine ? 'title-bottom-line' : ''}`}>
    {handle && (
      <span className='main-title-handle'>
        <i className={`fas ${handle.iconClass}`} />
        {handle.label}
      </span>
    )}
    <span className='main-title'>{children}</span>
  </div>
);
export const HeadeLine = ({ children, ...props }) => (
  <div className='heade-line-container'>
    {children}
  </div>
);
export const TabTitle = ({
  children, className, error, ...props
}) => (
  <div className={error ? 'tab-title-container tab-title-container-error' : 'tab-title-container'}>
    {children}
  </div>
);

export const SpcialAnnouncement = ({ children, className = '', ...props }) => (
  <span className={`spcial-announcement ${className}`}>
    {children}
  </span>
);
export const BigText = ({ children, className = '', ...props }) => (
  <div className={`big-text-container ${className}`}>
    {children}
  </div>
);
