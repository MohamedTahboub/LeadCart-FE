import {
  SIGN_UP_SUCCESS,
  LOGIN_SUCCESS,
  APP_INIT,
  LOGOUT
} from 'constantsTypes';
import { login } from 'actions/login';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { type, payload = {} } = action;

  const loggingEvent = type === SIGN_UP_SUCCESS
        || type === LOGIN_SUCCESS
        || type === LOGOUT;

  // elemenating any action thats does not belongs to the loging family!
  if (!loggingEvent) return next(action);


  if (type === SIGN_UP_SUCCESS || type === LOGIN_SUCCESS) localStorage.user = JSON.stringify({ ...payload, isLoggedIn: true });


  if (type === APP_INIT) {
    const user = localStorage.user && JSON.parse(localStorage.user);
    if (user.isLoggedIn === true) dispatch(login(user));
  }

  if (type === LOGOUT) localStorage.user = '';

  next(action);
};
