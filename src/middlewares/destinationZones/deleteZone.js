import { DELETE_DESTINATION_ZONE } from 'constantsTypes';
import { deleteDestinationZoneFailed, deleteDestinationZoneSuccess } from 'actions/destinationZones';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== DELETE_DESTINATION_ZONE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'DELETE',
      uri: '/api/brands/destination-zones',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return deleteDestinationZoneSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return deleteDestinationZoneFailed(message);
    }
  }));
};

