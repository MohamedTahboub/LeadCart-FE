import { SHOW_FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from 'constantsTypes';


export const showFlashMessage = (message) => ({
  type: SHOW_FLASH_MESSAGE,
  payload: message
});

export const hideFlashMessage = () => ({
  type: HIDE_FLASH_MESSAGE
});
