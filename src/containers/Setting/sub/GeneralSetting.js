import React from 'react';
import common from 'components/common';
import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux';
import countries from 'data/countries';
import timeZones from 'data/timeZones';
import defaultLogo from 'assets/images/big-logo.png';
const { InputRow, MainBlock, DeleteButton } = common;

const defaultTimeZone = timeZones.find(({ value }) => value.includes('Central America')).value;
const defaulteCountry = countries.find(({ code }) => code.includes('US')).name;
const GeneralSettings = ({ user: { email: userEmail }, ...props }) => {
  const {
    name,
    country,
    currency,
    darkLogo,
    support,
    // downloadButtonText,
    // firePixel,
    // footerScript,
    // purchaseCompletion,
    lightLogo,
    productExpirationDays,
    timeZone,
    // url,
    errors
  } = props.general;
  const onFieldChange = ({ target: { name, value } }) => {
    props.onUserGeneralSettingsFieldUpdate({ name, value });
  };

  const onImageUpload = (name, value) => {
    props.onUserGeneralSettingsFieldUpdate({ name, value });
  };


  return (
    <MainBlock title='General Marketplace Settings'>
      <InputRow>
        <InputRow.Label error={errors.name}>Company Name</InputRow.Label>
        <InputRow.NormalInput
          error={errors.name}
          name='name'
          value={name}
          onChange={onFieldChange}
        >
        </InputRow.NormalInput>
      </InputRow>
      <InputRow>
        <InputRow.Label
          error={errors.lightLogo || errors.darkLogo}
          notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
        >
          Default Logo

        </InputRow.Label>
        <InputRow.AddImage
          value={lightLogo || defaultLogo}
          subLabel='Logo'
          source='company_logo'
          name='logo'
          onUploaded={(image) => onImageUpload('logo', image)}
        >
          Logo

        </InputRow.AddImage>
      </InputRow>
      <InputRow margin='37'>
        <InputRow.Label
          error={errors.country}
          notes='Select a country to be displayed as the default on your checkout pages. Your customers can always select a different country.'
        >
          Default Country

        </InputRow.Label>
        <InputRow.SearchInput
          // value={country}
          data={countries}
          target='name'
          error={errors.country}
          name='country'
          defaultValue={country || defaulteCountry}
          onChange={onFieldChange}
        />

      </InputRow>
      <InputRow margin='35'>
        <InputRow.Label error={errors.timeZones}>Time Zone</InputRow.Label>
        <InputRow.SearchInput
          defaultValue={defaultTimeZone}
          value={timeZone}
          data={timeZones}
          target='value'
          error={errors.timeZones}
          name='timeZone'
          onChange={onFieldChange}
        />
      </InputRow>
      <InputRow margin='20'>
        <InputRow.Label error={errors.support}>Support Contact</InputRow.Label>
        <InputRow.SmallInput
          name='supportEmail'
          onChange={onFieldChange}
          error={errors.support}
        >
          {support || userEmail}

        </InputRow.SmallInput>
      </InputRow>
      <InputRow margin='20'>
        <InputRow.Label error={errors.currency}>Currency</InputRow.Label>
        <InputRow.SelectOption
          value={currency}
          name='currency'
          onChange={onFieldChange}
          options={[
            { label: 'USD - United States Dollar', value: 'USD' }
          ]}
        />
      </InputRow>
      <InputRow>
        <InputRow.Label
          error={errors.productExpirationDays}
          notes='Number of days digital download links will be available to your customers after purchase.'
        >
          Digital Product Expiration (Days)

        </InputRow.Label>
        <InputRow.SelectOption
          value={productExpirationDays}
          name='productExpirationDays'
          onChange={onFieldChange}
          options={[
            { label: '24 hour', value: 24 },
            { label: '2 days', value: 2 * 24 },
            { label: '3 days', value: 3 * 24 },
            { label: '4 days', value: 4 * 24 },
            { label: '5 days', value: 5 * 24 },
            { label: '6 days', value: 6 * 24 },
            { label: '7 days', value: 7 * 24 }
          ]}
        />
      </InputRow>
    </MainBlock>
  );
};
const mapStateToProps = ({ user: { user }, settings: { generalModel: general } }) => ({ general, user });
export default connect(mapStateToProps, settingsActions)(GeneralSettings);
