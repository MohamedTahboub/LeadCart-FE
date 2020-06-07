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
  const classNames = classes({
    [type]: true,
    [className]: true
  });

  return (
    <div className={`badge-container ${classNames}`} {...props}>
      {children}
    </div>
  );
};

Badge.propTypes = {

};

export default Badge;

