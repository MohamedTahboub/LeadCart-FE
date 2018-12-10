import { showFlashMessage } from 'actions/flashMessage';

import {
  UPDATE_PRODUCT_DETAILS_SUCCESS,
  PRODUCT_CREATED_SUCCESSFULY,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_USER_PRODUCT_SUCCESS,
  UPLOAD_FILE_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_FAILD,
  CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  CHANGE_ACCOUNT_PASSWORD_FAILD,
  CREATE_NEW_MEMBER_SUCCESS,
  CREATE_NEW_MEMBER_FAILD,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILD,
  UPDATE_PRODUCT_DETAILS_FAILD,
  CREATE_SUB_ACCOUNT_FAILD,
  PRODUCT_CREATION_FAILD,
} from 'constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
  case UPDATE_PRODUCT_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'The Product Updated Successfuly ' }));
    break;
  case SAVE_USER_GENERAL_SETTINGS_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'Update General Setting Successfully' }));
    break;
  case PRODUCT_CREATED_SUCCESSFULY:
    dispatch(showFlashMessage({ type: 'success', message: 'The Product Created Successfuly ' }));
    break;
  case DELETE_USER_PRODUCT_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'The Product Deleted Successfuly ' }));
    break;
  case UPLOAD_FILE_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'Uploaded Successfuly ' }));
    break;
  case CHANGE_ACCOUNT_DETAILS_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'Account Details Changes Successfully' }));
    break;
  case CHANGE_ACCOUNT_PASSWORD_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'Account Password Changes Successfully' }));
    break;
  case CREATE_NEW_MEMBER_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'New Member Have Been Created' }));
    break;
  case CHANGE_ACCOUNT_DETAILS_FAILD:
    dispatch(showFlashMessage({ type: 'faild', message: 'Account Details Changes Faild' }));
    break;
  case CHANGE_ACCOUNT_PASSWORD_FAILD:
    dispatch(showFlashMessage({ type: 'faild', message: 'Account password Changes Faild' }));
    break;
  case CREATE_NEW_MEMBER_FAILD:
    dispatch(showFlashMessage({ type: 'faild', message: 'Faild to create New member' }));
    break;
  case SAVE_USER_GENERAL_SETTINGS_FAILD:
    dispatch(showFlashMessage({ type: 'faild', message: 'Faild to Update General Setting' }));
    break;
  case UPDATE_PRODUCT_DETAILS_FAILD:
    dispatch(showFlashMessage({ type: 'faild', message: 'Faild to Update Product Details' }));
    break;
  case CREATE_SUB_ACCOUNT_FAILD:
    dispatch(showFlashMessage({ type: 'faild', message: 'Faild to Create A Sub Account!' }));
    break;
  case PRODUCT_CREATION_FAILD:
    dispatch(showFlashMessage({ type: 'faild', message: 'Faild to Create The product' }));
    break;
  default:
    return next(action);
  }

  return next(action);
};
