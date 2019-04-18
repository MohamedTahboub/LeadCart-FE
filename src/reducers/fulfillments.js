import {
  GET_FULFILLMENTS_SUCCESS,
  GET_FULFILLMENTS_FAILED,
  DELETE_FULFILLMENT_SUCCESS,
  DELETE_FULFILLMENT_FAILED,
  CHANGE_FULFILLMENT_STATE_SUCCESS,
  // CHANGE_FULFILLMENT_STATE_FAILED,
  CREATE_FULFILLMENT_SUCCESS,
  CREATE_FULFILLMENT_FAILED,
  UPDATE_FULFILLMENT_SUCCESS,
} from 'constantsTypes';


const initialState = {
  list: [],
  errors: '',
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_FULFILLMENTS_SUCCESS:
    return {
      ...state,
      list: payload || [],
    };
  case GET_FULFILLMENTS_FAILED:
    return {
      ...state,
      errors: payload,
    };
  case CREATE_FULFILLMENT_SUCCESS:
    return {
      ...state,
      list: [...state.list, payload],
    };
  case CREATE_FULFILLMENT_FAILED:
    return {
      ...state,
      errors: payload,
    };
  case UPDATE_FULFILLMENT_SUCCESS:
    return {
      ...state,
      list: state
        .list
        .map((ful) => (
          ful._id === payload.fulfillmentId
            ? {
              ...ful,
              ...payload.body,
            }
            : ful
        ))
    };
  case DELETE_FULFILLMENT_SUCCESS:
    return {
      ...state,
      list: state.list.filter(({ _id }) => _id !== payload) || [],
    };
  case DELETE_FULFILLMENT_FAILED:
    return {
      ...state,
      errors: payload
    };
  case CHANGE_FULFILLMENT_STATE_SUCCESS:
    return {
      ...state,
      list: state
        .list
        .map((ful) => (
          ful._id === payload.fulfillmentId
            ? {
              ...ful,
              active: payload.active
            }
            : ful
        )),
    };
  default: return state;
  }
};
