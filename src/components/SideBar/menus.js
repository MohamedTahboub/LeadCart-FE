
import config from 'config';
import { openNewWindow, tokenizedContent } from 'libs';
const { LEADCART_AFFILIATE_CENTER_URL, AFFILIATE_ENCODING_KEY } = config;

export const main = ({ user = {}, history }) => {
  const { firstName, lastName, activeBrand, email, profileImage, token, activePackage = {} } = user;
  const isPremium = activePackage.type === 'Premium';


  const menuItems = [
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
      title: 'Products',
      key: 'products',
      icon: 'products',
      sub: [
        {
          title: 'Funnels',
          key: 'funnels',
          link: '/funnels',
          icon: 'funnels'
        }, {
          title: 'Products Pages',
          key: 'products',
          link: '/products',
          icon: 'products'
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
          icon: 'affiliates',
          hide: user.activePackage && user.activePackage.type !== 'Premium',
          onClick: () => {
            try {
              const shippedUser = {
                firstName,
                lastName,
                activeBrand,
                email,
                profileImage,
                activePackageType: activePackage.type,
                token
              };
              // const isAdmin = admins.includes(user.email);

              if (!(isPremium))
                return history.push('/affiliates');


              const tokenizedUtk = tokenizedContent(shippedUser, AFFILIATE_ENCODING_KEY);
              const targetPath = `${LEADCART_AFFILIATE_CENTER_URL}/login?utk=${tokenizedUtk}`;
              openNewWindow(targetPath);
            } catch (err) {
              // notification.failed(err.message);
              console.log(err.message);
            }
          }
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


  return menuItems.map((item) => {
    if (item.key === 'products') {
      return {
        ...item, sub: item.sub.filter((sub) => {
          if (sub.key !== 'affiliates') return true;
          else return isPremium;
        })
      };
    }
    return item;
  });
};

export const accountSettingsMenus = ({ credits }) => [{
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
      icon: 'subAccounts',
      className: `${(+credits > 0) ? '' : 'hide-element'}`
    }
  ]
}];
