import { showFlashMessage } from 'actions/flashMessage';

// import {
//   PRODUCT_CREATED_SUCCESSFULY,
//   UPDATE_PRODUCT_SUCCESS,
//   DELETE_USER_PRODUCT_SUCCESS,
//   UPLOAD_FILE_SUCCESS,
//   CHANGE_ACCOUNT_DETAILS_SUCCESS,
//   CHANGE_ACCOUNT_DETAILS_FAILED,
//   CHANGE_ACCOUNT_PASSWORD_SUCCESS,
//   CHANGE_ACCOUNT_PASSWORD_FAILED,
//   CREATE_NEW_MEMBER_SUCCESS,
//   CREATE_NEW_MEMBER_FAILED,
//   SAVE_USER_GENERAL_SETTINGS_SUCCESS,
//   TOGGLE_PRODUCT_AVAILABILITY_SUCCESS,
//   SAVE_USER_GENERAL_SETTINGS_FAILED,
//   CREATE_SUB_ACCOUNT_FAILED,
//   PRODUCT_CREATION_FAILED,
//   UPDATE_PRODUCT_FAILED,
//   CREATE_NEW_COUPON_SUCCESS,
//   CHANGE_COUPON_STATE_SUCCESS,
//   CHANGE_COUPON_STATE_FAILED,
//   CREATE_NEW_COUPON_FAILED,
//   UPLOAD_FILE_FAILED,
//   UPDATE_UPSELL_SUCCESS,
//   UPDATE_UPSELL_FAILED,
//   CREATE_UPSELL_SUCCESS,
//   DELETE_UPSELL_SUCCESS,
//   DELETE_UPSELL_FAILED,
//   CONNECT_WITH_PAYPAL_SUCCESS,
//   CONNECT_WITH_PAYPAL_FAILED,
//   ACTIVATE_MEMBER_SUCCESS,
//   ACTIVATE_MEMBER_FAILED,
//   CREATE_UPSELL_FAILED,
//   UPDATE_EMAIL_FOOTER_SUCCESS,
//   VERIFY_SOURCE_EMAIL_SUCCESS,
//   TEST_EMAIL_SUCCESS,
//   DELETE_COUPON_SUCCESS,
//   DELETE_COUPON_FAILED
// }

