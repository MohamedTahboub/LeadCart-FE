import {
  GET_PRODUCT_SUCCESS,
  PRODUCT_FULLFILLMENT_FIELD_UPDATE,
  UPDATE_PRODUCT_SUCCESS
} from 'constantsTypes';

const initialState = {
  completed: false,
  error: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PRODUCT_SUCCESS: return { ...state, ...payload.fullfillment };
  case UPDATE_PRODUCT_SUCCESS: return { ...state, ...payload.fullfillment };
  case PRODUCT_FULLFILLMENT_FIELD_UPDATE: return { ...state, [payload.name]: payload.value };
  default: return state;
  }
};

