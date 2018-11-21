import {
  SIGN_UP_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  LOGOUT
} from 'constantsTypes';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { type, payload = {} } = action;
  const loggingEvent = type === SIGN_UP_SUCCESS
    || type === LOGIN_SUCCESS
    || type === LOGOUT
    || type === UPDATE_USER_PROFILE_IMAGE_SUCCESS;

  // elemenating any action thats does not belongs to the loging family!
  if (!loggingEvent) return next(action);

  try {
    if (type === SIGN_UP_SUCCESS || type === LOGIN_SUCCESS) localStorage.user = JSON.stringify({ ...payload, isLoggedIn: true });
    if (type === UPDATE_USER_PROFILE_IMAGE_SUCCESS) {
      localStorage.user = JSON.stringify({
        ...JSON.parse(localStorage.user),
        profileImage: payload
      });
    }


    if (type === LOGOUT) localStorage.user = '';

    next(action);
  } catch (e) {
    console.error(e);

    next(action);
  }
};
