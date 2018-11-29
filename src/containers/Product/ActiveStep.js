import React from 'react'
import ProductDetailes from 'components/ProductStepsComponents/Details'
import Boosters from 'components/ProductStepsComponents/Boosters'
import CheckoutTemplates from 'components/ProductStepsComponents/Checkout'
import PaymentGateway from 'components/ProductStepsComponents/PaymentGateway'
import Payments from './sub/Payments'
import OrderBump from './sub/OrderBump'
import AdvanecdSetting from './sub/AdvanecdSetting'


class ActiveStep extends React.Component {

    render() {
        switch (this.props.currentStep) {
            case 'checkout': return <CheckoutTemplates />
            case 'product': return <ProductDetailes />
            case 'boosters': return <Boosters />
            case 'payment': return <PaymentGateway />
            case 'bump': return <OrderBump />
            case 'scripts': return <AdvanecdSetting />
            case 'fullfillment': return <AdvanecdSetting />
            default: return <ProductDetailes />
        }
    }
}


export default ActiveStep