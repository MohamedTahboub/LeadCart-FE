import React, { Fragment } from 'react';
import classNames from 'classnames';

import common from 'components/common';
import config from 'config';
import { openNewWindow, tokenizedContent } from 'libs';

import './style.css';

const { LEADCART_AFFILIATE_CENTER_URL, AFFILIATE_ENCODING_KEY } = config;
const { FlexBox, Title } = common;


export const getSidebarMenuItems = ({ user = {}, history }) => {
  const { firstName, lastName, activeBrand, email, profileImage, token, activePackage = {} } = user;
  const isPremium = Boolean(activePackage && activePackage.type === 'Premium');

  return (
    [
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
      }, {
        title: 'Leads',
        key: 'leads',
        link: '/leads',
        icon: 'leads'
      }, {
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
      },
      {
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

            if (!(isPremium))
              return history.push('/affiliates');

            const tokenizedUtk = tokenizedContent(shippedUser, AFFILIATE_ENCODING_KEY);
            const targetPath = `${LEADCART_AFFILIATE_CENTER_URL}/login?utk=${tokenizedUtk}`;
            openNewWindow(targetPath);
          } catch (err) {
            console.log(err.message);
          }
        }
      },
      {
        title: 'Brand Settings',
        key: 'brandSettings',
        link: '/settings/general',
        icon: 'settings'
      }

    ]
  );
};


export default ({ user, history, onNavigate, activeLink }) => {
  const sidebarMenuItems = getSidebarMenuItems({ user, history });

  return (
    <FlexBox className='sidebar-main-menu' column flex>
      {
        sidebarMenuItems.map(({ title, key, link, hide, onClick }) => (
          <Fragment>
            {!hide &&
            <Title
              className={classNames('sidebar-main-menu-item', { 'active-sidebar-main-menu-item': link === activeLink })}
              onClick={onClick || onNavigate(link)}
              key={key}
            >
              {title}
            </Title>
            }
          </Fragment>
        ))
      }
    </FlexBox>
  );
};
