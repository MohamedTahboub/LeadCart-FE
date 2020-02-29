import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import clx from 'classnames';

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

export const ImageOption = ({
  value,
  active,
  onClick,
  className = '',
  ...props
}) => {
  const classNames = clx({
    'image-badge-option': true,
    [className]: className,
    active,
  });

  return (
    <img
      onClick={onClick(value)}
      className={classNames}
      src={value}
      alt='guarantee Badge'
    />
  );
};

SettingBox.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
};
SettingBox.default = {
  className: '',
};

