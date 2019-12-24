import { store } from 'react-notifications-component';
import { showIntercomIcon } from './intercom';

const defaultOptions = {
  // title: "Wonderful!",
  // message: "teodosii@react-notifications-component",
  type: 'success',
  insert: 'bottom',
  container: 'bottom-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
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
  const type = 'failed';
  commonNotification('Failed', message, { ...options, type });
};

