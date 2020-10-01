import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';
import ids from 'shortid';

import { contactLinksSchema, marketPlaceSettingSchema } from 'libs/validation';
import common from 'components/common';
import { DomainsSettings } from './components';
import * as settingsActions from 'actions/settings';
import { notification } from 'libs';

const defaultCoverImage = 'https://assets.leadcart.io/static/media/marketPlace-bg.7356ad99.png';
const { InputRow, MainBlock, FlexBox, Button, ErrorMessage, DisplayContent } = common;
const { Label, TextField, AddImage, Toggle } = InputRow;

const MarketplaceSettings = ({
  marketPlace,
  getSave,
  ...props
}) => {
  const { showPoweredBy = true, contactLinks = {} } = marketPlace;
  const [fields, setFields] = useState({ contactLinks, ...marketPlace });
  const [errors, setErrors] = useState({});
  const [contactLinksError, setContactLinksError] = useState({});

  const showContactsLinks = fields.layout?.links?.length < 6;

  useEffect(() => {
    setFields({ ...marketPlace, showPoweredBy, contactLinks });
  }, [marketPlace, showPoweredBy]);


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

  const onLinksFieldsChange = ({ target: { name, value } }) => {
    onChange({ target: { name, value } });
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


  const onAddLink = async () => {
    const { layout: { links = [] } = {}, contactLinks } = fields;
    const lastLink = fields.layout?.links?.length === 5;
    const maxLinksMsg = lastLink && 'You can only add six links/emails to contact';

    const { isValid, value, errors } = await contactLinksSchema(contactLinks);

    if (isValid) {
      setFields({
        ...fields,
        layout: {
          ...fields.layout,
          links: [
            ...links, { ...value, _id: ids.generate() }]
        },
        contactLinks: {}
      });
      setContactLinksError({});
      setErrors({ ...errors, maxLinksMsg });
      setTimeout(() => {
        setErrors({ ...errors, maxLinksMsg: '' });
      }, 10000);
    } else {
      setContactLinksError(errors);
    }
  };

  const onDeleteLink = (linkId) => () => {
    const { layout: { links } = {} } = fields;

    setFields({
      ...fields,
      layout: {
        ...fields.layout,
        links: links.filter(({ _id }) => _id !== linkId) || []
      }
    });

    setErrors({ ...errors, maxLinksMsg: '' });
  };


  return (
    <FlexBox column className='marketplace-settings-bg'>
      <MainBlock title='Marketplace Page Settings' containerClasses='transparent-white-bg'>
        <InputRow>
          <Label error={errors.name}>Displayed Company Name:</Label>
          <TextField
            error={errors.layout && errors.layout.name}
            name='layout.name'
            value={fields.layout.name}
            onChange={onChange}
          />
        </InputRow>

        <InputRow margin='40'>
          <Label
            error={errors.layout && errors.layout.coverImage}
            notes='Image should be smaller than 2MB, and in either JPG, PNG, or GIF format.'
          >
            Background Image:
          </Label>

          <AddImage
            value={fields.layout.coverImage}
            subLabel='Logo'
            source='company_layout_coverImage'
            name='layout.coverImage'
            onUploaded={(image) => updateFields('layout.coverImage', image)}
          >
            Image
          </AddImage>
        </InputRow>

        <FlexBox column>
          <Label error={errors.support}>Contact Links:</Label>

          <FlexBox className='mt-2 pl-3' column>
            <FlexBox column>
              {fields.layout.links && fields.layout.links.map(({ label, value, _id }) => (
                <FlexBox className='mb-2 v-center' key={_id}>
                  <div className='width-100 truncate  bold-text label-link'>{label}</div>
                  <div className='width-200 truncate bold-text mx-2'>{value}</div>
                  <FaTrash onClick={onDeleteLink(_id)} color='tomato' className='item-clickable delete-link' />
                </FlexBox>
              ))}
            </FlexBox>

            <DisplayContent hide={!showContactsLinks}>
              <InputRow >
                <TextField
                  name='contactLinks.label'
                  notes='This will be shown in the marketplace navbar'
                  placeholder='Label'
                  onChange={onLinksFieldsChange}
                  value={fields.contactLinks.label}
                />

                <TextField
                  name='contactLinks.value'
                  notes='This will be shown in the marketplace navbar'
                  placeholder='Link'
                  onChange={onLinksFieldsChange}
                  value={fields.contactLinks.value}
                  className='mx-2'
                />

                <Button onClick={onAddLink} className='p-2 primary-color'>
                  <FlexBox className='v-center'>
                    Add Link
                  </FlexBox>
                </Button>
              </InputRow>
            </DisplayContent>

            <ErrorMessage>{errors?.maxLinksMsg}</ErrorMessage>
            <ErrorMessage>{contactLinksError.label || contactLinksError.value}</ErrorMessage>
          </FlexBox>
        </FlexBox>

        <InputRow>
          <Label error={errors.showPoweredBy}>Powered by Branding:</Label>
          <Toggle
            name='showPoweredBy'
            value={fields.showPoweredBy}
            onToggle={(target) => onChange({ target })}
            beforeLabel='Show'
            afterLabel='Hide'
          />
        </InputRow>
      </MainBlock>
      <DomainsSettings />
    </FlexBox>
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
