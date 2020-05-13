import React, { Fragment } from 'react';
// import PropTypes from 'prop-types';
import common from 'components/common';
// import { connect } from 'react-redux';
import PaymentType from 'components/PaymentType';
import PaymentGateway from 'components/PaymentGateways';
import { useContext } from '../../../actions';

import { SettingBox } from './common';

const {
  Collapse,
  MiniTwitterPicker,
  FulfillmentRowCard,
  Currency,
  Tabs,
  Tab,
  InputRow,
  FlexBox

} = common;

const { Panel } = Collapse;

const formatOptions = [
  {
    label: '(1134.65)',
    value: 'amount'
  },
  {
    label: '(1135)',
    value: 'amount_no_decimals'
  },
  {
    label: '(1,134.65)',
    value: 'amount_with_comma_separator'
  },
  {
    label: '(1,135)',
    value: 'amount_with_comma_separator_no_decimals'
  }
];

const {
  Label,
  SwitchInput,
  SearchInput,
  Toggle
} = InputRow;

const StaticSection = ({ ...props }) => {
  const {
    state: {
      product = {},
      styles = {}
    },
    actions
  } = useContext();

  const {
    price = {},
    payment = {},
    addOns = {},
    custom = {}
  } = product;


  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };

  const onToggleCustom = ({ target: { name } }) => {
    onChange({
      target: {
        name: `custom.${name}`,
        value: !custom[name]
      }
    });
  };
  return (
    <Tabs active='pricing' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
      <Tab id='pricing' title='Pricing'>
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Price Format:
          </Label>
          <SearchInput
            size='small'
            width={350}
            options={formatOptions}
            defaultValue={price.format || 'amount'}
            name='price.format'
            onChange={onChange}
          // dropdownClassName='price-format-options'
          />
        </InputRow>
        <PaymentType
          payment={payment}
          onChange={onChange}
          price={price}
        />
      </Tab>

      <Tab id='customs' title='Custom'>
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Show Shipping Form
          </Label>
          <Toggle
            value={custom.shippingDetails}
            name='shippingDetails'
            onToggle={onToggleCustom}
          />
        </InputRow>
        <InputRow className='sidebar-row'>
          <Label className='sidebar-input-label'>
            Show Coupon Section
          </Label>
          <Toggle
            value={custom.couponSection}
            name='couponSection'
            onToggle={onToggleCustom}
          />
        </InputRow>
      </Tab>
      <Tab id='addOns' title='Add-ons' />
      <Tab id='styles' title='Styles'>
        <FlexBox center='margin-v-5 min-height-400' spaceBetween>
          <Label className='sidebar-input-label'>
            Theme Color:
          </Label>
          <MiniTwitterPicker
            name='styles.themeColor'
            value={styles.themeColor}
            onChange={onChange}
          />
        </FlexBox>
      </Tab>
    </Tabs>
  );
};
StaticSection.propTypes = {};


export default StaticSection;
