import {
  GET_BRANDS,
  CREATE_BRAND_SUCCESS,
  DELETE_BRAND_SUCCESS,
  UPDATE_ACTIVE_BRAND_SUCCESS
} from '../../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_BRANDS:
    return payload;
  case CREATE_BRAND_SUCCESS:
    return [...state, payload];
  case UPDATE_ACTIVE_BRAND_SUCCESS:
    return state.map((brand) => {
      if (brand._id === payload.brandId) return { ...brand };

      return brand;
    });

  case DELETE_BRAND_SUCCESS:
    return state.filter((brand) => brand._id !== payload.brandId);

  default: return state;
  }
};

