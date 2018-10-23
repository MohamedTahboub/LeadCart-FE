import { LOADING } from 'constantsTypes'


const initialState = false

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case LOADING: return payload;
        default: return state;
    };
};