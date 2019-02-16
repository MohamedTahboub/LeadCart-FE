import React from 'react';
import { connect } from 'react-redux';
import * as hideFlashMessageActions from 'actions/flashMessage';
import './style.css';


const messageType = (type) => (type === 'success' ? 'flash-message-success' : 'flash-message-faild');
const FlashMessage = ({
  message, hideFlashMessage, show, type, ...props
}) => (
  <div className={show ? `flash-message-container show-flash-message ${messageType(type)}` : 'flash-message-container '}>
    <span onClick={hideFlashMessage} className='flash-message-close-btn'>
      <i className='fas fa-times' />
    </span>
    <div className='flash-message-content'>{message}</div>
  </div>
);
const mapStateToProps = ({ flashMessage }) => ({
  message: flashMessage.message,
  show: flashMessage.showFlashMessage,
  type: flashMessage.type
});
export default connect(mapStateToProps, hideFlashMessageActions)(FlashMessage);

