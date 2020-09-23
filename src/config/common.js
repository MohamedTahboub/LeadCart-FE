import leadcartBrandLogo from 'assets/images/logo.png';

export default {
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
        'Unlimited Team Members',
        {
          key: 'Assign Roles & Permissions To Team Members (Coming Soon).',
          list: [
            'Custom Domains (CNAME).',
            'Checkout & Funnels',
            'Emails'
          ]
        },
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
  brandsDefaults: {
    defaultSupportEmail: 'supprot@leadcart.io',
    defaultName: 'Leadcart',
    defaultLogo: leadcartBrandLogo
  },
  admins: [
    'mohamed@leadcart.io',
    'maysara@leadcart.io',
    'fares@leadcart.io',
    'eslam@leadcart.io'
  ],
  PRICING_OPTIONS_LIMITS: 5
};
