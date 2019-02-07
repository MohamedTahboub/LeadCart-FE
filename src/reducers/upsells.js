import {
  GET_UPSELLS_SUCCESS,
  GET_UPSELLS_FAILED,
  DELETE_UPSELL_SUCCESS,
  DELETE_UPSELL_FAILED,
  CHANGE_UPSELL_STATE_SUCCESS,
  CHANGE_UPSELL_STATE_FAILED
} from 'constantsTypes';


const initialState = {
  upsell: {},
  list: [],
  errors: ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_UPSELLS_SUCCESS:
    return {
      ...state,
      list: payload || []
    };
  case GET_UPSELLS_FAILED:
    return {
      ...state,
      errors: {
        ...state,
        message: payload
      }
    };
  case DELETE_UPSELL_SUCCESS:
    return {
      ...state,
      list: state.list.filter(({ _id }) => _id !== payload) || []
    };
  case DELETE_UPSELL_FAILED:
    return {
      ...state,
      errors: {
        ...state,
        message: payload
      }
    };
  case CHANGE_UPSELL_STATE_SUCCESS:
    return {
      ...state,
      list: state.list.map((u) => (u._id === payload.upsellId ? { ...u, active: payload.active } : u))
    };
  default: return state;
  }
};
