import { APP_LAUNCH_SUCCESS } from '../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case APP_LAUNCH_SUCCESS:
    return payload.leads || [];
  default: return state;
  }
};

