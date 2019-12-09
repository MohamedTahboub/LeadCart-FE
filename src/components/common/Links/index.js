import React from 'react';
import './style.css';

export const BlankLink = ({
  to,
  children,
  className = '',
  ...props
}) => (
  <a
    href={to}
    target='_blank'
    className={`blank-link ${className || ''}`}
    rel='noreferrer noopener'
  >
    {' '}
    {children}
  </a>
);

