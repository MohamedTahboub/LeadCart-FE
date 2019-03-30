import {
  UPDATE_EMAIL_FOOTER,
  UPDATE_EMAIL_FOOTER_SUCCESS,
  UPDATE_EMAIL_FOOTER_FAILED,
  VERIFY_SOURCE_EMAIL,
  VERIFY_SOURCE_EMAIL_SUCCESS,
  VERIFY_SOURCE_EMAIL_FAILED,
  CHECK_EMAIL_VERIFICATION,
  CHECK_EMAIL_VERIFICATION_SUCCESS,
  CHECK_EMAIL_VERIFICATION_FAILED,
  TEST_EMAIL,
  TEST_EMAIL_SUCCESS,
  TEST_EMAIL_FAILED
} from 'constantsTypes';


export const updateEmailFooter = (details) => ({
  type: UPDATE_EMAIL_FOOTER,
  payload: details
});
export const updateEmailFooterSuccess = (details) => ({
  type: UPDATE_EMAIL_FOOTER_SUCCESS,
  payload: details
});
export const updateEmailFooterFailed = (details) => ({
  type: UPDATE_EMAIL_FOOTER_FAILED,
  payload: details
});

export const verifyEmailSource = (email) => ({
  type: VERIFY_SOURCE_EMAIL,
  payload: email
});
export const verifyEmailSourceSuccess = (email) => ({
  type: VERIFY_SOURCE_EMAIL_SUCCESS,
  payload: email
});
export const verifyEmailSourceFailed = (message) => ({
  type: VERIFY_SOURCE_EMAIL_FAILED,
  payload: message
});

export const checkEmailVerification = (email) => ({
  type: CHECK_EMAIL_VERIFICATION,
  payload: email
});
export const checkEmailVerificationSuccess = (email) => ({
  type: CHECK_EMAIL_VERIFICATION_SUCCESS,
  payload: email
});
export const checkEmailVerificationFailed = (message) => ({
  type: CHECK_EMAIL_VERIFICATION_FAILED,
  payload: message
});

export const testEmail = (type) => ({
  type: TEST_EMAIL,
  payload: type
});
export const testEmailSuccess = (type) => ({
  type: TEST_EMAIL_SUCCESS,
  payload: type
});
export const testEmailFailed = (message) => ({
  type: TEST_EMAIL_FAILED,
  payload: message
});

