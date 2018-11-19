import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import './style.css'
import ProductDetailes from './sub/ProductDetails'
import CheckoutDesign from './sub/CheckoutDesign'
import Payments from './sub/Payments'
import OrderBump from './sub/OrderBump'
import AdvanecdSetting from './sub/AdvanecdSetting'
import common from 'components/common'
import { connect } from 'react-redux'
import * as productAction from 'actions/product'
const { TabsNavigator, Button, MiniButton, ActivationSwitchInput } = common
/* temp component tp represent the empty tap */

const newProductTabs = productUrl => ([
    { title: 'Product Details', sub: `/product/${productUrl}/details` },
    { title: 'Checkout Design', sub: `/product/${productUrl}/checkout` },
    { title: 'Payments', sub: `/product/${productUrl}/payments` },
    { title: 'Order Bump', sub: `/product/${productUrl}/order` },
    { title: 'Advanced Setting', sub: `/product/${productUrl}/advanced` }
])


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
    onChangesSave = (pageName) => {

        switch (pageName) {
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
    onPreview = () => {
        const { subdomain, productUrl } = this.props
        if (subdomain && productUrl)
            window.open(`http://${subdomain}.leadcart.io/products/${productUrl}`)
    }
    onToggleProductAvailability = () => {

        console.log("onToggleProductAvailability", this.props.id)
    }
    render() {
        const { available, id, toggleProductAvailability, productUrl, history } = this.props
        const pageName = this.props.history.location.pathname.split('/')[3]
        return (
            <div className='products-details-page'>

                <div className='products-controls-btns'>
                    <Button onClick={this.onPreview} classes={['share-btn']}>
                        <i className="fas fa-share-square"></i>Share Product
                    </Button>
                    <div className='product-toolbar-container'>
                        <ActivationSwitchInput active={available} onToggle={toggleProductAvailability.bind(this, { id, available })} />
                        <MiniButton onClick={this.onPreview} classes='row-explor-btn' iconClass='fa-eye' />
                        <Button onClick={() => this.onChangesSave(pageName)} classes='save-changes-btn'>
                            Save Changes
                    </Button>
                    </div>
                </div>
                <TabsNavigator
                    productUrl={productUrl}
                    tabs={newProductTabs(productUrl)}
                    history={history} />
                <Switch>
                    <Route path='/product/:url/details' component={ProductDetailes} />
                    <Route exact path='/product/:url/checkout' component={CheckoutDesign} />
                    <Route exact path='/product/:url/payments' component={Payments} />
                    <Route exact path='/product/:url/order' component={OrderBump} />
                    <Route exact path='/product/:url/advanced' component={AdvanecdSetting} />
                    <Route path='/product/:url' component={ProductDetailes} />
                </Switch>
            </div>
        );
    }
}
const mapStateToProps = state => ({
    subdomain: state.user.user.subDomain,
    productUrl: state.product.details.url,
    id: state.product._id,
    available: state.product.details.available
})
export default connect(mapStateToProps, productAction)(NewProductDetailes);