import { SHOW_FLASH_MESSAGE, HIDE_FLASH_MESSAGE } from 'constantsTypes';


const initialState = {
  message: '',
  showFlashMessage: false,
  type: 'success'
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SHOW_FLASH_MESSAGE: return { showFlashMessage: true, message: payload.message, type: payload.type };
  case HIDE_FLASH_MESSAGE: return { showFlashMessage: false };
  default: return state;
  }
};
