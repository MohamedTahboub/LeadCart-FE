import React from 'react';
import common from 'components/common';


const { InputRow } = common;

const TermsOptions = ({
  product: {
    checkoutPage: {
      termsAndConditions: { url, ...restTerms } = {}
    } = {}
  } = {}, ...props
}) => {
  const onChange = ({ target: { value } }) => {
    props.onChange({
      target: {
        name: 'checkoutPage.termsAndConditions',
        value: { ...restTerms, url: value }
      }
    });
  };
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
          onBlur={onChange}
        />
      </InputRow>
    </div>
  );
};

export default TermsOptions;
