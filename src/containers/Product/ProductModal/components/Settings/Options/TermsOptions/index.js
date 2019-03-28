import React from 'react';
import common from 'components/common'


const { InputRow } = common;

const TermsOptions = ({ url = '', onChange }) => {
  return (
    <div>
      <InputRow margin='45'>
        <InputRow.Label
          name='termsAndConditions'
          notes='This creates a link to your custom Terms & Conditions page below the Checkout Button on your SamCart checkout page.'
        >
          Terms & Conditions URL
        </InputRow.Label>
        <InputRow.UrlInput
          prefix='http://'
          name='termsAndConditions.url'
          value={url}
          onChange={onChange}
        />
      </InputRow>
    </div>
  );
};

export default TermsOptions;