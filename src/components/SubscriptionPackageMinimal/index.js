import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import common from 'components/common';
import CreditCardInputs from 'components/CreditCardInputs';
import config from 'config';
import * as promoCodeActions from '../../actions/promoCode';
import * as billingActions from '../../actions/billing';
import PaymentSummary from 'components/PaymentSummary';
import { upgradeUserSchema } from '../../libs/validation';
import './style.css';

const { packagesPlans = {} } = config;
const { InputRow, HeadLine, Box, SmallButton } = common;

const SubscriptionMinimal = ({
  nextPackage,
  history,
  closeModal,
  user,
  brands,
  ...props
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({});
  const [fields, setFields] = useState({
    packageType: 'Pro',
    recurringPeriod: 'Monthly',
    amount: 199,
    promoCode: {},
    credit: {}
  });

  const activeBrand = brands.find(({ id }) => user.activeBrand === id) || {};

  const onChange = ({ target: { name, value } }) => {
    setFields({ ...fields, [name]: value });
  };

  const cleanUp = () => {
    setFields({
      ...fields,
      promoCode: { code: '' },
      credit: {}
    });
  };

  const onSubmit = async () => {
    const promoCode = fields.promoCode.applied ? fields.promoCode.code : undefined;
    const { isValid, value, errors } = await upgradeUserSchema({ ...fields, promoCode });

    if (!isValid) {
      return setErrors({
        ...errors,
        message: ' please check your The Fields above'
      });
    }

    setLoading({ ...loading, upgrade: true });
    props.upgradeUserPackage(
      value,
      {
        onSuccess: () => {
          setLoading({ ...loading, upgrade: false });
          cleanUp();
        },
        onFailed: () => {
          setLoading({ ...loading, upgrade: false });
        }
      }
    );
  };

  const onLearnMore = (e) => {
    e.preventDefault();
    history.push('/settings/billing');
    closeModal();
  };

  const mapItem = (listOrKey) => {
    const { list, key = listOrKey } = listOrKey;
    if (list) {
      return (
        <li>
          {key}
          <ul>
            {list.map(mapItem)}
          </ul>
        </li>
      );
    } else {
      return <li key={key}>{key}</li>;
    }
  };
  return (
    <Box
      lessNormal
      className='minimal-package-plan'
      header={(
        <Fragment>
          <HeadLine className='subscription-head-line'>
            Upgrade your account to {nextPackage} plan
          </HeadLine>
          <div className='subscription-head-description'>
            {nextPackage} gives you all the needed features to become a power seller. Many awesome edge cutting features are in this plan to help you sell and convert more.
          </div>
        </Fragment>
      )}
      contentClassName='subscription-box-content'
      content={(
        <Fragment>
          <div className='mb-2'>
            <h3>What's included:</h3>
            <ul>
              {
                packagesPlans[nextPackage.toLowerCase()].features.map(mapItem)
              }
            </ul>
          </div>
          <div className='mb-2'>
            <h3>Example use cases:</h3>
            <ul>
              {
                packagesPlans[nextPackage.toLowerCase()].exampleUseCases.map(mapItem)
              }
            </ul>
          </div>
          <div className='mb-2'>
            You can always stay on the Pro plan if you only need the Pro functionality. <a href='/plans' onClick={onLearnMore}>Learn more about Pro and Premium plans.</a>
          </div>
          <div className='upgrade-text'>Upgrade this brand:</div>
          <div className='d-flex sub-minimal-brand mb-2'>
            <div className='mr-4'>
              <img src={activeBrand.logo} alt='profile' />
            </div>
            <div className='d-flex d-col align-center justify-space-between'>
              <span><strong>{activeBrand.name}</strong></span>
            </div>
          </div>
        </Fragment>
      )}
      footer={(
        <Fragment>
          <div className='d-col'>
            <PaymentSummary />
            <InputRow.Label>
              Pay With Your Credit Card
            </InputRow.Label>
            <CreditCardInputs onChange={onChange} />
            <div className='error-message redeem-box-error'>
              {errors.message}
            </div>
            <SmallButton
              disabled={loading.upgrade}
              className={classNames('update-subscription-plan-btn primary-color mb-2', { spinner: loading.upgrade })}
              onClick={onSubmit}
            >
              Update My Package
            </SmallButton>
            <div>
              <span>To manage your subscription, or cancel it in the future, please head to Settings then Personal and manage your billing from there.</span>
            </div>
          </div>
        </Fragment>
      )}
    />
  );
};


SubscriptionMinimal.propTypes = {
  checkPromoCode: PropTypes.func.isRequired,
  upgradeUserPackage: PropTypes.func.isRequired
};


const mapStateToProps = ({
  loading: globalLoading,
  user: {
    user: {
      activePackage,
      trial,
      level,
      trialEndDate,
      transactions = []
    } = {}
  } = {}
}) => {
  activePackage = activePackage || {};
  if (trial) {
    activePackage.type = activePackage.type || 'Pro';
    activePackage.period = activePackage.period || 'Monthly';
  } else if (!activePackage.type && level) {
    activePackage.type = level >= 4 ? 'Premium' : 'Pro';
    activePackage.period = 'Monthly';
  }
  return {
    activePackage,
    trial: { trialEndDate, trial },
    globalLoading,
    transactions
  };
};

export const SubscriptionPackageMinimal = connect(
  mapStateToProps,
  {
    ...billingActions,
    ...promoCodeActions
  }
)(SubscriptionMinimal);
