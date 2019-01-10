import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILD,
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  LOGOUT,
  UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  ACTIVATE_AGENCY_CODE_SUCCESS,
  ACTIVATE_AGENCY_CODE_FAILD,
  GET_ACTIVATED_AGENCY_CODES_NUMBERS
} from 'constantsTypes';

let user = {};
try {
  user = localStorage.LeadCart && JSON.parse(localStorage.LeadCart);
} catch (e) {
  console.error('ERROR WHILE READING FROM THE STORAGE');
}
// if (!user.token) user = { token: '' };
const initialState = {
  isLoggedIn: !!user.token,
  user: {
    firstName: '',
    lastName: '',
    avatar_img: '',
    token: '',
    status: false,
    role: '',
    level: 1,
    ...user
  },
  errors: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SIGN_UP_SUCCESS: return { ...state, user: payload, isLoggedIn: true };
  case SIGN_UP_FAILD: return { ...state, error: payload };
  case LOGIN_SUCCESS: return { ...state, user: payload, isLoggedIn: true };
  case LOGIN_FAILD: return { ...state, error: payload };
  case LOGOUT: return { ...state, isLoggedIn: false };
  case UPDATE_USER_PROFILE_IMAGE_SUCCESS: return { ...state, user: { ...state.user, profileImage: payload } };
  case ACTIVATE_AGENCY_CODE_SUCCESS:
    return {
      ...state,
      user: {
        ...state.user,
        level: payload.level,
      },
      activatedPromoCodes: state.activatedPromoCodes && state.activatedPromoCodes + 1 || 0,
      errors: {
        ...state.errors,
        code: ''
      }
    };
  case ACTIVATE_AGENCY_CODE_FAILD:
    return {
      ...state,
      errors: typeof payload === 'object' ? { code: payload } : { code: { message: payload } }
    };
  case GET_ACTIVATED_AGENCY_CODES_NUMBERS: return { ...state, activatedPromoCodes: payload };
  default: return state;
  }
};
