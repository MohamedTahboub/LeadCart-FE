import React, { Fragment } from 'react';
import common from 'components/common';

const {
  FlexBox,
  InputRow,
  Note

} = common;
const { Label, NormalInput, TextAreaInput } = InputRow;

const ManualFulfillment = ({
  onChange,
  serviceName,
  description
}) => (
  <FlexBox column>
    <Note
      referenceLink='https://help.leadcart.io'
    >
                We need few information about the service so that
                we can send it to your customers when they purchase
                from you, we will send these fields in the receipts
                order details by email.
    </Note>
    <InputRow>
      <Label>
                    Service Name:
      </Label>
      <NormalInput
        name='metaData.serviceName'
        onChange={onChange}
        value={serviceName}
        error={serviceName}
      />
    </InputRow>
    <InputRow>
      <Label>
                    Service Description:
      </Label>
      <TextAreaInput
        name='metaData.description'
        className='service-description-textarea'
        onChange={onChange}
        value={description}
        error={description}
      />
    </InputRow>
  </FlexBox>
);

export default ManualFulfillment;
