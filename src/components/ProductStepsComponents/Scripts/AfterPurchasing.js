import React from 'react';
import common from 'components/common';

const { InputRow } = common;


export default (props) => (
  <InputRow>
    <InputRow.Label
      notes="Embed any custom scripts or HTML code in the footer of this product's order summary page or just prior to a custom thank you page."
    >
Fire pixels/scripts after an order is completed

    </InputRow.Label>
    <InputRow.CodeInputArea></InputRow.CodeInputArea>
  </InputRow>
);
