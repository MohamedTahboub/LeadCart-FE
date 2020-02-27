import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

export const SettingBox = ({
  title,
  children,
  className = '',
  ...props
}) => (
  <Fragment>
    <div className={`large-text border-left-text ${className}`}>{title}</div>
    <div className='padding-left-20'>
      {children}
    </div>
  </Fragment>
);

SettingBox.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
SettingBox.default = {
  className: '',
};
