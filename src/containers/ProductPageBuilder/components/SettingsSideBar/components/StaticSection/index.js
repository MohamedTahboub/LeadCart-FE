import React, { Fragment } from 'react';
import { connect } from 'react-redux';

import config from 'config';
import common from 'components/common';
import PaymentType from 'components/PaymentType';
import { useContext } from '../../../../actions';
import FlatRadio from 'components/FlatRadio';
import { IoIosAddCircleOutline } from 'react-icons/io';
import priceFormatOptions from 'data/priceFormatOptions';
import { PricingOption } from './components';

const { admins = [], PRICING_OPTIONS_LIMITS } = config;

const {
  Button,
  Tabs,
  Tab,
  InputRow,
  FlexBox
} = common;

const {
  Label,
  SearchInput,
  Toggle
} = InputRow;

const StaticSection = ({ isAdminUser, defaultBrandCurrency }) => {

  const {
    state: {
      funnel: { currency = defaultBrandCurrency } = {},
      product = {},
      modals: { sectionSetting = {} } = {}
    },
    actions
  } = useContext();

  const { content: { twoStepCheckout } } = sectionSetting;

  const {
    price = {},
    pricingOptions = [],
    payment = {},
    custom = {},
    category
  } = product;
  const isCheckoutProductPage = category === 'checkout';

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

  const onDeleteProductPriceOption = (id) => () => {
    actions.deleteProductPriceOption(id);
  };
  const onEditProductPriceOption = (id) => () => {
    actions.editProductPriceOption(id);
  };

  const isExceededThePricingOptionsLimits = (Array.isArray(pricingOptions) && pricingOptions.length > PRICING_OPTIONS_LIMITS);


  return (
    <Fragment>
      <Tabs active='pricing' className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>
        <Tab id='pricing' title='Pricing'>
          <InputRow>
            <Label>Price Format:</Label>
            <SearchInput
              size='small'
              width={350}
              options={priceFormatOptions}
              defaultValue={price.format || 'amount'}
              name='price.format'
              onChange={onChange}
            />
          </InputRow>
          <PaymentType
            payment={payment}
            onChange={onChange}
            price={price}
            currency={currency}
          />
          <FlexBox center='h-center' className='mt-3 mb-2'>
            <Button className='light-btn px-3' onClick={actions.onTogglePricingOptionModal} disabled={isExceededThePricingOptionsLimits}>
              <FlexBox center='v-center'>
                <IoIosAddCircleOutline color='gray' className='mr-2' />
                <span>Add More Pricing Options</span>
              </FlexBox>
            </Button>
          </FlexBox>
          <FlexBox column>
            {pricingOptions.map((pricingOption) => {
              const { id } = pricingOption;
              return (
                <PricingOption
                  key={id}
                  {...pricingOption}
                  onEdit={onEditProductPriceOption(pricingOption)}
                  onDelete={onDeleteProductPriceOption(id)}
                  currency={currency}
                />
              );
            })}
          </FlexBox>
        </Tab>

        {isCheckoutProductPage &&
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

        {isCheckoutProductPage &&
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
    </Fragment>
  );
};
StaticSection.propTypes = {};

const propifyState = ({
  user: { user = {} },
  settings: { generalModel: { currency: defaultBrandCurrency = 'USD' } = {} } = {}
}) => ({
  isAdminUser: admins.includes(user.email),
  defaultBrandCurrency
});

export default connect(propifyState)(StaticSection);
