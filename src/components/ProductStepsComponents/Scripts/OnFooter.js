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
      <InputRow.Label
        notes="Embed any custom scripts or HTML code in the footer of this product's checkout page."
      >
        Embed HTML/Scripts in Footer

      </InputRow.Label>
      <InputRow.CodeInputArea
        name='footerScript'
        onChange={onFieldChange}
        value={footerScript}
      >
      </InputRow.CodeInputArea>
    </InputRow>

  );
};
const mapStateToProps = ({ product: { settings } }) => ({ ...settings });
export default connect(mapStateToProps, producActions)(FooterScript);

