import {
  CREATE_SUB_ACCOUNT_SUCCESS,
  CREATE_SUB_ACCOUNT_FAILED,
  GET_SUB_ACCOUNTS,
  ACTIVATE_AGENCY_CODE_FAILED,

} from 'constantsTypes';

const initialState = {
  subAccounts: [],
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_SUB_ACCOUNTS: return { ...state, subAccounts: payload };
  case CREATE_SUB_ACCOUNT_SUCCESS: return { ...state, subAccounts: [...state.subAccounts, payload] };

  case CREATE_SUB_ACCOUNT_FAILED: return { ...state, errors: typeof payload === 'object' ? payload : { message: payload } };

  default: return state;
  }
};
