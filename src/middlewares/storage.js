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
    if (type === SIGN_UP_SUCCESS || type === LOGIN_SUCCESS){ 
      upadateIntercomeWithUserDetails(payload)
      localStorage.user = JSON.stringify({ ...payload, isLoggedIn: true })
    
    };
    if (type === UPDATE_USER_PROFILE_IMAGE_SUCCESS) {
      localStorage.user = JSON.stringify({
        ...JSON.parse(localStorage.user),
        profileImage: payload
      });
    }


    if (type === LOGOUT) {
      upadateIntercomeWithUserDetails(payload)
      localStorage.user = ''
    };

    next(action);
  } catch (e) {
    console.error(e);

    next(action);
  }
};


function upadateIntercomeWithUserDetails ({
  firstName = 'There', lastName ='guest', email='anonymous@leadcart.io', _id: id
}) {
  // if (process.env.NODE_ENV !== 'development')
  window.Intercom('boot', {
    app_id: 'skynydft',
     email,
    created_at: Math.round((new Date()).getTime() / 1000),
    name: `${firstName} ${lastName}`,
    user_id: id
  });
}