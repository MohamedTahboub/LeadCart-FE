import React from 'react';
import {
  AppstoreAddOutlined,
  BarcodeOutlined,
  DollarOutlined,
  LineChartOutlined,
  NotificationOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  TeamOutlined,
  UpSquareOutlined
} from '@ant-design/icons';

export const main = () => [
  {
    title: 'Sales',
    key: 'sales',
    icon: <ShoppingOutlined />,
    sub: [
      {
        title: 'Analytics',
        key: 'analytics',
        link: '/',
        icon: <LineChartOutlined />
      }, {
        title: 'Transactions',
        key: 'transactions',
        link: '/transactions',
        icon: <DollarOutlined />
      }, {
        title: 'Customers',
        key: 'customers',
        link: '/customers',
        icon: <TeamOutlined />
      }
    ]
  }, { divider: true }, {
    title: 'Producs',
    key: 'products',
    icon: <ShoppingCartOutlined />,
    sub: [
      {
        title: 'Funnels',
        key: 'funnels',
        link: '/funnels',
        icon: <UpSquareOutlined />
      }, {
        title: 'Coupons',
        key: 'coupons',
        link: '/coupons',
        icon: <BarcodeOutlined />
      }, {
        title: 'Integrations',
        key: 'integrations',
        link: '/integrations',
        icon: <AppstoreAddOutlined />
      }, {
        title: 'Affiliates',
        key: 'affiliates',
        link: '/affiliates',
        icon: <NotificationOutlined />
      }
    ]
  }, { divider: true }, {
    title: 'Brand Settings',
    key: 'brandSettings',
    link: '/settings/brand',
    icon: <SettingOutlined />
  }, { divider: true }
];

export const accountSettingsMenus = () => [{
  title: 'Account Settings',
  key: 'accountSettings',
  icon: <SettingOutlined />,
  sub: [
    {
      title: 'Personal',
      key: 'personalSettings',
      link: '/account',
      icon: <SettingOutlined />
    }, {
      title: 'Sub-Accounts',
      key: 'subaccountsSettings',
      link: '/sub-accounts',
      icon: <SettingOutlined />
    }
  ]
}];
