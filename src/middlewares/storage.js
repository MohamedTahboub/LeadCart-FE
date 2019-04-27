import {
  SIGN_UP_SUCCESS,
  LOGIN_SUCCESS,
  UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  ACTIVATE_AGENCY_CODE_SUCCESS,
  LOGOUT
} from 'constantsTypes';
import { appInit } from 'actions/appInit';
export default ({ dispatch }) => (next) => (action) => {
  const { type, payload = {} } = action;
  const loggingEvent = type === SIGN_UP_SUCCESS
    || type === LOGIN_SUCCESS
    || type === LOGOUT
    || type === UPDATE_USER_PROFILE_IMAGE_SUCCESS
    || type === ACTIVATE_AGENCY_CODE_SUCCESS;

  // elemenating any action thats does not belongs to the loging family!
  if (!loggingEvent) return next(action);

  try {
    if (type === SIGN_UP_SUCCESS || type === LOGIN_SUCCESS) {
      setTimeout(() => {
        dispatch(appInit());
      }, 200);
      upadateIntercomeWithUserDetails({ ...payload, logged: true });

      localStorage.leadcart = JSON.stringify({
        ...payload,
        packageType: packageType(payload.level),
        signDate: Date.now(),
        isLoggedIn: true
      });
    }
    if (type === UPDATE_USER_PROFILE_IMAGE_SUCCESS) {
      localStorage.leadcart = JSON.stringify({
        ...JSON.parse(localStorage.leadcart),
        profileImage: payload
      });
    }

    if (type === ACTIVATE_AGENCY_CODE_SUCCESS) {
      localStorage.leadcart = JSON.stringify({
        ...JSON.parse(localStorage.leadcart),
        packageType: packageType(payload.level)
      });
    }


    if (type === LOGOUT) {
      upadateIntercomeWithUserDetails({ ...payload, logged: false });
      localStorage.leadcart = '{}';
    }

    next(action);
  } catch (e) {
    console.error(e);

    next(action);
  }
};


function upadateIntercomeWithUserDetails ({
  firstName = 'There', lastName = 'guest', logged, email = 'anonymous@leadcart.io', _id: id
}) {
  try {
    if (/* process.env.NODE_ENV === 'production' && */ window.Intercom) {
      if (logged) {
        window.intercomSettings = {
          app_id: 'skynydft',
          email,
          created_at: Math.round((new Date()).getTime() / 1000),
          name: `${firstName} ${lastName}`,
          user_id: id
        };
      } else {
        window.intercomSettings = {
          app_id: 'skynydft'
        };
      }
    }
  } catch (err) {
    console.error(err);
  }
}


function packageType (level) {
  let type = 'Pro';

  if (level === 4) type = 'Premium';

  if (level >= 6) type = 'Agency';

  return type;
}
