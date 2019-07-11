import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import {
  MenuItem, MenuTitle, MenuContent, MenuFlexContent
} from '../MenuElements';

import './style.css';

const { InputRow } = common;

const ConversionBoosters = ({
  product: {
    offer = {},
    shippingDetails = {},
    coupons = {},
    checkoutPage: {
      testimonials = {},
      features = {},
      termsAndConditions: terms = {},
      guaranteed,
    } = {}
  } = {},
  ...props
}) => {
  const onChange = (name, value) => {
    props.onChange({
      target: {
        name,
        value
      }
    });
  };
  const onToggleShippingDetails = () => {
    onChange(
      'shippingDetails.enabled',
      !shippingDetails.enabled
    );
  };
  const onToggleTestimonials = () => {
    onChange(
      'checkoutPage.testimonials',
      { ...testimonials, enabled: !testimonials.enabled }
    );
  };

  const onToggleFeatures = () => {
    onChange(
      'checkoutPage.features',
      { ...features, enabled: !features.enabled }
    );
  };

  const onToggleGuaranteed = () => {
    onChange(
      'checkoutPage.guaranteed',
      !guaranteed
    );
  };

  const onToggleBumpOffer = () => {
    onChange('offer.enabled', !offer.enabled);
  };
  const onToggleTerms = () => {
    onChange(
      'checkoutPage.termsAndConditions',
      { ...terms, enabled: !terms.enabled }
    );
  };
  const onToggleCoupons = () => {
    onChange(
      'coupons',
      { enabled: !coupons.enabled }
    );
  };


  return (
    <MenuItem>
      <MenuTitle>Conversion Boosters</MenuTitle>
      <MenuContent>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Shipping Details:</InputRow.Label>
          <InputRow.SwitchInput
            value={shippingDetails.enabled}
            onToggle={onToggleShippingDetails}
            className='sidebar-switch-input'
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Testimonials:</InputRow.Label>
          <InputRow.SwitchInput
            value={testimonials.enabled}
            onToggle={onToggleTestimonials}
            className='sidebar-switch-input'
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Features:</InputRow.Label>
          <InputRow.SwitchInput
            value={features.enabled}
            onToggle={onToggleFeatures}
            className='sidebar-switch-input'
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Bump Offer:</InputRow.Label>
          <InputRow.SwitchInput
            value={offer.enabled}
            onToggle={onToggleBumpOffer}
            className='sidebar-switch-input'
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Terms And Conditions:</InputRow.Label>
          <InputRow.SwitchInput
            value={terms.enabled}
            onToggle={onToggleTerms}
            className='sidebar-switch-input'
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Guarantee Message:</InputRow.Label>
          <InputRow.SwitchInput
            value={guaranteed}
            onToggle={onToggleGuaranteed}
            className='sidebar-switch-input'
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <InputRow.Label className='sidebar-input-label'>Coupons:</InputRow.Label>
          <InputRow.SwitchInput
            value={coupons.enabled}
            onToggle={onToggleCoupons}
            className='sidebar-switch-input'
          />
        </InputRow>
      </MenuContent>
    </MenuItem>
  );
};

ConversionBoosters.propTypes = {

};

export default ConversionBoosters;
