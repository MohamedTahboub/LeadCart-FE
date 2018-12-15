import {
  CREATE_SUB_ACCOUNT_SUCCESS,
  CREATE_SUB_ACCOUNT_FAILD,
  GET_SUB_ACCOUNTS,
  ACTIVATE_AGENCY_CODE_FAILD,

} from 'constantsTypes';

const initialState = {
  subAccounts: [],
  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_SUB_ACCOUNTS: return { ...state, subAccounts: payload };
  case CREATE_SUB_ACCOUNT_SUCCESS: return { ...state, subAccounts: [...state.subAccounts, payload] };

  case CREATE_SUB_ACCOUNT_FAILD: return { ...state, errors: typeof payload === 'object' ? payload : { message: payload } };

  default: return state;
  }
};
