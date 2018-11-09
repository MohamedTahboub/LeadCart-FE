import {
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILD,
  LOGIN_SUCCESS,
  LOGIN_FAILD,
  LOGOUT
} from 'constantsTypes';

let user = {};
try {
  user = localStorage.user && JSON.parse(localStorage.user);
} catch (e) {
  console.error('ERROR WHILE READING FROM THE STORAGE');
}

const initialState = {
  isLoggedIn: !!user.token,
  user: {
    firstName: '',
    lastName: '',
    avatar_img: '',
    token: 'dsfadsaWD',
    status: false,
    role: '',
    level: 1,
    ...user
  },
  error: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SIGN_UP_SUCCESS: return { ...state, user: payload, isLoggedIn: true };
  case SIGN_UP_FAILD: return { ...state, error: payload };
  case LOGIN_SUCCESS: return { ...state, user: payload, isLoggedIn: true };
  case LOGIN_FAILD: return { ...state, error: payload };
  case LOGOUT: return { ...state, isLoggedIn: false };
  default: return state;
  }
};
