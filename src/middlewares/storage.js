import {
  ACTIVATE_AGENCY_CODE_SUCCESS,
  APP_LAUNCH_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT,
  SIGN_UP_SUCCESS,
  UPDATE_USER_PROFILE_IMAGE_SUCCESS,
  UPGRADE_USER_PACKAGE_SUCCESS
} from 'constantsTypes';
import { appInit } from 'actions/appInit';

export default ({ dispatch }) => (next) => (action) => {
  const { type, payload = {} } = action;
  const loggingEvent = type === SIGN_UP_SUCCESS
    || type === LOGIN_SUCCESS
    || type === LOGOUT
    || type === UPDATE_USER_PROFILE_IMAGE_SUCCESS
    || type === ACTIVATE_AGENCY_CODE_SUCCESS
    || type === UPGRADE_USER_PACKAGE_SUCCESS
    || type === APP_LAUNCH_SUCCESS;

  // elemenating any action thats does not belongs to the loging family!
  if (!loggingEvent) return next(action);

  try {
    if (type === SIGN_UP_SUCCESS || type === LOGIN_SUCCESS) {
      setTimeout(() => {
        dispatch(appInit());
      }, 200);

      localStorage.leadcart = JSON.stringify({
        ...payload,
        packageType: packageType(payload.level),
        signDate: Date.now(),
        isLoggedIn: true
      });
    }
    if (type === APP_LAUNCH_SUCCESS) {
      const user = JSON.parse(localStorage.leadcart);
      localStorage.leadcart = JSON.stringify({
        ...user,
        activeBrand: payload.activeBrand
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

    if (type === UPGRADE_USER_PACKAGE_SUCCESS) {
      localStorage.leadcart = JSON.stringify({
        ...JSON.parse(localStorage.leadcart),
        activePackage: payload.activePackage,
        trial: false
      });
    }


    if (type === LOGOUT) localStorage.leadcart = '{}';


    next(action);
  } catch (e) {
    console.error(e);

    next(action);
  }
};


function packageType (level) {
  let type = 'Pro';

  if (level === 4) type = 'Premium';

  if (level >= 5) type = 'Agency';

  return type;
}
