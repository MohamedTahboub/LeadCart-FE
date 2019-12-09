import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import * as codeActions from 'actions/promoCode';
import './styles.css';
import {
  SubscriptionPackages,
  TransactionsTable
} from '../../../components/SubscriptionPackages';

const Billing = ({
  packageType,
  activateAgencyCode,
  codesUsed,
  loading,
  errors = {},
  transactions = [],
  trial,
  trialEndDate,
  ...props
}) => (
    <Fragment>
      <SubscriptionPackages />
      <TransactionsTable list={transactions} />
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
