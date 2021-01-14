import React, { useEffect, useState } from 'react';
import common from 'components/common';
import * as settingsActions from 'actions/settings';
import { connect } from 'react-redux';
import countriesList from 'data/countries';
import timeZonesList from 'data/timeZones';
import currencies from 'data/currencies.json';
import PropTypes from 'prop-types';
import { marketPlaceSettingSchema } from 'libs/validation';
import { notification } from 'libs';

const defaultCoverImage = 'https://assets.leadcart.io/static/media/marketPlace-bg.7356ad99.png';
const { InputRow, MainBlock } = common;
const { Label, TextField, AddImage, Toggle, SearchInput } = InputRow;

const currenciesList = currencies.map((c) => ({ value: c.code, label: `${c.symbol} - ${c.name}` }));
const countries = countriesList.map(({ name: label, code: value }) => ({ label, value }));
const timeZones = timeZonesList.map(({ value }) => ({ label: value, value }));

const defaultTimeZone = timeZones.find(({ value }) => value.includes('Central America')).value;
const defaultCountry = countries.find(({ value }) => value === 'US').value;

const GeneralSettings = ({
  marketPlace,
  getSave,
  ...props
}) => {
  const [fields, setFields] = useState({ ...marketPlace });
  const [errors, setErrors] = useState({});


  useEffect(() => {
    setFields(marketPlace);
  }, [marketPlace]);

  const updateFields = (_name, _value) => {
    let name = _name, value = _value;
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
        notification.failed(`Invalid Fields ${invalidFields}`);
        return setErrors({ ...fieldsErrors });
      }


      props.updateMarketPlaceSettings(
        payload,
        {
          onSuccess: () => {
            notification.success('Your Changes Saved Successfully');
          },
          onFailed: (message) => {
            setErrors({ message });
            notification.failed(message);
          }
        }
      );
    } catch ({ message, ...err }) {
      notification.failed(message);
      setErrors({ message });
    }
  };
  getSave({ onSave });
  return (
    <MainBlock title='General Brand Settings' containerClasses='marketplace-settings-bg'>
      <InputRow>
        <Label error={errors.name}>Company Name:</Label>
        <TextField
          error={errors.name}
          name='name'
          value={fields.name}
          onChange={onChange}
        />
      </InputRow>
      <InputRow>
        <Label
          error={errors.logo}
        >
          Default Logo:

        </Label>
        <AddImage
          value={fields.logo}
          subLabel='Logo'
          source='company_logo'
          name='logo'
          onUploaded={(image) => updateFields('logo', image)}
        >
          Logo

        </AddImage>
      </InputRow>
      <InputRow margin='42'>
        <Label
          error={errors.country}
        >
          Default Country:

        </Label>
        <SearchInput
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
        <Label error={errors.timeZones}>Time Zone:</Label>
        <SearchInput
          defaultValue={defaultTimeZone}
          options={timeZones}
          value={fields.timeZone}
          error={errors.timeZones}
          name='timeZone'
          onChange={onChange}
        />
      </InputRow>
      <InputRow margin='20'>
        <Label error={errors.supportEmail}>Support Contact:</Label>
        <TextField
          name='supportEmail'
          onChange={onChange}
          error={errors.supportEmail}
          value={fields.supportEmail}
          placeholder='e.g. support@leadcart.io'
        />
      </InputRow>
      <InputRow margin='20'>
        <Label error={errors.currency}>Default Currency:</Label>
        <SearchInput
          options={currenciesList}
          defaultValue={fields.currency}
          name='currency'
          onChange={onChange}
        />
      </InputRow>
      <InputRow>
        <Label
          error={errors.subDomain}
          notes='Brand SubDomain'
        >
          Brand SubDomain:
        </Label>
        <TextField
          name='subDomain'
          onChange={onChange}
          error={errors.subDomain}
          value={fields.subDomain}
        />
      </InputRow>
      <InputRow className='mt-4'>
        <Label error={errors.showPoweredBy}>LeadCart Branding:</Label>
        <Toggle
          name='showPoweredBy'
          value={fields.showPoweredBy}
          onToggle={(target) => onChange({ target })}
          beforeLabel='Show'
          afterLabel='Hide'
        />
      </InputRow>
    </MainBlock>
  );
};

const mapStateToProps = ({ settings: { generalModel: marketPlace } }) => ({ marketPlace });

GeneralSettings.propTypes = {
  user: PropTypes.objectOf({ email: PropTypes.string.isRequired }),
  marketPlace: PropTypes.objectOf({
    layout: PropTypes.objectOf({
      name: PropTypes.string.isRequired,
      coverImage: PropTypes.string.isRequired,
      links: PropTypes.arrayOf({
        label: PropTypes.string,
        url: PropTypes.string
      }).isRequired
    }).isRequired
  }),
  showFlashMessage: PropTypes.func.isRequired,
  updateMarketPlaceSettings: PropTypes.func.isRequired
};
GeneralSettings.defaultProps = { marketPlace: { layout: { coverImage: defaultCoverImage } } };
export default connect(
  mapStateToProps,
  settingsActions
)(GeneralSettings);
