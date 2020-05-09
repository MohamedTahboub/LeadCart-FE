import React from 'react';
import { connect } from 'react-redux';
import common from 'components/common';
import { Button, Card } from 'antd';
import GeneralSettings from './GeneralSettings';
import SecuritySettings from './SecuritySettings';
import PaymentSettings from './PaymentSettings';
import BrandsSection from './BrandsSection';

import './style.css';

const {
  MainTitle,
  Page,
  PageHeader,
  PageContent
} = common;

// TEMP: temp variable
const creditCards = ['4242424242424242', '5555555555554444', '4111111111111111'];

const Section = ({ title, children, className }) => (
  <div>
    <h3>{title}</h3>
    <div className={className}>
      {children}
    </div>
    <div className='divider my-3' />
  </div>
);

const PersonalSettings = ({ brands }) => {
  return (
    <Page>
      <PageHeader>
        <MainTitle>Personal Settings</MainTitle>
      </PageHeader>
      <PageContent>
        <div className='d-col'>
          <Section title='General settings' className='d-col align-start'>
            <GeneralSettings/>
          </Section>
          <Section title='Security' className='d-col align-start'>
            <SecuritySettings/>
          </Section>
          <Section title='Payment' className='d-col'>
            <PaymentSettings creditCards={creditCards}/>
          </Section>
          <Section title='Active brands & sub-accounts'>
            <BrandsSection brands={brands}/>
          </Section>
          <Button className='save-button' type='primary'>Save</Button>
        </div>
      </PageContent>
    </Page>
  );
};


const mapStateToProps = ({ brands, user: { user } }) => ({ user, brands });

export default connect(mapStateToProps, {})(PersonalSettings);
