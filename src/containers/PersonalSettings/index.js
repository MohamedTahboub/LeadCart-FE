import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import { Button, Col, Row } from 'antd';
import GeneralSettings from './GeneralSettings';
import PaymentSettings from './PaymentSettings';
import BrandsSection from './BrandsSection';
import SubaccountsSection from './SubaccountsSection';

import './style.css';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent
} = common;

// TEMP: temp variable
const creditCards = ['4242424242424242', '5555555555554444', '4111111111111111'];
const subaccounts = [];

const Section = ({ title, children, className }) => (
  <div>
    <h3>{title}</h3>
    <div className={className}>
      {children}
    </div>
    <div className='divider my-2' />
  </div>
);

const PersonalSettings = ({ brands }) => {
  return (
    <Page>
      <PageHeader>
        <MainTitle>Personal Settings</MainTitle>
      </PageHeader>
      <PageContent>
        <div className='personal-settings-wrapper'>
          <Section title='General settings'>
            <GeneralSettings/>
          </Section>
          <Section title='Payment'>
            <PaymentSettings creditCards={creditCards}/>
          </Section>
          <Section title='Active brands'>
            <BrandsSection brands={brands}/>
          </Section>
          <Section title='Sub-accounts'>
            <SubaccountsSection subaccounts={subaccounts}/>
          </Section>
        </div>
      </PageContent>
    </Page>
  );
};


const mapStateToProps = ({ brands, user: { user } }) => ({ user, brands });

export default connect(mapStateToProps, {})(PersonalSettings);
