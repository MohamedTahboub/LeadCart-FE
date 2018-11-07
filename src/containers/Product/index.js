import React, { Component } from 'react';

import './style.css'
import ProductDetailes from './sub/ProductDetails'
import CheckoutDesign from './sub/CheckoutDesign'
import Payments from './sub/Payments'
import OrderBump from './sub/OrderBump'
import AdvanecdSetting from './sub/AdvanecdSetting'
import common from 'components/common'
import { connect } from 'react-redux'
import * as productAction from 'actions/product'
const { TabsNavigator, Button } = common
/* temp component tp represent the empty tap */

const newProductTabs = [
    { title: 'Product Details', hash: 'details' },
    { title: 'Checkout Design', hash: 'checkout' },
    { title: 'Payments', hash: 'payments' },
    { title: 'Order Bump', hash: 'order' },
    { title: 'Advanced Setting', hash: 'advanced' }
]


const ActiveTabe = ({ tabName, onChange, ...props }) => {
    switch (tabName) {
        case 'details': return <ProductDetailes />
        case 'checkout': return <CheckoutDesign />
        case 'payments': return <Payments />
        case 'order': return <OrderBump />
        case 'advanced': return <AdvanecdSetting />
        default: return <ProductDetailes />
    }
}

const Link = ({ children, link, classes = [], ...props }) => (
    <a href={link || "http://checkout.leadcart.io/products/ursadsaddsssastertasadl1"} target="_blank" className={"btn link-btn " + classes.join(' ')}>{children}</a>
)
class NewProductDetailes extends Component {
    state = {

    }
    componentDidMount = () => {
        this.updateCurrentProductDetails()
    }
    updateCurrentProductDetails = () => {
        const productUrl = this.props.history.location.pathname.split('/')[2]
        this.props.getProduct(productUrl);
    }
    onTabsDataChange = (data) => {
        console.log(data)
        this.setState({ data })
    }
    onChangesSave = (tabName) => {

        switch (tabName) {
            case 'details':
                return this.props.updateProductDetails({})
            case 'checkout':
                return this.props.updateProductCheckoutDesign()
            case 'payments':
                return this.props.updateProductPayment()
            case 'order':
                return this.props.updateProductOrderBump()
            case 'advanced':
                return this.props.updateProductAdvanceSetting()
        }
    }

    render() {
        const tabName = this.props.history.location.hash.slice(1)
        return (
            <div className='products-details-page'>

                <div className='products-controls-btns'>
                    <Link link={this.props.productUrl} classes={['share-btn']}>
                        <i className="fas fa-share-square"></i>Share Product
                    </Link>
                    <Button onClick={() => this.onChangesSave(tabName)} classes='save-changes-btn'>
                        Save Changes
                    </Button>
                </div>
                <TabsNavigator
                    tabs={newProductTabs}
                    history={this.props.history} />
                <ActiveTabe tabName={tabName} onChange={this.onTabsDataChange} />

            </div>
        );
    }
}
const mapStateToProps = state => ({
    state,
    productUrl: state.product.details.url
})
export default connect(mapStateToProps, productAction)(NewProductDetailes);