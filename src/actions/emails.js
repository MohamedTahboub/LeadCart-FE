import {
  CHECK_EMAIL_VERIFICATION,
  CHECK_EMAIL_VERIFICATION_FAILED,
  CHECK_EMAIL_VERIFICATION_SUCCESS,
  GET_EMAIL_SETTINGS,
  TEST_EMAIL,
  TEST_EMAIL_FAILED,
  TEST_EMAIL_SUCCESS,
  UPDATE_EMAIL_FOOTER,
  UPDATE_EMAIL_FOOTER_FAILED,
  UPDATE_EMAIL_FOOTER_SUCCESS,
  VERIFY_SOURCE_EMAIL,
  VERIFY_SOURCE_EMAIL_FAILED,
  VERIFY_SOURCE_EMAIL_SUCCESS
} from 'constantsTypes';


export const getEmailSettings = (settings) => ({
  type: GET_EMAIL_SETTINGS,
  payload: settings
});
export const updateEmailFooter = (details, meta) => ({
  type: UPDATE_EMAIL_FOOTER,
  payload: details,
  meta
});
export const updateEmailFooterSuccess = (details) => ({
  type: UPDATE_EMAIL_FOOTER_SUCCESS,
  payload: details
});
export const updateEmailFooterFailed = (details) => ({
  type: UPDATE_EMAIL_FOOTER_FAILED,
  payload: details
});

export const verifyEmailSource = (email, meta) => ({
  type: VERIFY_SOURCE_EMAIL,
  payload: email,
  meta
});
export const verifyEmailSourceSuccess = (email) => ({
  type: VERIFY_SOURCE_EMAIL_SUCCESS,
  payload: email
});
export const verifyEmailSourceFailed = (message) => ({
  type: VERIFY_SOURCE_EMAIL_FAILED,
  payload: message
});

export const checkEmailVerification = (email, meta) => ({
  type: CHECK_EMAIL_VERIFICATION,
  payload: email,
  meta
});
export const checkEmailVerificationSuccess = (email) => ({
  type: CHECK_EMAIL_VERIFICATION_SUCCESS,
  payload: email
});
export const checkEmailVerificationFailed = (message) => ({
  type: CHECK_EMAIL_VERIFICATION_FAILED,
  payload: message
});

export const testEmail = (type, meta) => ({
  type: TEST_EMAIL,
  payload: type,
  meta
});
export const testEmailSuccess = (type) => ({
  type: TEST_EMAIL_SUCCESS,
  payload: type
});
export const testEmailFailed = (message) => ({
  type: TEST_EMAIL_FAILED,
  payload: message
});

