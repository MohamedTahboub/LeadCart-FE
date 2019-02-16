import {
  CREATE_SUB_ACCOUNT,
  CREATE_SUB_ACCOUNT_SUCCESS,
  CREATE_SUB_ACCOUNT_FAILED,
  GET_SUB_ACCOUNTS
} from 'constantsTypes';

export const getSubAccountsSuccess = (subAccounts) => ({
  type: GET_SUB_ACCOUNTS,
  payload: subAccounts
});

export const onCreateSubAccount = (account) => ({
  type: CREATE_SUB_ACCOUNT,
  payload: account
});

export const onCreateSubAccountSuccess = (message) => ({
  type: CREATE_SUB_ACCOUNT_SUCCESS,
  payload: message
});
export const onCreateSubAccountFailed = (message) => ({
  type: CREATE_SUB_ACCOUNT_FAILED,
  payload: message
});
