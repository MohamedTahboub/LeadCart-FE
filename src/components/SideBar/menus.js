export const main = () => [
  {
    title: 'Sales',
    key: 'sales',
    sub: [
      {
        title: 'Analytics',
        key: 'analytics',
        link: '/analytics'
      }, {
        title: 'Transactions',
        key: 'transactions',
        link: '/transactions'
      }, {
        title: 'Customers',
        key: 'customers',
        link: '/customers'
      }
    ]
  }, { divider: true }, {
    title: 'Producs',
    key: 'products',
    sub: [
      {
        title: 'Funnels',
        key: 'funnels',
        link: '/funnels'
      }, {
        title: 'Coupons',
        key: 'coupons',
        link: '/coupons'
      }, {
        title: 'Integrations',
        key: 'integrations',
        link: '/integrations'
      }, {
        title: 'Affiliates',
        key: 'affiliates',
        link: '/affiliates'
      }
    ]
  }, { divider: true }, {
    title: 'Brand Settings',
    key: 'brandSettings',
    link: '/settings/brand'
  }, { divider: true }
];

export const accountSettingsMenus = () => [{
  title: 'Account Settings',
  key: 'accountSettings',
  sub: [
    {
      title: 'Personal',
      key: 'personalSettings',
      link: '/account'
    }, {
      title: 'Sub-Accounts',
      key: 'subaccountsSettings',
      link: '/sub-accounts'
    }
  ]
}];
