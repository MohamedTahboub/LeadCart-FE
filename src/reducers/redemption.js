import {
  GET_PROMO_CODES,
  REDEEM_PROMO_CODE_SUCCESS
} from 'constantsTypes';


const initialState = {
  codes: [],
  credits: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_PROMO_CODES:
    return payload || initialState;

  case REDEEM_PROMO_CODE_SUCCESS:
    return {
      ...state,
      codes: [
        ...state.codes,
        { ...payload.promoCode, updatedAt: new Date() }
      ],
      credits: state.credits + payload.promoCode.credits
    };

  default:
    return state;
  }
};
