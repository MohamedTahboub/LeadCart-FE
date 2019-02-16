import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
const { InputRow } = common;


const AdvanceSetting = ({ onProductSettingsFieldChange, ...props }) => {
  const {
    checkOutPageRedirect,
    // maximumPurchases,
    // expiryDate,
    notificationUrl
  } = props;


  const onFieldChange = ({ target: { name, value } }) => {
    onProductSettingsFieldChange({ name, value });
  };
  return (
    <React.Fragment>
      <InputRow margin='45'>
        <InputRow.Label
          notes='An HTTP POST will be sent to this page every time an order is made, canceled or refunded for this product.'
        >
          Notification URL
        </InputRow.Label>
        <InputRow.UrlInput
          name='notificationUrl'
          onChange={onFieldChange}
          value={notificationUrl}
          prefix='http://'
        />
      </InputRow>
      <InputRow margin='45'>
        <InputRow.Label
          notes='If entered, visiting the checkout page will redirect to the URL specified. Must start with http:// or https://'
        >
          Checkout page redirect

        </InputRow.Label>
        <InputRow.UrlInput
          name='checkOutPageRedirect'
          onChange={onFieldChange}
          value={checkOutPageRedirect}

          prefix='http://'
        />
      </InputRow>
      <InputRow>
        <InputRow.Label>Close Checkout After # of Purchases</InputRow.Label>
        <InputRow.SwitchInput>
        </InputRow.SwitchInput>
      </InputRow>
      <InputRow>
        <InputRow.Label>Close Checkout After Date</InputRow.Label>
        <InputRow.SwitchInput></InputRow.SwitchInput>
      </InputRow>
    </React.Fragment>
  );
};
const mapStateToProps = ({ product: { settings } }) => ({ ...settings });
export default connect(mapStateToProps, producActions)(AdvanceSetting);
