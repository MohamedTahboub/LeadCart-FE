import {
  CREATE_BRAND_SUCCESS,
  CREATE_SUB_ACCOUNT_SUCCESS,
  DELETE_BRAND_SUCCESS,
  GET_USER_BRANDS,
  UPDATE_ACTIVE_BRAND_SUCCESS,
  UPDATE_MARKETPLACE_SETTINGS_SUCCESS
} from '../../constantsTypes';


const initialState = [];


export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_USER_BRANDS:
    return payload;
  case CREATE_BRAND_SUCCESS:
    return [...state, {
      activePackage: payload.subscription ? payload.subscription.activePackage : {},
      id: payload._id,
      ...payload
    }];

  case CREATE_SUB_ACCOUNT_SUCCESS:
    return [
      ...state,
      payload.brand
    ];

  case UPDATE_MARKETPLACE_SETTINGS_SUCCESS:
    return state.map((brand) => {
      if (brand.id === payload.activeBrand)
        return { ...brand, ...payload };
      else
        return brand;

    });

  case UPDATE_ACTIVE_BRAND_SUCCESS:
    return state.map((brand) => {
      if (brand.id === payload.activeBrand) return { ...brand, active: true };

      return brand;
    });

  case DELETE_BRAND_SUCCESS:
    return state.filter((brand) => brand.id !== payload.activeBrand);

  default: return state;
  }
};

