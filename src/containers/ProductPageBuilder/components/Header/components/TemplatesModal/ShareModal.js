import React, { useEffect, useState } from 'react';
import { Modal } from 'components/Modals';
import common from 'components/common';
import PropTypes from 'prop-types';
import * as immutable from 'object-path-immutable';

import './style.css';
import Toggle from 'components/common/Inputs/Toggle';
import AddImage from 'components/common/Inputs/AddImage';
import { createProductsTemplateSchema, updateProductsTemplateSchema } from 'libs/validation';
import { connect } from 'react-redux';
import { createProductTemplate, updateProductTemplate } from 'actions/product';
import { isFunction } from 'libs/checks';
import { notification, slugify } from 'libs';
import { HiShare } from 'react-icons/hi';
const {
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
  updateTemplateStatus,
  templateDetails = {},
  createProductTemplate,
  updateProductTemplate
}) => {

  const [fields, setFields] = useState(templateDetails);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const isEdit = Boolean(templateDetails.hasTemplate);

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

    if (!isValid) {
      return setErrors({
        ...errors,
        message: ' please check your The Fields above'
      });
    }

    onToggleLoading();
    createProductTemplate(value, {
      onSuccess: () => {
        // once created, close this modal,
        // fetch the details or provide is
        // via callback to the original modal to
        // be displayed
        onToggleLoading();
        onClose();
        isFunction(updateTemplateStatus) && updateTemplateStatus(value);
      },
      onFailed: (error) => {
        onToggleLoading();
        notification.failed(error);
      }
    });
  };

  const onUpdateTemplate = async () => {
    const { isValid, value, errors } = await updateProductsTemplateSchema({
      productId: product._id,
      details: {
        type: product.category,
        productId: product._id,
        layout: abstractTemplateFromProduct(product),
        ...fields
      }
    });
    if (!isValid) {
      console.log({ errors });
      return setErrors({
        ...errors,
        message: ' please check your The Fields above'
      });
    }

    onToggleLoading();
    updateProductTemplate(value, {
      onSuccess: () => {
        onToggleLoading();
        onClose();
        isFunction(updateTemplateStatus) && updateTemplateStatus(value?.details);
        notification.success('Template updated successfully!');
      },
      onFailed: (error) => {
        onToggleLoading();
        notification.failed(error);
      }
    });
  };

  useEffect(() => {
    if (!isEdit) {
      setFields({
        screenshot: product?.thumbnail,
        name: product?.name,
        handle: slugify(product.name)
      });
    } else {setFields(templateDetails);}

  }, [product, isEdit]);

  const onHandleChange = ({ target: { name, value } }) => {
    const handle = slugify(value);
    setFields({ ...fields, [name]: handle });
  };


  return (
    <Modal
      onClose={onClose}
      isVisible={isVisible}
      className='sharing-modal'
      closeBtnClassName='scripts-modal-close-btn'
    >
      <FlexBox className='m-3' column>
        <FlexBox center='v-center' style={{ borderBottom: '1px solid #eee', paddingBottom: 20, marginBottom: 20 }}>
          <HiShare size={20} color='currentColor' />
          <span style={{ fontSize: 20, fontWeight: 500, marginLeft: 10 }}>
            Share your {product.category} page as a template
          </span>
        </FlexBox>
        <FlexBox column>
          <FlexBox center='v-center' spaceBetween className='mb-2'>
            <Label >
              Template Name:
            </Label>
            <TextField
              name='name'
              onChange={onChange}
              value={fields.name}
              placeholder='Template Name'
              className='flex'
              style={{ width: '100%' }}
            />
          </FlexBox>
          <FlexBox center='v-center' spaceBetween className='mb-5'>
            <Label notes='choose a unique handle to your template, this handle will be used to share your template'>
              Template Handle:
            </Label>
            <TextField
              name='handle'
              value={fields.handle}
              onChange={onChange}
              onBlur={onHandleChange}
              placeholder='Unique Handle'
              className='flex'
              style={{ width: '100%' }}
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
            <Label
              className='scripts-labels'
              notes='upload a good looking screenshot of your template'
            >
              Template screenshot
            </Label>
            <AddImage
              value={fields?.screenshot}
              onUploaded={(image) => onChange({ target: { name: 'screenshot', value: image } })}
              className='screenshot-preview'
            />
          </FlexBox>
          <FlexBox center='h-center' className='my-2'>
            {errors.message && <span className='error-text'>{errors.message}</span>}
          </FlexBox>
          <FlexBox flexEnd>
            <Button
              className='light-btn'
              onClick={isEdit ? onUpdateTemplate : onSubmit}
              onprogress={loading}
              style={{ padding: '5px 20px' }}
            >
              {isEdit ? 'Update Template' : 'Create a Template from this product'}
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

export default connect(null, { createProductTemplate, updateProductTemplate })(ShareTemplateModal);
