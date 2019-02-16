import {
  CHANGE_ACCOUNT_DETAILS_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_FAILED,
  CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  CHANGE_ACCOUNT_PASSWORD_FAILED,
} from 'constantsTypes';
const initialState = {

  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CHANGE_ACCOUNT_DETAILS_SUCCESS: return {};
  case CHANGE_ACCOUNT_PASSWORD_SUCCESS: return {};
  case CHANGE_ACCOUNT_DETAILS_FAILED: return { ...state, detailsModel: { errors: typeof payload === 'object' ? payload : { message: payload } } };
  case CHANGE_ACCOUNT_PASSWORD_FAILED: return { ...state, passwordsModel: { errors: typeof payload === 'object' ? payload : { message: payload } } };
  default: return state;
  }
};
