// import { showFlashMessage } from 'actions/flashMessage';
import { notification } from 'libs';


import * as types from '../constantsTypes';

const showSuccessMessage = (message) => notification.success(message);
const showFailureMessage = (message) => notification.failed(message);

export default () => (next) => (action) => {
  switch (action.type) {
  case types.UPDATE_EMAIL_FOOTER_SUCCESS:
    showSuccessMessage('Emails footer details updated');
    break;
  case types.VERIFY_SOURCE_EMAIL_SUCCESS:
    showSuccessMessage('An email sent to your account to be verified');
    break;
  case types.DELETE_COUPON_SUCCESS:
    showSuccessMessage('Coupon Deleted');
    break;
  case types.TEST_EMAIL_SUCCESS:
    showSuccessMessage('A test email was sent to your leadcart email');
    break;
  case types.CREATE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Created');
    break;
  case types.CONNECT_WITH_PAYPAL_SUCCESS:
    showSuccessMessage('You have integrated with payPal');
    break;
  case types.ACTIVATE_MEMBER_SUCCESS:
    showSuccessMessage('You have Changed member status');
    break;
  case types.DELETE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Deleted');
    break;
  case types.UPDATE_UPSELL_SUCCESS:
    showSuccessMessage('Upsell Updated');
    break;
  // case types.UPDATE_PRODUCT_SUCCESS:
  //   showSuccessMessage('The Product Updated');
  //   break;
  case types.SAVE_USER_GENERAL_SETTINGS_SUCCESS:
    showSuccessMessage('Update General Setting');
    break;
  // case types.PRODUCT_CREATED_SUCCESSFULLY:
  //   showSuccessMessage('The Product Created');
  //   break;
  case types.DELETE_USER_PRODUCT_SUCCESS:
    showSuccessMessage('The Product Deleted');
    break;
  case types.UPLOAD_FILE_SUCCESS:
    showSuccessMessage('Uploaded  ');
    break;

  case types.CREATE_NEW_MEMBER_SUCCESS:
    showSuccessMessage('\'New Member Have Been');
    break;
  case types.CREATE_NEW_COUPON_SUCCESS:
    showSuccessMessage('New Coupon Created');
    break;
  case types.CHANGE_COUPON_STATE_SUCCESS:
    showSuccessMessage('Coupon status changed');
    break;
  case types.TOGGLE_PRODUCT_AVAILABILITY_SUCCESS:
    showSuccessMessage('Product availability changed');
    break;

  case types.CREATE_NEW_MEMBER_FAILED:
    showFailureMessage('Failed to create New member');
    break;
  case types.SAVE_USER_GENERAL_SETTINGS_FAILED:
    showFailureMessage('Failed to save the setting, fields maybe not valid');
    break;
  // case types.UPDATE_PRODUCT_FAILED:
  //   showFailureMessage('Failed to Update The Product');
  //   break;
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
    showSuccessMessage('Member has been deleted  ');
    break;
  case types.EDIT_COUPON_SUCCESS:
    showSuccessMessage('Coupon has been updated  ');
    break;
  case types.EDIT_COUPON_FAILED:
    showFailureMessage('Failed to update the coupon');
    break;
  case types.RESEND_RECEIPT_EMAIL_SUCCESS:
    showSuccessMessage('Receipt email sent  ');
    break;
  case types.RESEND_RECEIPT_EMAIL_FAILED:
    showFailureMessage('Failed to resend the receipt email');
    break;
  case types.RESEND_FULFILLMENT_EMAIL_SUCCESS:
    showSuccessMessage('Fulfillment email sent  ');
    break;
  case types.RESEND_FULFILLMENT_EMAIL_FAILED:
    showFailureMessage('Failed to resend the fulfillment email');
    break;
  case types.ORDER_REFUND_SUCCESS:
    showSuccessMessage('Order have been refunded  ');
    break;
  case types.UPGRADE_USER_PACKAGE_FAILED:
    showFailureMessage(action.payload, 'Failed to upgrade you current plan');
    break;
  case types.UPGRADE_USER_PACKAGE_SUCCESS:
    showSuccessMessage('Your account have been upgraded  ');
    break;
  case types.ORDER_REFUND_FAILED:
    showFailureMessage('Failed to refund order. Product/Offer may not Exist');
    break;
  case types.UPDATE_FULFILLMENT_SUCCESS:
    showSuccessMessage('Fulfillment Updated');
    break;
  case types.UPDATE_FULFILLMENT_FAILED:
    showFailureMessage('Failed to update fulfillment.');
    break;
  default:
    return next(action);
  }

  return next(action);
};
