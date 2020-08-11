import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import common from 'components/common';
import CreditCardInputs from 'components/CreditCardInputs';
import config from 'config';
import * as promoCodeActions from '../../actions/promoCode';
import * as billingActions from '../../actions/billing';
import ActivePackage from './components/ActivePackage';
import { upgradeUserSchema } from '../../libs/validation';
import { getBrandActivePackage } from 'libs';
import './style.css';

const { packagesPlans = {} } = config;
const getLastItem = (list) => list[list.length - 1];
const { InputRow, HeadLine, FlexBoxesContainer, PackageCard, Box, SmallButton, ActivationSwitchInput } = common;

const Subscription = ({
  activePackage = {},
  trial,
  globalLoading,
  transactions,
  ...props
}) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState({});
  const [fields, setFields] = useState({
    packageType: activePackage.type,
    recurringPeriod: activePackage.period,
    amount: 199,
    promoCode: {},
    credit: {}
  });
  const updateActivePackage = ({ packageType }) => {
    setFields({ ...fields, packageType });
  };
  useEffect(() => {
    updateActivePackage({ packageType: activePackage.type });
  }, [activePackage.type]);
  const onPackageTypeChange = (pkg) => {
    const { promoCode, recurringPeriod } = fields;
    const currentPkgPrice = packagesPlans[pkg.toLowerCase()].price[recurringPeriod];
    setFields({
      ...fields,
      packageType: pkg,
      amount: promoCode.applied ? promoCode.amount : currentPkgPrice
    });
  };

  const togglePeriod = () => {
    const { promoCode, recurringPeriod, packageType: pkg } = fields;
    const currentPkgPrice = packagesPlans[pkg.toLowerCase()].price[recurringPeriod];
    setFields({
      ...fields,
      recurringPeriod: recurringPeriod === 'Monthly' ? 'Yearly' : 'Monthly',
      amount: promoCode.applied ? promoCode.amount : currentPkgPrice
    });
  };

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

  const lastTransaction = getLastItem(transactions);

  const packageCardProps = {
    onSelect: onPackageTypeChange,
    activePackage: fields.packageType,
    interval: fields.recurringPeriod,
    code: fields.promoCode,
    lastTransaction: lastTransaction,
    isLtd: activePackage.ltd
  };

  return (
    <Box
      header={(
        <Fragment>
          <HeadLine className='subscription-head-line'>
            Your Subscription
          </HeadLine>
          <div className='subscription-head-description'>
            Here you can change and review you subscription plans
          </div>
        </Fragment>
      )}
      contentClassName='subscription-box-content'
      content={(
        <Fragment>
          {
            activePackage.type && (
              <ActivePackage
                {...activePackage}
                trial={trial}
                lastTransaction={lastTransaction}
                isLoading={globalLoading}
                isLtd={activePackage.ltd}
              />
            )
          }
          <ActivationSwitchInput
            active={fields.recurringPeriod === 'Monthly'}
            className={`subscription-toggle-input ${fields.recurringPeriod}`}
            onToggle={togglePeriod}
          />
          <FlexBoxesContainer className='packages-container'>
            <PackageCard
              name='Basic'
              package={packagesPlans.basic}
              {...packageCardProps}
            />
            <PackageCard
              name='Pro'
              package={packagesPlans.pro}
              {...packageCardProps}
            />
            <PackageCard
              name='Premium'
              package={packagesPlans.premium}
              {...packageCardProps}
            />
          </FlexBoxesContainer>
        </Fragment>
      )}
      footer={(
        <Fragment>
          <InputRow.Label className='margin-top-20'>
            Fill Your Card Details
          </InputRow.Label>
          <CreditCardInputs onChange={onChange} />
          <div className='error-message redeem-box-error'>
            {errors.message}
          </div>
          <SmallButton
            disabled={loading.upgrade}
            className={loading.upgrade ? ' update-subscription-plan-btn primary-color spinner' : 'update-subscription-plan-btn primary-color'}
            onClick={onSubmit}
          >
            Update My Package
          </SmallButton>
        </Fragment>
      )}
    />
  );
};


Subscription.propTypes = {
  checkPromoCode: PropTypes.func.isRequired,
  upgradeUserPackage: PropTypes.func.isRequired
};


const mapStateToProps = ({
  loading: globalLoading,
  brands,
  user: {
    user: {
      activeBrand: activeBrandId,
      activePackage = {},
      trial,
      trialEndDate,
      transactions = []
    } = {}
  } = {}
}) => {
  const packageTrial = { trial, trialEndDate };
  if (activePackage === null)
    activePackage = {};
  if (trial) {
    activePackage.type = activePackage.type || 'Pro';
    activePackage.period = activePackage.period || 'Monthly';
  }
  const activeBrand = brands.find(({ id }) => id === activeBrandId);
  if (activeBrand) {
    activePackage.type = getBrandActivePackage(activeBrand);
    packageTrial.trialEndDate = activePackage.trialEndDate;
    activePackage.ltd = activeBrand.activePackage.ltd;
  } return {
    activePackage,
    trial: packageTrial,
    globalLoading,
    transactions
  };
};

export const SubscriptionPackages = connect(
  mapStateToProps,
  {
    ...billingActions,
    ...promoCodeActions
  }
)(Subscription);

export { default as TransactionsTable } from './components/Transactions';
