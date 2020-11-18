import { ADD_NEW_DESTINATION_ZONE_SUCCESS, DELETE_DESTINATION_ZONE_SUCCESS, EDIT_DESTINATION_ZONE_SUCCESS, GET_DESTINATION_ZONES } from 'constantsTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_DESTINATION_ZONES : return payload || [];

  case ADD_NEW_DESTINATION_ZONE_SUCCESS: return [...state, payload];

  case DELETE_DESTINATION_ZONE_SUCCESS: return state.filter(({ _id }) => _id !== payload?.zone);

  case EDIT_DESTINATION_ZONE_SUCCESS: return state.map((zone) => {
    if (payload.zone === zone._id) {
      const { countries, name } = payload?.details;
      return { _id: payload.zone, countries, name };
    } else {
      return zone;
    }
  });


  default: return state;
  }
};

