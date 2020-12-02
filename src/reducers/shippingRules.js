import {
  ADD_NEW_SHIPPING_RULE_SUCCESS,
  DELETE_SHIPPING_RULE_SUCCESS,
  EDIT_SHIPPING_RULE_SUCCESS,
  GET_SHIPPING_RULES
} from 'constantsTypes';

const initialState = [];

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_SHIPPING_RULES : return payload;

  case ADD_NEW_SHIPPING_RULE_SUCCESS: return [...state, payload];

  case EDIT_SHIPPING_RULE_SUCCESS: return state.map((shippingRule) => {
    if (payload._id === shippingRule._id)
      return payload
    else
      return shippingRule;

  });

  case DELETE_SHIPPING_RULE_SUCCESS:
    return state.filter(({ _id }) => _id !== payload?.shippingMethod);

  default: return state;
  }
};

