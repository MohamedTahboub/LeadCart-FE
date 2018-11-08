import { showFlashMessage } from 'actions/flashMessage';

import {
  UPDATE_PRODUCT_DETAILS_SUCCESS,
  PRODUCT_CREATED_SUCCESSFULY,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_USER_PRODUCT_SUCCESS,
  UPLOAD_FILE_SUCCESS
} from 'constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
  case UPDATE_PRODUCT_DETAILS_SUCCESS:
    dispatch(showFlashMessage('The Product Details Updated Successfuly '));
    break;
  case PRODUCT_CREATED_SUCCESSFULY:
    dispatch(showFlashMessage('The Product Created Successfuly '));
    break;
  case UPDATE_PRODUCT_SUCCESS:
    dispatch(showFlashMessage('The Product Updated Successfuly '));
    break;
  case DELETE_USER_PRODUCT_SUCCESS:
    dispatch(showFlashMessage('The Product Deleted Successfuly '));
    break;
  case UPLOAD_FILE_SUCCESS:
    dispatch(showFlashMessage('Uploaded Successfuly '));
    break;
  }
  console.log(action.type);

  return next(action);
};
