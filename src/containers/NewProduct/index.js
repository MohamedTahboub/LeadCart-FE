import React, { Component } from 'react';

import './style.css'
import ProductDetailes from './sub/ProductDetails'
import CheckoutDesign from './sub/CheckoutDesign'
import Payments from './sub/Payments'
import OrderBump from './sub/OrderBump'
import AdvanecdSetting from './sub/AdvanecdSetting'


/* temp component tp represent the empty tap */

const EmptyTab = () => (
    <span> in progress ...</span>
)

const TabsNavigation = ({ history, ...props }) => {
    const goToTabe = tabName => {
        history.push(`#${tabName}`)
    }
    const classes = thisTabe => ({
        className: history.location.hash === '#' + thisTabe
            ?
            'nav-link active-nav-link'
            : 'nav-link'
    })
    return (
        <div className='product-details-nav'>
            <span onClick={() => goToTabe('details')} {...classes('details')}>Product Details</span>
            <span onClick={() => goToTabe('checkout')} {...classes('checkout')}>Checkout Design</span>
            <span onClick={() => goToTabe('payments')} {...classes('payments')}>Payments</span>
            <span onClick={() => goToTabe('order')} {...classes('order')} >Order Bump</span>
            <span onClick={() => goToTabe('advanced')} {...classes('advanced')} >Advanced Setting</span>
        </div>
    )
}


const ActiveTabe = ({ tabName, ...props }) => {
    switch (tabName) {
        case 'details': return <ProductDetailes />
        case 'checkout': return <CheckoutDesign />
        case 'payments': return <Payments />
        case 'order': return <OrderBump />
        case 'advanced': return <AdvanecdSetting />
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