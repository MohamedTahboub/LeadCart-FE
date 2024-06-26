import connect from './connect';
import disconnect from './disconnect';
import check from './check';
import actionRequirements from './actionRequirements';
import webhookTest from './webhookTest';
import addOfflinePaymentIntegration from './addOfflinePaymentIntegration';
import updateOfflinePaymentIntegration from './updateOfflinePaymentIntegration';
import removeOfflinePaymentIntegration from './removeOfflinePaymentIntegration';
import updateIntegratedServiceSettings from './updateIntegratedServiceSettings';
import twilioTestSms from './twilioTestSms';

export default [
  connect,
  disconnect,
  check,
  actionRequirements,
  webhookTest,
  twilioTestSms,
  addOfflinePaymentIntegration,
  updateOfflinePaymentIntegration,
  removeOfflinePaymentIntegration,
  updateIntegratedServiceSettings
];

