import React from 'react';
import common from 'components/common';

const { InputRow } = common;


export default (props) => (
  <InputRow>
    <InputRow.Label
      notes="Embed any custom scripts or HTML code in the footer of this product's checkout page."
    >
            Embed HTML/Scripts in Footer

    </InputRow.Label>
    <InputRow.CodeInputArea></InputRow.CodeInputArea>
  </InputRow>

);
