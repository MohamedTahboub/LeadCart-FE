import React from 'react';

import common from 'components/common';
import PaymentType from 'components/PaymentType';
import { useContext } from '../../../actions';

const { Tabs, Tab, InputRow } = common;
const { Label, SearchInput, Toggle } = InputRow;


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


const StaticSection = ({ ...props }) => {
  const {
    state: { product = {} },
    actions
  } = useContext();

  const { price = {}, payment = {}, custom = {} } = product;


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
    </Tabs>
  );
};
StaticSection.propTypes = {};


export default StaticSection;
