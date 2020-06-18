import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as codeActions from 'actions/promoCode';
import './styles.css';
import {
  SubscriptionPackages,
  TransactionsTable
} from 'components/SubscriptionPackages';
import common from 'components/common';

const { Tab, Tabs } = common;

const Billing = ({ activeBrand }) => (
  <Fragment>
    <Tabs active='subscription'>
      <Tab id='subscription' title='Your Subscription'>
        <SubscriptionPackages />
      </Tab>
      <Tab id='transation-history' title='Transaction History'>
        <TransactionsTable list={activeBrand.transactions || []} />
      </Tab>
    </Tabs>
  </Fragment>
);

const mapStateToProps = ({
  user: {
    user: {
      trial,
      trialEndDate,
      level = 0,
      packageType,
      transactions
    },
    activatedPromoCodes: codesUsed, errors
  },
  loading
}) => ({
  packageType,
  loading,
  level,
  trial,
  transactions,
  trialEndDate,
  codesUsed,
  errors: errors.code || {}
});

export default connect(mapStateToProps, codeActions)(Billing);
