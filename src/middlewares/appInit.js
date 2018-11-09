import { APP_INIT } from 'constantsTypes';
import { loginSuccess } from 'actions/login';

export default ({ dispatch, getState }) => (next) => (action) => {
  const { user: { user: { token } } } = getState();

  if (action.type !== APP_INIT) return next(action);

  // const user = localStorage.user && JSON.parse(localStorage.user);

  // if (!getState().user.isLoggedIn && user.isLoggedIn === true) dispatch(loginSuccess(user));

  // restore the application stored data in the loaclStorage
};
