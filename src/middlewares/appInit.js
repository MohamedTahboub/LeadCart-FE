import { APP_INIT } from 'constantsTypes';
import { getMembersSuccess } from 'actions/teamMembers';
import { getSubAccountsSuccess } from 'actions/agency';
import { appLaunchFaild, appLaunchSuccess } from 'actions/appInit';
import { apiRequest } from 'actions/apiRequest';


export default ({ dispatch, getState }) => (next) => (action) => {
  const { user: { user: { token }, isLoggedIn } } = getState();

  if (action.type !== APP_INIT) return next(action);


  if (!isLoggedIn) return next(action);
  // /users/launch
  const onLunchSuccess = (data) => {
    dispatch(getMembersSuccess(data.members));
    dispatch(getSubAccountsSuccess(data.agents));
    return appLaunchSuccess('THE APPLICATION LUNCHED');
  };


  dispatch(apiRequest({
    options: {
      method: 'get',
      uri: '/api/users/launch',
      contentType: 'json'
    },
    onSuccess: onLunchSuccess,
    onFaild: appLaunchFaild
  }));
  // const user = localStorage.user && JSON.parse(localStorage.user);

  // if (!getState().user.isLoggedIn && user.isLoggedIn === true) dispatch(loginSuccess(user));

  // restore the application stored data in the loaclStorage
};
