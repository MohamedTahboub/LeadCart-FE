import React from 'react';
import PropTypes from 'prop-types';
import classes from 'classnames';

import './style.css';
const Badge = ({
  children,
  type,
  className,
  ...props
}) => {
  const classNames = classes('badge-container', type, className);

  return (
    <div
      data-testid='badge-test'
      className={classNames}
      {...props}
    >
      {children}
    </div>
  );
};

Badge.propTypes = {};

export default Badge;

