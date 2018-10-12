import React, { Component } from 'react';

import './style.css'
import ProductDetailes from './sub/ProductDetails'
import CheckoutDesign from './sub/CheckoutDesign'
import Payments from './sub/Payments'
import OrderBump from './sub/OrderBump'
import AdvanecdSetting from './sub/AdvanecdSetting'
import common from 'components/common'
// import { Button } from '../../components/common/Buttons';

const { TabsNavigator, Button } = common
/* temp component tp represent the empty tap */

const newProductTabs = [
    { title: 'Product Details', hash: 'details' },
    { title: 'Checkout Design', hash: 'checkout' },
    { title: 'Payments', hash: 'payments' },
    { title: 'Order Bump', hash: 'order' },
    { title: 'Advanced Setting', hash: 'advanced' }
]


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
                    <Button classes='share-btn'>
                        <i class="fas fa-share-square"></i>Share Product
                    </Button>
                    <Button classes='save-changes-btn'>
                        Save Changes
                    </Button>
                </div>
                <TabsNavigator
                    tabs={newProductTabs}
                    history={this.props.history} />
                <ActiveTabe tabName={tabName} />

            </div>
        );
    }
}

export default NewProductDetailes;