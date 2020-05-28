import React, { useState } from 'react';
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
import { SmallButton } from 'components/common/Buttons';
const { MainTitle, LCTabs } = common;

const Setting = ({ history }) => {
  const [saveFunction, setSaveFunction] = useState({});
  const tabs = [
    {
      key: 'general',
      tab: 'General',
      link: '/settings/general',
      component: <GeneralSetting getSave={setSaveFunction} />
    }, {
      key: 'marketplace',
      tab: 'Marketplace',
      link: '/settings/marketplace',
      component: <Marketplace getSave={setSaveFunction} />
    }, {
      key: 'emailing',
      tab: 'Emailing',
      link: '/settings/emailing',
      component: <Email />
    }, {
      key: 'translations',
      tab: 'Translations',
      link: '/settings/translations',
      component: <Translations />
    }, {
      key: 'collaborators',
      tab: 'Collaborators',
      link: '/settings/collaborators',
      component: <TeamMembers />
    }, {
      key: 'billing',
      tab: 'Billing',
      link: '/settings/billing',
      component: <Billing />
    }
  ];
  const { location: { pathname } } = history;
  const { key: activeTab } = tabs.find(({ link }) => link.toLowerCase() === pathname) || {};
  const onTabChange = (tabId) => history.push(`/settings/${tabId}`);

  return (
    <Page key='settings' className='setting-details-page'>
      <PageHeader>
        <MainTitle fluid>
          <div className='d-flex justify-space-between'>
            <span>Settings</span>
            {console.log({ activeTab })}
            {
              ['general', 'marketplace'].includes(activeTab) && (
                <SmallButton className='btn refresh-btn primary-color' onClick={saveFunction.onSave}>
                  Save Changes
                </SmallButton>
              )
            }
          </div>
        </MainTitle>
      </PageHeader>
      <PageContent>
        <LCTabs
          className='p-3'
          fitPaneContent
          vertical
          activeKey={activeTab}
          onChange={onTabChange}
        >
          {
            tabs.map(({ component, ...tab }) => <LCTabs.TabPane {...tab}>{component}</LCTabs.TabPane>)
          }
        </LCTabs>
      </PageContent>
    </Page>
  );
};


export default connect(null, settingsActions)(Setting);
