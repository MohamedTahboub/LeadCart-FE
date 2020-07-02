import {
  GET_PROMO_CODES,
  REDEEM_PROMO_CODE_SUCCESS
} from 'constantsTypes';


const initailState = {
  codes: [],
  credits: 5
};

export default (state = initailState, { type, payload }) => {
  switch (type) {
    case GET_PROMO_CODES:
      return payload || initailState;

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
