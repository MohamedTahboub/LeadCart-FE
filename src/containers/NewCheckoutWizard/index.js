import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { SideBar, Header } from './components';

const {
  Page,
  PageHeader,
  PageContent,
  // NewThingCard,
  // MainTitle,
  // Button
} = common;

const NewCheckoutWizard = (props) => (
  <div className='checkout-wizard-page'>
    <Header />
    <SideBar />
  </div>
);

NewCheckoutWizard.propTypes = {

};

// <ProductTemplate />
export default NewCheckoutWizard;
