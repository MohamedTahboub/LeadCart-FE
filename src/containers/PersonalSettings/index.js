import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import clx from 'classnames';

import common from 'components/common';
import GeneralSettings from './GeneralSettings';
import PaymentSettings from './PaymentSettings';
import BrandsSection from './BrandsSection';
import RedemptionSettings from './RedemptionSettings';
import * as accountActions from 'actions/account';
import './style.css';
import { FlexBox } from 'components/common/boxes';
import SubAccounts from './SubaccountsSection';

const { Button, Page, PageHeader, PageContent } = common;

const sideMenuOptions = [
  { title: 'General' },
  { title: 'Brands Management' },
  { title: 'Code Redemption' }
  // { title: 'Payment Methods' },
  // { title: 'Manage Account' }
].map((_) => ({ ..._, key: _.title.toLowerCase().replace(/\s/g, '_') }));


const PersonalSettings = (props = {}) => {
  const { brands, user, paymentMethods, onChangeAccountDetails, onChangeAccountPassword, history } = props;


  const historySearch = history.location.search;
  const pathname = history.location.pathname;
  const [activeTab, setActiveTab] = useState(sideMenuOptions[0].key);
  const [activeHeaderTab, setActiveHeaderTab] = useState(historySearch);

  const setTab = ({ selectedKeys }) => {
    const [activeTab] = selectedKeys;
    setActiveTab(activeTab);
  };

  const Route = () => {
    switch (activeTab) {
    case 'general': return <GeneralSettings user={user} onChangeAccountDetails={onChangeAccountDetails} onChangeAccountPassword={onChangeAccountPassword} />;
    case 'code_redemption': return <RedemptionSettings />;
    case 'brands_management': return <BrandsSection brands={brands} />;
    case 'payment_methods': return <PaymentSettings creditCards={paymentMethods} />;
    default:
      return <div />;
    }
  };

  const onNavigateHeader = (link) => () => {
    history.push(`/account?${link}`);
    setActiveHeaderTab(link);

  };

  const isPersonalSettings = activeHeaderTab === '?personalSettings' || activeHeaderTab === 'personalSettings' || (pathname === '/account' && activeHeaderTab === '');
  const isSubAccounts = activeHeaderTab === 'sub-accounts';


  return (
    <Page className='personal-settings-page' >
      <PageHeader>
        <FlexBox className='v-center'>
          <Button className={clx({ 'active-header-tab': isPersonalSettings }, 'light-btn mr-3')} onClick={onNavigateHeader('personalSettings')} >
            Personal Settings
          </Button>

          <Button className={clx({ 'active-header-tab': isSubAccounts }, 'light-btn mr-3')}onClick={onNavigateHeader('sub-accounts')} >
            Sub-Accounts
          </Button>
        </FlexBox>
      </PageHeader>

      {isPersonalSettings ?
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
        :
        <SubAccounts {...props}/>
      }

    </Page>
  );
};


const mapStateToProps = ({ brands, user: { user }, payments: { methods: paymentMethods } }) => ({ user, brands, paymentMethods });
export default connect(mapStateToProps, accountActions)(PersonalSettings);
