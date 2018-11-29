import React, { Component, Fragment } from 'react';
import ProductDetails from './Details'
import ProductPrice from './ProductPrice'
import ProductTags from './ProductTags'
import Collapsible from 'components/Collapsible';

import './style.css'
export default  props => (
    <div className='product-details-sections'>
        <Collapsible title='Product Details'>
            <ProductDetails />
        </Collapsible>
        <Collapsible title='Product Pricing'>
            <ProductPrice />
        </Collapsible>
        <Collapsible title='Product Tags'>
            <ProductTags />
        </Collapsible>
    </div>
)