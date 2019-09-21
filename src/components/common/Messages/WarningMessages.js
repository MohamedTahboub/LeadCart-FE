import React from 'react';
import PropTypes from 'prop-types';


const WarningMessages = ({
  children,
  className,
}) => (
  <div className={`message warning-message ${className}`}>
    <div className='warning-message-icon'>
      <i className='fas fa-exclamation-triangle' />
    </div>
    <div className='message-content'>
      {children}
    </div>
  </div>
);

WarningMessages.propTypes = {
  children: PropTypes.instanceOf(HTMLElement).isRequired,
  className: PropTypes.string
};
WarningMessages.defaultProps = {
  className: ''
};

export default WarningMessages;
