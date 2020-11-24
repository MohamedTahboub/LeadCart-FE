import React from 'react';
import PropTypes from 'prop-types';
import common from 'components/common';

const { FlexBox, InputRow } = common;
const { Label, TextField, AddImage, TextAreaInput } = InputRow;

const descriptionNotes = 'These Details will be shown when your customer selects this payment methods as a choice of payment';
const OfflinePayment = (props) => {
  return (
    <FlexBox column>
      <FlexBox center='v-center'>
        <Label>Method Name</Label>
        <TextField />
      </FlexBox>
      <FlexBox center='v-center' className='my-4'>
        <Label>Method Name</Label>
        <AddImage />
      </FlexBox>
      <FlexBox>
        <Label notes={descriptionNotes} noteClassName='t-30'>Description</Label>
        <TextAreaInput />
      </FlexBox>
    </FlexBox>
  );
};

OfflinePayment.propTypes = {};

export default OfflinePayment;
