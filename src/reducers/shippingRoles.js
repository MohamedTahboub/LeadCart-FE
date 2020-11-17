import {
  ADD_NEW_SHIPPING_ROLE_SUCCESS,
  DELETE_SHIPPING_ROLE_SUCCESS,
  EDIT_SHIPPING_ROLE_SUCCESS,
  GET_SHIPPING_ROLES
} from 'constantsTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_SHIPPING_ROLES : return payload;

  case ADD_NEW_SHIPPING_ROLE_SUCCESS: return [...state, payload];

  case EDIT_SHIPPING_ROLE_SUCCESS: return state.map((shippingRole) => {
    if (payload.shippingRole === shippingRole._id)
      return { _id: payload.shippingRole, ...payload?.details };
    else
      return shippingRole;

  });

  case DELETE_SHIPPING_ROLE_SUCCESS:
    return state.filter(({ _id }) => _id !== payload?.shippingRoleId);

  default: return state;
  }
};

