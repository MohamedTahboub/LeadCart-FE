import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FaGripLines, FaTrash } from 'react-icons/fa';
import ids from 'shortid';
import { MdLaunch } from 'react-icons/md';
import update from 'immutability-helper';
import { contactLinksSchema, marketPlaceSettingSchema } from 'libs/validation';
import common from 'components/common';
import { DomainsSettings } from './components';
import * as settingsActions from 'actions/settings';
import { isObjectsEquivalent, notification } from 'libs';
import { getMarketPlaceUrl } from 'helpers/common';
import { BackendProvider, DragDropItem } from 'components/Draggable';
import { isFunction } from 'libs/checks';
import { useRef } from 'react';


const defaultCoverImage = 'https://assets.leadcart.io/static/media/marketPlace-bg.7356ad99.png';
const { InputRow, MainBlock, FlexBox, Button, ErrorMessage, DisplayContent } = common;
const { Label, TextField, AddImage } = InputRow;

const orderList = (list, current, target) => {
  const currentItem = list[current];
  if (!currentItem) return list;
  return update(list, {
    $splice: [
      [current, 1],
      [target, 0, currentItem]
    ]
  });
};

const useReorder = (initialList = [], onUpdateOccurs) => {
  const [list, setList] = useState(initialList);

  const onReorder = (currentIndex, targetIndex) => {
    const orderedList = orderList(list, currentIndex, targetIndex);
    setList(orderedList);
    if (isFunction(onUpdateOccurs)) onUpdateOccurs(orderedList);
  };
  useEffect(() => setList(initialList), [initialList]);

  return { list, onReorder };
};

const Header = ({ domains, subDomain }) => {
  const url = getMarketPlaceUrl({ domains, subDomain });

  const onCheckoutPreview = () => window.open(url, '_blank');

  return (
    <FlexBox className='v-center'>
      <p className='m-0 mr-4'>Marketplace Page Settings</p>
      <MdLaunch onClick={onCheckoutPreview} className='item-clickable checkout-previre-icon' size={18} />
    </FlexBox>
  );
};

const ContactLink = ({ label, value, id, index, onDeleteLink, onOrderChange, ...props }) => {

  return (
    <DragDropItem
      onOrderChange={onOrderChange}
      droppableProps={{ background: '#DDD' }}
      id={id}
      index={index}
      {...props}
      cardType='contact'
    >
      <FlexBox className='mb-2 v-center' >
        <FlexBox center='v-center' className='label-link'>
          <FaGripLines className='mr-3' color='gray' />
          <div className='width-100 truncate  bold-text'>{label}</div>
          <div className='width-200 truncate bold-text mx-2 link-value'>{value}</div>
        </FlexBox>
        <FaTrash size={14} onClick={onDeleteLink(value)} color='tomato' className='ml-2 item-clickable delete-link' />
      </FlexBox>
    </DragDropItem>
  );
};

const ContactLinksMenu = ({ links, onDeleteLink, onUpdateLinks }) => {
  const { list, onReorder } = useReorder(links, onUpdateLinks);

  return (
    <BackendProvider>
      <FlexBox>
        <FlexBox column>
          {Array.isArray(list) && list.map((link, index) => (
            <ContactLink
              {...link}
              key={`${link._id}-${link.value}`}
              index={index}
              onDeleteLink={onDeleteLink}
              onOrderChange={onReorder}
            />
          ))}
        </FlexBox>
      </FlexBox>
    </BackendProvider>
  );
};
const MarketplaceSettings = ({
  marketPlace,
  getSave,
  ...props
}) => {
  const { showPoweredBy = true, contactLinks = {}, domains = [], subDomain } = marketPlace;
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

    const isAlreadyExist = links.find(({ value }) => value === contactLinks.value);

    if (isAlreadyExist)
      return setContactLinksError({ label: 'The link URL already exist, make sure that your links are unique.' });

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

  const onDeleteLink = (linkUrl) => () => {
    const { layout: { links } = {} } = fields;

    setFields({
      ...fields,
      layout: {
        ...fields.layout,
        links: links.filter(({ value }) => value !== linkUrl) || []
      }
    });

    setErrors({ ...errors, maxLinksMsg: '' });
  };


  const onUpdateLinks = (links) => {
    setFields({ ...fields, layout: { ...fields.layout, links } });
  };

  return (
    <FlexBox column className='marketplace-settings-bg'>
      <MainBlock title={<Header domains={domains} subDomain={subDomain} />} containerClasses='transparent-white-bg'>
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


        <InputRow margin='50'>
          <Label
            error={errors.favicon}
            notes='format for the image you have chosen must be 16x16, 32x32 or 64x64  pixel'
          >
            Marketplace Favicon:
          </Label>

          <AddImage
            value={fields.favicon}
            subLabel='Logo'
            source='checkout-favicon'
            name='favicon'
            onUploaded={(image) => updateFields('favicon', image)}
          >
            Icon
          </AddImage>
        </InputRow>

        <FlexBox column>
          <Label error={errors.support}>Contact Links:</Label>

          <FlexBox className='mt-2 pl-3' column>
            <ContactLinksMenu
              links={fields.layout.links}
              onDeleteLink={onDeleteLink}
              onUpdateLinks={onUpdateLinks}
            />

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

                <Button onClick={onAddLink} className='p-2 primary-color px-3'>
                  <FlexBox className='v-center'>
                    Add Link
                  </FlexBox>
                </Button>
              </InputRow>
            </DisplayContent>

            <ErrorMessage>{errors.maxLinksMsg}</ErrorMessage>
            <ErrorMessage>{contactLinksError.label || contactLinksError.value}</ErrorMessage>
          </FlexBox>
        </FlexBox>
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
