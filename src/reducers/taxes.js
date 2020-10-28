import { ADD_NEW_TAX_SUCCESS, DELETE_TAX_SUCCESS, EDIT_TAX_SUCCESS, GET_TAXES } from 'constantsTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_TAXES : return payload;

  case ADD_NEW_TAX_SUCCESS: return [...state, payload];

  case EDIT_TAX_SUCCESS: return state.map((tax) => {
    if (payload.tax === tax._id) {
      const { appliesTo, name, ratesPerZone, zoneDefinition } = payload?.details;
      return { _id: payload.tax, appliesTo, name, ratesPerZone, zoneDefinition };
    } else {
      return tax;
    }
  });

  case DELETE_TAX_SUCCESS:
    return state.filter(({ _id }) => _id !== payload?.taxId);

  default: return state;
  }
};

