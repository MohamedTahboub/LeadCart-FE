import React, { Fragment } from 'react';
import common from 'components/common';
import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux';
import countriesList from 'data/countries';
import timeZonesList from 'data/timeZones';
import currencies from 'data/currencies.json';


const { InputRow, MainBlock, DeleteButton } = common;

const currenciesList = currencies.map((c) => ({ value: c.code, label: `${c.symbol} - ${c.name}` }));
const countries = countriesList.map(({ name: label, code: value }) => ({ label, value }));
const timeZones = timeZonesList.map(({ value }) => ({ label: value, value }));

const defaultTimeZone = timeZones.find(({ value }) => value.includes('Central America')).value;
const defaultCountry = countries.find(({ value }) => value === 'US').value;

const GeneralSettings = ({ user: { email: userEmail }, ...props }) => {
  const {
    name,
    country,
    currency = 'USD',
    logo,
    supportEmail = userEmail,
    timeZone,
    errors
  } = props.general;
  const onFieldChange = ({ target: { name, value } }) => {
    props.onUserGeneralSettingsFieldUpdate({ name, value });
  };

  const onImageUpload = (name, value) => {
    props.onUserGeneralSettingsFieldUpdate({ name, value });
  };

  // console.log(props.general);
  return (
    <Fragment>
      <MainBlock title='General Brand Settings'>
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
            error={errors.logo}
            notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
          >
            Default Logo

          </InputRow.Label>
          <InputRow.AddImage
            value={logo}
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
            value={country}
            options={countries}
            target='name'
            error={errors.country}
            name='country'
            defaultValue={defaultCountry}
            onChange={onFieldChange}
          />

        </InputRow>
        <InputRow margin='35'>
          <InputRow.Label error={errors.timeZones}>Time Zone</InputRow.Label>
          <InputRow.SearchInput
            defaultValue={defaultTimeZone}
            options={timeZones}
            value={timeZone}
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
            value={supportEmail}
          >
            Ex. support@leadcart.io

          </InputRow.SmallInput>
        </InputRow>
        <InputRow margin='20'>
          <InputRow.Label error={errors.currency}>Currency</InputRow.Label>
          <InputRow.SearchInput
            // size='small'
            options={currenciesList}
            defaultValue={currency}
            name='currency'
            onChange={onFieldChange}
          />
        </InputRow>
      </MainBlock>

      <MainBlock title='Marketplace Interface Settings'>
        <InputRow>
          <InputRow.Label error={errors.name}>Displayed Company Name</InputRow.Label>
          <InputRow.NormalInput
            // error={errors.name}
            name='name'
            value={name}
            // onChange={onFieldChange}
          >
          </InputRow.NormalInput>
        </InputRow>
        <InputRow margin='40'>
          <InputRow.Label
            error={errors.logo}
            notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
          >
            Background Image

          </InputRow.Label>
          <InputRow.AddImage
            // value={logo}
            subLabel='Logo'
            source='company_logo'
            name='logo'
            onUploaded={(image) => { }}
          >
            Image

          </InputRow.AddImage>
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.support}>Contact Link</InputRow.Label>
          <InputRow.NormalInput
            name='supportEmail'
            notes='This will be shown in the marketplace navbar'
          // onChange={()=>{}}
          // error={errors.support}
          // value={supportEmail}
          >
            https://maydomain.com/contact
          </InputRow.NormalInput>
        </InputRow>

      </MainBlock>
    </Fragment>
  );
};
const mapStateToProps = ({ user: { user }, settings: { generalModel: general } }) => ({ general, user });
export default connect(mapStateToProps, settingsActions)(GeneralSettings);
