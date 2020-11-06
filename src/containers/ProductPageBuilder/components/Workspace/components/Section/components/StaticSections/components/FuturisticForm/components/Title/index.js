import React from 'react';
import './style.css';
import clx from 'classnames';

export default ({
  children,
  size,
  step,
  className = '',
  ...props
}) => {

  const classNames = clx('title-element', className, { 'title-medium': size === 'medium', 'title-large': size === 'large' });
  return (
    <div className={classNames}>
      {step && (
        <span className='step'>
          {step}
        </span>
      )}
      <span>
        {children}
      </span>
    </div>
  );
};
