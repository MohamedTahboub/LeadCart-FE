
import { store } from 'react-notifications-component';
import { NotificationContainer } from 'components/NotificationMessage';
import React from 'react';
import { showIntercomIcon } from './intercom';

// const NotificationContainer = ({
//   title = 'Title',
//   message = 'Message',
//   ...props
// }) => (
//   <div className='notification-message-container'>
//     {title && (<h4>{title}</h4>)}
//     <p className='notification-message'>
//       {message}
//     </p>
//   </div>
// );

const defaultOptions = {
  // title: "Wonderful!",
  // message: "teodosii@react-notifications-component",
  type: 'success',
  insert: 'bottom',
  container: 'bottom-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  width: 300,
  dismiss: {
    duration: 5000,
    onScreen: true
  }
};

const commonNotification = (title, message, options = {}) => {
  showIntercomIcon(false);
  store.addNotification({
    title,
    message,
    // content: NotificationContainer,
    ...defaultOptions,
    onRemoval: () => {
      showIntercomIcon(true);
    },
    showIcon: true,
    ...options
  });
};


export const success = (message, options = {}) => {
  commonNotification('Success', message, options);
};

export const warning = (message, options = {}) => {
  const type = 'warning';
  commonNotification('Warning', message, { ...options, type });
};

export const failed = (message, options = {}) => {
  const type = 'danger';
  commonNotification('Failed', message, { ...options, type });
};

