import React, { Fragment, useState ,useEffect} from 'react';
import common from 'components/common';

import {
  PaymentOptions,
  HeaderOptions,
  TermsOptions,
  BumpOptions
} from './Options'


const { InputRow, Title, SubTabs } = common;


const Available = ({ activeOption = 'PaymentOptions', ...props }) => {

  let ActiveElement;

  switch (activeOption) {
    case 'HeaderOptions':
      ActiveElement = HeaderOptions;
      break;
    case 'PaymentOptions':
      ActiveElement = PaymentOptions;
      break;
    case 'TermsOptions':
      ActiveElement = TermsOptions;
      break;
    case 'BumpOptions':
      ActiveElement = BumpOptions;
      break;
    default:
      ActiveElement = HeaderOptions;
  }

  return <ActiveElement {...props} key={activeOption} />
}

const HiddenComponents = ({
  product: {
    offer = {},
    coupons = {},
    checkoutPage: {
      testimonials = {},
      features = {},
      termsAndConditions: terms = {},
      guaranteed,
    } = {} } = {},
  hiddenElements = {},
  ...props
}) => {

  const onChange = (name, value) => {
    props.onChange({
      target: {
        name,
        value
      }
    })
  }
  const onToggleTestimonials = () => {
    onChange(
      'checkoutPage.testimonials',
      { ...testimonials, enabled: !testimonials.enabled }
    );
  }

  const onToggleFeatures = () => {
    onChange(
      'checkoutPage.features',
      { ...features, enabled: !features.enabled }
    );
  }

  const onToggleGuaranteed = () => {
    onChange(
      'checkoutPage.guaranteed',
      !guaranteed
    );
  }

  const onToggleBumpOffer = () => {
    onChange('offer.enabled', !offer.enabled)
  }
  const onToggleTerms = () => {
    onChange(
      'checkoutPage.termsAndConditions',
      { ...terms, enabled: !terms.enabled })
  }
  const onToggleCoupons = () => {
    onChange(
      'coupons',
      { enabled: !coupons.enabled })
  }

  return (
    <Fragment>
      <Title>Disable/Enable the following Elements:</Title>
      <InputRow>
        <InputRow.Label>Testimonial</InputRow.Label>
        <InputRow.SwitchInput
          value={testimonials.enabled}
          onToggle={onToggleTestimonials}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Features</InputRow.Label>
        <InputRow.SwitchInput
          value={features.enabled}
          onToggle={onToggleFeatures}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Bump Offer</InputRow.Label>
        <InputRow.SwitchInput
          value={offer.enabled}
          onToggle={onToggleBumpOffer}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Terms and Conditions</InputRow.Label>
        <InputRow.SwitchInput
          value={terms.enabled}
          onToggle={onToggleTerms}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Guarantee Message</InputRow.Label>
        <InputRow.SwitchInput
          value={guaranteed}
          onToggle={onToggleGuaranteed}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Coupons Box</InputRow.Label>
        <InputRow.SwitchInput
          value={coupons.enabled}
          onToggle={onToggleCoupons}
        />
      </InputRow>
    </Fragment>
  )
}


export default (props) => {

  const { activeTab  } = props;

  const onTabChange = tab => {
    props.onOptionSelected(props.activeOption, tab);
  }


  return (
    <div className='product-form-settings' >
      <SubTabs
        defaultTab={'Product Settings'}
        activeTab={activeTab}
        onTabChange={onTabChange}
        className='optional-setting-tabs'
        container={({ className, children, ...props }) => (
          <div className="available-options-tabs-container">
            {children}
          </div>
        )}
        tabs={{
          'Product Settings': <Available {...props} />,
          'Conversion Boosters': <HiddenComponents  {...props} />,
        }}
      />
    </div>
  );
}
