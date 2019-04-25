import {
  CHANGE_ACCOUNT_DETAILS,
  CHANGE_ACCOUNT_DETAILS_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_FAILED,
  CHANGE_ACCOUNT_PASSWORD,
  CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  CHANGE_ACCOUNT_PASSWORD_FAILED,
  UPDATE_USER_PROFILE_IMAGE,
  UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  UPDATE_USER_PROFILE_IMAGE_FAILED,
  VERIFY_USER_ACCOUNT,
  VERIFY_USER_ACCOUNT_SUCCESS,
  VERIFY_USER_ACCOUNT_FAILED
} from 'constantsTypes';


export const onChangeAccountDetails = (details) => ({
  type: CHANGE_ACCOUNT_DETAILS,
  payload: details
});
export const onChangeAccountDetailsSuccess = (message) => ({
  type: CHANGE_ACCOUNT_DETAILS_SUCCESS,
  payload: message
});
export const onChangeAccountDetailsFailed = (message) => ({
  type: CHANGE_ACCOUNT_DETAILS_FAILED,
  payload: message
});


export const onChangeAccounPassword = (pwds) => ({
  type: CHANGE_ACCOUNT_PASSWORD,
  payload: pwds
});

export const onChangeAccounPasswordSuccess = (message) => ({
  type: CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  payload: message
});

export const onChangeAccounPasswordFailed = (message) => ({
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

