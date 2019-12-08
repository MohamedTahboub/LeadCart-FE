import {
    DELETE_MARKETPLACE_DOMAIN
} from '../../../constantsTypes';

import {
    deleteMarketPlaceDomainSuccess,
    deleteMarketPlaceDomainFailed,
} from '../../../actions/settings';

import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => async (action) => {
    if (action.type !== DELETE_MARKETPLACE_DOMAIN) return next(action);

    const { payload, meta = {} } = action;

    dispatch(apiRequest({
        options: {
            method: 'DELETE',
            uri: '/api/users/marketplace/domains',
            body: payload,
            contentType: 'json'
        },
        onSuccess: (args) => {
            meta.onSuccess && meta.onSuccess(args);
            return deleteMarketPlaceDomainSuccess(action.payload);
        },
        onFailed: (message) => {
            meta.onFailed && meta.onFailed(message);
            return deleteMarketPlaceDomainFailed(message);
        }
    }));
};
