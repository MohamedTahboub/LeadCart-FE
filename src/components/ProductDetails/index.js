import React, { Component } from 'react';

import './style.css'
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
                    <span className='nav-link active-nav-link'>Product details</span>
                    <span className='nav-link'>Checkout design</span>
                    <span className='nav-link'>payments</span>
                    <span className='nav-link'>order Bump</span>
                    <span className='nav-link'>integration</span>
                </div>
            </div>
        );
    }
}

export default ProductDetailes;