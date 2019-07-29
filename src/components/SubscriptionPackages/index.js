import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import CreditCardInputs from 'components/CreditCardInputs';
import config from 'config';
import './style.css';

const { prices = {}, packagesFeatures = {} } = config;

const {
  InputRow,
  HeadeLine,
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


const index = ({
  activePackage = '',
  codesUsed = 2,
  ...props
}) => {
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [fields, setFields] = useState({
    packageType: 'Pro',
    recurringPeriod: 'monthly',
    card: {}
  });


  const onPackageTypeChange = (pkg) => {
    console.log(pkg);
    setFields({ ...fields, packageType: pkg });
  };

  const togglePeriod = () => {
    setFields({
      ...fields,
      recurringPeriod: fields.recurringPeriod === 'monthly' ? 'yearly' : 'monthly'
    });
  };

  const onChange = () => {};
  const onSubmit = () => {};
  return (
    <Box
      header={(
        <Fragment>
          <HeadeLine className='subscription-head-line'>
            Your Subscription
          </HeadeLine>
          <div className='subscription-head-description'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus nam, perferendis fugiat nobis deserunt exercitationem officia error fugit omnis asperiores voluptates vero, illo eos ipsam? Adipisci unde quos voluptatem qui.</div>
        </Fragment>
      )}
      contentClassName='subscription-box-content'
      content={(
        <Fragment>
          <ActivationSwitchInput
            active={fields.recurringPeriod === 'monthly'}
            className={`subscription-toggle-input ${fields.recurringPeriod}`}
            onToggle={togglePeriod}
          />
          <FlexBoxesContainer className='packages-container'>
            <PackageCard
              name='Pro'
              prices={prices.pro}
              onSelect={onPackageTypeChange}
              features={packagesFeatures.pro}
              activePackage={fields.packageType}
            />
            <PackageCard
              name='Premium'
              prices={prices.premium}
              onSelect={onPackageTypeChange}
              features={packagesFeatures.premium}
              activePackage={fields.packageType}
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
              onClick={onSubmit}
            >
          Check Promo Code

            </SmallButton>
          </div>
          <InputRow.Label>
          Fill Your Card Details
          </InputRow.Label>
          <CreditCardInputs />
          <SmallButton
            disabled={submitting}
            className=' primary-color update-subscription-plan-btn'
            onClick={onSubmit}
          >
      Update My Package
          </SmallButton>
        </Fragment>
      )}
    />
  );
};
index.propTypes = {

};

export default index;
