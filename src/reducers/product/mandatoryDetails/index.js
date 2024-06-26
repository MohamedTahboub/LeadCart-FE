import {
  GET_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FIELD_UPDATE,
  UPDATE_PRODUCT_SUCCESS,
  TOGGLE_PRODUCT_AVAILABILITY_SUCCESS,
  UPDATE_PRODUCT_FAILED
} from 'constantsTypes';

const initialState = {
  completed: false,
  errors: {}
};
export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PRODUCT_SUCCESS: return { ...state, ...payload.mandatoryDetails };
  case UPDATE_PRODUCT_FAILED:
    return {
      ...state,
      errors: typeof payload === 'string'
        ? payload.includes('$url_1 dup key') ? { url: 'This product Url already taken try another' } : {
          message: payload
        }
        : payload
    };
  case UPDATE_PRODUCT_SUCCESS: return { ...state, ...payload.mandatoryDetails };
  case PRODUCT_DETAILS_FIELD_UPDATE: return { ...state, [payload.name]: payload.value };
  case TOGGLE_PRODUCT_AVAILABILITY_SUCCESS: return { ...state, available: !payload.available };
    //   case CHECKOUT_PAGE_INVALID_FIELDS: return {
    //     ...state,
    //     error: typeof payload === 'string' ? { message: payload } : payload
    //   };
  default: return state;
  }
};

