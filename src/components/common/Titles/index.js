import React from 'react';
import clx from 'classnames';

import './style.css';


export const MainTitle = ({ handle, className, style, children, bottomLine, props, fluid, mainClassName }) => (
  <div style={{ ...style }} className={`main-title-container ${className || ''} ${bottomLine ? 'title-bottom-line' : ''} ${fluid ? 'full' : ''}`}>
    {handle && (
      <span className='main-title-handle'>
        <i className={`fas ${handle.iconClass}`} />
        {handle.label}
      </span>
    )}
    {console.log({ mainClassName })}
    <span className={clx('main-title', mainClassName)}>{children}</span>
  </div>
);

export const HeadLine = ({ children, className = '', ...props }) => (
  <div className={`heade-line-container ${className}`}>
    {children}
  </div>
);
export const TabTitle = ({ children, className, error, ...props }) => (
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

export const Title = ({ children, className, ...props }) => (
  <div className={`title-container ${className}`}>
    {children}
  </div>
);

export const CycleStepTitle = ({ children, className = '', step }) => (
  <div className={`step-title-container ${className}`}>
    <span className='step-title-icon'>{step}</span>
    {children}
  </div>
);
