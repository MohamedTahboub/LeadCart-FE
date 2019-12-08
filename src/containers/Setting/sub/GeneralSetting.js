import React, { Fragment, useState, useEffect } from 'react';
import common from 'components/common';
import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux';
import countriesList from 'data/countries';
import timeZonesList from 'data/timeZones';
import currencies from 'data/currencies.json';
import PropTypes from 'prop-types';
import { marketPlaceSettingSchema } from 'libs/validation';
import * as flashMessagesActions from 'actions/flashMessage';

import {
  DomainsSettings
} from './components'

const defaultCoverImage = 'https://assets.leadcart.io/static/media/marketPlace-bg.7356ad99.png';
const { InputRow, MainBlock, Button } = common;

const currenciesList = currencies.map((c) => ({ value: c.code, label: `${c.symbol} - ${c.name}` }));
const countries = countriesList.map(({ name: label, code: value }) => ({ label, value }));
const timeZones = timeZonesList.map(({ value }) => ({ label: value, value }));

const defaultTimeZone = timeZones.find(({ value }) => value.includes('Central America')).value;
const defaultCountry = countries.find(({ value }) => value === 'US').value;

const GeneralSettings = ({
  user: {
    email: userEmail
  },
  marketPlace,
  ...props
}) => {
  const [fields, setFields] = useState({ ...marketPlace });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFields(marketPlace);
  }, [marketPlace]);

  const updateFields = (name, value) => {
    if (name.includes('.')) {
      const [key, nestedKey] = name.split('.');
      const nestedValue = { [nestedKey]: value };
      name = key;
      value = { ...fields[key], ...nestedValue };
    }
    setFields({ ...fields, [name]: value });
  };

  const onChange = ({ target: { name, value } }) => {
    updateFields(name, value);
    setErrors({ [name]: '' });
  };

  const onSave = async () => {
    try {
      const { isValid, value: payload, errors: fieldsErrors } = await marketPlaceSettingSchema(fields);
      if (!isValid) {
        const invalidFields = Object.keys(fieldsErrors).join(', ');
        props.showFlashMessage({
          type: 'failed',
          message: `Invalid Fields ${invalidFields}`
        });
        return setErrors({ ...fieldsErrors });
      }

      props.updateMarketPlaceSettings(
        payload,
        {
          onSuccess: (m) => {
            props.showFlashMessage({
              type: 'success',
              message: 'Your Changes Saved Successfully'
            });
          },
          onFailed: (message) => {
            setErrors({ message });
            props.showFlashMessage({
              type: 'failed',
              message
            });
          }
        }
      );
    } catch ({ message, ...err }) {
      props.showFlashMessage({
        type: 'failed',
        message
      });
      setErrors({ message });
    }
  };

  return (
    <Fragment>
      <MainBlock
        title='General Brand Settings'
        blockHandel={(
          <Button onClick={onSave} className=' primary-color'>
            Save Changes
          </Button>
        )}
      >
        <InputRow>
          <InputRow.Label error={errors.name}>Company Name:</InputRow.Label>
          <InputRow.NormalInput
            error={errors.name}
            name='name'
            value={fields.name}
            onChange={onChange}
          >
          </InputRow.NormalInput>
        </InputRow>
        <InputRow>
          <InputRow.Label
            error={errors.logo}
            notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
          >
            Default Logo:

          </InputRow.Label>
          <InputRow.AddImage
            value={fields.logo}
            subLabel='Logo'
            source='company_logo'
            name='logo'
            onUploaded={(image) => updateFields('logo', image)}
          >
            Logo

          </InputRow.AddImage>
        </InputRow>
        <InputRow margin='42'>
          <InputRow.Label
            error={errors.country}
            notes='Select a country to be displayed as the default on your checkout pages. Your customers can always select a different country.'
          >
            Default Country:

          </InputRow.Label>
          <InputRow.SearchInput
            value={fields.country}
            options={countries}
            target='name'
            error={errors.country}
            name='country'
            defaultValue={defaultCountry}
            onChange={onChange}
          />

        </InputRow>
        <InputRow margin='35'>
          <InputRow.Label error={errors.timeZones}>Time Zone:</InputRow.Label>
          <InputRow.SearchInput
            defaultValue={defaultTimeZone}
            options={timeZones}
            value={fields.timeZone}
            error={errors.timeZones}
            name='timeZone'
            onChange={onChange}
          />
        </InputRow>
        <InputRow margin='20'>
          <InputRow.Label error={errors.supportEmail}>Support Contact:</InputRow.Label>
          <InputRow.SmallInput
            name='supportEmail'
            onChange={onChange}
            error={errors.supportEmail}
            value={fields.supportEmail}
          >
            Ex. support@leadcart.io

          </InputRow.SmallInput>
        </InputRow>
        <InputRow margin='20'>
          <InputRow.Label error={errors.currency}>Currency:</InputRow.Label>
          <InputRow.SearchInput
            // size='small'
            options={currenciesList}
            defaultValue={fields.currency}
            name='currency'
            onChange={onChange}
          />
        </InputRow>
        <InputRow>
          <InputRow.Label
            error={errors.subDomain}
            notes='Brand SubDomain'
          >
            Brand SubDomain:
        </InputRow.Label>
          <InputRow.TextField
            name='subDomain'
            onChange={onChange}
            error={errors.subDomain}
            value={fields.subDomain}
          />
        </InputRow>
      </MainBlock>
      <DomainsSettings />
      <MainBlock title='Marketplace Page Settings'>
        <InputRow>
          <InputRow.Label error={errors.name}>Displayed Company Name:</InputRow.Label>
          <InputRow.NormalInput
            error={errors.layout && errors.layout.name}
            name='layout.name'
            value={fields.layout.name}
            onChange={onChange}
          >
          </InputRow.NormalInput>
        </InputRow>
        <InputRow margin='40'>
          <InputRow.Label
            error={errors.layout && errors.layout.coverImage}
            notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
          >
            Background Image:

          </InputRow.Label>
          <InputRow.AddImage
            value={fields.layout.coverImage}
            subLabel='Logo'
            source='company_layout_coverImage'
            name='layout.coverImage'
            onUploaded={(image) => updateFields('layout.coverImage', image)}
          >
            Image

          </InputRow.AddImage>
        </InputRow>
        <InputRow>
          <InputRow.Label error={errors.support}>Contact Link:</InputRow.Label>
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

const mapStateToProps = ({
  user: { user },
  settings: { generalModel: marketPlace }
}) => ({
  marketPlace,
  user
});

GeneralSettings.propTypes = {
  user: PropTypes.objectOf({
    email: PropTypes.string.isRequired
  }),
  marketPlace: PropTypes.objectOf({
    layout: PropTypes.objectOf({
      name: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      links: PropTypes.arrayOf({
        label: PropTypes.string,
        url: PropTypes.string,
      }).isRequired
    }).isRequired,
  }),
  showFlashMessage: PropTypes.func.isRequired,
  updateMarketPlaceSettings: PropTypes.func.isRequired,
};
GeneralSettings.defaultProps = {
  marketPlace: {
    layout: {
      coverImage: defaultCoverImage
    }
  },
  user: {}
};
export default connect(
  mapStateToProps,
  {
    ...settingsActions,
    ...flashMessagesActions
  }
)(GeneralSettings);
