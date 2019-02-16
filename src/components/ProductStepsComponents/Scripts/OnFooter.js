import React from 'react';
import common from 'components/common';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow } = common;


const FooterScript = ({ onProductSettingsFieldChange, footerScript }) => {
  const onFieldChange = ({ target: { name, value } }) => {
    onProductSettingsFieldChange({ name, value });
  };
  return (
    <InputRow>
      <InputRow.Label>
        Paste Your Facebook Pixel ID
      </InputRow.Label>
      <InputRow.NormalInput
        children='Ex. 254179138569861'
        name='fbPixelId'
        onChange={onFieldChange}
        value={footerScript}
      />
    </InputRow>

  );
};
const mapStateToProps = ({ product: { settings } }) => ({ ...settings });
export default connect(mapStateToProps, producActions)(FooterScript);

// notes="Embed any custom scripts or HTML code in the footer of this product's checkout page."
