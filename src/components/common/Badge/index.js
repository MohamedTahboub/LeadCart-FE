import React from 'react';
import classes from 'classnames';

import './style.css';
const Badge = ({
  children,
  type,
  className,
  size,
  ...props
}) => {
  const badgeProps = {
    'className': classes('badge-container', type, size, className),
    'data-testid': 'badge-test',
    ...props
  };
  return (
    <div {...badgeProps} >
      {children}
    </div>
  );
};

export default Badge;

