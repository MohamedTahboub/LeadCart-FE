import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';
import common from 'components/common';


const { InputRow } = common;


const MandatoryDetails = ({
  errors, productDetails: {
    name, internalName, image, url, description
  }, subdomain, ...props
}) => {
  const onFieldChange = ({ target: { name, value } }) => {
    props.onProductDetailsFieldChange({ name, value });
  };
  const onProductImageUploaded = (image) => {
    props.onProductDetailsFieldChange({ name: 'image', value: image });
  };
  return (
    <Fragment>
      <InputRow>
        <InputRow.Label error={errors.name}>Product Name</InputRow.Label>
        <InputRow.NormalInput error={errors.name} name='name' onChange={onFieldChange} value={name}>Product Name</InputRow.NormalInput>
      </InputRow>
      <InputRow>
        <InputRow.Label>Internal Product Name(Optional)</InputRow.Label>
        <InputRow.NormalInput name='internalName' onChange={onFieldChange} value={internalName}></InputRow.NormalInput>
      </InputRow>
      <InputRow>
        <InputRow.Label error={errors.url}>URL</InputRow.Label>
        <InputRow.UrlSuffixInput
          error={errors.url} name='url' onChange={onFieldChange} subdomain={subdomain}
          value={url}
        >
        </InputRow.UrlSuffixInput>
      </InputRow>
      <InputRow>
        <InputRow.Label error={errors.description}>Description</InputRow.Label>
        <InputRow.TextAreaInput error={errors.description} name='description' onChange={onFieldChange} value={description}>Thiamounts is nimesil forte!</InputRow.TextAreaInput>
      </InputRow>
      <InputRow>
        <InputRow.Label>Product Image</InputRow.Label>
        <InputRow.AddImage
          value={image}
          source='product_image'
          onUploaded={onProductImageUploaded}
          notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
          name='image'
        >
Add files

        </InputRow.AddImage>
      </InputRow>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  subdomain: state.user.user.subDomain,
  productDetails: state.product.mandatoryDetails,
  errors: state.product.mandatoryDetails.error,
});

export default connect(mapStateToProps, producActions)(MandatoryDetails);
