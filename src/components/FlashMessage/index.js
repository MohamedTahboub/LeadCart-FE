import React from 'react';
import { connect } from 'react-redux';
import * as hideFlashMessageActions from 'actions/flashMessage';
import './style.css';
const FlashMessage = ({
  message, hideFlashMessage, show, ...props
}) => (
  <div className={show ? 'flash-message-container show-flash-message' : 'flash-message-container '}>
    <span onClick={hideFlashMessage} className='flash-message-close-btn'>
      <i className='fas fa-times' />
    </span>
    <div className='flash-message-content'>{message}</div>
  </div>
);
const mapStateToProps = ({ flashMessage }) => ({
  message: flashMessage.message,
  show: flashMessage.showFlashMessage
});
export default connect(mapStateToProps, hideFlashMessageActions)(FlashMessage);

