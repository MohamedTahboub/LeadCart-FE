import {
  CHANGE_SUB_ACCOUNT_STATUS,
  CHANGE_SUB_ACCOUNT_STATUS_FAILED,
  CHANGE_SUB_ACCOUNT_STATUS_SUCCESS,
  CREATE_SUB_ACCOUNT,
  CREATE_SUB_ACCOUNT_FAILED,
  CREATE_SUB_ACCOUNT_SUCCESS,
  DELETE_SUB_ACCOUNT,
  DELETE_SUB_ACCOUNT_FAILED,
  DELETE_SUB_ACCOUNT_SUCCESS,
  GET_SUB_ACCOUNTS,
  REQUEST_SUB_ACCOUNT_DELETION,
  REQUEST_SUB_ACCOUNT_DELETION_FAILED,
  REQUEST_SUB_ACCOUNT_DELETION_SUCCESS
} from 'constantsTypes';

export const getSubAccountsSuccess = (subAccounts) => ({
  type: GET_SUB_ACCOUNTS,
  payload: subAccounts
});

export const onCreateSubAccount = (account, meta) => ({
  type: CREATE_SUB_ACCOUNT,
  payload: account,
  meta
});

export const onCreateSubAccountSuccess = (message) => ({
  type: CREATE_SUB_ACCOUNT_SUCCESS,
  payload: message
});
export const onCreateSubAccountFailed = (message) => ({
  type: CREATE_SUB_ACCOUNT_FAILED,
  payload: message
});


export const requestSubAccountDeletion = (account, meta) => ({
  type: REQUEST_SUB_ACCOUNT_DELETION,
  payload: account,
  meta
});

export const requestSubAccountDeletionSuccess = (account) => ({
  type: REQUEST_SUB_ACCOUNT_DELETION_SUCCESS,
  payload: account
});
export const requestSubAccountDeletionFailed = (message) => ({
  type: REQUEST_SUB_ACCOUNT_DELETION_FAILED,
  payload: message
});

export const deleteSubAccount = (account, meta) => ({
  type: DELETE_SUB_ACCOUNT,
  payload: account,
  meta
});

export const deleteSubAccountSuccess = (account) => ({
  type: DELETE_SUB_ACCOUNT_SUCCESS,
  payload: account
});
export const deleteSubAccountFailed = (message) => ({
  type: DELETE_SUB_ACCOUNT_FAILED,
  payload: message
});

export const changeSubAccountStatus = (state, meta) => ({
  type: CHANGE_SUB_ACCOUNT_STATUS,
  payload: state,
  meta
});

export const changeSubAccountStatusSuccess = (message) => ({
  type: CHANGE_SUB_ACCOUNT_STATUS_SUCCESS,
  payload: message
});
export const changeSubAccountStatusFailed = (message) => ({
  type: CHANGE_SUB_ACCOUNT_STATUS_FAILED,
  payload: message
});
