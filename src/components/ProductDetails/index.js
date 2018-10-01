import React, { Component } from 'react';

import './style.css'
// import ProductDetailes from './ChildsComponents/ProductDetailes'
import CheckoutDesign from './ChildsComponents/CheckoutDesign'



const TabsNavigation = ptops => {

    return (
        <div className='product-details-nav'>
            <span className='nav-link active-nav-link'>Product Details</span>
            <span className='nav-link'>Checkout Design</span>
            <span className='nav-link'>Payments</span>
            <span className='nav-link'>Order Bump</span>
            <span className='nav-link'>Integration</span>
            <span className='nav-link'>Advanced Setting</span>
        </div>
    )
}


class NewProductDetailes extends Component {
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

                <TabsNavigation />
                <CheckoutDesign />
            </div>
        );
    }
}

export default NewProductDetailes;