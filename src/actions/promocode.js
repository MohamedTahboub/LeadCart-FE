import {
   APPLAY_ACCOUNT_PROMOCODE,
   APPLAY_ACCOUNT_PROMOCODE_SUCCESS,
   APPLAY_ACCOUNT_PROMOCODE_FAILD
} from 'constantsTypes';


export const applayPromocode = code => ({
    type: APPLAY_ACCOUNT_PROMOCODE,
    payload: code
})
export const applayPromocodeSuccess = code => ({
    type: APPLAY_ACCOUNT_PROMOCODE_SUCCESS,
    payload: code
})
export const applayPromocodeFaild = message => ({
    type: APPLAY_ACCOUNT_PROMOCODE_FAILD,
    payload: message
})