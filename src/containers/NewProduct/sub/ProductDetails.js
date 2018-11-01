import React, { Component } from 'react';
import common from 'components/common';
import PaymentType from 'components/PaymentType';
const { InputRow, MainBlock } = common;

class ProductDetailes extends Component {
  state = {
    details: {}
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.setState({
      details: {
        ...this.state.details,
        [name]: value
      }
    });
    setTimeout(() => {
      // console.log(this.state.details);
    }, 200);
  }

  onPaymentChange = (payment) => {
    this.setState({
      details: {
        ...this.state.details,
        payment
      }
    });
  }

  onProductImageUploaded = (imageLink) => {
    // console.log(imageLink);
  }

  componentDidUpdate = () => this.props.onChange(this.state)

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
                type='file'
                onUploaded={this.onProductImageUploaded}
                notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
                name='image'
              >
Add files

              </InputRow.AddComponentField>
            </InputRow>

            <PaymentType type='' onChange={this.onPaymentChange} />
            <InputRow>
              <InputRow.Label>Thank you Page URL</InputRow.Label>
              <InputRow.UrlInput prefix='http://'></InputRow.UrlInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Product Tags</InputRow.Label>
              <InputRow.AddComponentField tags={[]} type='tags'>Create tags</InputRow.AddComponentField>
            </InputRow>
          </form>
        </MainBlock>

        <MainBlock title='type'>
          <InputRow>
            <InputRow.Label>Type</InputRow.Label>
            <InputRow.CheckBox checked description='A digital file that buyers will download or a service.'>Digital / Service</InputRow.CheckBox>
            <InputRow.CheckBox disabled description='A tangible item that you will ship to buyers.'>Phisical</InputRow.CheckBox>
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
