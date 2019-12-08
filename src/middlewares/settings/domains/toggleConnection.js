
import {
    toggleMarketPlaceDomainConnectionSuccess,
    toggleMarketPlaceDomainConnectionFailed
} from '../../../actions/settings';

import { apiRequest } from 'actions/apiRequest';
import {
    TOGGLE_MARKETPLACE_DOMAIN_CONNECTION
} from '../../../constantsTypes';

export default ({ dispatch }) => (next) => async (action) => {
    if (action.type !== TOGGLE_MARKETPLACE_DOMAIN_CONNECTION) return next(action);

    const { payload, meta = {} } = action;

    dispatch(apiRequest({
        options: {
            method: 'PUT',
            uri: '/api/users/marketplace/domains',
            body: payload,
            contentType: 'json'
        },
        onSuccess: (args) => {
            meta.onSuccess && meta.onSuccess(args);
            return toggleMarketPlaceDomainConnectionSuccess(action.payload);
        },
        onFailed: (message) => {
            meta.onFailed && meta.onFailed(message);
            return toggleMarketPlaceDomainConnectionFailed(message);
        }
    }));
};
