import React from 'react';

import './style.css';


export const MainTitle = ({ handle, children, props }) => (
  <div className='main-title-container'>
    {handle && <span className='main-title-handle'>
<i className={"fas " + handle.iconClass}></i>
{handle.label}
</span>}
    <span className='main-title'>{children}</span>
  </div>
);
export const HeadeLine = ({ children, ...props }) => (
  <div className='heade-line-container'>
    {children}
  </div>
);
export const TabTitle = ({ children, className, ...props }) => (
  <div className={'tab-title-container ' + className}>
    {children}
  </div>
);

export const SpcialAnnouncement = ({ children, classes = [], ...props }) => (
  <span className={'spcial-announcement ' + classes.join(' ')}>
    {children}
  </span>
);
export const BigText = ({ children, classes = [], ...props }) => (
  <div className={'big-text-container ' + classes.join(' ')}>
    {children}
  </div>
);
