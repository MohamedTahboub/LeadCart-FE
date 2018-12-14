import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow } = common;


const AfterPurchase = ({ onProductSettingsFieldChange, postOrderScript }) => {
  const onFieldChange = ({ target: { name, value } }) => {
    onProductSettingsFieldChange({ name, value });
  };

  return (
    <InputRow>
      <InputRow.Label
        notes="Embed any custom scripts or HTML code in the footer of this product's order summary page or just prior to a custom thank you page."
      >
        Fire pixels/scripts after an order is completed
      </InputRow.Label>
      <InputRow.CodeInputArea
        name='postOrderScript'
        onChange={onFieldChange}
        value={postOrderScript}
      />
    </InputRow>
  );
};

const mapStateToProps = ({ product: { settings } }) => ({ ...settings });
export default connect(mapStateToProps, producActions)(AfterPurchase);
