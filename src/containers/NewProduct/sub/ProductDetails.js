import React, { Component } from 'react';
import common from 'components/common';

const { InputRow, MainBlock } = common;

class ProductDetailes extends Component {
  onFieldChange = (e) => {
    console.log('Input Changes');
    console.log(e.target.name, e.target.value);
  }

  onProductImageUploaded = (imageLink) => {
    console.log(imageLink);
  }

  render () {
    return (
      <React.Fragment>
        <MainBlock title='Details'>
          <form className='products-details-form inputs-grounp section-block'>
            <InputRow>
              <InputRow.Label>Product Name</InputRow.Label>
              <InputRow.NormalInput name='name' onChange={this.onFieldChange}>Tony Hawk</InputRow.NormalInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Internal Product Name(Optional)</InputRow.Label>
              <InputRow.NormalInput name='internalName' onChange={this.onFieldChange}></InputRow.NormalInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>URL</InputRow.Label>
              <InputRow.UrlSuffixInput name='url' onChange={this.onFieldChange}>http://tonyhawk.leadcart.com/products</InputRow.UrlSuffixInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Description</InputRow.Label>
              <InputRow.TextAreaInput name='description' onChange={this.onFieldChange}>This is nimesil forte!</InputRow.TextAreaInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Product Image</InputRow.Label>
              <InputRow.AddComponentField
                onUploaded={this.onProductImageUploaded}
                notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
                name='image'
              >
Add files

              </InputRow.AddComponentField>
            </InputRow>
            <InputRow>
              <InputRow.Label>Product Type</InputRow.Label>
              <InputRow.SelectOption
                name='paymentType' onChange={this.onFieldChange}
                options={[
                  { label: 'One Time Price', value: 0 },
                  { label: 'Subscription', value: 1 },
                  { label: 'Split Payments', value: 2 },
                ]}
              />
            </InputRow>
            <InputRow>
              <InputRow.Label>Price</InputRow.Label>
              <InputRow.PriceField currancy='$' name='price' onChange={this.onFieldChange}>1.99</InputRow.PriceField>
            </InputRow>
            <InputRow>
              <InputRow.Label>Thank you Page URL</InputRow.Label>
              <InputRow.UrlInput prefix='http://'></InputRow.UrlInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Product Tags</InputRow.Label>
              <InputRow.AddComponentField tags='sds'>Create tags</InputRow.AddComponentField>
            </InputRow>
          </form>
        </MainBlock>

        <MainBlock title='type'>
          <InputRow>
            <InputRow.Label>Type</InputRow.Label>
            <InputRow.CheckBox checked description='A digital file that buyers will download or a service.'>Digital / Service</InputRow.CheckBox>
            <InputRow.CheckBox description='A tangible item that you will ship to buyers.'>Phisical</InputRow.CheckBox>
          </InputRow>
          <InputRow>
            <InputRow.Label>Digital File (Optional)</InputRow.Label>
            <InputRow.AddComponentField
              description='Files should be smaller than 100MB.
                We support: PDF, RAR, ZIP, and any image/audio/video format.'
            >
Add files

            </InputRow.AddComponentField>
          </InputRow>
        </MainBlock>

      </React.Fragment>
    );
  }
}

export default ProductDetailes;