import * as types from '../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  const showSuccessMessage = (message) => dispatch(showFlashMessage({ type: 'success', message }));
  const showFailureMessage = (message) => dispatch(showFlashMessage({ type: 'failed', message }));

  switch (action.type) {
  case types.UPDATE_EMAIL_FOOTER_SUCCESS:
    showSuccessMessage('Emails footer details successfully updated');
    break;
  case types.VERIFY_SOURCE_EMAIL_SUCCESS:
    showSuccessMessage('An email sent to your account to be verified');
    break;
  case types.DELETE_COUPON_SUCCESS:
    showSuccessMessage('Coupon Deleted Successfully');
    break;
  case types.TEST_EMAIL_SUCCESS:
    showSuccessMessage('A test email was sent to your leadcart email');
    break;
  case types.CREATE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Created Successfully');
    break;
  case types.CONNECT_WITH_PAYPAL_SUCCESS:
    showSuccessMessage('You have successfully integrated with payPal');
    break;
  case types.ACTIVATE_MEMBER_SUCCESS:
    showSuccessMessage('You have successfully Changed member status');
    break;
  case types.DELETE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Deleted Successfully');
    break;
  case types.UPDATE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Updated Successfully');
    break;
  case types.UPDATE_PRODUCT_SUCCESS:
    showSuccessMessage('The Product Updated Successfully');
    break;
  case types.SAVE_USER_GENERAL_SETTINGS_SUCCESS:
    showSuccessMessage('Update General Setting Successfully');
    break;
  case types.PRODUCT_CREATED_SUCCESSFULY:
    showSuccessMessage('The Product Created Successfully');
    break;
  case types.DELETE_USER_PRODUCT_SUCCESS:
    showSuccessMessage('The Product Deleted Successfully');
    break;
  case types.UPLOAD_FILE_SUCCESS:
    showSuccessMessage('Uploaded Successfully');
    break;
  case types.CHANGE_ACCOUNT_DETAILS_SUCCESS:
    showSuccessMessage('Account Details Changes Successfully');
    break;
  case types.CHANGE_ACCOUNT_PASSWORD_SUCCESS:
    showSuccessMessage('Account Password Changes Successfully');
    break;
  case types.CREATE_NEW_MEMBER_SUCCESS:
    showSuccessMessage('\'New Member Have Been');
    break;
  case types.CREATE_NEW_COUPON_SUCCESS:
    showSuccessMessage('New Coupon Created Successfully');
    break;
  case types.CHANGE_COUPON_STATE_SUCCESS:
    showSuccessMessage('Coupon status changed Successfully');
    break;
  case types.TOGGLE_PRODUCT_AVAILABILITY_SUCCESS:
    showSuccessMessage('Product availability changed Successfully');
    break;
  case types.CHANGE_ACCOUNT_DETAILS_FAILED:
    showFailureMessage('Account Details Changes Failed');
    break;
  case types.CHANGE_ACCOUNT_PASSWORD_FAILED:
    showFailureMessage('Account password Changes Failed');
    break;
  case types.CREATE_NEW_MEMBER_FAILED:
    showFailureMessage('Failed to create New member');
    break;
  case types.SAVE_USER_GENERAL_SETTINGS_FAILED:
    showFailureMessage('Failed to save the setting, fields maybe not valid');
    break;
  case types.UPDATE_PRODUCT_FAILED:
    showFailureMessage('Failed to Update The Product');
    break;
  case types.CREATE_SUB_ACCOUNT_FAILED:
    showFailureMessage('Failed to Create A Sub Account!');
    break;
  case types.PRODUCT_CREATION_FAILED:
    showFailureMessage('Failed to Create The product');
    break;
  case types.CHANGE_COUPON_STATE_FAILED:
    showFailureMessage('Failed to Change coupon status');
    break;
  case types.CREATE_NEW_COUPON_FAILED:
    showFailureMessage('Failed to Create New Coupon');
    break;
  case types.UPLOAD_FILE_FAILED:
    showFailureMessage('Failed to Upload The File');
    break;
  case types.DELETE_UPSELL_FAILED:
    showFailureMessage('Couldn\'t delete that Upsell,Something went wrong');
    break;
  case types.UPDATE_UPSELL_FAILED:
    showFailureMessage('Couldn\'t update that Upsell,Something went wrong');
    break;
  case types.CONNECT_WITH_PAYPAL_FAILED:
    showFailureMessage(action.payload);
    break;
  case types.ACTIVATE_MEMBER_FAILED:
    showFailureMessage('Failed to Changed member status');
    break;
  case types.CREATE_UPSELL_FAILED:
    showFailureMessage('Failed to create this upsell');
    break;
  case types.DELETE_COUPON_FAILED:
    showFailureMessage('Failed to Delete the coupon');
    break;
  case types.DELETE_MEMBER_FAILED:
    showFailureMessage('Failed to Delete The Member');
    break;
  case types.DELETE_MEMBER_SUCCESS:
    showSuccessMessage('Member has been deleted successfully');
    break;
  case types.EDIT_COUPON_SUCCESS:
    showSuccessMessage('Coupon has been updated successfully');
    break;
  case types.EDIT_COUPON_FAILED:
    showFailureMessage('Failed to update the coupon');
    break;
  case types.RESEND_RECEIPT_EMAIL_SUCCESS:
    showSuccessMessage('Receipt email sent successfully');
    break;
  case types.RESEND_RECEIPT_EMAIL_FAILED:
    showFailureMessage('Failed to resend the receipt email');
    break;
  case types.RESEND_FULFILLMENT_EMAIL_SUCCESS:
    showSuccessMessage('Fulfillment email sent successfully');
    break;
  case types.RESEND_FULFILLMENT_EMAIL_FAILED:
    showFailureMessage('Failed to resend the fulfillment email');
    break;
  case types.ORDER_REFUND_SUCCESS:
    showSuccessMessage('Order have been refunded successfully');
    break;
  case types.UPGRADE_USER_PACKAGE_FAILED:
    showFailureMessage(action.payload, 'Failed to upgrade you current plan');
    break;
  case types.UPGRADE_USER_PACKAGE_SUCCESS:
    showSuccessMessage('Your account have been upgraded successfully');
    break;
  case types.ORDER_REFUND_FAILED:
    showFailureMessage(`${action.payload || 'Failed to Refund the order for some reson'}`);
    break;
  default:
    return next(action);
  }

  return next(action);
};
