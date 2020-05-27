import React from 'react';
import './style.css';

import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux';

import common from 'components/common';
import {
  Billing,
  Email,
  GeneralSetting,
  Marketplace,
  TeamMembers,
  Translations
} from './sub';
import { Page, PageContent, PageHeader } from '../../components/common/Layout';
const { MainTitle, Tab, Tabs } = common;

const Setting = ({ history }) => {
  const tabs = [
    {
      id: 'general',
      title: 'General',
      link: '/settings/general',
      component: <GeneralSetting />
    }, {
      id: 'marketplace',
      title: 'Marketplace',
      link: '/settings/marketplace',
      component: <Marketplace />
    }, {
      id: 'emailing',
      title: 'Emailing',
      link: '/settings/emailing',
      component: <Email />
    }, {
      id: 'translations',
      title: 'Translations',
      link: '/settings/translations',
      component: <Translations />
    }, {
      id: 'collaborators',
      title: 'Collaborators',
      link: '/settings/collaborators',
      component: <TeamMembers />
    }, {
      id: 'billing',
      title: 'Billing',
      link: '/settings/billing',
      component: <Billing />
    }
  ];
  const { location: { pathname } } = history;
  const { id: activeTab } = tabs.find(({ link }) => link.toLowerCase() === pathname) || {};
  const onTabChange = (tabId) => {
    return history.push(`/settings/${tabId}`);
  };

  return (
    <Page key='settings' className='setting-details-page'>
      <PageHeader>
        <MainTitle>Settings</MainTitle>
      </PageHeader>
      <PageContent>
        <Tabs fitPaneContent vertical active={activeTab} onChange={onTabChange}>
          {
            tabs.map(({ component, ...tab }) => <Tab {...tab}>{component}</Tab>)
          }
        </Tabs>
      </PageContent>
    </Page>
  );
};


export default connect(null, settingsActions)(Setting);
