import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import CreditCardInputs from 'components/CreditCardInputs';
import config from 'config';
import './style.css';
import { connect } from 'react-redux';
import * as promoCodeActions from '../../actions/promoCode';
import * as billingActions from '../../actions/billing';
import ActivePackage from './components/ActivePackage';
import { upgradeUserSchema } from '../../libs/validation';
const { packagesPlans = {} } = config;


const getLastItem = (list) => list[list.length - 1];

const {
  InputRow,
  HeadLine,
  // BigText,
  FlexBoxesContainer,
  // MainBlock,
  // MainTitle,
  PackageCard,
  Box,
  SmallButton,
  // SpcialAnnouncement,
  ActivationSwitchInput
} = common;


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
    packageType: 'Pro',
    recurringPeriod: 'Monthly',
    amount: 199,
    promoCode: {},
    credit: {}
  });

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

  const onUpdatePromoCode = (promoCode) => {
    onChange({
      target: {
        name: 'promoCode',
        value: promoCode
      }
    });
  };
  const onChangePromoCode = ({ target: { name, value } }) => {
    onChange({
      target: {
        name: 'promoCode',
        value: { ...fields.promoCode, code: value }
      }
    });
  };
  const onPromoCodeCheck = () => {
    const { promoCode: { code } = {} } = fields;

    if (code) {
      setLoading({ ...loading, promoCode: true });
      props.checkPromoCode(
        { promoCode: code },
        {
          onSuccess: (promoCode) => {
            setLoading({ ...loading, promoCode: false });
            setFields({
              ...fields,
              amount: promoCode.amount,
              promoCode: {
                ...promoCode,
                code,
                applied: true
              },
              packageType: promoCode.packageType,
              recurringPeriod: promoCode.recurringPeriod
            });
            setErrors({});
          },
          onFailed: (message) => {
            setLoading({ ...loading, promoCode: false });
            setErrors({ promoCode: message });
            // onUpdatePromoCode({})
          }
        }
      );
    }
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
          {activePackage.type && (
            <ActivePackage
              {...activePackage}
              trial={trial}
              lastTransaction={lastTransaction}
              isLoadingClass={`${globalLoading ? 'blur-effect' : ''}`}
            />
          )}
          <ActivationSwitchInput
            active={fields.recurringPeriod === 'Monthly'}
            className={`subscription-toggle-input ${fields.recurringPeriod}`}
            onToggle={togglePeriod}
          />
          <FlexBoxesContainer className='packages-container'>
            <PackageCard
              name='Basic'
              package={packagesPlans.basic}
              onSelect={onPackageTypeChange}
              activePackage={fields.packageType}
              interval={fields.recurringPeriod}
              code={fields.promoCode}
              lastTransaction={lastTransaction}
            />
            <PackageCard
              name='Pro'
              package={packagesPlans.pro}
              onSelect={onPackageTypeChange}
              activePackage={fields.packageType}
              interval={fields.recurringPeriod}
              code={fields.promoCode}
              lastTransaction={lastTransaction}
            />
            <PackageCard
              name='Premium'
              package={packagesPlans.premium}
              onSelect={onPackageTypeChange}
              activePackage={fields.packageType}
              interval={fields.recurringPeriod}
              plus
              code={fields.promoCode}
              lastTransaction={lastTransaction}
            />
          </FlexBoxesContainer>
        </Fragment>
      )}
      footer={(
        <Fragment>

          <InputRow.Label
            notes='If you have a promo code, please enter it below'
            className='subscription-promo-code-label'
          >
            Do You have a Promo Code ?
          </InputRow.Label>
          <div className='subscription-promocode-section'>
            <InputRow.TextField
              error={errors.promoCode}
              name='promoCode'
              className={`promo-code-input ${fields.promoCode.applied ? 'valid' : ''}`}
              onChange={onChangePromoCode}
              value={fields.promoCode.code}
              placeholder='e.g. PROMO_CODE_XHRNE3'
            />
            <SmallButton
              disabled={loading.promoCode}
              className={loading.promoCode ? 'primary-color spinner' : 'primary-color'}
              onClick={onPromoCodeCheck}
            >
              Apply Promo Code
            </SmallButton>
            {errors.promoCode && (
              <div className='error-message redeem-box-error'>
                {errors.promoCode}
              </div>)
            }
          </div>
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
  user: {
    user: {
      activePackage = {},
      trial,
      level,
      trialEndDate,
      transactions = []
    } = {}
  } = {}
}) => {

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

export const SubscriptionPackages = connect(
  mapStateToProps,
  {
    ...billingActions,
    ...promoCodeActions
  }
)(Subscription);

export { default as TransactionsTable } from './components/Transactions';
