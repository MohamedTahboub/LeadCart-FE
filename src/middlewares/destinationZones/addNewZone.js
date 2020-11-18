import { ADD_NEW_DESTINATION_ZONE } from 'constantsTypes';
import { addNewDestinationZoneFailed, addNewDestinationZoneSuccess } from 'actions/destinationZones';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== ADD_NEW_DESTINATION_ZONE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      uri: '/api/brands/destination-zones',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return addNewDestinationZoneSuccess(args);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return addNewDestinationZoneFailed(message);
    }
  }));
};

