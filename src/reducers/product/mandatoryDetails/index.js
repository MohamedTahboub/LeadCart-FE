import {
  GET_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FIELD_UPDATE
} from 'constantsTypes';

const initialState = {
  completed: false,
  errors: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PRODUCT_SUCCESS: return { ...state, ...payload.mandatoryDetails };
  case PRODUCT_DETAILS_FIELD_UPDATE: return { ...state, [payload.name]: payload.value };
    //   case CHECKOUT_PAGE_INVALID_FIELDS: return {
    //     ...state,
    //     error: typeof payload === 'string' ? { message: payload } : payload
    //   };
  default: return state;
  }
};

