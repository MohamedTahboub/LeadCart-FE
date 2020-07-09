import React, { Fragment } from 'react';
import common from 'components/common';

const {
  FlexBox,
  InputRow,
  Note

} = common;
const { Label, TextField, TextAreaInput } = InputRow;

const ManualFulfillment = ({
  onChange,
  fulfillmentMeta: {
    serviceName,
    description
  } = {}
}) => (
  <FlexBox column>
    <Note
      showOnce
      referenceLink='https://help.leadcart.io'
      className='mx-auto'
    >
        We need the service information so that it can be accessible
        by your customers when they purchase from you.
    </Note>
    <InputRow>
      <Label>
          Service Name:
      </Label>
      <TextField
        name='action.metaData.fulfillmentData.serviceName'
        onChange={onChange}
        value={serviceName}
      />
    </InputRow>
    <InputRow>
      <Label>
          Service Description:
      </Label>
      <TextAreaInput
        name='action.metaData.fulfillmentData.description'
        onChange={onChange}
        value={description}
      />
    </InputRow>
  </FlexBox>
);

export default ManualFulfillment;
