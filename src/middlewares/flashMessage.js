import { SHOW_FLASH_MESSAGE } from 'constantsTypes';
import { hideFlashMessage } from 'actions/flashMessage';
import { showIntercomIcon } from 'libs';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type === SHOW_FLASH_MESSAGE) {
    showIntercomIcon(false);
    setTimeout(() => {
      dispatch(hideFlashMessage());
      setTimeout(() => {
        showIntercomIcon(true);
      }, 500);
    }, 6 * 1000);
  }


  next(action);
};
