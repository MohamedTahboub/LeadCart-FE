import {
  GET_FUNNELS,
  DELETE_FUNNEL_SUCCESS,
  UPDATE_FUNNEL_SUCCESS,
  CREATE_FUNNEL_SUCCESS
} from '../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_FUNNELS:
    return payload;
  case CREATE_FUNNEL_SUCCESS:
    return [...state, payload];
  case UPDATE_FUNNEL_SUCCESS:
    return state.map((funnel) => {
      if (funnel._id === payload.funnel.funnelId) return { ...funnel, ...payload.funnel };

      return funnel;
    });
  case DELETE_FUNNEL_SUCCESS:
    return state.filter((funnel) => funnel._id !== payload.funnelId);

  default: return state;
  }
};
