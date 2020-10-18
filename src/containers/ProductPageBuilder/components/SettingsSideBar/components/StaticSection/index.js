import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';

import config from 'config';
import common from 'components/common';
import PaymentType from 'components/PaymentType';
import Collapse from 'components/Collapsible';
import { useContext } from '../../../../actions';
import FlatRadio from 'components/FlatRadio';
import { IoIosAddCircleOutline } from 'react-icons/io';
import priceFormatOptions from 'data/priceFormatOptions';
import { PricingOption } from './components';

const { admins = [], PRICING_OPTIONS_LIMITS } = config;
const { Button, Tabs, Tab, InputRow, FlexBox, MiniTwitterPicker } = common;
const { Label, SearchInput, Toggle, SelectOption } = InputRow;

const StaticSection = ({ defaultBrandCurrency }) => {
  const [openCollapse, setOpenCollapse] = useState();

  const {
    state: {
      funnel: { currency = defaultBrandCurrency } = {},
      product = {},
      modals: { sectionSetting = {} } = {}
    },
    actions
  } = useContext();


  const { content = {} } = sectionSetting;

  const {
    twoStepCheckout,
    buttonPosition = 'justified',
    buttonBackground,
    ButtonTextColor = '#fff',
    buttonBorderSymmetry,
    buttonBorderStyle = 'hidden',
    buttonBorderColor = '#fff',
    buttonShadowColor = '#fff',
    hasButtonShadow,
    boxShadowOffsetX = 0,
    boxShadowOffsetY = 0,
    boxShadowBlur = 0
  } = content;


  const {
    onProductFieldChange,
    onSectionSettingChange,
    deleteProductPriceOption,
    editProductPriceOption,
    onTogglePricingOptionModal
  } = actions;


  const {
    price = {},
    pricingOptions = [],
    payment = {},
    custom = {},
    category
  } = product;

  const borderCornerNames = [
    'borderTopLeftRadius',
    'borderTopRightRadius',
    'borderBottomLeftRadius',
    'borderBottomRightRadius'
  ];

  const getCornerTitle = (corner) => {
    switch (corner) {
    case 'borderTopLeftRadius': return 'Top Left';
    case 'borderTopRightRadius': return 'Top Right';
    case 'borderBottomLeftRadius': return 'Bottom Left';
    case 'borderBottomRightRadius': return 'Bottom Right';
    default: return '';
    }
  };

  const onButtonSettingsChange = ({ target: { name, value } } = {}) => {
    onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: `content.${name}`,
        value: value
      }
    });
  };

  const onSliderChange = (radius, name) => {
    if (borderCornerNames.includes(name) && buttonBorderSymmetry) {
      onSectionSettingChange({
        section: sectionSetting,
        fields: borderCornerNames.map((corner) => ({
          name: `content.${corner}`,
          value: radius
        }))
      });
    } else {
      onButtonSettingsChange({ target: { name, value: radius } });
    }
  };


  const onChange = ({ target }) => {
    onProductFieldChange(target);
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
    onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: `content.${name}`,
        value: value
      }
    });
  };

  const onDeleteProductPriceOption = (id) => () => {
    deleteProductPriceOption(id);
  };

  const onEditProductPriceOption = (id) => () => {
    editProductPriceOption(id);
  };


  const isExceededThePricingOptionsLimits = (Array.isArray(pricingOptions) && pricingOptions.length > PRICING_OPTIONS_LIMITS);

  const isCheckoutProductPage = category === 'checkout';


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
          {isCheckoutProductPage && (
            <Fragment>
              <FlexBox center='h-center' className='mt-3 mb-2'>
                <Button className='light-btn px-3' onClick={onTogglePricingOptionModal} disabled={isExceededThePricingOptionsLimits}>
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
                      format={price.format}
                      onEdit={onEditProductPriceOption(pricingOption)}
                      onDelete={onDeleteProductPriceOption(id)}
                      currency={currency}
                    />
                  );
                })}
              </FlexBox>
            </Fragment>
          )}
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
                beforeLabel='Show'
                afterLabel='Hide'
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
                beforeLabel='Show'
                afterLabel='Hide'
              />
            </InputRow>
            {/*
            <InputRow className='sidebar-row'>
              <Label className='sidebar-input-label'>
              Terms & Conditions Check
              </Label>
              <Toggle
                value={custom.termsEnabled}
                name='termsEnabled'
                onToggle={onToggleCustom}
                beforeLabel='Show'
                afterLabel='Hide'
              />
            </InputRow>
           */}
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


        <Tab id='button' title='Button'>
          <FlexBox center='v-center' spaceBetween>
            <span className='gray-text'>Position</span>
            <SelectOption
              name='buttonPosition'
              value={buttonPosition}
              onChange={onButtonSettingsChange}
              options={[
                { label: 'Center', value: 'center' },
                { label: 'Justified', value: 'justified' }
              ]}
            />
          </FlexBox>

          <FlexBox center='v-center margin-v-5' spaceBetween>
            <span className='gray-text'>Button Background</span>
            <MiniTwitterPicker
              name='buttonBackground'
              value={buttonBackground}
              onChange={onButtonSettingsChange}
            />
          </FlexBox>

          <FlexBox center='v-center margin-v-5' spaceBetween>
            <span className='gray-text'>Button Text</span>
            <MiniTwitterPicker
              name='ButtonTextColor'
              value={ButtonTextColor}
              onChange={onButtonSettingsChange}
            />
          </FlexBox>

          <FlexBox column center='margin-v-5 fluid' spaceBetween>
            <Collapse defaultOpen={openCollapse === 'Borders'} title='Borders' toggle={setOpenCollapse}>
              <div>Border Radius</div>
              <span className='gray-text'>Symmetric</span>
              <Toggle value={buttonBorderSymmetry} onToggle={(target) => onButtonSettingsChange({ target })} name='buttonBorderSymmetry' />
              {
                borderCornerNames.map((corner) => (
                  <>
                    <div className='mb-2'>{getCornerTitle(corner)}</div>
                    <Slider
                      max={50}
                      min={0}
                      defaultValue={5}
                      onChange={(radius) => onSliderChange(radius, corner)}
                      value={content[corner] || 0}
                    />
                  </>
                ))
              }
              <FlexBox center='v-center' spaceBetween className='mb-2'>
                <div className='gray-text mb-2'>Border style</div>
                <SelectOption
                  name='buttonBorderStyle'
                  value={buttonBorderStyle}
                  onChange={onButtonSettingsChange}
                  options={[
                    { label: 'Solid', value: 'solid' },
                    { label: 'Dashed', value: 'dashed' },
                    { label: 'Dotted', value: 'dotted' },
                    { label: 'None', value: 'hidden' }
                  ]}
                />
              </FlexBox>
              <FlexBox center='v-center' className='pb-140px' spaceBetween>
                <span className='gray-text'>Border Color</span>
                <MiniTwitterPicker
                  name='buttonBorderColor'
                  value={buttonBorderColor}
                  onChange={onButtonSettingsChange}
                />
              </FlexBox>
            </Collapse>

            <Collapse defaultOpen={openCollapse === 'Shadows'} title='Shadows' toggle={setOpenCollapse}>
              <span>Shadow</span>
              <Toggle value={hasButtonShadow} onToggle={(target) => onButtonSettingsChange({ target })} name='hasButtonShadow' />
              <span className='gray-text'>Offset-X</span>
              <Slider
                max={20}
                min={0}
                defaultValue={5}
                onChange={(offsetX) => onSliderChange(offsetX, 'boxShadowOffsetX')}
                value={boxShadowOffsetX}
                disabled={!hasButtonShadow}
              />
              <span className='gray-text'>Offset-Y</span>
              <Slider
                max={20}
                min={0}
                defaultValue={5}
                onChange={(offsetY) => onSliderChange(offsetY, 'boxShadowOffsetY')}
                value={boxShadowOffsetY}
                disabled={!hasButtonShadow}
              />
              <span className='gray-text'>Blur</span>
              <Slider
                max={20}
                min={0}
                defaultValue={5}
                onChange={(blur) => onSliderChange(blur, 'boxShadowBlur')}
                value={boxShadowBlur}
                disabled={!hasButtonShadow}
              />
              <FlexBox center='v-center' spaceBetween className='pb-140px mt-2'>
                <span className='gray-text'>Shadow Color</span>
                <MiniTwitterPicker
                  name='buttonShadowColor'
                  value={buttonShadowColor}
                  onChange={onButtonSettingsChange}
                  disabled={!hasButtonShadow}
                />
              </FlexBox>
            </Collapse>

          </FlexBox>
        </Tab>

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
