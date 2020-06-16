import { SAVE_FUNNEL_STATE } from '../constantsTypes';


const initialState = { savedFunnel: {} };


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case SAVE_FUNNEL_STATE:
    return { ...state, savedFunnel: payload };
  default: return state;
  }
};
