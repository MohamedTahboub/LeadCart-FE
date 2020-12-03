import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Slider from 'rc-slider';

import config from 'config';
import common from 'components/common';
import PaymentType from 'components/PaymentType';
import { useContext } from '../../../../actions';
import FlatRadio from 'components/FlatRadio';
import { IoIosAddCircleOutline } from 'react-icons/io';
import priceFormatOptions from 'data/priceFormatOptions';
import { PricingOption } from './components';
import InlinePopup from 'components/common/InlinePopup';

import SectionStylesControllers from '../common/SectionStyles';

const { admins = [], PRICING_OPTIONS_LIMITS } = config;
const { Button, Tabs, Tab, InputRow, FlexBox, MiniColorPicker } = common;
const { Label, SearchInput, Toggle, SelectOption } = InputRow;

const StaticSection = ({ defaultBrandCurrency }) => {

  const {
    state: {
      funnel: { currency = defaultBrandCurrency } = {},
      product = {},
      modals: { sectionSetting = {} } = {}
    },
    actions
  } = useContext();


  const { content = {}, styles = {} } = sectionSetting;
  const { twoStepCheckout = false } = content;
  const { completeOrderButton = {}, theme: formTheme = 'classic' } = styles;

  const {
    position = 'justified',
    background = '#4da1ff',
    textColor = '#fff',
    borderSymmetry,
    borderStyle = 'hidden',
    borderColor = '#4da1ff',
    shadowColor = '#fff',
    hasShadow,
    boxShadowOffsetX,
    boxShadowOffsetY,
    boxShadowBlur,
    borderWidth = '2px'
  } = completeOrderButton;


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

  const onSectionFieldChange = ({ target: { name, value } } = {}) => {
    onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: name,
        value: value
      }
    });
  };
  const onButtonSettingsChange = ({ target: { name, value } } = {}) => {
    onSectionFieldChange({
      target: {
        name: `styles.completeOrderButton.${name}`,
        value: value
      }
    });
  };
  const onSectionStylesChange = ({ target: { name, value } } = {}) => {
    onSectionFieldChange({
      target: {
        name: `styles.${name}`,
        value: value
      }
    });
  };

  const onSliderChange = (radius, name) => {
    if (borderCornerNames.includes(name) && borderSymmetry) {
      onSectionSettingChange({
        section: sectionSetting,
        fields: borderCornerNames.map((corner) => ({
          name: `styles.completeOrderButton.${corner}`,
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
  const onCheckoutFormThemeChange = ({ name, value }) => {
    onSectionSettingChange({
      section: sectionSetting,
      field: {
        name: `styles.${name}`,
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
  const isOptInProductPage = category === 'opt-in';
  const isFuturistic = formTheme === 'futuristic';
  const hasPricingSettings = category !== 'opt-in';
  const hasOptionsSettings = category === 'checkout' || category === 'opt-in';

  const getActiveTab = () => {
    if (hasPricingSettings)
      return 'pricing';
    if (hasOptionsSettings)
      return 'options';
  };

  const activeTab = getActiveTab();

  return (
    <Fragment>
      <Tabs active={activeTab} className='padding-v-10 padding-h-10' tabsContentClassName='scrolling-70vh'>

        {hasPricingSettings &&
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
            {(isCheckoutProductPage) && (
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
        }

        {hasOptionsSettings &&
          <Tab id='options' title='Options'>
            <Label className='mb-2'>
              Form Theme:
            </Label>
            <FlatRadio
              options={[
                { label: 'Classic', value: 'classic' },
                { label: 'Futuristic', value: 'futuristic' }
              ]}
              value={formTheme}
              name='theme'
              onToggle={onCheckoutFormThemeChange}
            />

            {!isOptInProductPage &&
            <Fragment>
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

              <InlinePopup
                title='GDPR compliance options'
                className='mt-3'
                popUpContent={(
                  <FlexBox column>
                    <InputRow className='sidebar-row'>
                      <Label className='sidebar-input-label'>
                      Marketing Consent
                      </Label>
                      <Toggle
                        value={custom.marketingConsent}
                        name='marketingConsent'
                        onToggle={onToggleCustom}
                        beforeLabel='Show'
                        afterLabel='Hide'
                      />
                    </InputRow>
                    {custom.marketingConsent && (
                      <InputRow className='sidebar-row'>
                        <Label className='sidebar-input-label'>
                        With CheckBox
                        </Label>
                        <Toggle
                          value={custom.marketingConsentIsRequired}
                          name='marketingConsentIsRequired'
                          onToggle={onToggleCustom}
                          beforeLabel='Show'
                          afterLabel='Hide'
                        />
                      </InputRow>
                    )}
                    <InputRow className='sidebar-row'>
                      <Label className='sidebar-input-label'>
                      Terms & Conditions
                      </Label>
                      <Toggle
                        value={custom.termsAndConditions}
                        name='termsAndConditions'
                        onToggle={onToggleCustom}
                        beforeLabel='Show'
                        afterLabel='Hide'
                      />
                    </InputRow>
                    {custom.termsAndConditions && (
                      <InputRow className='sidebar-row'>
                        <Label className='sidebar-input-label'>
                        T & C with Checkbox
                        </Label>
                        <Toggle
                          value={custom.termsAndConditionsIsRequired}
                          name='termsAndConditionsIsRequired'
                          onToggle={onToggleCustom}
                          beforeLabel='Show'
                          afterLabel='Hide'
                        />
                      </InputRow>
                    )}
                  </FlexBox>
                )}
              />
            </Fragment>
            }
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
            {custom.shippingDetails && (
              <InputRow className='sidebar-row'>
                <Label className='sidebar-input-label'>
                  Show Shipping Methods
                </Label>
                <Toggle
                  value={custom.shippingMethodsEnabled}
                  name='shippingMethodsEnabled'
                  onToggle={onToggleCustom}
                  beforeLabel='Show'
                  afterLabel='Hide'
                />
              </InputRow>
            )}
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
            <InputRow className='sidebar-row'>
              <Label className='sidebar-input-label'>
                With Billing Address
              </Label>
              <Toggle
                value={custom.billingAddress}
                name='billingAddress'
                onToggle={onToggleCustom}
                beforeLabel='Show'
                afterLabel='Hide'
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


        {!isFuturistic && (
          <Tab id='button' title='Button'>
            <FlexBox center='v-center' spaceBetween>
              <span className='gray-text'>Position</span>
              <SelectOption
                name='position'
                value={position}
                onChange={onButtonSettingsChange}
                options={[
                  { label: 'Left', value: 'left' },
                  { label: 'Right', value: 'right' },
                  { label: 'Center', value: 'center' },
                  { label: 'Justified', value: 'justified' }
                ]}
              />
            </FlexBox>

            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Button Background</span>
              <MiniColorPicker
                name='background'
                value={background}
                onChange={onButtonSettingsChange}
              />
            </FlexBox>

            <FlexBox center='v-center margin-v-5' spaceBetween>
              <span className='gray-text'>Button Text</span>
              <MiniColorPicker
                name='textColor'
                value={textColor}
                onChange={onButtonSettingsChange}
              />
            </FlexBox>

            <FlexBox column center='margin-v-5 fluid' spaceBetween>
              <InlinePopup
                title='Borders'
                popUpContent={(
                  <FlexBox column>

                    <div>Border Radius</div>
                    <span className='gray-text'>Symmetric</span>
                    <Toggle value={borderSymmetry} onToggle={(target) => onButtonSettingsChange({ target })} name='borderSymmetry' />
                    {
                      borderCornerNames.map((corner) => (
                        <>
                          <div className='mb-2'>{getCornerTitle(corner)}</div>
                          <Slider
                            max={50}
                            min={0}
                            defaultValue={5}
                            onChange={(radius) => onSliderChange(radius, corner)}
                            value={completeOrderButton[corner] || 0}
                          />
                        </>
                      ))
                    }
                    <FlexBox center='v-center' spaceBetween className='mb-2'>
                      <div className='gray-text mb-2'>Border style</div>
                      <SelectOption
                        name='borderStyle'
                        value={borderStyle}
                        onChange={onButtonSettingsChange}
                        options={[
                          { label: 'Solid', value: 'solid' },
                          { label: 'Dashed', value: 'dashed' },
                          { label: 'Dotted', value: 'dotted' },
                          { label: 'None', value: 'hidden' }
                        ]}
                      />
                    </FlexBox>
                    <FlexBox center='v-center' spaceBetween className='mb-2'>
                      <div className='gray-text mb-2'>Border Width</div>
                      <SelectOption
                        value={borderWidth}
                        name='borderWidth'
                        onChange={onButtonSettingsChange}
                        options={[
                          { label: '0px', value: '0px' },
                          { label: '1px', value: '1px' },
                          { label: '2px', value: '2px' },
                          { label: '3px', value: '3px' },
                          { label: '4px', value: '4px' },
                          { label: '5px', value: '5px' },
                          { label: '6px', value: '6px' },
                          { label: '7px', value: '7px' },
                          { label: '8px', value: '8px' },
                          { label: '9px', value: '9px' },
                          { label: '10px', value: '10px' }
                        ]}
                      />
                    </FlexBox>
                    <FlexBox center='v-center' className='pb-140px' spaceBetween>
                      <span className='gray-text'>Border Color</span>
                      <MiniColorPicker
                        name='borderColor'
                        value={borderColor}
                        onChange={onButtonSettingsChange}
                      />
                    </FlexBox>
                  </FlexBox>
                )}
              />

              <InlinePopup
                title='Shadow'
                popUpContent={(
                  <FlexBox column>
                    <span>Shadow</span>
                    <Toggle value={hasShadow} onToggle={(target) => onButtonSettingsChange({ target })} name='hasShadow' />
                    <span className='gray-text'>Offset-X</span>
                    <Slider
                      max={20}
                      min={0}
                      defaultValue={5}
                      onChange={(offsetX) => onSliderChange(offsetX, 'boxShadowOffsetX')}
                      value={boxShadowOffsetX}
                      disabled={!hasShadow}
                    />
                    <span className='gray-text'>Offset-Y</span>
                    <Slider
                      max={20}
                      min={0}
                      defaultValue={5}
                      onChange={(offsetY) => onSliderChange(offsetY, 'boxShadowOffsetY')}
                      value={boxShadowOffsetY}
                      disabled={!hasShadow}
                    />
                    <span className='gray-text'>Blur</span>
                    <Slider
                      max={20}
                      min={0}
                      defaultValue={5}
                      onChange={(blur) => onSliderChange(blur, 'boxShadowBlur')}
                      value={boxShadowBlur}
                      disabled={!hasShadow}
                    />
                    <FlexBox center='v-center' spaceBetween className='pb-140px mt-2'>
                      <span className='gray-text'>Shadow Color</span>
                      <MiniColorPicker
                        name='shadowColor'
                        value={shadowColor}
                        onChange={onButtonSettingsChange}
                        disabled={!hasShadow}
                      />
                    </FlexBox>
                  </FlexBox>
                )}
              />
            </FlexBox>
          </Tab>
        )}
        {isFuturistic && (
          <Tab id='styles' title='Styles'>
            <FlexBox spaceBetween className='my-2'>
              <Label className='sidebar-input-label'>
                Form Theme Color
              </Label>
              <MiniColorPicker
                name='themeColor'
                value={styles.themeColor}
                onChange={onSectionStylesChange}
              />
            </FlexBox>
            <SectionStylesControllers
              values={styles}
              onChange={onSectionStylesChange}
            />
          </Tab>
        )}

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
