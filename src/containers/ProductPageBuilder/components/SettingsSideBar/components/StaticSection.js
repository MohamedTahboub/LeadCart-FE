import React, { Fragment } from 'react';
import common from 'components/common';
import PaymentType from 'components/PaymentType';
import { useContext } from '../../../actions';
import FlatRadio from 'components/FlatRadio';

const {
  MiniTwitterPicker,
  Tabs,
  Tab,
  InputRow,
  FlexBox

} = common;


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
  SearchInput,
  Toggle
} = InputRow;

const StaticSection = ({ ...props }) => {
  const {
    state: { product = {}, modals: { sectionSetting = {} } = {} },
    actions
  } = useContext();
  const {
    price = {},
    payment = {},
    pageStyles: { themeColor } = {},
    custom = {}
  } = product;

  const onChange = ({ target }) => {
    actions.onProductFieldChange(target);
  };

  const onToggleCustom = ({ name }) => {
    onChange({
      target: {
        name: `custom.${name}`,
        value: !custom[name]
      }
    });
  };

  const onTwoStepCheckoutChange = ({ name, value }) => {
    actions.onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: `content.${name}`,
        value: value
      }
    });
  };

  return (
    <Tabs active='pricing' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
      <Tab id='pricing' title='Pricing'>
        <InputRow>
          <Label>
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
      <Tab id='forms' title='Forms'>
        <Label className='mb-2'>
          Two step checkout:
        </Label>
        <FlatRadio
          options={[
            { label: 'Two step', value: true },
            { label: 'Classic', value: false }
          ]}
          value={sectionSetting.content.twoStepCheckout}
          name='twoStepCheckout'
          onToggle={onTwoStepCheckoutChange}
        />
        <img
          src={sectionSetting.content.twoStepCheckout ? 'https://imgur.com/wnThVnO.png' : 'https://imgur.com/nqjepZ3.png'}
          alt='thumb'
          style={{
            height: '320px',
            objectFit: 'contain'
          }}
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
    </Tabs>
  );
};
StaticSection.propTypes = {};


export default StaticSection;
