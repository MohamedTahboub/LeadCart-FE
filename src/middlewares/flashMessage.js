import { SHOW_FLASH_MESSAGE } from 'constantsTypes';
import { hideFlashMessage } from 'actions/flashMessage';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type === SHOW_FLASH_MESSAGE) {
    setTimeout(() => {
      dispatch(hideFlashMessage());
    }, 6 * 1000);
  }


  next(action);
};
