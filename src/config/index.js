import config from 'react-global-configuration';

const env = process.env.NODE_ENV;

config.set({
  PORT: process.env.ENVIRONMENT === 'production' ? 3000 : 3001,
  env: process.env.ENVIRONMENT,
  API_LINK: env === 'dev' ? 'http://localhost:3000' : '',
  DEBUG_API_LINK: env === 'dev' ? 'http://localhost:5001' : '',
  SITE_DOMAIN: env === 'dev' ? 'http://localhost:3000' : '',
  S3_DIR: ''
});

export default {
  development: { // ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.dev.leadcart.io/',
    packagesPlans: {
      basic: {
        price: {
          Monthly: 69,
          Yearly: 690
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          '1-Click Upsells.',
          'Unlimited Funnels.'
        ],
        exampleUseCases: []
      },
      pro: {
        price: {
          Monthly: 99,
          Yearly: 990
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          'Webhooks & Zapier.',
          '1-Click Upsells.',
          'Unlimited Funnels.',
          'Priority Support.'
        ],
        exampleUseCases: []
      },
      premium: {
        price: {
          Monthly: 199,
          Yearly: 1990
        },
        features: [
          'Everything in Pro Plus:',
          'The Subscription Saver (Dunning) via Rules.',
          'The Affiliate Center (Coming Soon).',
          'Email Builder & Customizations (Coming Soon).',
          'Dedicated Training & Support.',
          'Cart Abandonment Recovery via Rules.',
          'Unlimited Team Members (AppSumo Exclusive)',
          'Assign Roles & Permissions To Team Members (Coming Soon).',
          'Custom Domains (CNAME).',
          'Checkout & Funnels',
          'Emails',
          'Affiliate Center',
          'LeadCart Branding Removal.',
          'Automatic Tax Calculations.',
          '....And Much More.'
        ],
        exampleUseCases: [
          'Sell all sorts of Digital, Physical Products...etc',
          'Recruit your own affiliate army to sell your products.',
          'Add your products to LeadCart Affiliate Marketplace (Coming Soon) so that other sellers and their affiliates can promote them.',
          'Use for clients or other companies you run with 100% premium support anytime needed.'
        ]
      }
    },
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b',
    logRocketId: 'olwrix/leadcart'
  },
  staging: { // ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82XtIMbphaPO4JDiO1TJretDIMhEi3o&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.test.leadcart.io/',
    packagesPlans: {
      basic: {
        price: {
          Monthly: 69,
          Yearly: 690
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          '1-Click Upsells.',
          'Unlimited Funnels.'
        ]
      },
      pro: {
        price: {
          Monthly: 99,
          Yearly: 990
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          'Webhooks & Zapier.',
          '1-Click Upsells.',
          'Unlimited Funnels.',
          'Priority Support.'
        ]
      },
      premium: {
        price: {
          Monthly: 199,
          Yearly: 1990
        },
        features: [
          'Everything in Pro Plus:',
          'The Subscription Saver (Dunning).',
          'The Affiliate Center.',
          'Email Builder & Customizations.',
          'Dedicated Training & Support.'
        ]
      }
    },
    mixPanelId: '6f1e8d2fe9734115de1fdcac460bd8ba',
    intercomAppId: 'hegmjd4b',
    logRocketId: 'olwrix/leadcart'
  },
  production: {
    ZAPIER_INVITATION_LINK: 'https://zapier.com/platform/public-invite/9563/25175f8086de29f4464aa004da95b81f/',
    STRIP_AUTH_LINK: 'https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_C82X3QxgSvqB2WGT6tMgfEV7PCSehFW4&scope=read_write',
    USER_SUB_DOMAIN_URL: 'https://subDomain.leadcart.io/',
    packagesPlans: {
      basic: {
        price: {
          Monthly: 69,
          Yearly: 690
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          '1-Click Upsells.',
          'Unlimited Funnels.'
        ]
      },
      pro: {
        price: {
          Monthly: 99,
          Yearly: 990
        },
        features: [
          '+6 Checkout Templates.',
          'Unlimited Products.',
          'Use Checkout Pages Everywhere.',
          'Built In Credit Card & PayPal processors.',
          'One-Time Payments, Subscriptions, Trials, & Payment Plans.',
          'Advanced Stats & Reports.',
          'Prospects (Cart Abandonment).',
          'Webhooks & Zapier.',
          '1-Click Upsells.',
          'Unlimited Funnels.',
          'Priority Support.'
        ]
      },
      premium: {
        price: {
          Monthly: 199,
          Yearly: 1990
        },
        features: [
          'Everything in Pro Plus:',
          'The Subscription Saver (Dunning).',
          'The Affiliate Center.',
          'Email Builder & Customizations.',
          'Dedicated Training & Support.'
        ]
      }
    },
    mixPanelId: '9f4e14f1602b54645779337eb660525a',
    intercomAppId: 'oiankyy0',
    logRocketId: 'olwrix/leadcart'
  }
}[process.env.REACT_APP_ENV || 'development'];
