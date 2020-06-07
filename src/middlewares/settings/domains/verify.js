import {
    VERIFY_MARKETPLACE_DOMAIN
} from '../../../constantsTypes';

import {
   verifyMarketPlaceDomainSuccess,
   verifyMarketPlaceDomainFailed
} from '../../../actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => async (action) => {
    if (action.type !== VERIFY_MARKETPLACE_DOMAIN) return next(action);

    const { payload, meta = {} } = action;

    dispatch(apiRequest({
        options: {
            method: 'POST',
            uri: '/api/brands/marketplace/domains/verify',
            body: payload,
            contentType: 'json'
        },
        onSuccess: (args) => {
            meta.onSuccess && meta.onSuccess(args);
            return verifyMarketPlaceDomainSuccess(action.payload);
        },
        onFailed: (message) => {
            meta.onFailed && meta.onFailed(message);
            return verifyMarketPlaceDomainFailed(message);
        }
    }));
};
