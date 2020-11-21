import {
  sendTwilioTestSMSFailed,
  sendTwilioTestSMSSuccess
} from '../../actions/integrations';
import { apiRequest } from '../../actions/apiRequest';
import { SEND_TWILIO_TEST_SMS } from '../../constantsTypes';

export default ({ dispatch }) => (next) => (action) => {
  if (action.type !== SEND_TWILIO_TEST_SMS) return next(action);

  const { payload, meta = {} } = action;

  dispatch(apiRequest({
    options: {
      method: 'POST',
      body: payload,
      uri: '/api/brands/integrations/twilio/test',
      contentType: 'json'
    },
    onSuccess: (args) => {
      if (meta.onSuccess) meta.onSuccess(args);
      return sendTwilioTestSMSSuccess(args);
    },
    onFailed: (message) => {
      if (meta.onFailed) meta.onFailed(message);

      return sendTwilioTestSMSFailed(message);
    }
  }));
};

