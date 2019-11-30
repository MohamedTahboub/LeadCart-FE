import React, { useState } from 'react';
import { connect } from 'react-redux'
import Orders from './sub/Orders'
import PropTypes from 'prop-types'
import Subscriptions from './sub/Subscriptions'

import './style.css'
// import ProductDetailes from './sub/ProductDetails'

import common from 'components/common'


const getSubscriptionsList = orders => {
    return orders.reduce((subs, { products = [], ...order }) => {
        const subscriptionProducts = products
            .filter(({ payment = {} }) => payment.paymentType === 'Subscriptions')
            .map(product => ({ ...order, product }))
        return [...subs, ...subscriptionProducts]
    }, []);
}

const exportToCsv = (orders) => {
    const titles = 'Name,Email Address,Phone Number,Product Name,Payment Processor,offer included,coupon used,coupon discount,total Charge,product payment Type\n';

    const convertToCSVFormat = orders
        .map(({
            customer: {
                firstName,
                lastName,
                email,
                phoneNumber
            },
            product: {
                name: productName,
                offer: { name: offerName = 'No', price: offerPrice = 0 } = {},
                coupon: { code = '- -', CouponDiscount = 0 } = {}
            } = {},
            payment: {
                paymentType,
                paymentMethod
            },
            totalCharge
        }) => `${firstName} ${lastName},${email},${phoneNumber},${productName},${paymentMethod},${offerName} - ${offerPrice},${code},${CouponDiscount},${totalCharge},${paymentType}`).join('\n');
    return titles + convertToCSVFormat
};


const {
    MainTitle,
    Page,
    PageHeader,
    PageContent,
    SubTabs
} = common





const Transactions = ({ orders }) => {
    const [activeTab, setActiveTab] = useState('Orders');

    const onExportToCSV = () => {
        const dataRows = exportToCsv(activeTab === 'Orders' ? orders : subscriptions);
        const fileName = `${activeTab}.csv`
        const download = document.createElement('a');
        const fileHref = `data:text/csv;charset=utf-8,${encodeURIComponent(dataRows)}`;
        download.setAttribute('href', fileHref);
        download.setAttribute('download', fileName);
        download.click();
    }

    const orderedList = orders.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.createdAt) - new Date(a.createdAt);
    });
    const subscriptions = getSubscriptionsList(orderedList)
    console.log("subscriptions",subscriptions)
    return (
        <Page className='products-details-page'>
            <PageHeader>
                <MainTitle>Transactions</MainTitle>
                <div
                    onClick={onExportToCSV}
                    className='btn primary-color'
                >
                    Export csv
                </div>
            </PageHeader>
            <PageContent>
                <SubTabs
                    defaultTab='Orders'
                    onTabChange={setActiveTab}
                    tabs={{
                        'Orders': <Orders orders={orderedList} />,
                        'Subscriptions': <Subscriptions subscriptions={subscriptions} />,
                    }}
                />
            </PageContent>
        </Page>
    );
}



const mapStateToProps = ({ orders = [] }) => ({
    orders
});
Transactions.propTypes = {
    orders: PropTypes.array,
    subscriptions: PropTypes.array
}
Transactions.defaultProps = {
    orders: [],
    subscriptions: []
}
export default connect(mapStateToProps)(Transactions);
