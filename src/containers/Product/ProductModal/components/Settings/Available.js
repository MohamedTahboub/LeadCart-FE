import React, { Fragment } from 'react';
import common from 'components/common';

import {
  PaymentOptions,
  HeaderOptions,
  TermsOptions,
  BumpOptions
} from './Options'
import Testimonials from '../Template/components/Testimonials';


const { InputRow, Title, SubTabs } = common;


const Available = ({ activeOption = 'PaymentOptions', ...props }) => {

  let ActiveElement;
  console.log(activeOption)
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

  return <ActiveElement {...props} />
}

const HiddenComponents = ({
  product: {
    offer = {},
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
        <InputRow.Label>Terms an Conditions</InputRow.Label>
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
    </Fragment>
  )
}


export default (props) => {

  return (
    <div className='product-form-settings' >
      <SubTabs
        defaultTab='Available Settings'
        className='optional-setting-tabs'
        container={({ className, children, ...props }) => (
          <div className="available-options-tabs-container">
            {children}
          </div>
        )}
        tabs={{
          'Available Settings': <Available {...props} />,
          'Hidden Elements': <HiddenComponents  {...props} />,
        }}
      />
    </div>
  );
}
