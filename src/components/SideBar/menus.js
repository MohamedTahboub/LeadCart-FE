export const main = () => [
  {
    title: 'Sales',
    key: 'sales',
    icon: 'sales',
    sub: [
      {
        title: 'Analytics',
        key: 'analytics',
        link: '/',
        icon: 'analytics'
      }, {
        title: 'Transactions',
        key: 'transactions',
        link: '/transactions',
        icon: 'transactions'
      }, {
        title: 'Customers',
        key: 'customers',
        link: '/customers',
        icon: 'customers'
      }
    ]
  }, { divider: true }, {
    title: 'Producs',
    key: 'products',
    icon: 'products',
    sub: [
      {
        title: 'Funnels',
        key: 'funnels',
        link: '/funnels',
        icon: 'funnels'
      }, {
        title: 'Coupons',
        key: 'coupons',
        link: '/coupons',
        icon: 'coupons'
      }, {
        title: 'Integrations',
        key: 'integrations',
        link: '/integrations',
        icon: 'integrations'
      }, {
        title: 'Affiliates',
        key: 'affiliates',
        link: '/affiliates',
        icon: 'affiliates'
      }
    ]
  }, { divider: true }, {
    title: 'Brand Settings',
    key: 'brandSettings',
    link: '/settings/general',
    icon: 'settings'
  }, { divider: true }, {
    title: 'Help & Tutorials',
    key: 'help',
    icon: 'help',
    link: '/help'
  }, { divider: true }
];

export const accountSettingsMenus = () => [{
  title: 'Account Settings',
  key: 'accountSettings',
  icon: 'settings',
  sub: [
    {
      title: 'Personal',
      key: 'personalSettings',
      link: '/account',
      icon: 'settings'
    }, {
      title: 'Sub-Accounts',
      key: 'subaccountsSettings',
      link: '/sub-accounts',
      icon: 'subAccounts'
    }
  ]
}];
