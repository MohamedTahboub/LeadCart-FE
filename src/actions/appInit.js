import {
  APP_INIT,
  APP_LAUNCH_FAILD,
  APP_LAUNCH_SUCCESS

} from '../constantsTypes';


export const appInit = () => ({
  type: APP_INIT
});
export const appLaunchFaild = (msg) => ({
  type: APP_LAUNCH_FAILD,
  payload: msg
});
export const appLaunchSuccess = (msg) => ({
  type: APP_LAUNCH_SUCCESS,
  payload: msg
});
