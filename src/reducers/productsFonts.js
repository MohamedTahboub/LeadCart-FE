import {
  ADD_NEW_PRODUCTS_FONTS_SUCCESS,
  DELETE_PRODUCTS_FONTS_SUCCESS,
  GET_BRAND_FONTS
} from '../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_BRAND_FONTS:
    return payload || [];
  case ADD_NEW_PRODUCTS_FONTS_SUCCESS:
    return [...state, ...payload];

  case DELETE_PRODUCTS_FONTS_SUCCESS:
    return state.filter(({ _id }) => Array.isArray(payload) && !payload.includes(_id));
  default: return state;
  }
};

