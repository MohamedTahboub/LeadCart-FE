import { ADD_NEW_TAX_ZONE_SUCCESS, DELETE_TAX_ZONE_SUCCESS, EDIT_TAX_ZONE_SUCCESS, GET_TAX_ZONES } from 'constantsTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_TAX_ZONES : return payload;

  case ADD_NEW_TAX_ZONE_SUCCESS: return [...state, payload];

  case DELETE_TAX_ZONE_SUCCESS: return state.filter(({ _id }) => _id !== payload?.taxZoneId);

  case EDIT_TAX_ZONE_SUCCESS: return state.map((taxZone) => {
    if (payload.taxZone === taxZone._id) {
      const { countries, name } = payload?.details;
      return { _id: payload.taxZone, countries, name };
    } else {
      return taxZone;
    }
  });


  default: return state;
  }
};

