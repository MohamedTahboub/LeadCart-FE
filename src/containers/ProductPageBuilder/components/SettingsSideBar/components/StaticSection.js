import React, { Fragment } from 'react';
import common from 'components/common';
import PaymentType from 'components/PaymentType';
import { useContext } from '../../../actions';


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
    state: {
      product = {},
    },
    actions
  } = useContext();

  const {
    price = {},
    payment = {},
    // addOns = {},
    pageStyles:{
      themeColor
    }={}
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
            name='pageStyles.themeColor'
            value={themeColor}
            onChange={onChange}
          />
        </FlexBox>
      </Tab>
    </Tabs>
  );
};
StaticSection.propTypes = {};


export default StaticSection;
