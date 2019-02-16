import {
  ENABLE_EMAIL_FOOTER,
  ENABLE_EMAIL_FOOTER_SUCCESS,
  ENABLE_EMAIL_FOOTER_FAILED,
} from 'constantsTypes';


export const enableEmailFooter = (details) => ({
  type: ENABLE_EMAIL_FOOTER,
  payload: details
});
export const enableEmailFooterSuccess = (details) => ({
  type: ENABLE_EMAIL_FOOTER_SUCCESS,
  payload: details
});
export const enableEmailFooterFailed = (details) => ({
  type: ENABLE_EMAIL_FOOTER_FAILED,
  payload: details
});
