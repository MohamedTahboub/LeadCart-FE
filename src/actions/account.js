import {
  CHANGE_ACCOUNT_DETAILS,
  CHANGE_ACCOUNT_DETAILS_FAILED,
  CHANGE_ACCOUNT_DETAILS_SUCCESS,
  CHANGE_ACCOUNT_PASSWORD,
  CHANGE_ACCOUNT_PASSWORD_FAILED,
  CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_PASSWORD_FAILED,
  FORGOT_PASSWORD_SUCCESS,
  RESET_PASSWORD,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_SUCCESS,
  UPDATE_ACCOUNT_EMAIL,
  UPDATE_ACCOUNT_EMAIL_FAILED,
  UPDATE_ACCOUNT_EMAIL_SUCCESS,
  UPDATE_USER_PROFILE_IMAGE,
  UPDATE_USER_PROFILE_IMAGE_FAILED,
  UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  VERIFY_RESET_KEY,
  VERIFY_RESET_KEY_FAILED,
  VERIFY_RESET_KEY_SUCCESS,
  VERIFY_USER_ACCOUNT,
  VERIFY_USER_ACCOUNT_FAILED,
  VERIFY_USER_ACCOUNT_SUCCESS
} from 'constantsTypes';


export const onChangeAccountDetails = (details, meta) => ({
  type: CHANGE_ACCOUNT_DETAILS,
  payload: details,
  meta
});
export const onChangeAccountDetailsSuccess = (message) => ({
  type: CHANGE_ACCOUNT_DETAILS_SUCCESS,
  payload: message
});
export const onChangeAccountDetailsFailed = (message) => ({
  type: CHANGE_ACCOUNT_DETAILS_FAILED,
  payload: message
});


export const onChangeAccountPassword = (pwds, meta) => ({
  type: CHANGE_ACCOUNT_PASSWORD,
  payload: pwds,
  meta
});

export const onChangeAccountPasswordSuccess = (message) => ({
  type: CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  payload: message
});

export const onChangeAccountPasswordFailed = (message) => ({
  type: CHANGE_ACCOUNT_PASSWORD_FAILED,
  payload: message
});


export const updateUserProfileImage = (image) => ({
  type: UPDATE_USER_PROFILE_IMAGE,
  payload: image
});

export const updateUserProfileImageSuccess = (message) => ({
  type: UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  payload: message
});

export const updateUserProfileImageFailed = (message) => ({
  type: UPDATE_USER_PROFILE_IMAGE_FAILED,
  payload: message
});


export const verifyUserAccount = (hash, meta) => ({
  type: VERIFY_USER_ACCOUNT,
  payload: hash,
  meta
});

export const verifyUserAccountSuccess = (status) => ({
  type: VERIFY_USER_ACCOUNT_SUCCESS,
  payload: status
});

export const verifyUserAccountFailed = (message) => ({
  type: VERIFY_USER_ACCOUNT_FAILED,
  payload: message
});


export const forgotPassword = (data, meta) => ({
  type: FORGOT_PASSWORD,
  payload: data,
  meta
});

export const forgotPasswordSuccess = (status) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: status
});

export const forgotPasswordFailed = (message) => ({
  type: FORGOT_PASSWORD_FAILED,
  payload: message
});


export const verifyResetKey = (hash, meta) => ({
  type: VERIFY_RESET_KEY,
  payload: hash,
  meta
});


export const verifyResetKeySuccess = (status) => ({
  type: VERIFY_RESET_KEY_SUCCESS,
  payload: status
});

export const verifyResetKeyFailed = (message) => ({
  type: VERIFY_RESET_KEY_FAILED,
  payload: message
});


export const resetPassword = (data, meta) => ({
  type: RESET_PASSWORD,
  payload: data,
  meta
});

export const resetPasswordSuccess = (status) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: status
});

export const resetPasswordFailed = (message) => ({
  type: RESET_PASSWORD_FAILED,
  payload: message
});

export const updateAccountEmail = (email, meta) => ({
  type: UPDATE_ACCOUNT_EMAIL,
  payload: email,
  meta
});

export const updateAccountEmailSuccess = (email) => ({
  type: UPDATE_ACCOUNT_EMAIL_SUCCESS,
  payload: email
});

export const updateAccountEmailFailed = (message) => ({
  type: UPDATE_ACCOUNT_EMAIL_FAILED,
  payload: message
});
