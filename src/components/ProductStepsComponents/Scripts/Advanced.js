import React from 'react';
import common from 'components/common';

const { InputRow, MainBlock } = common;


export default (props) => (
  <React.Fragment>
    <InputRow margin='45'>
      <InputRow.Label

        notes='An HTTP POST will be sent to this page every time an order is made, canceled or refunded for this product.'
      >
                Notification URL

      </InputRow.Label>
      <InputRow.UrlInput prefix='http://'></InputRow.UrlInput>
    </InputRow>
    <InputRow margin='45'>
      <InputRow.Label
        notes='If entered, visiting the checkout page will redirect to the URL specified. Must start with http:// or https://'
      >
                Checkout page redirect

      </InputRow.Label>
      <InputRow.UrlInput prefix='http://'></InputRow.UrlInput>
    </InputRow>
    <InputRow>
      <InputRow.Label>Close Checkout After # of Purchases</InputRow.Label>
      <InputRow.SwitchInput></InputRow.SwitchInput>
    </InputRow>
    <InputRow>
      <InputRow.Label>Close Checkout After Date</InputRow.Label>
      <InputRow.SwitchInput></InputRow.SwitchInput>
    </InputRow>
  </React.Fragment>
);
