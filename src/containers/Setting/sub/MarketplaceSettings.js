import React, { Fragment, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { marketPlaceSettingSchema } from 'libs/validation';
import common from 'components/common';
import { DomainsSettings } from './components';
import * as settingsActions from 'actions/settings';
import { notification } from 'libs';

const defaultCoverImage = 'https://assets.leadcart.io/static/media/marketPlace-bg.7356ad99.png';

const { InputRow, MainBlock } = common;

const MarketplaceSettings = ({
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
    <Fragment>
      <MainBlock title='Marketplace Page Settings'>
        <InputRow>
          <InputRow.Label error={errors.name}>Displayed Company Name:</InputRow.Label>
          <InputRow.TextField
            error={errors.layout && errors.layout.name}
            name='layout.name'
            value={fields.layout.name}
            onChange={onChange}
          />
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
          <InputRow.TextField
            name='supportEmail'
            notes='This will be shown in the marketplace navbar'
            placeholder='e.g. example.com/contact'
            onChange={onChange}
            value={fields.supportEmail}
          />
        </InputRow>
      </MainBlock>
      <DomainsSettings />
    </Fragment>
  );
};

MarketplaceSettings.propTypes = {};

const mapStateToProps = ({ settings: { generalModel: marketPlace } }) => ({ marketPlace });

MarketplaceSettings.propTypes = {
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
MarketplaceSettings.defaultProps = { marketPlace: { layout: { coverImage: defaultCoverImage } } };
export default connect(
  mapStateToProps,
  settingsActions
)(MarketplaceSettings);
