import React, { Component } from 'react';
import common from 'components/common'
import TemplatePreview from 'components/Templates'
const { InputRow, MainBlock } = common


//ColorInlinePicker
export default props => (
    <React.Fragment>
        <MainBlock title='Template library' notes='Choose from a library of premade templates'>
            <form className='products-details-form inputs-grounp section-block flex-row-wrap'>
                <TemplatePreview active={true} />
                <TemplatePreview />
                <TemplatePreview />
            </form>
        </MainBlock>
        <MainBlock title='Customize your template' >
            <form className='products-details-form inputs-grounp section-block'>
                <InputRow>
                    <InputRow.Label>Preset colors</InputRow.Label>
                    <InputRow.ColorInlinePicker></InputRow.ColorInlinePicker>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Marketplace logo</InputRow.Label>
                    <InputRow.AddComponentField
                        notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'>
                        Add Files
                </InputRow.AddComponentField>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Guarantee Title</InputRow.Label>
                    <InputRow.NormalInput></InputRow.NormalInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Guarantee Text</InputRow.Label>
                    <InputRow.NormalInput></InputRow.NormalInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Checkout Button Text</InputRow.Label>
                    <InputRow.SmallInput></InputRow.SmallInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Bullet Points Title</InputRow.Label>
                    <InputRow.SmallInput></InputRow.SmallInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Bullet Points</InputRow.Label>
                    <InputRow.AddComponentField>Add bullet point</InputRow.AddComponentField>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Bullet Point Image</InputRow.Label>
                    <InputRow.AddComponentField>Add image</InputRow.AddComponentField>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Testimonial</InputRow.Label>
                    <InputRow.SmallInput></InputRow.SmallInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label>Testimonial Iamge</InputRow.Label>
                    <InputRow.AddComponentField>Add image</InputRow.AddComponentField>
                </InputRow>
                <InputRow.AddComponentField style={'green-color'} >New testimonial</InputRow.AddComponentField>

                <InputRow>
                    <InputRow.Label>Custom Content</InputRow.Label>
                    <InputRow.TextAreaInput
                        description='Custom content appears at the top of sales letter and in the sidebar depending on your selected template.'
                    >This is nimesil forte!</InputRow.TextAreaInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label
                        description='This requires customers to check that they agree to the terms and conditions.'
                    >Terms & Conditions Checkbox</InputRow.Label>
                    <InputRow.SwitchInput></InputRow.SwitchInput>
                </InputRow>
                <InputRow>
                    <InputRow.Label
                        description='This creates a link to your custom Terms & Conditions page below the Checkout Button on your SamCart checkout page.'
                    >Terms & Conditions URL</InputRow.Label>
                    <InputRow.UrlInput prefix={'http://'}></InputRow.UrlInput>
                </InputRow>
            </form>


        </MainBlock>
    </React.Fragment >
)