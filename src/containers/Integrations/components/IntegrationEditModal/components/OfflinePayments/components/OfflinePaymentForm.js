import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import { notification } from 'libs';
import { isFunction } from 'libs/checks';
const { FlexBox, InputRow, Button } = common;
const { Label, TextField, AddImage, TextAreaInput } = InputRow;

const descriptionNotes = 'These Details will be shown when your customer selects this payment methods as a choice of payment';
const OfflinePaymentForm = ({ service, onCloseFormMode, ...props }) => {
  const [fields, setFields] = useState({});
  const [loading, setLoading] = useState(false);

  const onChange = ({ target: { name, value } }) => {
    setFields({ ...fields, [name]: value });
  };

  const onSubmit = () => {
    setLoading(true);
    const { name, logo, notes } = fields;
    const payload = {
      details: {
        name,
        logo,
        notes,
        connected: true
      },
      integrationId: service._id
    };

    props.updateOfflinePaymentMethod(payload, {
      onSuccess: () => {
        notification.success('Updated SuccessFully');
        setLoading(false);
        onCancel();
      },
      onFailed: (msg) => {
        notification.failed(msg);
        setLoading(false);
      }
    });
  };

  const onLogoUploaded = (image) => {
    console.log({ image });
    onChange({
      target: {
        name: 'logo',
        value: image
      }
    });
  };

  useEffect(() => {
    if (typeof service === 'object') {
      const { name, logo, notes } = service;
      setFields({ name, logo, notes });
    }
  }, [service]);

  const onCancel = () => {
    if (isFunction(onCloseFormMode))
      onCloseFormMode();
  };


  return (
    <FlexBox column>
      <FlexBox center='v-center'>
        <Label>Method Name</Label>
        <TextField
          name='name'
          onChange={onChange}
          value={fields.name}
        />
      </FlexBox>
      <FlexBox center='v-center' className='my-4'>
        <Label>Method Logo</Label>
        <AddImage
          onUploaded={onLogoUploaded}
          value={fields.logo}
        />
      </FlexBox>
      <FlexBox>
        <Label notes={descriptionNotes} noteClassName='t-30'>Description</Label>
        <TextAreaInput
          name='notes'
          onChange={onChange}
          value={fields.notes}
        />
      </FlexBox>
      <FlexBox flex spaceBetween center='v-center'>
        <Button onClick={onCancel} className='px-4'>
          Cancel
        </Button>
        <Button onprogress={loading} onClick={onSubmit} className='primary-btn px-4'>
          Update
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

OfflinePaymentForm.propTypes = {};

export default connect(null, integrationsActions)(OfflinePaymentForm);
