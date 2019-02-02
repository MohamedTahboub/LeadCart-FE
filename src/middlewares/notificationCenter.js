import { showFlashMessage } from 'actions/flashMessage';

import {
  PRODUCT_CREATED_SUCCESSFULY,
  UPDATE_PRODUCT_SUCCESS,
  DELETE_USER_PRODUCT_SUCCESS,
  UPLOAD_FILE_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_FAILED,
  CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  CHANGE_ACCOUNT_PASSWORD_FAILED,
  CREATE_NEW_MEMBER_SUCCESS,
  CREATE_NEW_MEMBER_FAILED,
  SAVE_USER_GENERAL_SETTINGS_SUCCESS,
  TOGGLE_PRODUCT_AVAILABILITY_SUCCESS,
  SAVE_USER_GENERAL_SETTINGS_FAILED,
  CREATE_SUB_ACCOUNT_FAILED,
  PRODUCT_CREATION_FAILED,
  UPDATE_PRODUCT_FAILED,
  CREATE_NEW_COUPON_SUCCESS,
  CHANGE_COUPON_STATE_SUCCESS,
  CHANGE_COUPON_STATE_FAILED,
  CREATE_NEW_COUPON_FAILED,
  UPLOAD_FILE_FAILED,
  UPDATE_UPSELL,
  CREATE_UPSELL
} from 'constantsTypes';
export default ({ dispatch }) => (next) => (action) => {
  switch (action.type) {
  case CREATE_UPSELL:
    setTimeout(() => {
      dispatch(showFlashMessage({ type: 'success', message: 'Upsell Created Successfuly ' }));
    }, 300);
    break;
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
  case CREATE_NEW_COUPON_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'New Coupon Created Successfully' }));
    break;
  case CHANGE_COUPON_STATE_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'Coupon status changed Successfully' }));
    break;
  case TOGGLE_PRODUCT_AVAILABILITY_SUCCESS:
    dispatch(showFlashMessage({ type: 'success', message: 'Product availability changed Successfully' }));
    break;
  case CHANGE_ACCOUNT_DETAILS_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Account Details Changes Failed' }));
    break;
  case CHANGE_ACCOUNT_PASSWORD_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Account password Changes Failed' }));
    break;
  case CREATE_NEW_MEMBER_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to create New member' }));
    break;
  case SAVE_USER_GENERAL_SETTINGS_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to Update General Setting' }));
    break;
  case UPDATE_PRODUCT_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to Update The Product' }));
    break;
  case CREATE_SUB_ACCOUNT_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to Create A Sub Account!' }));
    break;
  case PRODUCT_CREATION_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to Create The product' }));
    break;
  case CHANGE_COUPON_STATE_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to Change coupon status' }));
    break;
  case CREATE_NEW_COUPON_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to Create New Coupon' }));
    break;
  case UPLOAD_FILE_FAILED:
    dispatch(showFlashMessage({ type: 'faild', message: 'Failed to Upload The File' }));
    break;
  case UPDATE_UPSELL:
    dispatch(showFlashMessage({ type: 'faild', message: 'Upsell Failed To Update' }));
    break;
  default:
    return next(action);
  }

  return next(action);
};
