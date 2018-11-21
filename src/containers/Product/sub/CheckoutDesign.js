import React, { Component } from 'react';
import common from 'components/common';
import TemplatePreview from 'components/Templates';
import Testimonials from 'components/Testimonials';
import temp_1_image from 'assets/images/checkout_templates/temp_1.jpg';
import temp_2_image from 'assets/images/checkout_templates/temp_2.jpg';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow, MainBlock } = common;


class CheckoutDesign extends Component {
  state = {
    isTermsEnabled: this.props.checkout.termsAndConditions,
    defaultTemplate: true,
    testimonials: {
      text: '',
      value: '',
      value: []
    }
  }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductCheckoutFieldChange({ name, value });
  }

  onProductImageUploaded = (image) => {
    console.log(image);
    this.props.onProductCheckoutFieldChange({ name: 'logo', value: image });
  }

  onTermsEnabled = () => {
    const isTermsEnabled = !this.state.isTermsEnabled;
    this.setState({ isTermsEnabled });

    this.props.onProductCheckoutFieldChange({
      name: 'termsAndConditions',
      value: { enabled: isTermsEnabled }
    });
  }

  onTermsChanges = ({ target: { value } }) => {
    this.props.onProductCheckoutFieldChange({
      name: 'termsAndConditions',
      value: { enabled: true, url: value }
    });
  }

  toggleTemplates = () => {
    this.setState({ defaultTemplate: !this.state.defaultTemplate });
    this.props.onProductCheckoutFieldChange({
      name: 'template',
      value: !this.state.defaultTemplate ? 'x' : 'y'
    });
  };

  onTestimonialsChange = (testimonials) => {
    this.props.onProductCheckoutFieldChange({
      name: 'testimonials',
      value: testimonials.map(({ text, image }) => ({ text, image })) || []
    });
  }

  onImageUploading = (name, image) => {
    this.props.onProductCheckoutFieldChange({
      name,
      value: image
    });
  }

  onPresentColorChange = (color) => {
    this.props.onProductCheckoutFieldChange({
      name: 'presentColors',
      value: color
    });
  }

  onBulletPointsChange = (points) => {
    this.props.onProductCheckoutFieldChange({ name: 'bulletPoints', value: points.map(({ value }) => value) });
  };

  render () {
    const { isTermsEnabled, bulletPoints } = this.state;
    const {
      guaranteeTitle, guaranteeText, checkoutButtonText, bulletPointsTitle, customContent, termsAndConditions = {}
    } = this.props.checkout;
    return (
      <React.Fragment key='checkout_design'>
        <MainBlock title='Template library' notes='Choose from a library of premade templates'>
          <form className='products-details-form inputs-grounp section-block flex-row-wrap'>
            <TemplatePreview active={this.state.defaultTemplate} image={temp_1_image} onSelect={this.toggleTemplates} />
            <TemplatePreview active={!this.state.defaultTemplate} image={temp_2_image} onSelect={this.toggleTemplates} />
          </form>
        </MainBlock>
        <MainBlock title='Customize your template'>
          <form className='products-details-form inputs-grounp section-block'>
            <InputRow>
              <InputRow.Label>Preset colors</InputRow.Label>
              <InputRow.ColorInlinePicker name='presetColors' onChange={this.onPresentColorChange}></InputRow.ColorInlinePicker>
            </InputRow>
            <InputRow>
              <InputRow.Label>Marketplace logo</InputRow.Label>
              <InputRow.AddImage
                onUploaded={(img) => this.onImageUploading('logo', img)}
                notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
                source='logo'
              >
                Add files

              </InputRow.AddImage>
            </InputRow>
            <InputRow>
              <InputRow.Label>Guarantee Title</InputRow.Label>
              <InputRow.NormalInput name='guaranteeTitle' value={guaranteeTitle} onChange={this.onFieldChange}></InputRow.NormalInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Guarantee Text</InputRow.Label>
              <InputRow.NormalInput name='guaranteeText' value={guaranteeText} onChange={this.onFieldChange}></InputRow.NormalInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Checkout Button Text</InputRow.Label>
              <InputRow.SmallInput name='checkoutButtonText' value={checkoutButtonText} onChange={this.onFieldChange}></InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Bullet Points Title</InputRow.Label>
              <InputRow.SmallInput name='bulletPointsTitle' value={bulletPointsTitle} onChange={this.onFieldChange}></InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Bullet Points</InputRow.Label>
              <InputRow.AddComponentField type='tags' onTagsChange={this.onBulletPointsChange} placeholder='Create a Bullet Points' value={bulletPoints}>Add Bullet Points</InputRow.AddComponentField>
            </InputRow>
            <InputRow>
              <InputRow.Label>Bullet Point Image</InputRow.Label>
              <InputRow.AddImage source='bulletPointImage' onUploaded={(img) => this.onImageUploading('bulletPointImage', img)}>Add image</InputRow.AddImage>
            </InputRow>
            <Testimonials onChange={this.onTestimonialsChange} />
            <InputRow>
              <InputRow.Label>Custom Content</InputRow.Label>
              <InputRow.TextAreaInput
                name='customContent' onChange={this.onFieldChange} value={customContent}
                description='Custom content appears at the top of sales letter and in the sidebar depending on your selected template.'
              />

            </InputRow>
            <InputRow margin='45'>
              <InputRow.Label
                notes='This requires customers to check that they agree to the terms and conditions.'
              >
                Terms & Conditions Checkbox

              </InputRow.Label>
              <InputRow.SwitchInput name='termsAndConditionsState' onToggle={this.onTermsEnabled} value={termsAndConditions.enabled}></InputRow.SwitchInput>
            </InputRow>
            {termsAndConditions.enabled && (
              <InputRow margin='45'>
                <InputRow.Label
                  name='termsAndConditions'
                  notes='This creates a link to your custom Terms & Conditions page below the Checkout Button on your SamCart checkout page.'
                >
                  Terms & Conditions URL

                </InputRow.Label>
                <InputRow.UrlInput prefix='http://' name='termsAndConditionsUrl' value={termsAndConditions.url} onChange={this.onTermsChanges}></InputRow.UrlInput>
              </InputRow>
            )}
          </form>


        </MainBlock>
      </React.Fragment>
    );
  }
}


const mapStateToProps = ({ product: { checkout } }) => ({ checkout });
export default connect(mapStateToProps, producActions)(CheckoutDesign);
