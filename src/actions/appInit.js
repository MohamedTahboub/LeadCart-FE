import {
  APP_INIT,
  APP_LAUNCH_FAILED,
  APP_LAUNCH_SUCCESS

} from '../constantsTypes';


export const appInit = () => ({
  type: APP_INIT
});
export const appLaunchFailed = (msg) => ({
  type: APP_LAUNCH_FAILED,
  payload: msg
});
export const appLaunchSuccess = (msg) => ({
  type: APP_LAUNCH_SUCCESS,
  payload: msg
});
