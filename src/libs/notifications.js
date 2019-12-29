
import React from 'react';
import { store } from 'react-notifications-component';
import * as Skins from 'components/Notifications';
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
  // dismiss: {
  //   duration: 5000
  // }
};

const commonNotification = (title, message, options = {}) => {
  showIntercomIcon(false);
  store.addNotification({
    title,
    message,
    ...defaultOptions,
    type: 'custom',
    content: <Skins.Custom
      message={message}
      // title={title}
      icon={options.withIcon}
      type={options.type}
    />,
    onRemoval: () => {
      // showIntercomIcon(true);
    },
    showIcon: true,
    // ...options
  });
};

const withIcon = true;
export const success = (message, options = {}) => {
  const type = 'success';
  commonNotification('Success', message, { ...options, withIcon, type });
};

export const warning = (message, options = {}) => {
  const type = 'warning';
  commonNotification('Warning', message, { ...options, type, withIcon });
};

export const failed = (message, options = {}) => {
  const type = 'danger';
  commonNotification('Failed', message, { ...options, type, withIcon });
};

export const lightInfo = (message, options = {}) => {
  const type = 'info';
  commonNotification('Failed', message, { ...options, type, withIcon });
};

