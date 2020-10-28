import { DELETE_TAX_SUCCESS } from 'constantsTypes';

import { taxes } from 'data/taxes';

const initialState = taxes;

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case DELETE_TAX_SUCCESS:
    return state.filter(({ _id }) => _id !== payload?.taxId);

  default: return state;
  }
};

