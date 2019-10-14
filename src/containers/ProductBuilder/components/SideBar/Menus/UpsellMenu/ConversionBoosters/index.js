import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

import {
  MenuItem, MenuTitle, MenuContent, MenuFlexContent
} from '../MenuElements';

import './style.css';

const { InputRow, Collapse } = common;
const { Panel } = Collapse;

const ConversionBoosters = ({
  product: {
    offer = {},
    shippingDetails = {},
    checkoutPage: {
      testimonials = {},
      features = {},
      termsAndConditions: terms = {},
      guaranteed = {},
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
      { ...guaranteed, enabled: !guaranteed.enabled }
    );
  };


  const onChangeTermsField = ({ target: { name, value } }) => {
    onChange(
      'checkoutPage.termsAndConditions',
      { ...terms, [name]: value }
    );
  };
  const onToggleTerms = () => {
    onChangeTermsField({
      target: {
        name: 'enabled',
        value: !terms.enabled
      }
    });
  };

  return (
    <MenuItem>
      <MenuTitle>Conversion Boosters</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
          <Panel header='Features' key='1'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={features.enabled}
                onToggle={onToggleFeatures}
                className='sidebar-switch-input'
              />
            </InputRow>
          </Panel>
          <Panel header='Progress Bar' key='2'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                // value={terms.enabled}
                // onToggle={onToggleTerms}
                className='sidebar-switch-input'
              />
            </InputRow>
            <InputRow className='padding-v-10 '>
              <InputRow.Label className='sidebar-input-label'>Progress Bar Value(%):</InputRow.Label>
              <InputRow.TextField
                // value={terms.url}
                type='number'
                min={0}
                max={100}
                name='value'
                className='progress-bar-input margin-left-20'
                onChange={onChangeTermsField}
              />
            </InputRow>
          </Panel>

        </Collapse>
      </MenuContent>
    </MenuItem>
  );
};

ConversionBoosters.propTypes = {

};

export default ConversionBoosters;
