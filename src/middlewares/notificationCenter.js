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
  UPDATE_UPSELL_SUCCESS,
  UPDATE_UPSELL_FAILED,
  CREATE_UPSELL,
  DELETE_UPSELL_SUCCESS,
  DELETE_UPSELL_FAILED
} from 'constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  const showSuccessMessage = (message) => dispatch(showFlashMessage({ type: 'success', message }));
  const showFailurMessage = (message) => dispatch(showFlashMessage({ type: 'failed', message }));

  switch (action.type) {
  case CREATE_UPSELL:
    setTimeout(() => {
      showSuccessMessage('\'Upsell Created Successfully \'');
    }, 300);
    break;
  case DELETE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Deleted Successfully');
    break;
  case UPDATE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Updated Successfully');
    break;
  case UPDATE_PRODUCT_SUCCESS:
    showSuccessMessage('The Product Updated Successfully');
    break;
  case SAVE_USER_GENERAL_SETTINGS_SUCCESS:
    showSuccessMessage('Update General Setting Successfully');
    break;
  case PRODUCT_CREATED_SUCCESSFULY:
    showSuccessMessage('The Product Created Successfully');
    break;
  case DELETE_USER_PRODUCT_SUCCESS:
    showSuccessMessage('The Product Deleted Successfully');
    break;
  case UPLOAD_FILE_SUCCESS:
    showSuccessMessage('Uploaded Successfully');
    break;
  case CHANGE_ACCOUNT_DETAILS_SUCCESS:
    showSuccessMessage('Account Details Changes Successfully');
    break;
  case CHANGE_ACCOUNT_PASSWORD_SUCCESS:
    showSuccessMessage('Account Password Changes Successfully');
    break;
  case CREATE_NEW_MEMBER_SUCCESS:
    showSuccessMessage('\'New Member Have Been');
    break;
  case CREATE_NEW_COUPON_SUCCESS:
    showSuccessMessage('New Coupon Created Successfully');
    break;
  case CHANGE_COUPON_STATE_SUCCESS:
    showSuccessMessage('Coupon status changed Successfully');
    break;
  case TOGGLE_PRODUCT_AVAILABILITY_SUCCESS:
    showSuccessMessage('Product availability changed Successfully');
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
  case DELETE_UPSELL_FAILED:
    showFailurMessage('Couldn\'t delete that Upsell,Something went wrong');
    break;
  case UPDATE_UPSELL_FAILED:
    showFailurMessage('Couldn\'t update that Upsell,Something went wrong');
    break;
  default:
    return next(action);
  }

  return next(action);
};
