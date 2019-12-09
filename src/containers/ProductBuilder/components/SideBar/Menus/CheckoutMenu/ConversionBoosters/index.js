import React from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';

import {
  MenuItem, MenuTitle, MenuContent
} from '../MenuElements';

import './style.css';

const { InputRow, Collapse } = common;
const { Panel } = Collapse;

const ConversionBoosters = ({
  product: {
    offer = {},
    shippingDetails = {},
    pagePreferences: {
      asset = {},
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
      'pagePreferences.testimonials',
      { ...testimonials, enabled: !testimonials.enabled }
    );
  };

  const onToggleFeatures = () => {
    onChange(
      'pagePreferences.features',
      { ...features, enabled: !features.enabled }
    );
  };

  const onToggleGuaranteed = () => {
    onChange(
      'pagePreferences.guaranteed',
      { ...guaranteed, enabled: !guaranteed.enabled }
    );
  };


  const onChangeTermsField = ({ target: { name, value } }) => {
    onChange(
      'pagePreferences.termsAndConditions',
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


  const onToggleMediaAsset = () => {
    onChange(
      'pagePreferences.asset',
      { ...asset, visible: !asset.visible }
    );
  };
  return (
    <MenuItem>
      <MenuTitle>Conversion Boosters</MenuTitle>
      <MenuContent>
        <Collapse defaultActiveKey={['1', '2', '3', '4', '5']}>
          <Panel header='Media Asset' key='1'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={asset.visible}
                name='visible'
                onToggle={onToggleMediaAsset}
                className='sidebar-switch-input'
              />
            </InputRow>
          </Panel>
          <Panel header='Shipping Details' key='2'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={shippingDetails.enabled}
                onToggle={onToggleShippingDetails}
                className='sidebar-switch-input'
              />
            </InputRow>
          </Panel>
          <Panel header='Testimonials' key='3'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={testimonials.enabled}
                onToggle={onToggleTestimonials}
                className='sidebar-switch-input'
              />
            </InputRow>
          </Panel>
          <Panel header='Features' key='4'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={features.enabled}
                onToggle={onToggleFeatures}
                className='sidebar-switch-input'
              />
            </InputRow>
          </Panel>
          <Panel header='Terms And Conditions' key='5'>
            <InputRow className='sidebar-row'>
              <InputRow.Label className='sidebar-input-label'>Show Section</InputRow.Label>
              <InputRow.SwitchInput
                value={terms.enabled}
                onToggle={onToggleTerms}
                className='sidebar-switch-input'
              />
            </InputRow>
            <InputRow className='sidebar-row flexColumn alignedStart'>
              <InputRow.Label className='sidebar-input-label'>Terms & conditions Link:</InputRow.Label>
              <InputRow.TextField
                value={terms.url}
                name='url'
                className='terms-and-conditions-input'
                onChange={onChangeTermsField}
              />
            </InputRow>
          </Panel>
          <Panel header='Guarantee Message' key='6'>
            <InputRow className='sidebar-row'>
              <InputRow.Label
                className='sidebar-input-label margin-bottom-20'
                notes='Recommended image ratio 10:1 (W:H)'
              >
                Guarantee Message:
              </InputRow.Label>
              <InputRow.SwitchInput
                value={guaranteed.enabled}
                onToggle={onToggleGuaranteed}
                className='sidebar-switch-input'
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
