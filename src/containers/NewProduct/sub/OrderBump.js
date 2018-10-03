import React, { Component } from 'react';
import common from 'components/common'

const { InputRow, MainBlock } = common




export default props => (
    <React.Fragment>
        <MainBlock title='Bump Offer'>
            <InputRow>
                <InputRow.Label>Do you want to set up a bump offer on this product?</InputRow.Label>
                <InputRow.SwitchInput></InputRow.SwitchInput>
            </InputRow>
        </MainBlock>

        <MainBlock title='Options' >

            <InputRow>
                <InputRow.Label
                    description='This will appear on your cart page'
                >Bump product name & price</InputRow.Label>
                <InputRow.SmallInput></InputRow.SmallInput>
                <InputRow.PriceField currancy='$' >1.99</InputRow.PriceField>
            </InputRow>
            <InputRow>
                <InputRow.Label>Title</InputRow.Label>
                <InputRow.SmallInput></InputRow.SmallInput>
            </InputRow>
            <InputRow>
                <InputRow.Label>Intro text</InputRow.Label>
                <InputRow.SmallInput></InputRow.SmallInput>
            </InputRow>

            <InputRow>
                <InputRow.Label>Body text</InputRow.Label>
                <InputRow.TextAreaInput></InputRow.TextAreaInput>
            </InputRow>
        </MainBlock>

        <MainBlock title='Fulfillment'>
            <InputRow>
                <InputRow.Label
                    description='If your customer purchases the bump offer, they will receive two links on their success page.'
                >Success URL</InputRow.Label>
                <InputRow.UrlInput prefix={'http://'}></InputRow.UrlInput>
            </InputRow>
        </MainBlock>

    </React.Fragment>
);
