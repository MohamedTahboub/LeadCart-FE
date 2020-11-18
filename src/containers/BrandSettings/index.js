import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as settingsActions from 'actions/settings';
import common from 'components/common';
import { Page, PageContent, PageHeader } from '../../components/common/Layout';
import { SmallButton } from 'components/common/Buttons';
import {
  Billing,
  Email,
  GeneralSetting,
  Marketplace,
  Taxes,
  TeamMembers,
  Translations
} from './sub';
import './style.css';


const { MainTitle, LCTabs } = common;

const Setting = ({ history, brands, user }) => {

  const { user: { activeBrand: activeBrandId } } = user;
  const [saveFunction, setSaveFunction] = useState({});
  const activeBrand = brands.find(({ id }) => id === activeBrandId) || {};
  const { location: { pathname } } = history;

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
      key: 'taxes',
      tab: 'Taxes',
      link: '/settings/taxes',
      component: <Taxes history={history} />
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
      component: <Billing activeBrand={activeBrand} />
    }
  ];

  const { key: activeTab } = tabs.find(({ link }) => link.toLowerCase() === pathname) || {};
  const onTabChange = (tabId) => history.push(`/settings/${tabId}`);

  return (
    <Page key='settings' className='setting-details-page'>
      <PageHeader>
        <MainTitle fluid>
          <div className='d-flex justify-space-between'>
            <span>Settings</span>
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
          key={user.activeBrand}
        >
          {
            tabs.map(({ component, ...tab }) => <LCTabs.TabPane {...tab}>{component}</LCTabs.TabPane>)
          }
        </LCTabs>
      </PageContent>
    </Page>
  );
};

const mapStateToProps = ({ brands, user }) => ({ brands, user });

export default connect(mapStateToProps, settingsActions)(Setting);
