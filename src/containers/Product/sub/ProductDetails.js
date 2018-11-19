import React, { Component } from 'react';
import common from 'components/common';
import PaymentType from 'components/PaymentType';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow, MainBlock } = common;

const ProductDetailes = (props) => {
  const {
    name, internalName, url, description, image, payment = {}, price = {}, tags, thanksUrl, productFiles
  } = props.productDetails;

  const onFieldChange = ({ target: { name, value } }) => {
    props.onProductDetailsFieldChange({ name, value });
  };

  const onPaymentChange = (payment) => {
    const { price: amount, ...paymentMethod } = payment;
    const casted = { type: paymentMethod.type };

    if (paymentMethod.type === 'Split') casted.splits = +(paymentMethod.splits) || 2;
    if (paymentMethod.type === 'Subscription') casted.recurringPeriod = paymentMethod.recurringPeriod || 'Monthly';

    props.onProductDetailsFieldChange({ name: 'price', value: { amount: +(amount) } });
    props.onProductDetailsFieldChange({ name: 'payment', value: casted });
  };

  const onProductImageUploaded = (image) => {
    console.log(image);
    props.onProductDetailsFieldChange({ name: 'image', value: image });
  };

  const onProductFilesAdd = (filesUrls) => {
    props.onProductDetailsFieldChange({ name: 'productFiles', value: filesUrls });
  };

  const onTagsChange = (tags) => {
    props.onProductDetailsFieldChange({ name: 'tags', value: tags });
  };

  return (
    <React.Fragment key={props.productDetails.url}>
      <MainBlock title='Details'>
        <form className='products-details-form inputs-grounp section-block'>
          <InputRow>
            <InputRow.Label>Product Name</InputRow.Label>
            <InputRow.NormalInput name='name' onChange={onFieldChange} value={name}>Product Name</InputRow.NormalInput>
          </InputRow>
          <InputRow>
            <InputRow.Label>Internal Product Name(Optional)</InputRow.Label>
            <InputRow.NormalInput name='internalName' onChange={onFieldChange} value={internalName}></InputRow.NormalInput>
          </InputRow>
          <InputRow>
            <InputRow.Label>URL</InputRow.Label>
            <InputRow.UrlSuffixInput name='url' onChange={onFieldChange} subdomain={props.subdomain} value={url}></InputRow.UrlSuffixInput>
          </InputRow>
          <InputRow>
            <InputRow.Label>Description</InputRow.Label>
            <InputRow.TextAreaInput name='description' onChange={onFieldChange} value={description}>Thiamounts is nimesil forte!</InputRow.TextAreaInput>
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

          <PaymentType type='' onChange={onPaymentChange} value={payment || {}} price={price ? price.amount : 0} />
          <InputRow>
            <InputRow.Label>Thank you Page URL</InputRow.Label>
            <InputRow.UrlInput name='thanksUrl' onTagsChange={onFieldChange} prefix='http://' value={thanksUrl} />
          </InputRow>
          <InputRow>
            <InputRow.Label>Product Tags</InputRow.Label>
            <InputRow.AddComponentField type='tags' onTagsChange={onTagsChange} value={tags}>Create tags</InputRow.AddComponentField>
          </InputRow>
        </form>
      </MainBlock>

      <MainBlock title='type'>
        <InputRow>
          <InputRow.Label>Type</InputRow.Label>
          <InputRow.CheckBox checked description='A digital file that buyers will download or a service.'>Digital / Service</InputRow.CheckBox>
          <InputRow.CheckBox classes={['hide-element']} description='A tangible item that you will ship to buyers.'>Phisical</InputRow.CheckBox>
        </InputRow>
        <InputRow>
          <InputRow.Label>Digital File (Optional)</InputRow.Label>
          <InputRow.AddComponentField
            value={productFiles}
            type='files' onProductFilesAdd={onProductFilesAdd}
            description='Files should be smaller than 100MB.
                We support: PDF, RAR, ZIP, and any image/audio/video format.'
          >
Add files

          </InputRow.AddComponentField>
        </InputRow>
      </MainBlock>

    </React.Fragment>
  );
};


const mapStateToProps = (state) => ({
  subdomain: state.user.user.subDomain,
  productDetails: state.product.details,
  errors: state.product.details.error,
});

export default connect(mapStateToProps, producActions)(ProductDetailes);
