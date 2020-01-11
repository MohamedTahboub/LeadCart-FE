import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.css';


// import GeneralSetting from './sub/GeneralSetting'
// import Integrations from './sub/Integrations'
// import Email from './sub/Email'
// import TeamMembers from './sub/TeamMembers'
// import Account from './sub/Account'
// import Billing from './sub/Billing'
// import Translations from './sub/Translations'

import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux';

import common from 'components/common';
import {
  GeneralSetting,
  Integrations,
  Email,
  TeamMembers,
  Account,
  Billing,
  Translations
} from './sub';
import { Page, PageContent, PageHeader } from '../../components/common/Layout';
const { TabsNavigator, MainTitle } = common;

const newProductTabs = [
  { title: 'Brand Settings', sub: '/settings/brand' },
  // { title: 'Integrations', sub: '/settings/integrations' },
  { title: 'Email', sub: '/settings/email' },
  { title: 'Translations', sub: '/settings/translations' },
  { title: 'Team Members', sub: '/settings/team' },
  { title: 'Account', sub: '/settings/account' },
  { title: 'Billing', sub: '/settings/billing' },
];

class Setting extends Component {
  render () {
    return (
      <Page key='settings' className='setting-details-page'>
        <PageHeader>
          <MainTitle>Settings</MainTitle>
        </PageHeader>

        <PageContent>
          <TabsNavigator
            tabs={newProductTabs}
            history={this.props.history}
          />
          <Switch>
            <Route exact path='/settings/email' component={Email} />
            <Route exact path='/settings/translations' component={Translations} />
            <Route exact path='/settings/team' component={TeamMembers} />
            <Route exact path='/settings/account' component={Account} />
            <Route exact path='/settings/billing' component={Billing} />
            <Route path='/settings' component={GeneralSetting} />
          </Switch>

        </PageContent>
      </Page>
    );
  }
}
// <Route path='/settings/integrations' component={Integrations} />


export default connect(null, settingsActions)(Setting);
