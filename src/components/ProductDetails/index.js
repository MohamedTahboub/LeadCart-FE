import React, { Component } from 'react';
// import { InputRow } from '../common/Inputs'
import common from '../common'

import './style.css'
const { InputRow, MainBlock } = common




class ProductDetailes extends Component {
    render() {
        return (
            <div className='products-details-page'>

                <div className='products-controls-btns'>
                    <span className='btn share-btn'>
                        <i class="fas fa-share-square"></i>Share Product
                    </span>
                    <span className='btn save-changes-btn'>
                        Save Changes
                    </span>
                </div>

                <div className='product-details-nav'>
                    <span className='nav-link active-nav-link'>Product Details</span>
                    <span className='nav-link'>Checkout Design</span>
                    <span className='nav-link'>Payments</span>
                    <span className='nav-link'>Order Bump</span>
                    <span className='nav-link'>Integration</span>
                    <span className='nav-link'>Advanced Setting</span>
                </div>
                <MainBlock title='Details'>
                    <form className='products-details-form inputs-grounp section-block'>
                        <InputRow>
                            <InputRow.Label>Product Name</InputRow.Label>
                            <InputRow.NormalInput>Tony Hawk</InputRow.NormalInput>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>Internal Product Name(Optional)</InputRow.Label>
                            <InputRow.NormalInput></InputRow.NormalInput>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>URL</InputRow.Label>
                            <InputRow.UrlSuffixInput>http://tonyhawk.leadcart.com/products</InputRow.UrlSuffixInput>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>Description</InputRow.Label>
                            <InputRow.TextAreaInput>This is nimesil forte!</InputRow.TextAreaInput>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>Product Image</InputRow.Label>
                            <InputRow.AddComponentField
                                notes='Image should be smaller than 2MB, 250 x 250 pixels in size, and in either JPG, PNG, or GIF format.'
                            >Add files</InputRow.AddComponentField>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>Product Type</InputRow.Label>
                            <InputRow.SelectOption>{[{ value: 1, label: 'One Time Price' }]}</InputRow.SelectOption>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>Price</InputRow.Label>
                            <InputRow.PriceField currancy='$' >1.99</InputRow.PriceField>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>Thank you Page URL</InputRow.Label>
                            <InputRow.UrlInput prefix={'http://'}></InputRow.UrlInput>
                        </InputRow>
                        <InputRow>
                            <InputRow.Label>Product Tags</InputRow.Label>
                            <InputRow.AddComponentField tags={'sds'}>Create tags</InputRow.AddComponentField>
                        </InputRow>
                    </form>
                </MainBlock>

                <MainBlock title='type'>
                    <InputRow>
                        <InputRow.Label>Type</InputRow.Label>
                        <InputRow.CheckBox description="A digital file that buyers will download or a service." >Digital / Service</InputRow.CheckBox>
                        <InputRow.CheckBox description="A tangible item that you will ship to buyers." >Phisical</InputRow.CheckBox>
                    </InputRow>
                    <InputRow>
                        <InputRow.Label>Digital File (Optional)</InputRow.Label>
                        <InputRow.AddComponentField
                        description="Files should be smaller than 100MB.
                        We support: PDF, RAR, ZIP, and any image/audio/video format."
                        >Add files</InputRow.AddComponentField>
                    </InputRow>
                </MainBlock>
            </div>
        );
    }
}

export default ProductDetailes;