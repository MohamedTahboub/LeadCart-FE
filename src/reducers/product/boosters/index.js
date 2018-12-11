import {
  GET_PRODUCT_SUCCESS,
  PRODUCT_BOOSTERS_FIELD_UPDATE
} from 'constantsTypes';

const initialState = {
  completed: false,
  error: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PRODUCT_SUCCESS: return { ...state, ...payload.boosters };
  case PRODUCT_BOOSTERS_FIELD_UPDATE: return { ...state, [payload.name]: payload.value };
    //   case CHECKOUT_PAGE_INVALID_FIELDS: return {
    //     ...state,
    //     error: typeof payload === 'string' ? { message: payload } : payload
    //   };
  default: return state;
  }
};

