

import {
    GET_ORDERS
} from '../constantsTypes';

const initState = []

export default (state = initState, { type, payload }) => {
    switch (type) {
        case GET_ORDERS:
            return payload
        default: return state;
    }
};
