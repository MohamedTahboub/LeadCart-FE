import { EDIT_DESTINATION_ZONE } from 'constantsTypes';
import { editDestinationZoneFailed, editDestinationZoneSuccess } from 'actions/destinationZones';
import { apiRequest } from 'actions/apiRequest';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== EDIT_DESTINATION_ZONE) return next(action);
  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'PUT',
      uri: '/api/brands/destination-zones',
      body: payload,
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return editDestinationZoneSuccess(payload);
    },
    onFailed:  (message) => {
      if (meta.onFailed) meta.onFailed(message);
      return editDestinationZoneFailed(message);
    }
  }));
};

