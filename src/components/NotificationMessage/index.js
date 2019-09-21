import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as hideFlashMessageActions from 'actions/flashMessage';
import PropTypes from 'prop-types';
import { showIntercomIcon } from 'libs';

import './style.css';

const FlashMessage = ({
  message, hideFlashMessage, show = true, type
}) => {
  useEffect(() => {
    showIntercomIcon(!show);
    return () => {
      showIntercomIcon(!show);
    };
  }, [show]);

  const isSuccess = type === 'success' ? 'notification-success-message' : '';
  const isFailed = type === 'failed' ? 'notification-failure-message' : '';
  const isShow = show ? 'show-notification-message' : '';


  const className = `notification-message-container ${isShow} ${isSuccess} ${isFailed}`;
  return (
    <div className={className}>
      <span
        onClick={hideFlashMessage}
        className='notification-close-btn'
      >
        <i className='fas fa-times' />
      </span>
      <div className='notification-message'>
        {message}
      </div>
    </div>
  );
};

FlashMessage.propTypes = {
  message: PropTypes.string.isRequired,
  hideFlashMessage: PropTypes.func.isRequired,
  show: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
const mapStateToProps = ({ flashMessage }) => ({
  message: flashMessage.message,
  show: flashMessage.showFlashMessage,
  type: flashMessage.type
});
export default connect(mapStateToProps, hideFlashMessageActions)(FlashMessage);

