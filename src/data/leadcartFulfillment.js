export default {
  label: 'LeadCart Fulfillment',
  value: 'leadcart_fulfillment',
  actions: [
    {
      label: 'Success Urls',
      value: 'SUCCESS_URLS'
    },
    {
      label: 'Manual Fulfillment',
      value: 'MANUAL_FULFILLMENT'
    },
    {
      label: 'LeadCart Grant Access',
      value: 'LEADCART_FULFILLMENT',
      private: true
    },
    {
      label: 'LeadCart Revoke Access',
      value: 'REVOKE_LEADCART_ACCESS',
      private: true
    }
  ]
};
