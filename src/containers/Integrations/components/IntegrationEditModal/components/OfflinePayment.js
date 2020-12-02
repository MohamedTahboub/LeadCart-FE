import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';
import { connect } from 'react-redux';
import * as integrationsActions from 'actions/integrations';
import { notification } from 'libs';
const { FlexBox, InputRow, Button } = common;
const { Label, TextField, AddImage, TextAreaInput } = InputRow;

const descriptionNotes = 'These Details will be shown when your customer selects this payment methods as a choice of payment';
const OfflinePayment = ({ service, ...props }) => {
  const [fields, setFields] = useState({});

  const onChange = ({ target: { name, value } }) => {
    setFields({ ...fields, [name]: value });
  };

  const onSubmit = () => {
    if (service._id)
      alert('UPDATE OFFLINE PAYMENT');


    props.addOfflinePaymentMethod(fields, {
      onSuccess: () => {
        notification.success('Updated SuccessFully');
      },
      onFailed: (msg) => {
        notification.failed(msg);
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
      <FlexBox flex flexEnd>
        <Button onClick={onSubmit} className='primary-btn px-4'>
          Save
        </Button>
      </FlexBox>
    </FlexBox>
  );
};

OfflinePayment.propTypes = {};

export default connect(null, integrationsActions)(OfflinePayment);
