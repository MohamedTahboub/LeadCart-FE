import React, { useState } from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import { Menu } from 'antd';
import GeneralSettings from './GeneralSettings';
import PaymentSettings from './PaymentSettings';
import BrandsSection from './BrandsSection';
import SubaccountsSection from './SubaccountsSection';
import RedemptionSettings from './RedemptionSettings';

import './style.css';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent
} = common;

const sideMenuOptions = [
  { title: 'General' },
  { title: 'Redemption' },
  { title: 'Brands Management' },
  { title: 'Payments' },
  { title: 'Manage Account' }
].map((_, ix) => ({ ..._, key: ix.toString() }));

// TEMP: temp variable
const creditCards = [{ cardNumber: '4242424242424242', isDefault: true },
  { cardNumber: '5555555555554444', default: false },
  { cardNumber: '4111111111111111', default: false }]
    ;
let subaccounts = [{
  owner: 'Nour S.',
  email: 'noureldean.sead@gmail.com',
  mainBrand: '5ea02a2338a9780023c7057c',
  package: { type: 'Premium' },
  status: 'active'
}];
Array(3).fill(0).forEach(() => (subaccounts = subaccounts.concat(subaccounts)));
console.log({ subaccounts });
const redemptionCodes = [{ code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() },
  { code: '', type: 'Stacking', value: 1, redemptionDate: (new Date()).toISOString() }]
  .map((code) => ({ ...code, code: Array(16).fill(0).reduce((str) => str + String.fromCharCode(parseInt(Math.random() * (122 - 48) + 48)), '') }));
const credits = 19;
console.log({ redemptionCodes });
const PersonalSettings = ({ brands, user }) => {
  const [activeTab, setActiveTab] = useState(sideMenuOptions[0].key);
  const setTab = ({ selectedKeys }) => {
    const [activeTab] = selectedKeys;
    setActiveTab(activeTab);
  };
  const Route = () => {
    switch (activeTab) {
    case '0': return <GeneralSettings user={user}/>;
    case '1': return <RedemptionSettings redemptionCodes={redemptionCodes} credits={credits}/>;
    case '2': return <BrandsSection brands={brands}/>;
    case '3': return <PaymentSettings creditCards={creditCards}/>;
    default: return <SubaccountsSection subaccounts={subaccounts} brands={brands}/>;
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
            <Route />
          </div>
        </div>
      </PageContent>
    </Page>
  );
};


const mapStateToProps = ({ brands, user: { user } }) => ({ user, brands });

export default connect(mapStateToProps, {})(PersonalSettings);
