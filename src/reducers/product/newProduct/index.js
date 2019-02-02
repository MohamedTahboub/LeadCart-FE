import {
  NEW_PRODUCT_FIELD_UPDATE,
  PRODUCT_CREATED_SUCCESSFULY,
  PRODUCT_CREATION_FAILED
} from 'constantsTypes';


const initState = {
  errors: {}
};


export default (state = initState, { type, payload }) => {
  switch (type) {
  case PRODUCT_CREATED_SUCCESSFULY: return {
    url: state.url,
    isAproductCreated: true
  };
  case PRODUCT_CREATION_FAILED:
    return {
      ...state,
      errors: typeof payload === 'string' ? {
        message: payload.includes('dup key') ? 'This product Url has been taken try another one Please' : payload
      } : payload
    };
  case NEW_PRODUCT_FIELD_UPDATE: return {
    ...state,
    errors: {},
    [payload.name]: payload.value
  };
  default: return state;
  }
};
