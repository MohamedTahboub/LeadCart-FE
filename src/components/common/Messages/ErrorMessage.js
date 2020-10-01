import React from 'react';
import clx from 'classnames';
// import PropTypes from 'prop-types'
import { Title } from '../Titles';

const ErrorMessage = ({ className, size, children, ...props }) => {

  if (!children) return null;

  const classNames = clx(className, 'truncate');
  return (
    <Title
      size={size}
      weight='bold'
      className={classNames}
      style={{ color: 'tomato' }}
      {...props}
    >
      {children}
    </Title>
  );
};

ErrorMessage.propTypes = {};
ErrorMessage.defaultProps = { size: '13px' };

export default ErrorMessage;
