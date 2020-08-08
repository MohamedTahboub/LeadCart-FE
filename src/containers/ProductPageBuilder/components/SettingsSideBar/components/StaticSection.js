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
  const { content: { twoStepCheckout } } = sectionSetting;
  const {
    price = {},
    payment = {},
    pageStyles: { themeColor } = {},
    custom = {},
    category
  } = product;

  const checkoutProductPage = category === 'checkout';

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

      {checkoutProductPage &&
        <Tab id='forms' title='Forms'>
          <Label className='mb-2'>
            Checkout type:
          </Label>
          <FlatRadio
            options={[
              { label: 'Two steps', value: true },
              { label: 'One step', value: false }
            ]}
            value={twoStepCheckout}
            name='twoStepCheckout'
            onToggle={onTwoStepCheckoutChange}
          />
          <img
            src={twoStepCheckout ? 'https://imgur.com/nqjepZ3.png' : 'https://imgur.com/wnThVnO.png'}
            alt='thumb'
            style={{
              height: '320px',
              objectFit: 'contain'
            }}
          />
        </Tab>
      }

      {checkoutProductPage &&
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
          {twoStepCheckout &&
            <InputRow className='sidebar-row'>
              <Label className='sidebar-input-label'>
                summary in each step
              </Label>
              <Toggle
                value={custom.orderSummary}
                name='orderSummary'
                onToggle={onToggleCustom}
                beforeLabel='Show'
                afterLabel='Hide'
              />
            </InputRow>
          }
        </Tab>
      }
    </Tabs>
  );
};
StaticSection.propTypes = {};


export default StaticSection;
