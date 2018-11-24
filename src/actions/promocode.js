import { PROMO_CODE_ACTIVATE } from '../constantsTypes';



export const activatePromoCode = code =>({
    type : PROMO_CODE_ACTIVATE,
    payload:code
})