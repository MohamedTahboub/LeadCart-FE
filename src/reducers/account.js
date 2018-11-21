import {
  CHANGE_ACCOUNT_DETAILS_SUCCESS,
  CHANGE_ACCOUNT_DETAILS_FAILD,
  CHANGE_ACCOUNT_PASSWORD_SUCCESS,
  CHANGE_ACCOUNT_PASSWORD_FAILD,
  UPDATE_USER_PROFILE_IMAGE_SUCCESS,
} from 'constantsTypes';
const initialState = {

  errors: {}
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CHANGE_ACCOUNT_DETAILS_SUCCESS: return {};
  case CHANGE_ACCOUNT_PASSWORD_SUCCESS: return {};
  // case UPDATE_USER_PROFILE_IMAGE_SUCCESS: return { ...state, profileImage: payload };
  case CHANGE_ACCOUNT_DETAILS_FAILD: return { ...state, detailsModel: { errors: typeof payload === 'object' ? payload : { message: payload } } };
  case CHANGE_ACCOUNT_PASSWORD_FAILD: return { ...state, passwordsModel: { errors: typeof payload === 'object' ? payload : { message: payload } } };
  default: return state;
  }
};
