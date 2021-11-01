import React, { useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';
import * as immutable from 'object-path-immutable';

import './style.css';
import { Title } from 'components/common/Titles';
import Toggle from 'components/common/Inputs/Toggle';
import AddImage from 'components/common/Inputs/AddImage';
import { createProductsTemplateSchema } from 'libs/validation';
import { connect } from 'react-redux';
import { createProductTemplate } from 'actions/product';

const {
  MainTitle,
  Button,
  FlexBox,
  InputRow
} = common;

const { Label, TextField } = InputRow;

const abstractTemplateFromProduct = (product) => {
  const {
    sections = [],
    internalName = '',
    shippingDetails = {},
    pageStyles = {},
    custom = {},
    thumbnail = ''
  } = product;
  return {
    sections,
    internalName,
    shippingDetails,
    pageStyles,
    custom,
    thumbnail
  };
};

const ShareTemplateModal = ({
  isVisible,
  onClose,
  product = {},
  createProductTemplate
}) => {

  const [fields, setFields] = useState({ screenshot: product?.thumbnail });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const onToggleLoading = () => setLoading((l) => !l);

  const onChange = ({ target: { name, value } }) => {
    const newFields = immutable.set(fields, name, value);
    setFields(newFields);
  };

  const onSubmit = async () => {
    const { isValid, value, errors } = await createProductsTemplateSchema({
      productId: product._id,
      type: product.category,
      layout: abstractTemplateFromProduct(product),
      ...fields
    });
    console.log({ product, isValid, errors });
    if (!isValid) {
      return setErrors({
        ...errors,
        message: ' please check your The Fields above'
      });
    }

    console.log({ template: value });
    onToggleLoading();
    createProductTemplate(value, {
      onSuccess: () => {
        // once created, close this modal,
        // fetch the details or provide is
        // via callback to the original modal to
        // be displayed
        onToggleLoading();
      },
      onFailed: () => {
        onToggleLoading();

      }
    });
  };


  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      className='sharing-modal'
      closeBtnClassName='scripts-modal-close-btn'
    >
      <FlexBox className='m-3' column>
        <Title>Share your {product.category} page as a template</Title>
        <FlexBox column>
          <FlexBox center='v-center' spaceBetween className='mb-2'>
            <Label >
              Name:
            </Label>
            <TextField
              name='name'
              onChange={onChange}
              value={fields.name}
              placeholder='Template Name'
            />
          </FlexBox>
          <FlexBox center='v-center' spaceBetween className='mb-5'>
            <Label notes='choose a unique handle to your template, this handle will be used to share your template'>
              Handle:
            </Label>
            <TextField
              name='handle'
              value={fields.handle}
              onChange={onChange}
              placeholder='Unique Handle'
            />
          </FlexBox>

          <FlexBox center='v-center' spaceBetween className='mb-4'>
            <Label

              notes={'Sync the product future changes with the template, when its on any future changes will be reflected on the template, so be carful.'}
            >
              Sync with the future changes:
            </Label>
            <Toggle
              onToggle={() => onChange({ target: { name: 'options.sync', value: !fields?.options?.sync } })}
              // beforeLabel='Enabled'
              // afterLabel='Disabled'
              value={fields?.options?.sync}
              className='mx-5 my-0'
            />
          </FlexBox>
          <FlexBox center='v-center' className='my-5'>
            <Label className='scripts-labels' notes='upload a good looking screenshot of your template'>
              Template screenshot
            </Label>
            <AddImage
              value={fields?.screenshot}
              onUploaded={(image) => onChange({ target: { name: 'screenshot', value: image } })}
            />
          </FlexBox>

          <FlexBox flexEnd>
            <Button
              className='light-btn'
              onClick={onSubmit}
              onprogress={loading}
              style={{ padding: '5px 20px' }}
            >
              Create a Template
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </Modal>
  );
};

ShareTemplateModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

ShareTemplateModal.defaultProps = { scripts: {} };

export default connect(null, { createProductTemplate })(ShareTemplateModal);
