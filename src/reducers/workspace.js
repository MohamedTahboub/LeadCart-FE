import { CACHE_WORKSPACE_FUNNEL } from '../constantsTypes';


const initialState = { savedFunnel: {} };


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case CACHE_WORKSPACE_FUNNEL:
    return { ...state, savedFunnel: payload };
  default: return state;
  }
};
