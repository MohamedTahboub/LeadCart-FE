import React, { Component } from 'react';
import common from 'components/common';
import TemplatePreview from 'components/Templates';
import temp_1_image from 'assets/images/checkout_templates/temp_1.jpg';
import temp_2_image from 'assets/images/checkout_templates/temp_2.jpg';
import { connect } from 'react-redux';
import * as producActions from 'actions/product';

const { InputRow, MainBlock } = common;

// ColorInlinePicker

/*
{
	"productId":"5bd58adc7a4287eb643a9baa",
	"checkoutDetails":{
		"template":"x",
		"presetColors":"presetColors",
		"logo":"logo",
		"guaranteeTitle":"guaranteeTitle",
		"guaranteeText":"guaranteeText",
		"checkoutButtonText":"checkoutButtonText",
		"bulletPointsTitle":"bulletPointsTitle",
		"bulletPoints":["bulletPoints"],
		"bulletPointImage":"bulletPointImage",
		"termsAndConditions":{
			"enabled":false
		},
		"testimonials":[{"text":"text","image":"image"},{"text":"text","image":"image"}],
		"customContent":"customContent"
	}

}
*/
class CheckoutDesign extends Component {
  state = { isTermsEnabled: false }

  onFieldChange = ({ target: { name, value } }) => {
    this.props.onProductCheckoutFieldChange({ name, value });
  }

  onProductImageUploaded = (image) => {
    console.log(image);
    this.props.onProductCheckoutFieldChange({ name: 'logo', value: image });
  }

  onTermsEnabled = () => {
    console.log('terms toggled');
    this.setState({ isTermsEnabled: !this.state.isTermsEnabled });
  }

  render () {
    return (
      <React.Fragment key={Date.now()}>
        <MainBlock title='Template library' notes='Choose from a library of premade templates'>
          <form className='products-details-form inputs-grounp section-block flex-row-wrap'>
            <TemplatePreview active image={temp_1_image} />
            <TemplatePreview image={temp_2_image} />
          </form>
        </MainBlock>
        <MainBlock title='Customize your template'>
          <form className='products-details-form inputs-grounp section-block'>
            <InputRow>
              <InputRow.Label>Preset colors</InputRow.Label>
              <InputRow.ColorInlinePicker name='presetColors'></InputRow.ColorInlinePicker>
            </InputRow>
            <InputRow>
              <InputRow.Label>Marketplace logo</InputRow.Label>
              <InputRow.AddComponentField
                type='file'
                onUploaded={this.onProductImageUploaded}
                notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
                name='logo'
              >
                Add files

              </InputRow.AddComponentField>
            </InputRow>
            <InputRow>
              <InputRow.Label>Guarantee Title</InputRow.Label>
              <InputRow.NormalInput name='guaranteeTitle' onChange={this.onFieldChange}></InputRow.NormalInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Guarantee Text</InputRow.Label>
              <InputRow.NormalInput name='guaranteeText' onChange={this.onFieldChange}></InputRow.NormalInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Checkout Button Text</InputRow.Label>
              <InputRow.SmallInput name='checkoutButtonText' onChange={this.onFieldChange}></InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Bullet Points Title</InputRow.Label>
              <InputRow.SmallInput name='bulletPointsTitle' onChange={this.onFieldChange}></InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Bullet Points</InputRow.Label>
              <InputRow.AddComponentField name='bulletPoints'>Add bullet point</InputRow.AddComponentField>
            </InputRow>
            <InputRow>
              <InputRow.Label>Bullet Point Image</InputRow.Label>
              <InputRow.AddComponentField name='bulletPointImage'>Add image</InputRow.AddComponentField>
            </InputRow>
            <InputRow>
              <InputRow.Label>Testimonial</InputRow.Label>
              <InputRow.SmallInput name='url' onChange={this.onFieldChange}></InputRow.SmallInput>
            </InputRow>
            <InputRow>
              <InputRow.Label>Testimonial Iamge</InputRow.Label>
              <InputRow.AddComponentField>Add image</InputRow.AddComponentField>
            </InputRow>
            <InputRow.AddComponentField color='green-color' name='testimonials'>New testimonial</InputRow.AddComponentField>

            <InputRow>
              <InputRow.Label>Custom Content</InputRow.Label>
              <InputRow.TextAreaInput
                name='customContent' onChange={this.onFieldChange}
                description='Custom content appears at the top of sales letter and in the sidebar depending on your selected template.'
              />

            </InputRow>
            <InputRow margin='45'>
              <InputRow.Label
                notes='This requires customers to check that they agree to the terms and conditions.'
              >
                Terms & Conditions Checkbox

              </InputRow.Label>
              <InputRow.SwitchInput name='termsAndConditionsState' onToggle={this.onTermsEnabled} value={this.state.isTermsEnabled}></InputRow.SwitchInput>
            </InputRow>
            {this.state.isTermsEnabled && (
              <InputRow margin='45'>
                <InputRow.Label
                  name='termsAndConditions'
                  notes='This creates a link to your custom Terms & Conditions page below the Checkout Button on your SamCart checkout page.'
                >
                  Terms & Conditions URL

                </InputRow.Label>
                <InputRow.UrlInput prefix='http://' name='termsAndConditionsUrl' onChange={this.onFieldChange}></InputRow.UrlInput>
              </InputRow>
            )}
          </form>


        </MainBlock>
      </React.Fragment>
    );
  }
}


const mapStateToProps = (state) => ({ state });
export default connect(mapStateToProps, producActions)(CheckoutDesign);
