import * as brandsLogos from './BrandsIcons';

export default [
  {
    name: 'Stripe',
    key: 'LC_STRIPE',
    brandLogo: brandsLogos.stripeImage,
    category: 'Payment Gateways',
    active: true,
  },
  {
    name: 'Paypal',
    key: 'LC_PAYPAL',
    brandLogo: brandsLogos.paypalImage,
    category: 'Payment Gateways',
    active: true,
  },
  {
    key: 'LC-AWEBER',
    name: 'AWeber',
    brandLogo: brandsLogos.aweber,
    category: 'Auto Responders'
  },
  {
    key: 'LC-MAILCHIMP',
    name: 'MailChimp',
    brandLogo: brandsLogos.mailChimp,
    category: 'Auto Responders'
  },
  {
    key: 'LC-ACTIVECAMPAIGN',
    name: 'ActiveCampaign',
    brandLogo: brandsLogos.activeCampaign,
    category: 'Auto Responders'
  }
];

