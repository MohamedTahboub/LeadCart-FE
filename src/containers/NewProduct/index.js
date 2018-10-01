import React, { Component } from 'react';

import './style.css'
import ProductDetailes from './sub/ProductDetails'
import CheckoutDesign from './sub/CheckoutDesign'



const TabsNavigation = ({ history, ...props }) => {
    const goToTabe = tabName => {
        history.push(`#${tabName}`)
    }
    return (
        <div className='product-details-nav'>
            <span onClick={() => goToTabe('details')} className='nav-link active-nav-link'>Product Details</span>
            <span onClick={() => goToTabe('checkout')} className='nav-link'>Checkout Design</span>
            <span className='nav-link'>Payments</span>
            <span className='nav-link'>Order Bump</span>
            <span className='nav-link'>Integration</span>
            <span className='nav-link'>Advanced Setting</span>
        </div>
    )
}


const ActiveTabe = ({ tabName, ...props }) => {
    switch (tabName) {
        case 'details': return <ProductDetailes />
        case 'checkout': return <CheckoutDesign />
        default: return <ProductDetailes />
    }
}


class NewProductDetailes extends Component {
    render() {
        const tabName = this.props.history.location.hash.slice(1)
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
                <TabsNavigation history={this.props.history} />
                <ActiveTabe tabName={tabName} />

            </div>
        );
    }
}

export default NewProductDetailes;