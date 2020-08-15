import {
  sendWebhookTestPayloadFailed,
  sendWebhookTestPayloadSuccess
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { SEND_WEBHOOK_TEST_PAYLOAD } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== SEND_WEBHOOK_TEST_PAYLOAD) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'post',
      body: payload,
      uri: '/api/brands/integrations/webhooks/test',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return sendWebhookTestPayloadSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return sendWebhookTestPayloadFailed(message);
    }
  }));
};

