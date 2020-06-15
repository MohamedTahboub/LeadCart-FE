import React, { useState } from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import { Menu } from 'antd';
import GeneralSettings from './GeneralSettings';
import PaymentSettings from './PaymentSettings';
import BrandsSection from './BrandsSection';
import RedemptionSettings from './RedemptionSettings';
import * as accountActions from 'actions/account';

import './style.css';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent
} = common;

const sideMenuOptions = [
  { title: 'General' },
  { title: 'Brands Management' }
  // { title: 'Payment Methods' },
  // { title: 'Code Redemption' },
  // { title: 'Manage Account' }
].map((_) => ({ ..._, key: _.title.toLowerCase().replace(/\s/g, '_') }));

const redemptionCodes = [{ code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() }]
  .map((code) => ({ ...code, code: Array(16).fill(0).reduce((str) => str + String.fromCharCode(parseInt(Math.random() * (122 - 48) + 48)), '') }));
const credits = 19;

const PersonalSettings = ({ brands, user, paymentMethods, onChangeAccountDetails, onChangeAccountPassword }) => {
  const [activeTab, setActiveTab] = useState(sideMenuOptions[0].key);
  const setTab = ({ selectedKeys }) => {
    const [activeTab] = selectedKeys;
    setActiveTab(activeTab);
  };
  const Route = () => {
    switch (activeTab) {
    case 'general': return <GeneralSettings user={user} onChangeAccountDetails={onChangeAccountDetails} onChangeAccountPassword={onChangeAccountPassword}/>;
    case 'code_redemption': return <RedemptionSettings redemptionCodes={redemptionCodes} credits={credits}/>;
    case 'brands_management': return <BrandsSection brands={brands}/>;
    case 'payment_methods': return <PaymentSettings creditCards={paymentMethods}/>;
    default:
      return <div/>;
    }
  };

  return (
    <Page>
      <PageHeader>
        <MainTitle>Personal Settings</MainTitle>
      </PageHeader>
      <PageContent>
        <div className='personal-settings-wrapper'>
          <Menu className='sider mr-3' onSelect={setTab} selectedKeys={[activeTab]}>
            {sideMenuOptions.map((option) => <Menu.Item key={option.key}>{option.title}</Menu.Item>)}
          </Menu>
          <div className='content'>
            <Route key={user.activeBrand} />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};


const mapStateToProps = ({ brands, user: { user }, payments: { methods: paymentMethods } }) => ({ user, brands, paymentMethods });

export default connect(mapStateToProps, accountActions)(PersonalSettings);
