import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import CreditCardInputs from 'components/CreditCardInputs';
import config from 'config';
import './style.css';
import { connect } from 'react-redux';
import * as promoCodeActions from '../../actions/promoCode';
import * as billingActions from '../../actions/billing';
const { packagesPlans = {} } = config;

const {
  InputRow,
  HeadLine,
  BigText,
  FlexBoxesContainer,
  MainBlock,
  MainTitle,
  PackageCard,
  Box,
  SmallButton,
  SpcialAnnouncement,
  ActivationSwitchInput
} = common;


const Subscription = ({
  activePackage = {},
  ...props
}) => {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    packageType: 'Pro',
    recurringPeriod: 'Monthly',
    useOldCredit: false,
    credit: {}
  });

  useEffect(() => {
    setFields({
      ...fields,
      packageType: activePackage.type,
      recurringPeriod: activePackage.period,
    });
  }, [activePackage]);

  const onPackageTypeChange = (pkg) => {
    setFields({ ...fields, packageType: pkg });
  };

  const togglePeriod = () => {
    setFields({
      ...fields,
      recurringPeriod: fields.recurringPeriod === 'Monthly' ? 'Yearly' : 'Monthly'
    });
  };

  const onChange = ({ target: { name, value } }) => {
    setFields({ ...fields, [name]: value });
  };

  const onPromoCodeCheck = () => {
    if (fields.promoCode) {
      setSubmitting(true);
      props.checkPromoCode(
        fields.promoCode,
        {
          onSuccess: () => {
            setSubmitting(false);
          },
          onFialed: () => {
            setSubmitting(false);
          }
        }
      );
    }
  };


  const onSubmit = () => {
    props.upgradeUserPackage(
      fields,
      {
        onSuccess: () => {

        },
        onFialed: () => {

        }
      }
    );
  };

  return (
    <Box
      header={(
        <Fragment>
          <HeadLine className='subscription-head-line'>
            Your Subscription
          </HeadLine>
          <div className='subscription-head-description'>
            here your can change and review you subscription plans and your leadcart package.
          </div>
        </Fragment>
      )}
      contentClassName='subscription-box-content'
      content={(
        <Fragment>
          <ActivationSwitchInput
            active={fields.recurringPeriod === 'Monthly'}
            className={`subscription-toggle-input ${fields.recurringPeriod}`}
            onToggle={togglePeriod}
          />
          <FlexBoxesContainer className='packages-container'>
            <PackageCard
              name='Pro'
              package={packagesPlans.pro}
              onSelect={onPackageTypeChange}
              activePackage={fields.packageType}
              interval={fields.recurringPeriod}
            />
            <PackageCard
              name='Premium'
              package={packagesPlans.premium}
              onSelect={onPackageTypeChange}
              activePackage={fields.packageType}
              interval={fields.recurringPeriod}
              plus
            />
          </FlexBoxesContainer>
        </Fragment>
      )}
      footer={(
        <Fragment>
          <div className='error-message redeem-box-error'>
            {errors.message}
          </div>
          <InputRow.Label
            notes='save your money, get a promo code from our affiliates to get great discounts'
            className='subscription-promo-code-label'
          >
            Do You have a Promo Code ?
          </InputRow.Label>
          <div className='subscription-promocode-section'>
            <InputRow.SmallInput
              error={errors.promoCode}
              name='promoCode'
              className='valid?'
              onChange={onChange}
              success='success'
            >
              PROMO CODE

            </InputRow.SmallInput>
            <SmallButton
              disabled={submitting}
              className={submitting ? 'primary-color spinner' : 'primary-color'}
              onClick={onPromoCodeCheck}
            >
              Check Promo Code

            </SmallButton>
          </div>
          <InputRow.Label>
            Fill Your Card Details
          </InputRow.Label>
          <CreditCardInputs onChange={onChange} />
          <SmallButton
            disabled={submitting}
            className={submitting ? ' update-subscription-plan-btn primary-color spinner' : 'update-subscription-plan-btn primary-color'}
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
  upgradeUserPackage: PropTypes.func.isRequired,
};

const mapStateToProps = ({
  user: {
    user: {
      activePackage = {}
    } = {}
  } = {}
}) => ({ activePackage });
export const SubscriptionPackages = connect(
  mapStateToProps,
  {
    ...billingActions,
    ...promoCodeActions
  }
)(Subscription);

export { default as TransactionsTable } from './components/Transactions'